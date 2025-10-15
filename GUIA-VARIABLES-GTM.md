# 📊 Guía: Configurar Variables en Google Tag Manager

## 🎯 Variables que se envían desde el formulario

Cuando un usuario envía el formulario con éxito, se ejecuta:

```javascript
window.dataLayer.push({
  event: "form_submit",           // ✅ Evento personalizado
  form_id: "contact-form-pscielo", // ✅ ID del formulario
  form_name: "Contacto PsCielo",   // ✅ Nombre del formulario
  form_target: "_self",            // ✅ Target del formulario
  form_text: "Enviando...",        // ✅ Texto del botón
  form_url: window.location.href,  // ✅ URL donde se envió
  form_status: "success",          // ✅ Estado del envío
  timestamp: Date.now(),           // ✅ Marca de tiempo
});
```

---

## 📋 Paso a Paso: Crear Variables en GTM

### 1. **Crear Variable: Form ID**

1. Ve a **Variables** en GTM
2. Click en **Nueva** (en Variables definidas por el usuario)
3. Configura:
   - **Nombre**: `Form ID`
   - **Tipo de variable**: **Variable de capa de datos**
   - **Nombre de la variable de capa de datos**: `form_id`
   - **Versión de la capa de datos**: Versión 2
4. **Guardar**

---

### 2. **Crear Variable: Form Name**

1. Click en **Nueva**
2. Configura:
   - **Nombre**: `Form Name`
   - **Tipo de variable**: **Variable de capa de datos**
   - **Nombre de la variable de capa de datos**: `form_name`
   - **Versión de la capa de datos**: Versión 2
3. **Guardar**

---

### 3. **Crear Variable: Form Target**

1. Click en **Nueva**
2. Configura:
   - **Nombre**: `Form Target`
   - **Tipo de variable**: **Variable de capa de datos**
   - **Nombre de la variable de capa de datos**: `form_target`
   - **Versión de la capa de datos**: Versión 2
3. **Guardar**

---

### 4. **Crear Variable: Form Text**

1. Click en **Nueva**
2. Configura:
   - **Nombre**: `Form Text`
   - **Tipo de variable**: **Variable de capa de datos**
   - **Nombre de la variable de capa de datos**: `form_text`
   - **Versión de la capa de datos**: Versión 2
3. **Guardar**

---

### 5. **Crear Variable: Form URL**

1. Click en **Nueva**
2. Configura:
   - **Nombre**: `Form URL`
   - **Tipo de variable**: **Variable de capa de datos**
   - **Nombre de la variable de capa de datos**: `form_url`
   - **Versión de la capa de datos**: Versión 2
3. **Guardar**

---

### 6. **Crear Variable: Form Status**

1. Click en **Nueva**
2. Configura:
   - **Nombre**: `Form Status`
   - **Tipo de variable**: **Variable de capa de datos**
   - **Nombre de la variable de capa de datos**: `form_status`
   - **Versión de la capa de datos**: Versión 2
3. **Guardar**

---

## 🎯 Crear Activador (Trigger)

Ya lo tienes creado, pero asegúrate:

1. Ve a **Activadores**
2. **Nuevo Activador**
3. Configura:
   - **Nombre**: `Form Submit - Contacto`
   - **Tipo de activador**: **Evento personalizado**
   - **Nombre del evento**: `form_submit`
   - **Este activador se activa en**: Todos los eventos personalizados
4. **Guardar**

---

## 📊 Crear Etiqueta (Tag) - Ejemplo con Google Analytics 4

### Opción 1: Evento de GA4

1. Ve a **Etiquetas**
2. Click en **Nueva**
3. Configura:
   - **Nombre**: `GA4 - Form Submit`
   - **Tipo de etiqueta**: **Evento de Google Analytics: GA4**
   - **Etiqueta de configuración**: Tu etiqueta de configuración de GA4
   - **Nombre del evento**: `form_submission`
   - **Parámetros del evento**:
     ```
     form_id       → {{Form ID}}
     form_name     → {{Form Name}}
     form_url      → {{Form URL}}
     form_status   → {{Form Status}}
     ```
4. **Activación**: Selecciona el activador `Form Submit - Contacto`
5. **Guardar**

---

### Opción 2: Google Ads - Conversión

