# 🔗 Vínculos de Sitio para Google Ads - PsCielo

## 📋 URLs Completas para Vínculos de Sitio

Usa estas URLs en tus **Vínculos de Sitio** de Google Ads:

---

### 1️⃣ **Inicio / Hero**
- **Texto del vínculo**: `Inicio`
- **URL**: `https://www.pscielo.com/#hero`
- **Descripción 1**: `Bienvenido a PsCielo`
- **Descripción 2**: `Terapia psicológica profesional`

---

### 2️⃣ **Instalaciones**
- **Texto del vínculo**: `Instalaciones`
- **URL**: `https://www.pscielo.com/#instalaciones`
- **Descripción 1**: `Conoce nuestro espacio`
- **Descripción 2**: `Ambiente cómodo y acogedor`

---

### 3️⃣ **Quiénes Somos**
- **Texto del vínculo**: `Quiénes Somos`
- **URL**: `https://www.pscielo.com/#quienes-somos`
- **Descripción 1**: `Nuestra historia y misión`
- **Descripción 2**: `Terapia con enfoque humanista`

---

### 4️⃣ **Servicios**
- **Texto del vínculo**: `Servicios`
- **URL**: `https://www.pscielo.com/#servicios`
- **Descripción 1**: `Terapia individual y grupal`
- **Descripción 2**: `Atención personalizada online`

---

### 5️⃣ **Profesionales**
- **Texto del vínculo**: `Profesionales`
- **URL**: `https://www.pscielo.com/#profesionales`
- **Descripción 1**: `Conoce a nuestro equipo`
- **Descripción 2**: `Psicólogos especializados`

---

### 6️⃣ **Contacto**
- **Texto del vínculo**: `Contacto`
- **URL**: `https://www.pscielo.com/#contacto`
- **Descripción 1**: `Agenda tu sesión ahora`
- **Descripción 2**: `Primera consulta gratuita`

---

## 📊 Cómo Agregar en Google Ads

### Paso 1: Ir a Extensiones de Anuncios

1. En Google Ads, ve a **Anuncios y extensiones**
2. Click en **Extensiones**
3. Click en el **botón azul +**
4. Selecciona **Extensión de vínculos a sitios**

---

### Paso 2: Crear Vínculos de Sitio

Para cada vínculo:

**Ejemplo: Servicios**

```
Texto del vínculo de sitio: Servicios
URL final: https://www.pscielo.com/#servicios
Descripción 1: Terapia individual y grupal
Descripción 2: Atención personalizada online
```

---

### Paso 3: Configuración Recomendada

**Nivel de cuenta o campaña:**
- ✅ Recomiendo configurarlo a **nivel de campaña** para más control

**Programación:**
- ✅ Dejar **24/7** (siempre activo)

**Dispositivos:**
- ✅ **Todos** (móvil, tablet, escritorio)

---

## 🎯 URLs Alternativas (Si prefieres sin #)

Si Google Ads te da problemas con el hash, puedes agregar parámetros UTM:

### Opción B: Con Parámetros UTM

```
Inicio:
https://www.pscielo.com/?utm_source=google&utm_medium=cpc&utm_campaign=sitelinks&seccion=hero

Instalaciones:
https://www.pscielo.com/?utm_source=google&utm_medium=cpc&utm_campaign=sitelinks&seccion=instalaciones

Quiénes Somos:
https://www.pscielo.com/?utm_source=google&utm_medium=cpc&utm_campaign=sitelinks&seccion=quienes-somos

Servicios:
https://www.pscielo.com/?utm_source=google&utm_medium=cpc&utm_campaign=sitelinks&seccion=servicios

Profesionales:
https://www.pscielo.com/?utm_source=google&utm_medium=cpc&utm_campaign=sitelinks&seccion=profesionales

Contacto:
https://www.pscielo.com/?utm_source=google&utm_medium=cpc&utm_campaign=sitelinks&seccion=contacto
```

**Nota**: Si usas esta opción, necesitarás agregar código JavaScript para hacer scroll automático.

---

## ✅ Ventajas de Usar URLs con Hash (#)

1. ✅ **Funcionan nativamente** - El navegador hace scroll automático
2. ✅ **No rompen nada** - Ya tienes los IDs configurados
3. ✅ **Google las acepta** - Son URLs válidas para vínculos de sitio
4. ✅ **Mejor UX** - El usuario llega directo a la sección
5. ✅ **Trackeable** - GTM puede detectar el hash en la URL

---

## 🧪 Probar los Vínculos

