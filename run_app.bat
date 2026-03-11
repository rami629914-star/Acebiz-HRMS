@echo off
title Portal Application
color 0A

echo ============================================
echo        Portal Application Launcher
echo ============================================
echo.

:: Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH!
    echo Please install Python from https://www.python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation.
    echo.
    pause
    exit /b 1
)

echo [OK] Python found.

:: Change to the script directory
cd /d "%~dp0"

:: Check if virtual environment exists, if not create one
if not exist "venv" (
    echo.
    echo [INFO] Creating virtual environment...
    python -m venv venv
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to create virtual environment!
        pause
        exit /b 1
    )
    echo [OK] Virtual environment created.
)

:: Activate virtual environment
echo [INFO] Activating virtual environment...
call venv\Scripts\activate.bat

:: Install/update dependencies if requirements.txt exists
if exist "requirements.txt" (
    echo.
    echo [INFO] Installing dependencies...
    pip install -r requirements.txt --quiet
    if %errorlevel% neq 0 (
        echo [WARNING] Some dependencies may have failed to install.
    ) else (
        echo [OK] Dependencies installed.
    )
)

echo.
echo ============================================
echo        Starting Application...
echo ============================================
echo.

:: Open Chrome after 2 seconds delay (in background)
start "" cmd /c "timeout /t 2 /nobreak >nul && start chrome http://127.0.0.1:5000"

:: Run the application
python app.py

:: Keep window open if there's an error
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Application exited with error code: %errorlevel%
    pause
)

:: Deactivate virtual environment
deactivate
