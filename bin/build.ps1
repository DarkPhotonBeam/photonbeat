Write-Host "Creating production build..." -ForegroundColor Cyan

# Build React App
Write-Host "`nBuild react app..." -ForegroundColor Cyan
Set-Location "./../client"
yarn build

Write-Host "React build done." -ForegroundColor Green

# Compile Typescript Files
#Write-Host "`nCompling typescript files..." -ForegroundColor Cyan
Set-Location "./../server"
#tsc
#Write-Host "Compiled typescript files." -ForegroundColor Green

# Copy files
Write-Host "`nCopying files..." -ForegroundColor Cyan
Set-Location "./.."

## Clear out old production
Remove-Item './production/*' -Recurse -Force -Confirm:$false
Write-Host "`nRemoved old production build." -ForegroundColor Blue

## Copy Server files (except node_modules)
Copy-Item -Path (Get-Item -Path "./server/*" -Exclude ('node_modules')).FullName -Destination './production' -Recurse -Force
Write-Host "`nCopied server files." -ForegroundColor Yellow

## Copy React App files
Copy-Item -Path "./client/build" -Destination './production' -Recurse
Write-Host "Copied client files." -ForegroundColor Yellow

## Rename build folder to public
Set-Location ./production
Rename-Item -Path "build" -NewName "public" -Force
Write-Host "Renamed build to public." -ForegroundColor Yellow

# Go back to origin
Set-Location ../bin
Write-Host "`nYay! Production build done." -ForegroundColor Green