#!/usr/bin/env pwsh
$ErrorActionPreference = 'Stop'

$root = $PSScriptRoot

Write-Host '=== Backend: build (Release) ===' -ForegroundColor Cyan
dotnet build "$root\backend\backend.sln" --configuration Release
if ($LASTEXITCODE -ne 0) { throw "Backend build falhou (exit $LASTEXITCODE)." }

Write-Host '=== Frontend: install + lint + typecheck + build ===' -ForegroundColor Cyan
Push-Location "$root\frontend\defesa-web"
try {
    npm ci
    if ($LASTEXITCODE -ne 0) { throw "npm ci falhou (exit $LASTEXITCODE)." }

    npm run lint
    if ($LASTEXITCODE -ne 0) { throw "lint falhou (exit $LASTEXITCODE)." }

    npm run build
    if ($LASTEXITCODE -ne 0) { throw "frontend build falhou (exit $LASTEXITCODE)." }
}
finally {
    Pop-Location
}

Write-Host 'Build concluido com sucesso.' -ForegroundColor Green
