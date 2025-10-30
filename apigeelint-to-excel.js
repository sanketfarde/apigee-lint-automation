const fs = require('fs');
const ExcelJS = require('exceljs');

const inputFile = 'C:/Users/sanketfarde/ApigeeLint/JsonFile/STF_Authentication-Flow.json';
const outputFile = 'C:/Users/sanketfarde/ApigeeLint/ExcelFile/STF_Authentication-Flow.xlsx';

// Check if JSON exists
if (!fs.existsSync(inputFile)) {
  console.error(`❌ JSON file not found: ${inputFile}`);
  process.exit(1);
}

const rawData = fs.readFileSync(inputFile, 'utf8');
if (!rawData.trim()) {
  console.error(`❌ JSON file is empty: ${inputFile}`);
  process.exit(1);
}

const data = JSON.parse(rawData);
if (!Array.isArray(data) || data.length === 0) {
  console.error('❌ No lint results found in JSON.');
  process.exit(1);
}

// Create workbook and sheet
const workbook = new ExcelJS.Workbook();
const sheet = workbook.addWorksheet('ApigeeLint Results');

sheet.columns = [
  { header: 'File Path', key: 'filePath', width: 70 },
  { header: 'Line', key: 'line', width: 10 },
  { header: 'Column', key: 'column', width: 10 },
  { header: 'Type', key: 'type', width: 10 },
  { header: 'Rule ID', key: 'ruleId', width: 15 },
  { header: 'Message', key: 'message', width: 80 },
];

// Flatten messages
data.forEach(item => {
  if (Array.isArray(item.messages)) {
    item.messages.forEach(msg => {
      sheet.addRow({
        filePath: item.filePath,
        line: msg.line,
        column: msg.column,
        type: msg.type,
        ruleId: msg.ruleId,
        message: msg.message
      });
    });
  }
});

// Save Excel file
workbook.xlsx.writeFile(outputFile)
  .then(() => console.log(`✅ Excel file generated at: ${outputFile}`))
  .catch(err => {
    console.error('❌ Failed to write Excel:', err);
    process.exit(1);
  });