1. Ve a **Etiquetas**
2. Click en **Nueva**
3. Configura:
   - **Nombre**: `Google Ads - Lead Form`
   - **Tipo de etiqueta**: **Conversión de Google Ads**
   - **ID de conversión**: Tu ID de Google Ads
   - **Etiqueta de conversión**: Tu etiqueta de conversión
   - **Valor de conversión**: (opcional) 10
   - **Moneda**: ARS o USD
4. **Activación**: Selecciona el activador `Form Submit - Contacto`
5. **Guardar**

---

## 🧪 Probar en Modo Preview

1. En GTM, click en **Vista previa**
2. Ingresa la URL: `http://localhost:3000` o tu URL de producción
3. Se abrirá una ventana con Tag Assistant conectado
4. Ve a la sección de **Contacto**
5. **Completa y envía el formulario**
6. En Tag Assistant verás:
   ```
   📊 Event: form_submit
   Variables:
   - form_id: "contact-form-pscielo"
   - form_name: "Contacto PsCielo"
   - form_target: "_self"
   - form_text: "Enviando..."
   - form_url: "https://www.pscielo.com/?gtm_debug=..."
   - form_status: "success"
   - timestamp: 1728989123456
   ```

7. Verifica que:
   - ✅ El activador `Form Submit - Contacto` se disparó
   - ✅ Todas las variables tienen valores
   - ✅ Las etiquetas se ejecutaron correctamente

---

## ✅ Publicar

1. Una vez probado, click en **Enviar** (arriba a la derecha)
2. Agrega nombre y descripción:
   ```
   Nombre: Tracking de formulario de contacto
   Descripción: Agregado tracking del formulario con variables personalizadas
   ```
3. Click en **Publicar**

---

## 📊 Verificar en Google Analytics 4

Después de enviar el formulario en producción:

1. Ve a **Google Analytics 4**
2. **Informes** → **Tiempo real**
3. Busca el evento: `form_submission`
4. Click en el evento para ver los parámetros:
   - `form_id`
   - `form_name`
   - `form_url`
   - `form_status`

---

## 🎯 Verificar en Google Ads

Si configuraste conversión de Google Ads:

1. Ve a **Google Ads**
2. **Herramientas y configuración** → **Conversiones**
3. Busca tu conversión
4. En las próximas horas verás incremento en las conversiones

---

## 🔍 Debug en Consola del Navegador

Para verificar que se está enviando correctamente:

```javascript
// Abre la consola (F12)
console.log(window.dataLayer);

// Verás algo como:
[
  {...},
  {
    event: "form_submit",
    form_id: "contact-form-pscielo",
    form_name: "Contacto PsCielo",
    form_target: "_self",
    form_text: "Enviando...",
    form_url: "https://www.pscielo.com/",
    form_status: "success",
    timestamp: 1728989123456
  }
]
```

---

## 📝 Resumen de Variables Disponibles

| Variable GTM | Valor en dataLayer | Ejemplo de Valor |
|-------------|-------------------|------------------|
| `{{Form ID}}` | `form_id` | `"contact-form-pscielo"` |
| `{{Form Name}}` | `form_name` | `"Contacto PsCielo"` |
| `{{Form Target}}` | `form_target` | `"_self"` |
| `{{Form Text}}` | `form_text` | `"Enviando..."` |
| `{{Form URL}}` | `form_url` | `"https://www.pscielo.com/"` |
| `{{Form Status}}` | `form_status` | `"success"` |

---

## ✅ Checklist Final

- [ ] Crear las 6 variables en GTM
- [ ] Verificar el activador `form_submit`
- [ ] Crear etiqueta de GA4 o Google Ads
- [ ] Probar en modo Preview
- [ ] Verificar que las variables tienen valores
- [ ] Publicar el contenedor
- [ ] Verificar en producción
- [ ] Monitorear conversiones

---

## 🆘 Troubleshooting

### ❌ Las variables están vacías

**Solución**: Verifica en la consola que `dataLayer` se está llenando:
```javascript
console.log(window.dataLayer);
```

### ❌ El evento no se dispara

**Solución**: 
1. Verifica que GTM está instalado correctamente
2. Asegúrate de estar en modo Preview
3. Recarga la página y vuelve a enviar el formulario

### ❌ Las etiquetas no se ejecutan

**Solución**: Verifica que el activador está correctamente configurado con el nombre del evento: `form_submit`

---

**🎉 ¡Listo! Ahora tienes tracking completo del formulario en GTM**