Antes de configurar en Google Ads, prueba que funcionen:

1. Abre tu navegador
2. Escribe en la barra: `https://www.pscielo.com/#servicios`
3. Presiona Enter
4. ✅ Deberías ir directamente a la sección de Servicios

Prueba todas:
- `https://www.pscielo.com/#hero`
- `https://www.pscielo.com/#instalaciones`
- `https://www.pscielo.com/#quienes-somos`
- `https://www.pscielo.com/#servicios`
- `https://www.pscielo.com/#profesionales`
- `https://www.pscielo.com/#contacto`

---

## 📊 Tracking en Google Tag Manager

Si quieres trackear cuando alguien llega por un vínculo de sitio:

### Variable de GTM: Hash de URL

1. Ve a **Variables** en GTM
2. **Nueva Variable**
3. Tipo: **Variable de URL**
4. Tipo de componente: **Fragmento** (hash)
5. Nombre: `URL Hash`

### Activador: Llegada desde Vínculo de Sitio

1. Ve a **Activadores**
2. **Nuevo Activador**
3. Tipo: **Vista de página - Ventana cargada**
4. Se activa cuando: `URL Hash` contiene `#`

### Etiqueta: Evento de GA4

1. Tipo: **Evento de Google Analytics: GA4**
2. Nombre del evento: `sitelink_click`
3. Parámetros:
   - `section`: `{{URL Hash}}`
4. Activador: El que creaste arriba

---

## 💡 Consejos para Google Ads

### Textos Cortos y Directos
- ❌ `Conoce todos nuestros servicios de psicología`
- ✅ `Servicios`

### Descripciones Persuasivas
- ✅ Enfócate en **beneficios**
- ✅ Usa **llamados a la acción**
- ✅ Menciona **diferenciadores**

### Ejemplos de Descripciones Efectivas:

**Para Servicios:**
- `Terapia presencial y online`
- `Primera consulta sin costo`

**Para Contacto:**
- `Agenda tu sesión hoy`
- `Respuesta en menos de 24hs`

**Para Profesionales:**
- `Psicólogos especializados`
- `Más de 10 años de experiencia`

---

## 🎯 Mejores Prácticas

### ✅ Hacer:
1. Usar las 6 extensiones (mínimo 4)
2. Actualizar las descripciones regularmente
3. Testear A/B diferentes textos
4. Monitorear el CTR de cada vínculo
5. Usar palabras clave relevantes

### ❌ Evitar:
1. Duplicar URLs
2. Textos muy largos
3. Descripciones genéricas
4. Enlaces rotos
5. URLs sin HTTPS

---

## 📈 Métricas a Monitorear

En Google Ads, revisa:

- **CTR de vínculos**: ¿Cuáles se clickean más?
- **Tasa de conversión**: ¿Qué secciones convierten mejor?
- **Tasa de rebote**: ¿Los usuarios se quedan?
- **Tiempo en sitio**: ¿Navegan por más secciones?

---

## 🆘 Troubleshooting

### ❌ Google Ads rechaza las URLs con #

**Solución**: Usa las URLs con parámetros UTM (Opción B)

### ❌ El scroll no funciona

**Solución**: Verifica que los IDs de las secciones coincidan:
```
URL: #servicios
ID en HTML: id="servicios"  ✅
```

### ❌ No veo mejoras en el Nivel de Calidad

**Solución**: 
1. Agrega al menos 4 vínculos
2. Espera 2-3 días para que Google indexe
3. Asegúrate que las descripciones sean relevantes

---

## ✅ Checklist Final

- [ ] Probar las 6 URLs con hash en el navegador
- [ ] Copiar las URLs en Google Ads
- [ ] Agregar descripciones persuasivas
- [ ] Configurar a nivel de campaña
- [ ] Activar en todos los dispositivos
- [ ] Monitorear CTR después de 3 días
- [ ] Optimizar textos según rendimiento

---

## 📄 Resumen de URLs

```
Inicio:          https://www.pscielo.com/#hero
Instalaciones:   https://www.pscielo.com/#instalaciones
Quiénes Somos:   https://www.pscielo.com/#quienes-somos
Servicios:       https://www.pscielo.com/#servicios
Profesionales:   https://www.pscielo.com/#profesionales
Contacto:        https://www.pscielo.com/#contacto
```

---

**🎉 ¡Listo para agregar 6 vínculos de sitio y mejorar tu Nivel de Calidad!**

**No se rompió nada - Solo usamos los IDs que ya existían** ✅
