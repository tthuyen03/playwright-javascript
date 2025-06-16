const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const xlsx = require('xlsx');

class DataDrivenUtils{
    static readJSONFile(filePath){
        const fullPath = path.resolve(filePath);
        const rawData = fs.readFileSync(fullPath,'utf-8');
        return JSON.parse(rawData);
    }

    static readCSVFile(filePath){
        const fullPath = path.resolve(fullPath);
        return new Promise((resolve, reject) =>{
            const results = [];
            fs.createReadStream(fullPath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (err) => reject(err));
        });
    }

    static readExcelFile(filePath, sheetName = null){
        const fullPath = path.resolve(filePath)
        const workbook = xlsx.readFile(fullPath);
        const sheet = sheetName || workbook.sheetName[0];
        const worksheet = workbook.Sheets[sheet];
        return xlsx.utils.sheet_to_json(worksheet);
    }
}

module.exports = DataDrivenUtils;