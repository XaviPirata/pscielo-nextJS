// ============================================================================
// 🛡️ SERVIDOR BACKEND CON CLOUDFLARE TURNSTILE
// ============================================================================
// Este es el código ACTUALIZADO para el archivo server.js en tu VPS
// Ubicación: /srv/psicodelcielo/shared/server.js
// ============================================================================

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const validator = require("validator");
require("dotenv").config({ path: "/srv/psicodelcielo/shared/.env" });

const app = express();
const PORT = 3001;

// ============================================================================
// 🔐 CONFIGURACIÓN DE SEGURIDAD
// ============================================================================

// Helmet: Seguridad HTTP headers
app.use(helmet());

// CORS: Solo permitir dominios autorizados
app.use(cors({
  origin: [
    "https://psicodelcielo.com",
    "https://www.psicodelcielo.com",
    "https://pscielo.com",
    "https://www.pscielo.com"
  ],
  methods: ["POST"],
  credentials: false
}));

app.use(express.json({ limit: "10kb" })); // Limitar tamaño del body

// Rate Limiting GLOBAL por IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 solicitudes por IP cada 15 minutos
  message: { message: "Demasiadas solicitudes. Intenta más tarde." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/submit", globalLimiter);

// ============================================================================
// 🔧 TRANSPORTER DE NODEMAILER (ZOHO)
// ============================================================================

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ============================================================================
// 🛡️ FUNCIÓN: VERIFICAR CLOUDFLARE TURNSTILE TOKEN
// ============================================================================

async function verifyTurnstileToken(token, remoteIP) {
  const SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
  
  if (!SECRET_KEY) {
    console.error("❌ ERROR: TURNSTILE_SECRET_KEY no está configurada en .env");
    return false;
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', SECRET_KEY);
    formData.append('response', token);
    formData.append('remoteip', remoteIP);

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const data = await response.json();
    
    if (data.success) {
      console.log("✅ Turnstile verificado exitosamente");
      return true;
    } else {
      console.log("⚠️ Turnstile falló:", data['error-codes']);
      return false;
    }
  } catch (error) {
    console.error("❌ Error verificando Turnstile:", error);
    return false;
  }
}

// ============================================================================
// 📬 ENDPOINT: /submit
// ============================================================================

app.post("/submit", async (req, res) => {
  console.log("\n🔵 ========== NUEVA SOLICITUD ==========");
  console.log("📥 Body recibido:", JSON.stringify(req.body, null, 2));

  const { name, email, phone, message, source, company, honeypot, _security, turnstileToken } = req.body;
  const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  // ============================================================================
  // 🛡️ VALIDACIÓN #0: CLOUDFLARE TURNSTILE (MÁXIMA PRIORIDAD)
  // ============================================================================
  
  if (!turnstileToken) {
    console.log("❌ Rechazado: No se proporcionó token de Turnstile");
    return res.status(400).json({ message: "Verificación de seguridad requerida" });
  }

  const isTurnstileValid = await verifyTurnstileToken(turnstileToken, clientIP);
  if (!isTurnstileValid) {
    console.log("❌ Rechazado: Token de Turnstile inválido");
    return res.status(400).json({ message: "Verificación de seguridad falló" });
  }

  console.log("✅ Turnstile verificado correctamente");

  // ============================================================================
  // 🛡️ VALIDACIÓN #1: HONEYPOT
  // ============================================================================
  
  const honeypotVal = company || honeypot;
  if (honeypotVal && String(honeypotVal).trim() !== '') {
    console.log("🤖 BOT DETECTADO - Honeypot activado:", honeypotVal);
    // Responder OK para engañar al bot pero no enviar email
    return res.status(200).json({ message: "Mensaje recibido" });
  }

  // ============================================================================
  // 🛡️ VALIDACIÓN #2: CAMPOS OBLIGATORIOS
  // ============================================================================
  
  if (!name || !email || !message) {
    console.log("❌ Rechazado: Faltan campos obligatorios");
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  // ============================================================================
  // 🛡️ VALIDACIÓN #3: FORMATO DE EMAIL
  // ============================================================================
  
  if (!validator.isEmail(String(email))) {
    console.log("❌ Rechazado: Email inválido:", email);
    return res.status(400).json({ message: "Email inválido" });
  }

  // ============================================================================
  // 🛡️ VALIDACIÓN #4: LONGITUD DE CAMPOS
  // ============================================================================
  
  if (String(name).length > 100 || String(message).length > 2000) {
    console.log("❌ Rechazado: Campos demasiado largos");
    return res.status(400).json({ message: "Los campos son demasiado largos" });
  }

  // ============================================================================
  // 🛡️ VALIDACIÓN #5: DATOS DE SEGURIDAD (_security)
  // ============================================================================
  
  if (_security) {
    const now = Date.now();

    // Tiempo mínimo en la página: 3 segundos
    if (_security.timeOnPage < 3000) {
      console.log("❌ Rechazado: Envío demasiado rápido (bot)");
      return res.status(400).json({ message: "Por favor, completa el formulario con calma" });
    }

    // Interacciones mínimas: 3
    if (_security.interactionCount < 3) {
      console.log("❌ Rechazado: Pocas interacciones (bot)");
      return res.status(400).json({ message: "Por favor, completa todos los campos" });
    }

    // Timestamp no mayor a 1 hora (formulario expirado)
    if (now - _security.timestamp > 3600000) {
      console.log("❌ Rechazado: Formulario expirado");
      return res.status(400).json({ message: "El formulario ha expirado. Recarga la página" });
    }

    console.log("✅ Validaciones de seguridad pasadas");
  }

  // ============================================================================
  // 🧹 SANITIZACIÓN DE DATOS
  // ============================================================================
  
  const cleanName = String(name).trim().substring(0, 200);
  const cleanEmail = String(email).trim().toLowerCase().substring(0, 320);
  const cleanPhone = phone ? String(phone).trim().substring(0, 50) : "No especificado";
  const cleanMessage = String(message).trim().substring(0, 2000);

  // ============================================================================
  // 🚨 DETECCIÓN DE SPAM (LOG SOLAMENTE - NO BLOQUEAMOS)
  // ============================================================================
  
  const msgLower = cleanMessage.toLowerCase();
  const spamKeywords = [
    'viagra', 'cialis', 'casino', 'lottery', 'bitcoin', 'crypto',
    'click here', 'buy now', 'limited offer', 'make money', 'investment'
  ];

  const hasSpamKeyword = spamKeywords.some(kw => msgLower.includes(kw));
  if (hasSpamKeyword) {
    console.log("⚠️ ADVERTENCIA: Posible spam detectado");
  }

  // Detectar caracteres aleatorios (como FaDWFiHVoxHNv)
  const randomPattern = /^[a-zA-Z]{10,}$/; // Solo letras sin espacios
  if (randomPattern.test(cleanName) || randomPattern.test(cleanMessage.replace(/\s/g, ''))) {
    console.log("⚠️ ADVERTENCIA: Patrón de texto aleatorio detectado");
  }

  // ============================================================================
  // 📧 ENVÍO DE EMAIL
  // ============================================================================
  
  // Determinar destinatarios según el sitio de origen
  let toList = [];
  if (source === "pscielo") {
    toList = [
      "pscieloespacioterapeutico@gmail.com",
      "javierscumm@gmail.com"
    ];
  } else if (source === "psicodelcielo") {
    toList = [
      "javierscumm@gmail.com",
      "rociobartey@gmail.com"
    ];
  } else {
    toList = ["javierscumm@gmail.com"];
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toList.join(", "),
    subject: `📩 Nueva consulta desde ${source || "sitio web"}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #F9A8D4;">Nueva Consulta de Contacto</h2>
        <hr style="border: 1px solid #F9A8D4;">
        
        <p><strong>Nombre:</strong> ${cleanName}</p>
        <p><strong>Email:</strong> <a href="mailto:${cleanEmail}">${cleanEmail}</a></p>
        <p><strong>Teléfono:</strong> ${cleanPhone}</p>
        
        <h3 style="color: #333;">Mensaje:</h3>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
          <p style="white-space: pre-wrap;">${cleanMessage}</p>
        </div>
        
        <hr style="border: 1px solid #ddd; margin-top: 20px;">
        <p style="font-size: 12px; color: #666;">
          <strong>Origen:</strong> ${source || "desconocido"}<br>
          <strong>IP:</strong> ${clientIP}<br>
          <strong>Fecha:</strong> ${new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" })}
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email enviado exitosamente a:", toList.join(", "));
    return res.status(200).json({ message: "Mensaje enviado exitosamente" });
  } catch (error) {
    console.error("❌ Error al enviar email:", error);
    return res.status(500).json({ message: "Error al enviar el mensaje" });
  }
});

// ============================================================================
// 🚀 SERVIDOR ESCUCHANDO
// ============================================================================

app.listen(PORT, () => {
  console.log(`\n🚀 Servidor escuchando en puerto ${PORT}`);
  console.log(`🔐 Rate limiting: 5 solicitudes cada 15 minutos por IP`);
  console.log(`🛡️ Cloudflare Turnstile: ACTIVADO`);
  console.log(`📧 Email configurado: ${process.env.EMAIL_USER || "NO CONFIGURADO"}`);
  console.log(`🔑 Turnstile Secret Key: ${process.env.TURNSTILE_SECRET_KEY ? "CONFIGURADA ✅" : "FALTA ❌"}`);
});
