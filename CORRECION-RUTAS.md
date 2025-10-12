# ✅ CORRECCIÓN DE RUTAS - DOCUMENTACIÓN ACTUALIZADA

## 📍 ESTRUCTURA REAL DEL VPS

**⚠️ IMPORTANTE: Son DOS ubicaciones diferentes:**

### Archivo `.env`:
```bash
/srv/psicodelcielo/shared/.env
```
Contiene todas las variables de entorno (EMAIL_USER, EMAIL_PASS, TURNSTILE_SECRET_KEY)

### Archivo `server.js`:
```bash
/srv/psicodelcielo/api/server.js
```
El servidor Express que lee el .env desde /shared/

---

## 🎯 ESTRUCTURA CORRECTA DEL VPS

```
/srv/psicodelcielo/
├── shared/
│   └── .env                      ← Variables de entorno (incluye TURNSTILE_SECRET_KEY)
├── api/
│   ├── server.js                 ← Servidor Express (lee .env de /shared/)
│   └── server-BACKUP-*.js        ← Backups
└── (otros directorios...)
```

---

## 📄 ARCHIVOS CORREGIDOS

### 1. ✅ COMANDOS.md
**Correcciones realizadas:**
- `.env` se edita en: `/srv/psicodelcielo/shared/.env`
- `server.js` se edita en: `/srv/psicodelcielo/api/server.js`
- Backup del server.js en: `/srv/psicodelcielo/api/`

### 2. ✅ GUIA-TURNSTILE.md
**Correcciones realizadas:**
- Paso 3.2: Editar `.env` en `/srv/psicodelcielo/shared/`
- Paso 3.3: Hacer backup de `server.js` en `/srv/psicodelcielo/api/`
- Paso 3.4: Editar `server.js` en `/srv/psicodelcielo/api/`

### 3. ✅ server-turnstile-NUEVO.js
**Corrección CRÍTICA:**
```javascript
require("dotenv").config({ path: "/srv/psicodelcielo/shared/.env" });
```
El server.js está en `/api/` pero lee el .env desde `/shared/`

---

## ⚡ COMANDOS ACTUALIZADOS

### 1. Editar variables de entorno (.env):
```bash
ssh tu_usuario@psicodelcielo.com
cd /srv/psicodelcielo/shared
nano .env
```

Agregar:
```env
TURNSTILE_SECRET_KEY=0x4AAAAAAB6OCj_P3phOH99LmJmCvMOcvTQ
```

### 2. Hacer backup del server.js:
```bash
cd /srv/psicodelcielo/api
cp server.js server-BACKUP-$(date +%Y%m%d-%H%M%S).js
```

### 3. Editar server.js:
```bash
cd /srv/psicodelcielo/api
nano server.js
```

### 4. Verificar que el .env tiene la clave:
```bash
cat /srv/psicodelcielo/shared/.env | grep TURNSTILE
```

### 5. Reiniciar servidor:
```bash
pm2 restart all
pm2 logs --lines 20
```

---

## 📝 NOTAS IMPORTANTES

1. **El `.env` y el `server.js` están en directorios DIFERENTES**
2. **El `server.js` debe tener esta línea:**
   ```javascript
   require("dotenv").config({ path: "/srv/psicodelcielo/shared/.env" });
   ```
3. **Todos los archivos de documentación están actualizados con las rutas correctas**
4. **Tu Secret Key real es:** `0x4AAAAAAB6OCj_P3phOH99LmJmCvMOcvTQ`

---

**Corrección realizada:** 12 de octubre de 2025
**Estructura confirmada:** .env en /shared/ y server.js en /api/

