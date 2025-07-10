# ⚛️ React Installation Checklist - Weather App

## 📋 Información General

**Proyecto:** Weather App React  
**Objetivo:** Configurar entorno de desarrollo React desde cero  
**Duración Estimada:** 30-45 minutos  
**Nivel:** Principiante  

---

## 🎯 Objetivos de la Instalación

- [ ] Instalar Node.js y npm
- [ ] Crear proyecto React con Create React App
- [ ] Configurar estructura de carpetas
- [ ] Instalar dependencias necesarias
- [ ] Configurar Git y variables de entorno
- [ ] Verificar que todo funciona correctamente

---

## 🛠️ Herramientas Necesarias

### Software Requerido
- [ ] **Node.js** (versión 16.0 o superior)
- [ ] **npm** (incluido con Node.js)
- [ ] **Git** (para control de versiones)
- [ ] **Editor de código** (VS Code recomendado)

### Dependencias del Proyecto
- [ ] **React** (incluido con Create React App)
- [ ] **Axios** (para llamadas a API)
- [ ] **React Icons** (para iconos)
- [ ] **Styled Components** (opcional, para estilos)

---

## 🚀 Fase 1: Instalación de Node.js

### 1.1 Descargar Node.js
- [ ] Ir a https://nodejs.org/
- [ ] Descargar versión **LTS** (Long Term Support)
- [ ] Verificar que sea versión 16.0 o superior

### 1.2 Instalar Node.js
- [ ] Ejecutar el instalador descargado
- [ ] Seguir el asistente de instalación
- [ ] Aceptar configuración por defecto
- [ ] Marcar opción "Add to PATH" si está disponible

### 1.3 Verificar Instalación
- [ ] Abrir terminal/powershell
- [ ] Ejecutar: `node --version`
- [ ] Ejecutar: `npm --version`
- [ ] Confirmar que ambas versiones se muestran correctamente

**Resultado Esperado:**
```bash
node --version
# v18.17.0 (o versión similar)

npm --version
# 9.6.7 (o versión similar)
```

---

## 🔧 Fase 2: Crear Proyecto React

### 2.1 Preparar Directorio de Trabajo
- [ ] Crear carpeta para proyectos (ej: `C:\Projects\` o `~/Documents/Projects/`)
- [ ] Abrir terminal en esa ubicación
- [ ] Verificar que estás en el directorio correcto

### 2.2 Crear Proyecto con Create React App
- [ ] Ejecutar comando de creación:
```bash
npx create-react-app weather-app-react
```
- [ ] Esperar a que termine la instalación (puede tomar 2-5 minutos)
- [ ] Confirmar que no hay errores en la consola

### 2.3 Verificar Creación del Proyecto
- [ ] Navegar al directorio del proyecto:
```bash
cd weather-app-react
```
- [ ] Verificar estructura de carpetas:
```bash
dir  # Windows
ls   # Mac/Linux
```
- [ ] Confirmar que existe `package.json`

**Estructura Esperada:**
```
weather-app-react/
├── node_modules/
├── public/
├── src/
├── package.json
├── package-lock.json
└── README.md
```

---

## 📁 Fase 3: Configurar Estructura del Proyecto

### 3.1 Crear Carpetas Adicionales
- [ ] Crear carpeta `components`:
```bash
mkdir src\components
```
- [ ] Crear carpeta `services`:
```bash
mkdir src\services
```
- [ ] Crear carpeta `hooks`:
```bash
mkdir src\hooks
```
- [ ] Crear carpeta `utils`:
```bash
mkdir src\utils
```
- [ ] Crear carpeta `styles`:
```bash
mkdir src\styles
```

### 3.2 Verificar Estructura Completa
- [ ] Confirmar que todas las carpetas existen:
```
src/
├── components/
├── services/
├── hooks/
├── utils/
├── styles/
├── App.js
├── App.css
├── index.js
└── index.css
```

---

## 📦 Fase 4: Instalar Dependencias

### 4.1 Dependencias Principales
- [ ] Instalar Axios para API calls:
```bash
npm install axios
```
- [ ] Instalar React Icons:
```bash
npm install react-icons
```

### 4.2 Dependencias Opcionales
- [ ] Instalar Styled Components (opcional):
```bash
npm install styled-components
```
- [ ] Instalar React Router (si planeas usar rutas):
```bash
npm install react-router-dom
```

### 4.3 Verificar Instalación
- [ ] Revisar `package.json` para confirmar dependencias
- [ ] Ejecutar: `npm list --depth=0`
- [ ] Confirmar que no hay errores

---

## ⚙️ Fase 5: Configuración Inicial

### 5.1 Limpiar App.js
- [ ] Abrir `src/App.js`
- [ ] Reemplazar contenido con código básico:
```jsx
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🌤️ Weather App</h1>
        <p>Mi aplicación del clima en React</p>
      </header>
    </div>
  );
}

