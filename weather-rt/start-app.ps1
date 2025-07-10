# Script para iniciar Weather App React
Write-Host "🌤️ Iniciando Weather App React..." -ForegroundColor Cyan

# Verificar si Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js no está instalado. Por favor, instala Node.js desde https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Verificar si npm está instalado
try {
    $npmVersion = npm --version
    Write-Host "✅ npm encontrado: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm no está instalado." -ForegroundColor Red
    exit 1
}

# Verificar si las dependencias están instaladas
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error al instalar dependencias." -ForegroundColor Red
        exit 1
    }
}

# Verificar si existe el archivo .env
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  Archivo .env no encontrado." -ForegroundColor Yellow
    Write-Host "📝 Creando archivo .env de ejemplo..." -ForegroundColor Yellow
    
    $envContent = @"
# Configuración de la API del clima
# Obtén tu API key gratuita en: https://openweathermap.org/api
REACT_APP_WEATHER_API_KEY=tu_api_key_aqui
REACT_APP_WEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
"@
    
    $envContent | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "✅ Archivo .env creado. Por favor, configura tu API key." -ForegroundColor Green
    Write-Host "🔗 Ve a https://openweathermap.org/api para obtener tu API key gratuita" -ForegroundColor Cyan
}

# Iniciar la aplicación
Write-Host "🚀 Iniciando servidor de desarrollo..." -ForegroundColor Green
Write-Host "🌐 La aplicación se abrirá en: http://localhost:3000" -ForegroundColor Cyan
Write-Host "⏹️  Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
Write-Host ""

npm start 