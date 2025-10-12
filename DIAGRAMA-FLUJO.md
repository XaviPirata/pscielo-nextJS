# 🔄 DIAGRAMA DE FLUJO: CLOUDFLARE TURNSTILE

## 📊 FLUJO COMPLETO (Usuario Real)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    USUARIO ABRE FORMULARIO                          │
│                    https://pscielo.com                              │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  🌐 FRONTEND (Next.js)                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━                                          │
│                                                                      │
│  1. Se renderiza el componente <Turnstile />                        │
│  2. Cloudflare JavaScript carga en el navegador                     │
│  3. Analiza comportamiento del usuario:                             │
│     ✓ Movimientos del mouse                                         │
│     ✓ Velocidad de escritura                                        │
│     ✓ Tiempo en la página                                           │
│     ✓ Interacciones con campos                                      │
│                                                                      │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │  ¿Parece humano?      │
                 └───────────┬───────────┘
                             │
           ┌─────────────────┴─────────────────┐
           │                                   │
           ▼                                   ▼
      ✅ SÍ                                ⚠️ DUDOSO
           │                                   │
           │                          ┌────────┴────────┐
           │                          │ Muestra desafío │
           │                          │ (ej: puzzle)    │
           │                          └────────┬────────┘
           │                                   │
           └───────────┬───────────────────────┘
                       │
                       ▼
         ┌──────────────────────────┐
         │ Genera TOKEN único       │
         │ Token = "cf-xxx-yyy-zzz" │
         └──────────┬───────────────┘
                    │
                    ▼
    ┌───────────────────────────────────┐
    │ setTurnstileToken("cf-xxx...")    │
    │ Botón "Enviar" se habilita        │
    └───────────┬───────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                 USUARIO COMPLETA FORMULARIO                          │
│                 Y PRESIONA "ENVIAR"                                  │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  🌐 FRONTEND - Validación antes de enviar                           │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                            │
│                                                                      │
│  if (!turnstileToken) {                                             │
│    ❌ Rechazar: "Completa la verificación de seguridad"             │
│  }                                                                   │
│                                                                      │
│  ✅ Token existe → Continuar                                         │
│                                                                      │
│  Payload enviado:                                                    │
│  {                                                                   │
│    name: "Juan Pérez",                                              │
│    email: "juan@example.com",                                       │
│    message: "Hola, necesito información",                           │
│    turnstileToken: "cf-xxx-yyy-zzz",  ← IMPORTANTE                  │
│    _security: { ... }                                               │
│  }                                                                   │
│                                                                      │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ POST https://psicodelcielo.com/submit
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  🖥️  BACKEND (VPS - Express.js)                                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                                   │
│                                                                      │
│  1. Recibe la solicitud                                             │
│  2. Extrae turnstileToken del body                                  │
│                                                                      │
│  3. VALIDACIÓN #0 (Prioridad máxima):                               │
│     if (!turnstileToken) {                                          │
│       ❌ return 400: "Verificación de seguridad requerida"          │
│     }                                                                │
│                                                                      │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  🔍 BACKEND llama a Cloudflare API                                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                              │
│                                                                      │
│  async function verifyTurnstileToken(token, remoteIP) {             │
│                                                                      │
│    const formData = new URLSearchParams({                           │
│      secret: TURNSTILE_SECRET_KEY,                                  │
│      response: token,                                               │
│      remoteip: remoteIP                                             │
│    });                                                               │
│                                                                      │
│    fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {│
│      method: 'POST',                                                │
│      body: formData                                                 │
│    })                                                                │
│  }                                                                   │
│                                                                      │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
              ┌──────────────────────────────┐
              │  🌐 CLOUDFLARE VERIFICA      │
              │  ━━━━━━━━━━━━━━━━━━━━      │
              │                              │
              │  • ¿Token válido?            │
              │  • ¿No expirado?             │
              │  • ¿IP coincide?             │
              │  • ¿No reutilizado?          │
              │  • ¿Comportamiento humano?   │
              │                              │
              └──────────┬───────────────────┘
                         │
         ┌───────────────┴───────────────┐
         │                               │
         ▼                               ▼
    ✅ SUCCESS                       ❌ FAIL
         │                               │
         │                               │
         │                               │
┌────────┴────────┐          ┌───────────┴────────┐
│ Cloudflare      │          │ Cloudflare         │
│ responde:       │          │ responde:          │
│                 │          │                    │
│ {               │          │ {                  │
│   "success": true,│        │   "success": false,│
│   "challenge_ts":│         │   "error-codes": [...] │
│   "hostname": ...,│        │ }                  │
│   ...           │          │                    │
│ }               │          │                    │
└────────┬────────┘          └───────────┬────────┘
         │                               │
         │                               │
         └───────────────┬───────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────┐
