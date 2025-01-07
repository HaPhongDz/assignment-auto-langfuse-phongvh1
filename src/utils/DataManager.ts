import { FileReader } from './FileReader';

export class DataManager<T> {
    private data: T[];

    constructor(filePath: string, fileType: 'json' | 'excel', sheetName?: string) {
        const rawData = FileReader.readFile(filePath, fileType, sheetName);
        this.data = Array.isArray(rawData) ? rawData : [rawData];
    }

    getAll(): T[] {
        return this.data;
    }

    getByFilter(filterFn: (item: T) => boolean): T | undefined {
        return this.data.find(filterFn);
    }

    getManyByFilter(filterFn: (item: T) => boolean): T[] {
        return this.data.filter(filterFn);
    }
}
