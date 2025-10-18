'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Alert,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addRow } from '@/store/slices/tableSlice';
import { validateField } from '@/utils/validation';

interface AddRowModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddRowModal({ open, onClose }: AddRowModalProps) {
  const dispatch = useAppDispatch();
  const columns = useAppSelector((state) => state.table.columns);
  const rows = useAppSelector((state) => state.table.rows);
  
  const [formData, setFormData] = useState<Record<string, string | number>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const handleChange = (columnId: string, value: string) => {
    setFormData(prev => ({ ...prev, [columnId]: value }));
    
    // Clear error for this field
    if (errors[columnId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[columnId];
        return newErrors;
      });
    }
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    
    // Validate all visible columns
    columns.filter(col => col.visible).forEach(column => {
      const value = formData[column.id];
      const validation = validateField(column.id, value);
      
      if (!validation.valid && validation.error) {
        newErrors[column.id] = validation.error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Generate unique ID
    const newId = rows.length > 0 
      ? String(Math.max(...rows.map(r => parseInt(r.id) || 0)) + 1)
      : '1';

    // Add row with proper types
    const newRow: Record<string, string | number> = { id: newId };
    columns.forEach(column => {
      const value = formData[column.id];
      if (column.type === 'number') {
        newRow[column.id] = value ? Number(value) : 0;
      } else {
        newRow[column.id] = value || '';
      }
    });

    dispatch(addRow(newRow as unknown as { id: string; name: string; email: string; age: number; role: string; [key: string]: string | number }));
    setSuccess(true);
    
    // Reset form after 1 second
    setTimeout(() => {
      setFormData({});
      setErrors({});
      setSuccess(false);
      onClose();
    }, 1000);
  };

  const handleClose = () => {
    setFormData({});
    setErrors({});
    setSuccess(false);
    onClose();
  };

  const visibleColumns = columns.filter(col => col.visible).sort((a, b) => a.order - b.order);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Row</DialogTitle>
      <DialogContent>
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Row added successfully!
          </Alert>
        )}
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          {visibleColumns.map((column) => (
            <TextField
              key={column.id}
              label={column.label}
              type={column.type === 'number' ? 'number' : 'text'}
              value={formData[column.id] || ''}
              onChange={(e) => handleChange(column.id, e.target.value)}
              error={!!errors[column.id]}
              helperText={errors[column.id]}
              fullWidth
              required
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add Row
        </Button>
      </DialogActions>
    </Dialog>
  );
}
