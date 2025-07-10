# 🚀 Guía de Comandos - Weather App React

## 📋 Comandos para Iniciar el Proyecto

### 🎯 **Comandos Básicos de Inicio**

```bash
# 1. Navegar al directorio del proyecto
cd C:\Users\PC\Documents\Weather-RT\weather-rt

# 2. Verificar que estás en el directorio correcto
dir package.json

# 3. Iniciar servidor de desarrollo
npm start
```

### ✅ **Verificación de Instalación**

```bash
# Verificar versión de Node.js
node --version
# Debe mostrar: v22.16.0 o superior

# Verificar versión de npm
npm --version
# Debe mostrar: v10.9.2 o superior

# Verificar dependencias instaladas
npm list --depth=0
```

### 🔧 **Comandos de Desarrollo**

```bash
# Iniciar servidor de desarrollo
npm start

# Construir para producción
npm run build

# Ejecutar tests
npm test

# Eyectar configuración (NO USAR a menos que sea necesario)
npm run eject
```

### 📦 **Gestión de Dependencias**

```bash
# Instalar una nueva dependencia
npm install nombre-paquete

# Instalar dependencia de desarrollo
npm install --save-dev nombre-paquete

# Desinstalar dependencia
npm uninstall nombre-paquete

# Actualizar dependencias
npm update
```

### 🗂️ **Estructura del Proyecto**

```
weather-rt/
├── src/
│   ├── components/          # Componentes React
│   ├── services/           # Servicios y APIs
│   ├── hooks/              # Custom hooks
│   ├── utils/              # Funciones utilitarias
│   ├── styles/             # Archivos de estilos
│   ├── App.js              # Componente principal
│   └── index.js            # Punto de entrada
├── public/                 # Archivos públicos
├── .env                    # Variables de entorno
├── .gitignore             # Archivos ignorados por Git
└── package.json           # Configuración del proyecto
```

### 🌐 **Acceso a la Aplicación**

Una vez ejecutado `npm start`:

- **Local:** http://localhost:3000
- **Red local:** http://192.168.56.1:3000

### 🛠️ **Comandos de Git**

```bash
# Verificar estado del repositorio
git status

# Agregar cambios
git add .

# Crear commit
git commit -m "Descripción del cambio"

# Ver historial de commits
git log --oneline

# Cambiar de rama
git checkout nombre-rama

# Crear nueva rama
git checkout -b nueva-rama
```

### 🔍 **Comandos de Debugging**

```bash
# Ver logs de npm
npm start --verbose

# Limpiar cache de npm
npm cache clean --force

# Reinstalar node_modules
rm -rf node_modules
npm install

# Ver puertos en uso (Windows)
netstat -ano | findstr :3000

# Matar proceso en puerto específico
npx kill-port 3000
```

### 📱 **Comandos para Producción**

```bash
# Construir aplicación optimizada
npm run build

# Servir build localmente (requiere serve)
npx serve -s build

# Analizar tamaño del bundle
npm run build --analyze
```

### 🎨 **Comandos de Estilos**

```bash
# Si usas Styled Components (ya instalado)
# No requiere comandos adicionales

# Si usas CSS Modules
# Crear archivos .module.css

# Si usas Sass
npm install sass
```

### 🔧 **Configuración de Variables de Entorno**

```bash
# Verificar archivo .env
dir .env

# Contenido del .env:
REACT_APP_WEATHER_API_KEY=tu_api_key_aqui
REACT_APP_WEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
```

### 🚨 **Solución de Problemas Comunes**

```bash
# Error: Puerto 3000 ocupado
npx kill-port 3000
npm start

# Error: Módulos no encontrados
npm install

# Error: Permisos
# Ejecutar PowerShell como administrador

# Error: Cache corrupto
npm cache clean --force
npm install
```

### 📚 **Comandos de Ayuda**

```bash
# Ayuda de npm
npm help

# Ayuda de un comando específico
npm help start

# Ver scripts disponibles
npm run

# Ver configuración del proyecto
npm config list
```

### 🎯 **Checklist de Inicio Rápido**

- [ ] Abrir PowerShell
- [ ] Navegar a: `cd C:\Users\PC\Documents\Weather-RT\weather-rt`
- [ ] Verificar: `dir package.json`
- [ ] Ejecutar: `npm start`
- [ ] Abrir navegador en: http://localhost:3000
- [ ] Verificar que la app carga correctamente

### 🔗 **Enlaces Útiles**

- **Documentación React:** https://react.dev/
- **Create React App:** https://create-react-app.dev/
- **OpenWeatherMap API:** https://openweathermap.org/api
- **React Icons:** https://react-icons.github.io/react-icons/

---

## 🎉 **¡Listo para Desarrollar!**

Una vez que hayas ejecutado `npm start` y veas la aplicación en el navegador, puedes empezar a seguir el checklist de desarrollo en `weather-app-checklist.md`.

**¡Feliz programación!** 🚀 