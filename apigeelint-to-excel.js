const fs = require('fs');
const ExcelJS = require('exceljs');

const inputFile = 'C:/Users/sanketfarde/ApigeeLint/JsonFile/iSurepay-results.json';
const outputFile = 'C:/Users/sanketfarde/ApigeeLint/ExcelFile/iSurepay-results.xlsx';

// Read JSON
const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

// Create workbook and sheet
const workbook = new ExcelJS.Workbook();
const sheet = workbook.addWorksheet('ApigeeLint Results');

// Define header
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
});

// Write Excel file
workbook.xlsx.writeFile(outputFile).then(() => {
  console.log('✅ Excel file generated at:', outputFile);
});

