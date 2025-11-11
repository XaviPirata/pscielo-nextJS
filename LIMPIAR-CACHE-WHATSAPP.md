# 🔄 Cómo Limpiar Caché de WhatsApp - Guía Definitiva

## ❌ Problema
WhatsApp muestra "Primera consulta gratuita" aunque ya actualicé los meta tags.

## ✅ Solución Implementada

### 1. Meta Tags Actualizados ✓
- ✅ Título: "PsCielo - Terapia Psicológica Online"
- ✅ Descripción: "Psicología online y presencial. Agenda tu sesión hoy."
- ✅ Imagen optimizada: `og-image.jpg` (156KB, 1200x630px)
- ✅ Meta tags duplicados en `<head>` para mayor compatibilidad

### 2. Archivos Modificados
- `src/app/layout.tsx` - Meta tags actualizados
- `next.config.ts` - Headers de cache configurados
- `public/imagenes/og-image.jpg` - Imagen optimizada creada
- `scripts/optimize-og-image.js` - Script de optimización

---

## 🚀 PASOS PARA LIMPIAR CACHÉ DE WHATSAPP

### Método 1: URL con Parámetros (MÁS RÁPIDO) ⚡

1. **Despliega** los cambios a producción
2. **NO compartas** `https://www.pscielo.com` (está en caché)
3. **Comparte una de estas URLs nuevas:**
   ```
   https://www.pscielo.com/?v=2
   https://www.pscielo.com/?ref=wa
   https://www.pscielo.com/#actualizado
   ```
4. WhatsApp verá esta como una URL nueva y obtendrá los meta tags actualizados
5. **El usuario final** será redirigido a la URL original automáticamente

### Método 2: Facebook Debugger (Para validar)

1. Abre: https://developers.facebook.com/tools/debug/
2. Ingresa: `https://www.pscielo.com`
3. Click en **"Depurar"** o **"Debug"**
4. Click en **"Volver a extraer"** o **"Scrape Again"** (3-4 veces)
5. Verifica que muestre: "Psicología online y presencial. Agenda tu sesión hoy."

⚠️ **IMPORTANTE**: Facebook Debugger NO limpia el caché de WhatsApp, solo valida.

### Método 3: Espera Natural (24-48 horas)

WhatsApp limpia su caché automáticamente después de 24-48 horas.

---

## 📱 Verificar que Funcionó

### ✅ CORRECTO - Se debe ver así:
```
┌────────────────────────────────────┐
│  [Imagen: Casona con pajaritos]   │
├────────────────────────────────────┤
│ PsCielo - Terapia Psicológica      │
│ Online                             │
│                                    │
│ Psicología online y presencial.    │
│ Agenda tu sesión hoy.              │
│                                    │
│ 🔗 www.pscielo.com                 │
└────────────────────────────────────┘
```

### ❌ INCORRECTO - Si todavía ves:
- "Primera consulta gratuita" → Estás usando la URL sin parámetros (en caché)

---

## 🛠️ Herramientas de Validación

Antes de compartir en WhatsApp, valida aquí:

1. **Facebook Debugger**: https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
4. **Test Local**: https://www.pscielo.com/test-og.html

---

## 🎯 Comando Rápido

Para regenerar la imagen optimizada:
```bash
npm run optimize:og
```

---

## ⏱️ Timeline Esperado

| Acción | Tiempo |
|--------|--------|
| Despliegue a producción | ~5 minutos |
| Facebook Debugger actualiza | Inmediato |
| WhatsApp con parámetro `?v=2` | Inmediato |
| WhatsApp URL original (caché natural) | 24-48 horas |

---

## 🔍 Debug

Si después de desplegar aún no funciona:

1. **Verifica que el archivo existe:**
   ```
   https://www.pscielo.com/imagenes/og-image.jpg
   ```

2. **Verifica los meta tags:**
   - View Source → Busca `<meta property="og:description"`
   - Debe decir: "Agenda tu sesión hoy"

3. **Limpia caché del navegador:**
   - Ctrl + Shift + R (Windows)
   - Cmd + Shift + R (Mac)

---

## ✅ Checklist de Verificación

- [ ] Cambios desplegados a producción
- [ ] Imagen `og-image.jpg` accesible en producción
- [ ] Facebook Debugger muestra descripción correcta
- [ ] Compartir URL con parámetro `?v=2` muestra correctamente
- [ ] Meta tags visibles en view-source

---

**Última actualización**: $(date)
**Archivos optimizados**: ✅ 156KB (antes 810KB)
