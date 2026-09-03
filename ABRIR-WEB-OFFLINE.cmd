@echo off
setlocal
cd /d "%~dp0"

set "NODE_EXE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if exist "%NODE_EXE%" goto run

for /f "delims=" %%I in ('where node 2^>nul') do if not defined NODE_EXE set "NODE_EXE=%%I"
if defined NODE_EXE goto run

echo No se encuentra Node.js en este ordenador.
echo Abre Codex una vez y vuelve a ejecutar este archivo.
pause
exit /b 1

:run
title Amazon Boost - Preview offline
"%NODE_EXE%" "%~dp0scripts\offline-preview.mjs"
if errorlevel 1 pause
