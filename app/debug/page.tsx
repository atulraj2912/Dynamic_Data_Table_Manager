'use client';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { startEditingRow, stopEditingRow } from '@/store/slices/tableSlice';
import { Button, Box, Typography, Paper } from '@mui/material';

export default function DebugPage() {
  const { editingRows, rows } = useAppSelector((state) => state.table);
  const dispatch = useAppDispatch();

  const testRow = rows[0]; // Test with first row

  const handleTestEdit = () => {
    console.log('Testing startEditingRow with ID:', testRow.id);
    console.log('editingRows before dispatch:', editingRows);
    dispatch(startEditingRow(testRow.id));
  };

  const handleTestStop = () => {
    console.log('Testing stopEditingRow with ID:', testRow.id);
    dispatch(stopEditingRow(testRow.id));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Debug Page
      </Typography>
      
      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6">Current State:</Typography>
        <Typography>editingRows type: {Array.isArray(editingRows) ? 'Array' : typeof editingRows}</Typography>
        <Typography>editingRows value: {JSON.stringify(editingRows)}</Typography>
        <Typography>editingRows length: {Array.isArray(editingRows) ? editingRows.length : 'N/A'}</Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6">Test Row:</Typography>
        <Typography>ID: {testRow.id}</Typography>
        <Typography>Name: {testRow.name}</Typography>
        <Typography>Is Editing: {Array.isArray(editingRows) && editingRows.includes(testRow.id) ? 'YES' : 'NO'}</Typography>
      </Paper>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" onClick={handleTestEdit}>
          Start Editing Row {testRow.id}
        </Button>
        <Button variant="contained" color="secondary" onClick={handleTestStop}>
          Stop Editing Row {testRow.id}
        </Button>
      </Box>

      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="h6">Instructions:</Typography>
        <Typography>1. Open browser console (F12)</Typography>
        <Typography>2. Click "Start Editing" button</Typography>
        <Typography>3. Check console logs</Typography>
        <Typography>4. Watch "Is Editing" field change to YES</Typography>
        <Typography>5. If it doesn't work, clear localStorage and refresh</Typography>
      </Paper>
    </Box>
  );
}