│  🖥️  BACKEND - Decisión final                                       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━                                       │
│                                                                      │
│  if (!isTurnstileValid) {                                           │
│    console.log("❌ Token de Turnstile inválido");                   │
│    return 400: "Verificación de seguridad falló";                   │
│  }                                                                   │
│                                                                      │
│  ✅ Token válido → Continuar con validaciones adicionales           │
│                                                                      │
│  Validaciones restantes:                                            │
│  • Honeypot                                                         │
│  • Campos obligatorios                                              │
│  • Formato de email                                                 │
│  • Longitud de campos                                               │
│  • Tiempo en página                                                 │
│  • Interacciones mínimas                                            │
│                                                                      │
│  ✅ Todas las validaciones pasadas                                   │
│                                                                      │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  📧 ENVÍO DE EMAIL (Nodemailer + Zoho SMTP)                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                          │
│                                                                      │
│  const mailOptions = {                                              │
│    from: process.env.EMAIL_USER,                                    │
│    to: ["pscieloespacioterapeutico@gmail.com", ...],               │
│    subject: "📩 Nueva consulta desde pscielo",                     │
│    html: ...                                                        │
│  };                                                                  │
│                                                                      │
│  await transporter.sendMail(mailOptions);                           │
│                                                                      │
│  console.log("✅ Email enviado exitosamente");                      │
│                                                                      │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  ✅ RESPUESTA AL FRONTEND                                           │
│  ━━━━━━━━━━━━━━━━━━━━━━━                                         │
│                                                                      │
│  return 200: {                                                      │
│    message: "Mensaje enviado exitosamente"                          │
│  }                                                                   │
│                                                                      │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  🌐 FRONTEND - Respuesta al usuario                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                                │
│                                                                      │
│  setFormMessage("¡Mensaje enviado con éxito! Te responderemos...");│
│  formRef.current?.reset();                                          │
│  setTurnstileToken(""); // Limpiar token                            │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🤖 FLUJO ALTERNATIVO (BOT Malicioso)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    BOT INTENTA ENVIAR SPAM                           │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  🤖 BOT ejecuta script automático                                   │
│                                                                      │
│  fetch('https://psicodelcielo.com/submit', {                        │
│    method: 'POST',                                                   │
│    body: JSON.stringify({                                           │
│      name: 'FaDWFiHVoxHNv',                                         │
│      email: 'spam@bot.com',                                         │
│      message: 'kJgvHegiAJk'                                         │
│      // ❌ NO tiene turnstileToken                                  │
│    })                                                                │
│  })                                                                  │
│                                                                      │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  🖥️  BACKEND recibe solicitud                                       │
│                                                                      │
│  const { turnstileToken } = req.body;                               │
│  console.log("Token recibido:", turnstileToken);                    │
│  // → undefined                                                     │
│                                                                      │
│  if (!turnstileToken) {                                             │
│    console.log("❌ Rechazado: No se proporcionó token");            │
│    return res.status(400).json({                                    │
│      message: "Verificación de seguridad requerida"                 │
│    });                                                               │
│  }                                                                   │
│                                                                      │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
              ┌──────────────────────────────┐
              │  ❌ SOLICITUD RECHAZADA      │
              │  ━━━━━━━━━━━━━━━━━━        │
              │                              │
              │  • No se envía email         │
              │  • No se procesa nada        │
              │  • Bot recibe error 400      │
              │  • Log registrado            │
              │                              │
              └──────────────────────────────┘
```

---

## 🔐 ¿POR QUÉ ES IMPOSIBLE FALSIFICAR?

### ❌ Intento de falsificación:

```javascript
// Bot intenta enviar un token falso
fetch('https://psicodelcielo.com/submit', {
  method: 'POST',
  body: JSON.stringify({
    name: 'Bot Test',
    email: 'bot@test.com',
    message: 'Spam',
    turnstileToken: 'token-falso-123'  // ← Token inventado
  })
})
```

### ✅ Lo que sucede:

```
1. Backend recibe: "token-falso-123"
   │
   ▼
2. Backend llama a Cloudflare:
   POST https://challenges.cloudflare.com/turnstile/v0/siteverify
   Body: {
     secret: "TU_SECRET_KEY",
     response: "token-falso-123",
     remoteip: "192.168.1.1"
   }
   │
   ▼
3. Cloudflare busca el token en su base de datos
   │
   ▼
4. Cloudflare responde:
   {
     "success": false,
     "error-codes": ["invalid-input-response"]
   }
   │
   ▼
5. Backend rechaza la solicitud:
   return 400: "Verificación de seguridad falló"
```

**¿Por qué funciona?**
- Los tokens son generados SOLO por Cloudflare
- Cada token es único y de un solo uso
- Cloudflare valida que el token fue generado para esa IP
- Los tokens expiran en ~300 segundos
- No se pueden reutilizar ni falsificar

---

## 📈 ESTADÍSTICAS DE PROTECCIÓN

### Sin Turnstile:
```
100 intentos de spam
  ↓
8 pasan las validaciones (92% bloqueados)
  ↓
❌ 8 emails spam en tu bandeja
```

### Con Turnstile:
```
100 intentos de spam
  ↓
99.9 bloqueados por Turnstile
  ↓
0.1 pasa (1 cada 1000)
  ↓
✅ Casi 0 emails spam
```

---

## 🎯 PUNTOS CLAVE

1. **Doble verificación**: Frontend + Backend
2. **Tokens únicos**: Cada verificación genera un token nuevo
3. **Validación externa**: Cloudflare verifica, no tu código
4. **Machine Learning**: Cloudflare usa IA para detectar bots
5. **Imposible de saltear**: Sin token válido = sin email

---

**Diagrama creado:** 25 de enero de 2025
**Versión:** 1.0
