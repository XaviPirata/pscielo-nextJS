# ⚡ COMANDOS RÁPIDOS - IMPLEMENTACIÓN TURNSTILE

Este archivo contiene TODOS los comandos que necesitas ejecutar, en orden.
Copia y pega cada bloque según corresponda.

---

## 📋 CHECKLIST PREVIO

Antes de empezar, asegúrate de tener:
- [ ] Claves de Cloudflare (Site Key + Secret Key)
- [ ] Acceso SSH a tu VPS
- [ ] Acceso a Vercel Dashboard
- [ ] Git instalado y configurado

---

## 🖥️ PARTE 1: CONFIGURAR FRONTEND (Windows PowerShell)

### 1.1 Editar .env.local

```powershell
# Abrir el archivo .env.local en VS Code
code v:\WEBS\pscielo\pscielo-nextJS\.env.local
```

**Reemplaza el contenido con tus claves:**
```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAAbCdEfGhIjKlMnOpQrS
TURNSTILE_SECRET_KEY=0x4AAAAAAAbCdEfGhIjKlMnOpQrS-AbCdEfGh
```

### 1.2 Probar en desarrollo local

```powershell
# Ir al directorio del proyecto
cd v:\WEBS\pscielo\pscielo-nextJS

# Instalar dependencias (si no lo hiciste)
npm install

# Iniciar servidor de desarrollo
npm run dev
```

**Verificar:**
- Abre http://localhost:3000
- Ve a la sección de contacto
- Debe aparecer el widget de Cloudflare Turnstile
- El botón "Enviar mensaje" debe estar deshabilitado hasta que se complete el widget

**Si funciona correctamente, presiona `Ctrl + C` para detener el servidor.**

---

## 🖥️ PARTE 2: CONFIGURAR BACKEND VPS (SSH)

### 2.1 Conectar al VPS

```powershell
# Conectar por SSH (reemplaza con tu usuario y dominio)
ssh tu_usuario@psicodelcielo.com
```

### 2.2 Hacer backup del server.js actual

```bash
# Ir al directorio del servidor
cd /srv/psicodelcielo/shared

# Crear backup con fecha
cp server.js server-BACKUP-$(date +%Y%m%d-%H%M%S).js

# Verificar que se creó el backup
ls -lh server-BACKUP-*.js
```

**Deberías ver algo como:**
```
-rw-r--r-- 1 user user 8.2K Jan 25 14:30 server-BACKUP-20250125-143000.js
```

### 2.3 Editar .env del servidor

```bash
# Abrir .env con nano
nano /srv/psicodelcielo/shared/.env
```

**Agregar al final del archivo:**
```env
TURNSTILE_SECRET_KEY=0x4AAAAAAAbCdEfGhIjKlMnOpQrS-AbCdEfGh
```

**Guardar y salir:**
- Presiona `Ctrl + O` (Write Out)
- Presiona `Enter` (confirmar nombre)
- Presiona `Ctrl + X` (Exit)

### 2.4 Verificar que se guardó correctamente

```bash
# Ver las últimas líneas del .env
tail /srv/psicodelcielo/shared/.env
```

**Deberías ver:**
```
...otras variables...
TURNSTILE_SECRET_KEY=0x4AAAAAAAbCdEfGhIjKlMnOpQrS-AbCdEfGh
```

---

## 📤 PARTE 3: SUBIR NUEVO server.js AL VPS

Hay 2 opciones. Elige la que prefieras:

### OPCIÓN A: Copiar y pegar manualmente (Recomendado)

**En Windows (VS Code):**
```powershell
# Abrir el nuevo server.js
code v:\WEBS\pscielo\pscielo-nextJS\server-turnstile-NUEVO.js
```

1. Selecciona TODO el contenido (`Ctrl + A`)
2. Copia (`Ctrl + C`)

**En VPS (SSH):**
```bash
# Abrir server.js con nano
nano /srv/psicodelcielo/shared/server.js
```

1. Borra todo el contenido actual (`Ctrl + K` varias veces hasta que esté vacío)
2. Pega el código nuevo (botón derecho del mouse en PowerShell)
3. Guarda: `Ctrl + O`, Enter, `Ctrl + X`

### OPCIÓN B: Subir vía SCP (Avanzado)

**Desde Windows PowerShell:**
```powershell
# Subir archivo al VPS (reemplaza tu_usuario)
scp v:\WEBS\pscielo\pscielo-nextJS\server-turnstile-NUEVO.js tu_usuario@psicodelcielo.com:/srv/psicodelcielo/shared/server.js
```

---

## 🔄 PARTE 4: REINICIAR SERVIDOR EN VPS

### 4.1 Reiniciar PM2

```bash
# Reiniciar todos los procesos
pm2 restart all

# Ver los logs en tiempo real
pm2 logs --lines 50
```

### 4.2 Verificar logs correctos

**Deberías ver:**
```
🚀 Servidor escuchando en puerto 3001
🔐 Rate limiting: 5 solicitudes cada 15 minutos por IP
🛡️ Cloudflare Turnstile: ACTIVADO
📧 Email configurado: tu@email.com
🔑 Turnstile Secret Key: CONFIGURADA ✅
```

**Si dice "FALTA ❌":**
- Vuelve al paso 2.3 y verifica el .env
- Asegúrate de que la variable se llama exactamente `TURNSTILE_SECRET_KEY`
- Reinicia PM2 de nuevo

### 4.3 Desconectar del VPS

```bash
# Cerrar sesión SSH
exit
```

---

## 🚀 PARTE 5: DESPLEGAR EN VERCEL

