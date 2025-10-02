@echo off
echo ==========================================
echo Transport Geography Educational Game
echo ==========================================
echo.
echo Installing dependencies...
call npm install
echo.
echo Building project...
call npm run build
echo.
echo Starting game server...
echo.
echo *** The game will open at http://localhost:3000 ***
echo *** Press Ctrl+C to stop the server ***
echo.
call npm run dev
pause