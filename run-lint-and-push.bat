@echo off
echo ================================
echo Running ApigeeLint and pushing to GitHub
echo ================================

:: Step 1 - Run ApigeeLint
apigeelint -s "C:\Users\sanketfarde\Downloads\IXC-MH-Outbound_rev70_2025_10_15" -f json.js -q -w "C:\Users\sanketfarde\ApigeeLint\JsonFile\IXC-MH-Outbound-results.json"

:: Step 2 - Convert JSON to Excel
node "C:\Users\sanketfarde\ApigeeLint\apigeelint-to-excel.js"

:: Step 3 - Git operations
cd "C:\Users\sanketfarde\ApigeeLint"
git add .
git commit -m "Automated lint and Excel report update"
git push origin main

echo ================================
echo ✅ Successfully pushed updated lint report to GitHub!
echo ================================
pause
