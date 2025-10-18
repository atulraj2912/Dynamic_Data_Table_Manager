'use client';

import { Button } from '@mui/material';
import { CloudDownload as LoadIcon } from '@mui/icons-material';
import { useAppDispatch } from '@/store/hooks';
import { setRows } from '@/store/slices/tableSlice';

const sampleData = [
  { id: '1', name: 'John Doe', email: 'john@example.com', age: 28, role: 'Developer' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', age: 32, role: 'Designer' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', age: 45, role: 'Manager' },
];

export default function LoadSampleData() {
  const dispatch = useAppDispatch();

  const handleLoadSample = () => {
    console.log('Loading sample data:', sampleData);
    dispatch(setRows(sampleData));
  };

  return (
    <Button
      variant="outlined"
      color="secondary"
      startIcon={<LoadIcon />}
      onClick={handleLoadSample}
    >
      Load Sample Data
    </Button>
  );
}