export default App;
```

### 5.2 Configurar Variables de Entorno
- [ ] Crear archivo `.env` en la raíz del proyecto
- [ ] Agregar variables básicas:
```env
REACT_APP_WEATHER_API_KEY=tu_api_key_aqui
REACT_APP_WEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
```
- [ ] Agregar `.env` a `.gitignore` si no está

### 5.3 Configurar .gitignore
- [ ] Verificar que `.env` está en `.gitignore`
- [ ] Verificar que `node_modules/` está en `.gitignore`
- [ ] Verificar que `build/` está en `.gitignore`

---

## 🔄 Fase 6: Configuración de Git

### 6.1 Inicializar Repositorio
- [ ] Inicializar Git en el proyecto:
```bash
git init
```
- [ ] Verificar estado:
```bash
git status
```

### 6.2 Primer Commit
- [ ] Agregar todos los archivos:
```bash
git add .
```
- [ ] Crear primer commit:
```bash
git commit -m "Initial commit: React weather app setup"
```

### 6.3 Conectar con GitHub (Opcional)
- [ ] Crear repositorio en GitHub
- [ ] Conectar repositorio local con GitHub:
```bash
git remote add origin https://github.com/tu-usuario/weather-app-react.git
git branch -M main
git push -u origin main
```

---

## ✅ Fase 7: Verificación Final

### 7.1 Probar Servidor de Desarrollo
- [ ] Iniciar servidor de desarrollo:
```bash
npm start
```
- [ ] Esperar a que se abra el navegador
- [ ] Confirmar que la página se carga en `http://localhost:3000`
- [ ] Verificar que no hay errores en la consola del navegador

### 7.2 Verificar Funcionalidad Básica
- [ ] Confirmar que se muestra "🌤️ Weather App"
- [ ] Verificar que se muestra "Mi aplicación del clima en React"
- [ ] Probar que los cambios se reflejan automáticamente (hot reload)

### 7.3 Verificar Herramientas de Desarrollo
- [ ] Instalar React Developer Tools en el navegador
- [ ] Verificar que aparecen las herramientas de React
- [ ] Confirmar que se puede inspeccionar componentes

---

## 🧪 Fase 8: Crear Componente de Prueba

### 8.1 Crear WeatherCard Component
- [ ] Crear archivo `src/components/WeatherCard.jsx`
- [ ] Agregar código básico:
```jsx
import React from 'react';

function WeatherCard() {
  return (
    <div className="weather-card">
      <h2>🌤️ Clima Actual</h2>
      <p>Temperatura: 25°C</p>
      <p>Descripción: Soleado</p>
    </div>
  );
}

export default WeatherCard;
```

### 8.2 Integrar en App.js
- [ ] Importar WeatherCard en `App.js`:
```jsx
import React from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🌤️ Weather App</h1>
        <p>Mi aplicación del clima en React</p>
      </header>
      <WeatherCard />
    </div>
  );
}

export default App;
```

### 8.3 Verificar Componente
- [ ] Confirmar que WeatherCard se muestra en la página
- [ ] Verificar que no hay errores en la consola
- [ ] Probar que los cambios se reflejan automáticamente

---

## 📊 Checklist de Verificación Final

### Instalación Básica
- [ ] Node.js instalado y funcionando
- [ ] npm instalado y funcionando
- [ ] Proyecto React creado exitosamente
- [ ] Estructura de carpetas configurada

### Dependencias
- [ ] Axios instalado
- [ ] React Icons instalado
- [ ] Styled Components instalado (opcional)
- [ ] Todas las dependencias funcionando

### Configuración
- [ ] Variables de entorno configuradas
- [ ] Git inicializado
- [ ] Primer commit realizado
- [ ] .gitignore configurado correctamente

### Funcionalidad
- [ ] Servidor de desarrollo funcionando
- [ ] Página se carga sin errores
- [ ] Hot reload funcionando
- [ ] Componente de prueba funcionando

---

## 🚨 Solución de Problemas Comunes

### Error: "npx no se reconoce"
- [ ] Reinstalar Node.js
- [ ] Verificar que npm está en PATH
- [ ] Reiniciar terminal

### Error: "EADDRINUSE"
- [ ] Cerrar otros procesos en puerto 3000
- [ ] Usar: `npx kill-port 3000`
- [ ] Cambiar puerto: `PORT=3001 npm start`

### Error: "Module not found"
- [ ] Verificar que las dependencias están instaladas
- [ ] Ejecutar: `npm install`
- [ ] Verificar rutas de importación

### Error: "Permission denied"
- [ ] Ejecutar terminal como administrador
- [ ] Verificar permisos de carpeta
- [ ] Usar: `sudo npm install` (Mac/Linux)

---

## 🎯 Próximos Pasos

Una vez completado este checklist:

1. **Seguir el checklist del proyecto** (`weather-app-checklist.md`)
2. **Empezar con la Fase 1** del desarrollo
3. **Configurar la API** del clima
4. **Crear componentes básicos**

---

## 📚 Recursos Adicionales

### Documentación Oficial
- [React Documentation](https://react.dev/)
- [Create React App](https://create-react-app.dev/)
- [Node.js Documentation](https://nodejs.org/docs/)

### Tutoriales Recomendados
- [React Tutorial](https://react.dev/learn/tutorial-tic-tac-toe)
- [JavaScript ES6+](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [CSS Grid & Flexbox](https://css-tricks.com/)

### Herramientas Útiles
- [VS Code](https://code.visualstudio.com/)
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Postman](https://www.postman.com/) (para probar APIs)

---

**🎉 ¡Feliz instalación! Una vez completado este checklist, estarás listo para desarrollar tu aplicación del clima.** 