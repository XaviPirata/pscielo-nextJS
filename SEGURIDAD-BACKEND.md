# 🛡️ Guía de Seguridad Backend - Formulario de Contacto

## ⚠️ IMPORTANTE
Este documento contiene las validaciones que se DEBE implementar en el backend (VPS) para complementar la seguridad del frontend.

---

## 📋 Validaciones Implementadas en Frontend

✅ **1. Honeypot** - Campo oculto "company"
✅ **2. Rate Limiting** - Máximo 1 envío cada 30 segundos por cliente
✅ **3. Tiempo Mínimo** - Usuario debe estar al menos 3 segundos en la página
✅ **4. Interacciones Mínimas** - Al menos 3 interacciones con los campos
✅ **5. Validación de Longitud** - Nombre max 100 chars, mensaje max 2000 chars
✅ **6. Detección de Spam** - Máximo 2 URLs en el mensaje
✅ **7. Session Token** - Token único por sesión

---

## 🔧 Validaciones OBLIGATORIAS en Backend (VPS)

### 1. **Validar Honeypot**
```javascript
// Si el campo "company" tiene valor = BOT
if (req.body.company && req.body.company !== '') {
  return res.status(400).json({ message: 'Invalid request' });
}
```

### 2. **Rate Limiting por IP (CRÍTICO)**
```javascript
// Usar express-rate-limit
const rateLimit = require('express-rate-limit');

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 3, // Máximo 3 envíos por IP en 15 minutos
  message: 'Demasiadas solicitudes desde esta IP'
});

app.post('/submit', contactLimiter, (req, res) => {
  // ... tu código
});
```

### 3. **Validar Datos de Seguridad**
```javascript
const security = req.body._security;

// Validar tiempo en página (mínimo 3 segundos)
if (security.timeOnPage < 3000) {
  return res.status(400).json({ message: 'Request too fast' });
}

// Validar interacciones mínimas
if (security.interactionCount < 3) {
  return res.status(400).json({ message: 'Insufficient interactions' });
}

// Validar que el timestamp no sea muy viejo (max 1 hora)
const now = Date.now();
if (now - security.timestamp > 3600000) {
  return res.status(400).json({ message: 'Expired form' });
}
```

### 4. **Validación de Email (servidor)**
```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(req.body.email)) {
  return res.status(400).json({ message: 'Invalid email' });
}
```

### 5. **Sanitización de Datos**
```javascript
// Usar librería para sanitizar HTML/scripts
const validator = require('validator');

const name = validator.escape(req.body.name);
const message = validator.escape(req.body.message);
const email = validator.normalizeEmail(req.body.email);
```

### 6. **Detección de Patrones Spam**
```javascript
const spamKeywords = [
  'viagra', 'casino', 'lottery', 'winner', 'click here',
  'buy now', 'limited time', 'act now', 'free money'
];

const messageText = req.body.message.toLowerCase();
const hasSpamKeywords = spamKeywords.some(keyword => 
  messageText.includes(keyword)
);

if (hasSpamKeywords) {
  return res.status(400).json({ message: 'Spam detected' });
}
```

### 7. **Logging de Intentos Sospechosos**
```javascript
// Guardar en log/base de datos intentos bloqueados
if (isSuspicious) {
  console.log({
    timestamp: new Date(),
    ip: req.ip,
    userAgent: req.headers['user-agent'],
    reason: 'spam_detected',
    data: req.body
  });
}
```

---

## 🚀 Instalación de Dependencias (Backend)

```bash
npm install express-rate-limit validator
```

---

## 📊 Ejemplo de Implementación Completa

```javascript
const express = require('express');
const rateLimit = require('express-rate-limit');
const validator = require('validator');

const app = express();
app.use(express.json());

// Rate limiter
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: { message: 'Too many requests' }
});

// Spam keywords
const spamKeywords = ['viagra', 'casino', 'lottery', 'winner'];

app.post('/submit', contactLimiter, async (req, res) => {
  try {
    // 1. Validar honeypot
    if (req.body.company) {
      return res.status(400).json({ message: 'Invalid request' });
    }

    // 2. Validar datos de seguridad
    const security = req.body._security;
    if (!security || security.timeOnPage < 3000 || security.interactionCount < 3) {
      return res.status(400).json({ message: 'Security check failed' });
    }

    // 3. Sanitizar datos
    const name = validator.escape(req.body.name.trim());
    const email = validator.normalizeEmail(req.body.email);
    const message = validator.escape(req.body.message.trim());

    // 4. Validar email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    // 5. Validar longitudes
    if (name.length > 100 || message.length > 2000) {
      return res.status(400).json({ message: 'Data too long' });
    }

    // 6. Detectar spam keywords
    const messageText = message.toLowerCase();
    const hasSpam = spamKeywords.some(kw => messageText.includes(kw));
    if (hasSpam) {
      return res.status(400).json({ message: 'Spam detected' });
    }

    // 7. TODO: Enviar email o guardar en base de datos
    // await sendEmail({ name, email, message });

    res.status(200).json({ message: 'Success' });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(3000);
```

---

## 🔐 Seguridad Adicional Recomendada

### **Nivel 1 - Básico (Implementado)**
- ✅ Honeypot
- ✅ Rate limiting frontend
- ✅ Validación de interacciones

### **Nivel 2 - Intermedio (Recomendado)**
- 🔧 Rate limiting backend por IP
- 🔧 Validación de datos de seguridad
- 🔧 Sanitización de inputs
- 🔧 Logging de intentos sospechosos

### **Nivel 3 - Avanzado (Opcional)**
- 🔐 **Google reCAPTCHA v3** (invisible, sin interacción)
- 🔐 **Cloudflare Turnstile** (alternativa a reCAPTCHA)
- 🔐 **Verificación de dominio de email** (MX record check)
- 🔐 **Lista negra de IPs** (bloquear IPs sospechosas)
- 🔐 **Análisis de comportamiento** (machine learning)

---

## 📱 Testing

### **Casos a probar:**
1. ✅ Envío normal exitoso
2. ✅ Envío muy rápido (< 3 segundos) → Debe bloquearse
3. ✅ Múltiples envíos rápidos → Rate limit debe activarse
4. ✅ Rellenar honeypot → Debe hacer fake success
5. ✅ Mensaje con muchas URLs → Debe bloquearse
6. ✅ Campos demasiado largos → Debe bloquearse

---

## 🎯 Resultado Esperado

Con estas implementaciones, el formulario estará protegido contra:
- ✅ Bots simples (honeypot)
- ✅ Scripts automatizados (rate limiting)
- ✅ Spam masivo (validaciones múltiples)
- ✅ Ataques DDoS básicos (rate limiting)
- ✅ Inyección de código (sanitización)