### 5.1 Configurar variables de entorno en Vercel

1. Abre: https://vercel.com
2. Selecciona tu proyecto `pscielo-nextJS`
3. Ve a **Settings** → **Environment Variables**

**Agregar Variable 1:**
- **Key**: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- **Value**: `0x4AAAAAAAbCdEfGhIjKlMnOpQrS` (tu Site Key real)
- **Environments**: ✅ Production ✅ Preview ✅ Development
- Clic en **Add**

**Agregar Variable 2:**
- **Key**: `TURNSTILE_SECRET_KEY`
- **Value**: `0x4AAAAAAAbCdEfGhIjKlMnOpQrS-AbCdEfGh` (tu Secret Key real)
- **Environments**: ✅ Production
- Clic en **Add**

### 5.2 Hacer deploy

**Desde Windows PowerShell:**
```powershell
# Ir al directorio del proyecto
cd v:\WEBS\pscielo\pscielo-nextJS

# Verificar el estado de Git
git status

# Agregar todos los cambios
git add .

# Crear commit
git commit -m "feat: Add Cloudflare Turnstile protection against spam bots"

# Subir a GitHub (triggerea deploy automático en Vercel)
git push origin main
```

### 5.3 Monitorear el deploy

1. Ve a https://vercel.com/dashboard
2. Verás el deploy en progreso
3. Espera a que termine (~1-2 minutos)
4. Debe decir **"Ready"** cuando termine

---

## ✅ PARTE 6: TESTING EN PRODUCCIÓN

### 6.1 Test básico

```powershell
# Abrir tu sitio en producción
start https://pscielo.com
```

**Verificar manualmente:**
1. Ve a la sección de contacto
2. Debe aparecer el widget de Turnstile
3. Completa el formulario con datos reales
4. El widget debe mostrar un checkmark verde
5. Haz clic en "Enviar mensaje"
6. Debe aparecer: "¡Mensaje enviado con éxito!"

### 6.2 Verificar que llegó el email

Revisa tu correo:
- `pscieloespacioterapeutico@gmail.com`
- `javierscumm@gmail.com`

Debe haber llegado un email con el asunto: **"📩 Nueva consulta desde pscielo"**

### 6.3 Verificar logs del servidor

**En SSH (VPS):**
```bash
# Conectar de nuevo
ssh tu_usuario@psicodelcielo.com

# Ver logs recientes
pm2 logs --lines 100

# Buscar el envío que acabas de hacer
```

**Deberías ver:**
```
🔵 ========== NUEVA SOLICITUD ==========
✅ Turnstile verificado correctamente
✅ Validaciones de seguridad pasadas
✅ Email enviado exitosamente
```

### 6.4 Test anti-bot (Avanzado)

Abre la consola del navegador (F12 → Console) y pega:

```javascript
fetch('https://psicodelcielo.com/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'FaDWFiHVoxHNv',
    email: 'spam@bot.com',
    message: 'kJgvHegiAJk',
    source: 'pscielo'
  })
})
.then(r => r.json())
.then(d => console.log('Respuesta del servidor:', d))
```

**Resultado esperado:**
```json
{
  "message": "Verificación de seguridad requerida"
}
```

**Si ves este mensaje = ✅ La protección está funcionando correctamente**

---

## 🎉 IMPLEMENTACIÓN COMPLETADA

Si llegaste hasta aquí y todo funciona:

✅ **Turnstile instalado en frontend**
✅ **Backend verificando tokens**
✅ **Variables de entorno configuradas**
✅ **Deploy en producción exitoso**
✅ **Tests pasados correctamente**

---

## 🔧 COMANDOS DE MANTENIMIENTO

### Ver logs del servidor en tiempo real
```bash
ssh tu_usuario@psicodelcielo.com
pm2 logs
```

### Reiniciar servidor si hay problemas
```bash
ssh tu_usuario@psicodelcielo.com
pm2 restart all
```

### Restaurar backup si algo sale mal
```bash
ssh tu_usuario@psicodelcielo.com
cd /srv/psicodelcielo/shared
cp server-BACKUP-20250125-143000.js server.js
pm2 restart all
```

### Ver estadísticas de Turnstile
1. Ve a: https://dash.cloudflare.com/
2. Click en **Turnstile**
3. Selecciona tu sitio **"Pscielo Contact Form"**
4. Verás gráficos de:
   - Verificaciones totales
   - Bots bloqueados
   - Tasa de éxito

---

## 📞 TROUBLESHOOTING RÁPIDO

### Error: "Cannot find module '@marsidev/react-turnstile'"
```powershell
cd v:\WEBS\pscielo\pscielo-nextJS
npm install @marsidev/react-turnstile
```

### Error: "TURNSTILE_SECRET_KEY no está configurada"
```bash
ssh tu_usuario@psicodelcielo.com
nano /srv/psicodelcielo/shared/.env
# Agregar: TURNSTILE_SECRET_KEY=tu_clave
pm2 restart all
```

### El widget no aparece en la web
```powershell
# Verificar que las variables están en Vercel
# Settings → Environment Variables
# Debe haber: NEXT_PUBLIC_TURNSTILE_SITE_KEY

# Si no existe, agrégala y redeploy:
git commit --allow-empty -m "redeploy"
git push origin main
```

### Los emails no llegan
```bash
# Verificar logs del servidor
ssh tu_usuario@psicodelcielo.com
pm2 logs | grep -i error

# Verificar credenciales de email
cat /srv/psicodelcielo/shared/.env | grep EMAIL
```

---

**Documento creado:** 25 de enero de 2025
**Última actualización:** 25 de enero de 2025
