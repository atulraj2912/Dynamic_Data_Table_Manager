import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { TableRow, Column } from '@/types';

export const parseCSV = (file: File): Promise<TableRow[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(new Error(`CSV parsing errors: ${results.errors.map(e => e.message).join(', ')}`));
          return;
        }

        const rows = results.data.map((row: any, index: number) => ({
          id: row.id || `imported-${Date.now()}-${index}`,
          ...row,
        })) as TableRow[];

        resolve(rows);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

export const exportToCSV = (rows: TableRow[], columns: Column[], filename: string = 'table-export.csv') => {
  const visibleColumns = columns.filter(col => col.visible).sort((a, b) => a.order - b.order);
  
  const headers = visibleColumns.map(col => col.label);
  const data = rows.map(row => {
    return visibleColumns.reduce((acc, col) => {
      acc[col.label] = row[col.id];
      return acc;
    }, {} as Record<string, any>);
  });

  const csv = Papa.unparse({
    fields: headers,
    data: data,
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
};

export const validateCSVStructure = (file: File, requiredColumns: string[]): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      preview: 1,
      complete: (results) => {
        const fileColumns = results.meta.fields || [];
        const missingColumns = requiredColumns.filter(col => !fileColumns.includes(col));
        
        if (missingColumns.length > 0) {
          reject(new Error(`Missing required columns: ${missingColumns.join(', ')}`));
        } else {
          resolve(true);
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};
