'use client';

import { useState, useRef } from 'react';
import { Box, Button, Alert, Snackbar } from '@mui/material';
import { Upload as UploadIcon, Download as DownloadIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setRows } from '@/store/slices/tableSlice';
import { parseCSV, exportToCSV } from '@/utils/csvUtils';

export default function CSVActions() {
  const dispatch = useAppDispatch();
  const rows = useAppSelector((state) => state.table.rows);
  const columns = useAppSelector((state) => state.table.columns);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log('Starting CSV import...');
    try {
      const parsedRows = await parseCSV(file);
      console.log('Parsed rows:', parsedRows);
      console.log('Number of rows:', parsedRows.length);
      
      dispatch(setRows(parsedRows));
      console.log('Dispatched setRows action');
      
      setSuccess(`Successfully imported ${parsedRows.length} rows`);
    } catch (error) {
      console.error('CSV Import error:', error);
      setError(error instanceof Error ? error.message : 'Failed to import CSV');
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleExport = () => {
    try {
      exportToCSV(rows, columns);
      setSuccess('CSV exported successfully');
    } catch (error) {
      console.error('Export error:', error);
      setError('Failed to export CSV');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleImport}
        style={{ display: 'none' }}
      />
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="outlined"
          startIcon={<UploadIcon />}
          onClick={handleImportClick}
        >
          Import CSV
        </Button>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleExport}
        >
          Export CSV
        </Button>
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSuccess('')}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
}
