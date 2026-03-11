@echo off
title Portal Application - Installer
color 0B

echo ============================================
echo     Portal Application - First Time Setup
echo ============================================
echo.

:: Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed!
    echo.
    echo Please install Python first:
    echo 1. Go to https://www.python.org/downloads/
    echo 2. Download and run the installer
    echo 3. IMPORTANT: Check "Add Python to PATH"
    echo 4. Run this installer again
    echo.
    pause
    exit /b 1
)

for /f "tokens=2" %%i in ('python --version 2^>^&1') do set PYVER=%%i
echo [OK] Python %PYVER% found.

:: Change to the script directory
cd /d "%~dp0"

:: Create virtual environment
echo.
echo [INFO] Creating virtual environment...
if exist "venv" (
    echo [INFO] Removing old virtual environment...
    rmdir /s /q venv
)
python -m venv venv
if %errorlevel% neq 0 (
    echo [ERROR] Failed to create virtual environment!
    pause
    exit /b 1
)
echo [OK] Virtual environment created.

:: Activate and install dependencies
call venv\Scripts\activate.bat

echo.
echo [INFO] Upgrading pip...
python -m pip install --upgrade pip --quiet

if exist "requirements.txt" (
    echo [INFO] Installing dependencies from requirements.txt...
    pip install -r requirements.txt
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install some dependencies!
        pause
        exit /b 1
    )
    echo [OK] All dependencies installed.
) else (
    echo [WARNING] requirements.txt not found!
)

deactivate

echo.
echo ============================================
echo         Installation Complete!
echo ============================================
echo.
echo You can now run the application using:
echo   - Double-click on "run_app.bat"
echo.
pause
