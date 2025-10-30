@echo on
setlocal enabledelayedexpansion

echo ======================================
echo DEBUG MODE: Running ApigeeLint and pushing to GitHub
echo ======================================

set JSONFILE=C:\Users\sanketfarde\ApigeeLint\JsonFile\Isure-results.json
del "%JSONFILE%" 2>nul

echo --- STEP 1: Running ApigeeLint ---
start /wait "" cmd /c "apigeelint -s \"C:\Users\sanketfarde\Downloads\Isure_rev74_2025_10_16\" -f json.js -q -w \"%JSONFILE%\""
echo --- ApigeeLint finished, exit code = %ERRORLEVEL% ---

if not exist "%JSONFILE%" (
  echo ❌ JSON file not created. Exiting...
  pause
  exit /b 1
)

echo --- STEP 2: Running Node ---
node "C:\Users\sanketfarde\ApigeeLint\apigeelint-to-excel.js"
echo --- Node finished, exit code = %ERRORLEVEL% ---

if not exist "C:\Users\sanketfarde\ApigeeLint\ExcelFile\Isure-results.xlsx" (
  echo ❌ Excel file not found.
) else (
  echo ✅ Excel file created successfully!
)

echo --- STEP 3: Git push ---
cd "C:\Users\sanketfarde\ApigeeLint"
git add .
git commit -m "Automated lint + Excel update"
git push origin main

echo --- SCRIPT DONE ---
pause
