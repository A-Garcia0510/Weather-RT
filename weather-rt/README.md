# 🌤️ Weather App React

Una aplicación del clima moderna y responsive construida con React, que te permite consultar el clima actual y el pronóstico extendido de cualquier ciudad del mundo.

---

## 📑 Tabla de Contenidos
- [Características](#-características)
- [Instalación](#-instalación)
- [Configuración de la API](#-configuración-de-la-api)
- [Uso de la Aplicación](#-uso-de-la-aplicación)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Características del Diseño](#-características-del-diseño)
- [Funcionalidades Técnicas](#-funcionalidades-técnicas)
- [Solución de Problemas](#-solución-de-problemas)
- [Próximas Mejoras](#-próximas-mejoras)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Agradecimientos](#-agradecimientos)

---

## ✨ Características

- 🌍 **Búsqueda de ciudades**: Busca cualquier ciudad del mundo
- 📍 **Geolocalización**: Usa tu ubicación actual automáticamente
- 📅 **Pronóstico extendido**: Pronóstico de 5 días con temperaturas máximas y mínimas
- 📱 **Diseño responsive**: Funciona perfectamente en móviles, tablets y desktop
- 🎨 **Interfaz moderna**: Diseño glassmorphism con animaciones suaves
- 📊 **Información detallada**: Temperatura, humedad, viento, presión, visibilidad
- 💾 **Historial**: Guarda tus últimas búsquedas
- ⚡ **Rendimiento optimizado**: Cache automático y lazy loading

---

## 🚀 Instalación

1. **Clona el repositorio:**
   ```bash
   git clone <tu-repositorio>
   cd weather-rt
   ```
2. **Instala las dependencias:**
   ```bash
   npm install
   ```
3. **Configura la API Key:**
   - Regístrate en [OpenWeatherMap](https://openweathermap.org/api) y obtén tu API key gratuita.
   - Crea un archivo `.env` en la raíz del proyecto:
     ```env
     REACT_APP_WEATHER_API_KEY=tu_api_key_aqui
     ```
4. **Inicia la aplicación:**
   ```bash
   npm start
   ```
5. **Abre tu navegador** en [http://localhost:3000](http://localhost:3000)

---

## 🔧 Configuración de la API

### Obtener API Key de OpenWeatherMap
1. Ve a [OpenWeatherMap](https://openweathermap.org/api)
2. Haz clic en "Sign Up" y crea una cuenta gratuita
3. Ve a "My API Keys" en tu perfil
4. Copia tu API key
5. Crea el archivo `.env` en la carpeta `weather-rt`:
   ```env
   REACT_APP_WEATHER_API_KEY=tu_api_key_aqui
   ```

> **Plan Gratuito:**
> - 1000 llamadas por día
> - Datos del clima actual
> - Pronóstico de 5 días
> - Datos de geolocalización

---

## 📱 Uso de la Aplicación

### 🔎 Búsqueda por Ciudad
1. Escribe el nombre de la ciudad en el campo de búsqueda
2. Presiona Enter o haz clic en "Buscar"
3. La aplicación mostrará el clima actual y el pronóstico

### 📍 Usar Mi Ubicación
1. Haz clic en el botón de ubicación (📍)
2. Permite el acceso a tu ubicación cuando el navegador lo solicite
3. La aplicación mostrará el clima de tu ubicación actual

### 🕑 Historial de Búsquedas
- Las últimas 5 búsquedas se guardan automáticamente
- Haz clic en cualquier búsqueda anterior para repetirla
- Usa el botón de limpiar para borrar el historial

---

## 🛠️ Tecnologías Utilizadas

- **React 19**: Framework principal
- **Axios**: Cliente HTTP para llamadas a la API
- **React Icons**: Iconos de la interfaz
- **CSS3**: Estilos modernos con glassmorphism
- **OpenWeatherMap API**: Datos del clima
- **Geolocation API**: Ubicación del usuario

---

## 📁 Estructura del Proyecto

```text
src/
├── components/          # Componentes de React
│   ├── SearchBar.jsx    # Barra de búsqueda
│   ├── WeatherCard.jsx  # Tarjeta del clima actual
│   ├── ForecastCard.jsx # Pronóstico extendido
│   ├── LoadingSpinner.jsx # Spinner de carga
│   ├── ErrorMessage.jsx # Mensajes de error
│   └── ApiKeyWarning.jsx # Advertencia de API key
├── hooks/               # Hooks personalizados
│   └── useWeather.js    # Hook principal del clima
├── services/            # Servicios de API
│   └── weatherApi.js    # Cliente de la API del clima
├── utils/               # Utilidades y helpers
│   ├── constants.js     # Constantes de la aplicación
│   └── helpers.js       # Funciones auxiliares
├── config/              # Configuración
│   └── api.js           # Configuración de la API
└── styles/              # Estilos CSS
```

---

## 🎨 Características del Diseño

- 🧊 **Glassmorphism**: Efecto de cristal esmerilado
- ✨ **Animaciones suaves**: Transiciones y efectos visuales
- 🌡️ **Colores dinámicos**: Cambian según la temperatura
- ☁️ **Fondo animado**: Nubes flotantes en movimiento
- 📱 **Responsive**: Adaptable a todos los dispositivos

---

## 🔍 Funcionalidades Técnicas

- ✅ **Validación de entrada**: Verificación de nombres de ciudades
- 🚨 **Manejo de errores**: Mensajes claros y botón de reintentar
- 💾 **Cache automático**: Datos guardados en localStorage
- ⏳ **Debounce**: Optimización de búsquedas
- 📍 **Geolocalización**: Soporte para ubicación del usuario

---

## 🚨 Solución de Problemas

### "API Key no configurada"
- Verifica que el archivo `.env` existe en la raíz del proyecto
- Asegúrate de que la variable `REACT_APP_WEATHER_API_KEY` esté configurada
- Reinicia el servidor de desarrollo después de crear el archivo `.env`

### "Ciudad no encontrada"
- Verifica la ortografía del nombre de la ciudad
- Intenta con el nombre en inglés si no funciona en español
- Asegúrate de que la ciudad existe en la base de datos de OpenWeatherMap

### Error de Geolocalización
- Verifica que tu navegador permita el acceso a la ubicación
- Asegúrate de estar usando HTTPS en producción
- Algunos navegadores pueden bloquear la geolocalización

### La aplicación no se carga
- Verifica que todas las dependencias estén instaladas: `npm install`
- Revisa la consola del navegador para errores
- Asegúrate de que el puerto 3000 esté disponible

---

## 📈 Próximas Mejoras

- [ ] 🌙 Tema claro/oscuro
- [ ] 🌡️ Unidades de temperatura (Celsius/Fahrenheit)
- [ ] ⭐ Favoritos de ciudades
- [ ] 🔔 Notificaciones del clima
- [ ] 🖥️ Widgets para escritorio
- [ ] 📲 PWA (Progressive Web App)
- [ ] 📊 Gráficos de temperatura
- [ ] ⚠️ Alertas meteorológicas

---

## 🤝 Contribuir

1. Haz un **fork** del proyecto
2. Crea una rama para tu feature:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit tus cambios:
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push a la rama:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Abre un **Pull Request**

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [`LICENSE`](../LICENSE) para más detalles.

---

## 🙏 Agradecimientos

- [OpenWeatherMap](https://openweathermap.org/) por proporcionar la API del clima
- [React Icons](https://react-icons.github.io/react-icons/) por los iconos
- [Create React App](https://create-react-app.dev/) por el setup inicial

---

<p align="center"><b>¡Disfruta consultando el clima con Weather App! 🌤️</b></p>
