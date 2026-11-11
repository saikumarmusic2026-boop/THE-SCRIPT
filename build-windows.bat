@echo off
echo Installing (first time only, needs internet)...
call npm install
if errorlevel 1 goto fail
echo Building the Windows installer...
call npm run dist:win
if errorlevel 1 goto fail
echo.
echo Done. Open the "dist" folder: THE SCRIPT Setup (installer) and the portable .exe are there.
pause
exit /b 0
:fail
echo Something went wrong. Check the messages above.
pause
exit /b 1
