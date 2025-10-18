'use client';

import { useState, useEffect } from 'react';
import { TableCell, TextField } from '@mui/material';
import { validateField } from '@/utils/validation';

interface EditableCellProps {
  value: string | number;
  columnId: string;
  isEditing: boolean;
  onDoubleClick: () => void;
  onChange: (value: string | number) => void;
  type: 'string' | 'number';
}

export default function EditableCell({
  value,
  columnId,
  isEditing,
  onDoubleClick,
  onChange,
  type,
}: EditableCellProps) {
  const [localValue, setLocalValue] = useState(value);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = type === 'number' ? Number(e.target.value) : e.target.value;
    setLocalValue(newValue);
    
    const validation = validateField(columnId, newValue);
    if (!validation.valid) {
      setError(validation.error || '');
    } else {
      setError('');
      onChange(newValue);
    }
  };

  if (isEditing) {
    return (
      <TableCell>
        <TextField
          value={localValue}
          onChange={handleChange}
          error={!!error}
          helperText={error}
          size="small"
          fullWidth
          type={type === 'number' ? 'number' : 'text'}
          autoFocus
          onClick={(e) => e.stopPropagation()}
        />
      </TableCell>
    );
  }

  return (
    <TableCell onDoubleClick={onDoubleClick} sx={{ cursor: 'pointer' }}>
      {value}
    </TableCell>
  );
}
