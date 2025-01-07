import fs from 'fs';
import * as XLSX from 'xlsx';

export class FileReader {
    static readFile(filePath: string, type: 'json' | 'excel', sheetName?: string): any {
        if (type === 'json') {
            return this.readJson(filePath);
        } else if (type === 'excel') {
            return this.readExcel(filePath, sheetName);
        } else {
            throw new Error(`Unsupported file type: ${type}`);
        }
    }

    private static readJson(filePath: string): any {
        const fs = require('fs');
        const rawData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(rawData);
    }

    private static readExcel(filePath: string, sheetName?: string): any[] {
        const XLSX = require('xlsx');
        const workbook = XLSX.readFile(filePath);
        const sheet = sheetName ? workbook.Sheets[sheetName] : workbook.Sheets[workbook.SheetNames[0]];
        if (!sheet) throw new Error(`Sheet not found: ${sheetName}`);
        return XLSX.utils.sheet_to_json(sheet);
    }
}
