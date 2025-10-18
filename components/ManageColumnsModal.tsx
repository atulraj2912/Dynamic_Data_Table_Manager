'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  Checkbox,
  TextField,
  Box,
  List,
  ListItem,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { DragHandle as DragHandleIcon, Add as AddIcon } from '@mui/icons-material';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleColumnVisibility, reorderColumns, addColumn } from '@/store/slices/tableSlice';
import { Column } from '@/types';

interface SortableColumnItemProps {
  column: Column;
  onToggle: (id: string) => void;
}

function SortableColumnItem({ column, onToggle }: SortableColumnItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: column.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ListItem
      ref={setNodeRef}
      style={style}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        mb: 1,
        bgcolor: 'background.paper',
      }}
    >
      <IconButton size="small" {...attributes} {...listeners}>
        <DragHandleIcon />
      </IconButton>
      <FormControlLabel
        control={
          <Checkbox
            checked={column.visible}
            onChange={() => onToggle(column.id)}
          />
        }
        label={column.label}
        sx={{ flex: 1 }}
      />
    </ListItem>
  );
}

interface ManageColumnsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ManageColumnsModal({ open, onClose }: ManageColumnsModalProps) {
  const dispatch = useAppDispatch();
  const columns = useAppSelector((state) => state.table.columns);
  const [newColumnLabel, setNewColumnLabel] = useState('');
  const [newColumnType, setNewColumnType] = useState<'string' | 'number'>('string');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const sortedColumns = [...columns].sort((a, b) => a.order - b.order);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sortedColumns.findIndex((col) => col.id === active.id);
      const newIndex = sortedColumns.findIndex((col) => col.id === over.id);

      const newOrder = arrayMove(sortedColumns, oldIndex, newIndex);
      dispatch(reorderColumns(newOrder));
    }
  };

  const handleToggle = (id: string) => {
    dispatch(toggleColumnVisibility(id));
  };

  const handleAddColumn = () => {
    if (newColumnLabel.trim()) {
      const newColumn: Column = {
        id: newColumnLabel.toLowerCase().replace(/\s+/g, '_'),
        label: newColumnLabel,
        visible: true,
        order: columns.length,
        type: newColumnType,
      };
      dispatch(addColumn(newColumn));
      setNewColumnLabel('');
      setNewColumnType('string');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Manage Columns</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Add New Column
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <TextField
              size="small"
              placeholder="Column name"
              value={newColumnLabel}
              onChange={(e) => setNewColumnLabel(e.target.value)}
              sx={{ flex: 1 }}
            />
            <FormControl size="small" sx={{ minWidth: 100 }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={newColumnType}
                label="Type"
                onChange={(e) => setNewColumnType(e.target.value as 'string' | 'number')}
              >
                <MenuItem value="string">Text</MenuItem>
                <MenuItem value="number">Number</MenuItem>
              </Select>
            </FormControl>
            <IconButton color="primary" onClick={handleAddColumn}>
              <AddIcon />
            </IconButton>
          </Box>
        </Box>

        <Typography variant="subtitle2" gutterBottom>
          Show/Hide & Reorder Columns (Drag to reorder)
        </Typography>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sortedColumns.map(col => col.id)}
            strategy={verticalListSortingStrategy}
          >
            <List>
              {sortedColumns.map((column) => (
                <SortableColumnItem
                  key={column.id}
                  column={column}
                  onToggle={handleToggle}
                />
              ))}
            </List>
          </SortableContext>
        </DndContext>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
