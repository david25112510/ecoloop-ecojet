@echo off
setlocal
cd /d "%~dp0"

echo Iniciando o RETINTA ECOJET localmente...
echo A janela "Servidor RETINTA ECOJET" deve permanecer aberta enquanto voce testa o sistema.

start "Servidor RETINTA ECOJET - feche para parar" /D "%~dp0" py -m http.server 8767 --bind 127.0.0.1
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:8767/"

echo O navegador sera aberto em http://127.0.0.1:8767/
echo Para encerrar o servidor, feche a janela "Servidor RETINTA ECOJET".
endlocal
