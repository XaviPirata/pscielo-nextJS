# Fuentes Hey Gotcha

Esta carpeta debe contener los archivos de fuente "Hey Gotcha" en los siguientes formatos:

## Archivos Requeridos:

### Regular (Peso 400):
- `HeyGotcha-Regular.woff2` - Formato principal (más moderno y ligero)
- `HeyGotcha-Regular.woff` - Formato de respaldo

### Bold (Peso 700):
- `HeyGotcha-Bold.woff2` - Formato principal para títulos
- `HeyGotcha-Bold.woff` - Formato de respaldo para títulos

## Formatos Admitidos:
- **WOFF2** (recomendado) - Mayor compresión, soporte moderno
- **WOFF** - Respaldo para navegadores más antiguos
- **TTF/OTF** - Si no tienes WOFF, puedes usar estos formatos

## Conversión de Fuentes:
Si solo tienes archivos TTF u OTF, puedes convertirlos a WOFF/WOFF2 usando:
- [Font Squirrel Webfont Generator](https://www.fontsquirrel.com/tools/webfont-generator)
- [CloudConvert](https://cloudconvert.com/ttf-to-woff2)

## Estructura Final:
```
public/fonts/
├── HeyGotcha-Regular.woff2
├── HeyGotcha-Regular.woff
├── HeyGotcha-Bold.woff2
└── HeyGotcha-Bold.woff
``` 