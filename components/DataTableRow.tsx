'use client';

import { useState } from 'react';
import { TableRow, TableCell, IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Tooltip } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteRow, startEditingRow, stopEditingRow, updateEditedData, updateRow } from '@/store/slices/tableSlice';
import { TableRow as TableRowType } from '@/types';
import EditableCell from './EditableCell';

interface DataTableRowProps {
  row: TableRowType;
}

export default function DataTableRow({ row }: DataTableRowProps) {
  const dispatch = useAppDispatch();
  const columns = useAppSelector((state) => state.table.columns);
  const editingRows = useAppSelector((state) => state.table.editingRows);
  const editedData = useAppSelector((state) => state.table.editedData);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Safety check: ensure editingRows is an array
  const isEditing = Array.isArray(editingRows) ? editingRows.includes(row.id) : false;
  const visibleColumns = columns.filter(col => col.visible).sort((a, b) => a.order - b.order);

  console.log(`Row ${row.id}: isEditing=${isEditing}, editingRows=`, editingRows);

  const handleEdit = () => {
    console.log('Edit button clicked for row:', row.id);
    console.log('Current editingRows:', editingRows);
    dispatch(startEditingRow(row.id));
    console.log('startEditingRow dispatched');
  };

  const handleSave = () => {
    const edited = editedData[row.id];
    if (edited) {
      dispatch(updateRow({ id: row.id, data: edited }));
    }
    dispatch(stopEditingRow(row.id));
  };

  const handleCancel = () => {
    dispatch(stopEditingRow(row.id));
  };

  const handleDelete = () => {
    dispatch(deleteRow(row.id));
    setDeleteDialogOpen(false);
  };

  const handleCellChange = (columnId: string, value: string | number) => {
    dispatch(updateEditedData({ id: row.id, data: { [columnId]: value } }));
  };

  const handleDoubleClick = () => {
    if (!isEditing) {
      dispatch(startEditingRow(row.id));
    }
  };

  return (
    <>
      <TableRow hover>
        {visibleColumns.map((column) => (
          <EditableCell
            key={column.id}
            value={(editedData[row.id]?.[column.id] ?? row[column.id]) as string | number}
            columnId={column.id}
            isEditing={isEditing}
            onDoubleClick={handleDoubleClick}
            onChange={(value) => handleCellChange(column.id, value)}
            type={column.type}
          />
        ))}
        <TableCell align="right">
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            {isEditing ? (
              <>
                <IconButton size="small" color="primary" onClick={handleSave}>
                  <SaveIcon />
                </IconButton>
                <IconButton size="small" color="secondary" onClick={handleCancel}>
                  <CancelIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Tooltip title="Edit row">
                  <IconButton size="small" onClick={handleEdit}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete row">
                  <IconButton size="small" color="error" onClick={() => setDeleteDialogOpen(true)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Box>
        </TableCell>
      </TableRow>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this row? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
