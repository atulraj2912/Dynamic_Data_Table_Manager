'use client';

import { useMemo, useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  TextField,
  Button,
  IconButton,
  Typography,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import {
  ViewColumn as ViewColumnIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  DragIndicator as DragIndicatorIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setSearchQuery,
  setSortState,
  setPage,
  setRowsPerPage,
  saveAllEdits,
  cancelAllEdits,
  reorderColumns,
  setRows,
} from '@/store/slices/tableSlice';
import { toggleTheme } from '@/store/slices/themeSlice';
import { sortData, filterData, paginateData } from '@/utils/tableUtils';
import { Column } from '@/types';
import DataTableRow from './DataTableRow';
import ManageColumnsModal from './ManageColumnsModal';
import CSVActions from './CSVActions';
import DragHelpTooltip from './DragHelpTooltip';
import AddRowModal from './AddRowModal';
import LoadSampleData from './LoadSampleData';

interface SortableHeaderCellProps {
  column: Column;
  sortState: { column: string | null; direction: 'asc' | 'desc' | null };
  onSort: (columnId: string) => void;
}

function SortableHeaderCell({ column, sortState, onSort }: SortableHeaderCellProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
  };

  return (
    <TableCell ref={setNodeRef} style={style}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Box {...attributes} {...listeners} sx={{ display: 'flex', alignItems: 'center', cursor: 'grab', '&:active': { cursor: 'grabbing' } }}>
          <DragIndicatorIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
        </Box>
        <TableSortLabel
          active={sortState.column === column.id}
          direction={sortState.column === column.id ? sortState.direction || 'asc' : 'asc'}
          onClick={() => onSort(column.id)}
        >
          {column.label}
        </TableSortLabel>
      </Box>
    </TableCell>
  );
}

export default function DataTable() {
  const dispatch = useAppDispatch();
  const {
    rows,
    columns,
    searchQuery,
    sortState,
    page,
    rowsPerPage,
    editingRows,
  } = useAppSelector((state) => state.table);
  const themeMode = useAppSelector((state) => state.theme.mode);
  
  // Debug logging
  console.log('DataTable render - rows count:', rows.length);
  console.log('First row:', rows[0]);
  
  const [columnsModalOpen, setColumnsModalOpen] = useState(false);
  const [addRowModalOpen, setAddRowModalOpen] = useState(false);
  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required before drag starts
      },
    })
  );

  const visibleColumns = useMemo(
    () => columns.filter(col => col.visible).sort((a, b) => a.order - b.order),
    [columns]
  );

  const processedData = useMemo(() => {
    let data = filterData(rows, searchQuery);
    data = sortData(data, sortState);
    return data;
  }, [rows, searchQuery, sortState]);

  const paginatedData = useMemo(
    () => paginateData(processedData, page, rowsPerPage),
    [processedData, page, rowsPerPage]
  );

  const handleSort = (columnId: string) => {
    const isAsc = sortState.column === columnId && sortState.direction === 'asc';
    dispatch(setSortState({
      column: columnId,
      direction: isAsc ? 'desc' : 'asc',
    }));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
  };

  const handleColumnDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = visibleColumns.findIndex((col) => col.id === active.id);
      const newIndex = visibleColumns.findIndex((col) => col.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        // Reorder only the visible columns
        const reorderedVisible = arrayMove(visibleColumns, oldIndex, newIndex);
        
        // Update all columns with new order
        const updatedColumns = columns.map((col) => {
          if (col.visible) {
            // Find the new position in reorderedVisible
            const newOrderIndex = reorderedVisible.findIndex((vc) => vc.id === col.id);
            return { ...col, order: newOrderIndex };
          }
          return col; // Keep hidden columns as-is
        });
        
        dispatch(reorderColumns(updatedColumns));
      }
    }
  };

  const handleClearAllData = () => {
    dispatch(setRows([]));
    setClearDialogOpen(false);
  };

  const hasEdits = editingRows.length > 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar sx={{ 
          pl: { sm: 2 }, 
          pr: { xs: 1, sm: 1 },
          flexWrap: 'wrap',
          gap: 2,
        }}>
          <Typography variant="h6" component="div" sx={{ flex: '1 1 100%' }}>
            Dynamic Data Table Manager
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            flex: '1 1 auto',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
            <TextField
              size="small"
              placeholder="Search all fields..."
              value={searchQuery}
              onChange={handleSearch}
              sx={{ minWidth: 200 }}
            />
            
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setAddRowModalOpen(true)}
            >
              Add Row
            </Button>
            
            <CSVActions />
            
            <LoadSampleData />
            
            <Button
              variant="outlined"
              startIcon={<ViewColumnIcon />}
              onClick={() => setColumnsModalOpen(true)}
            >
              Manage Columns
            </Button>
            
            {rows.length > 0 && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => setClearDialogOpen(true)}
              >
                Clear All
              </Button>
            )}
          </Box>

          {/* Theme toggle on the far right */}
          <IconButton onClick={() => dispatch(toggleTheme())} color="inherit" sx={{ ml: 'auto' }}>
            {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>

        {hasEdits && (
          <Box sx={{ px: 2, pb: 2, display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={() => dispatch(saveAllEdits())}
            >
              Save All Changes
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<CancelIcon />}
              onClick={() => dispatch(cancelAllEdits())}
            >
              Cancel All Changes
            </Button>
          </Box>
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleColumnDragEnd}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <SortableContext
                    items={visibleColumns.map((col) => col.id)}
                    strategy={horizontalListSortingStrategy}
                  >
                    {visibleColumns.map((column) => (
                      <SortableHeaderCell
                        key={column.id}
                        column={column}
                        sortState={sortState}
                        onSort={handleSort}
                      />
                    ))}
                  </SortableContext>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={visibleColumns.length + 1} align="center" sx={{ py: 8 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <Typography variant="h6" color="text.secondary">
                        No data available
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Click &quot;Add Row&quot; to add data manually or &quot;Import CSV&quot; to import from a file
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<AddIcon />}
                          onClick={() => setAddRowModalOpen(true)}
                        >
                          Add Row
                        </Button>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row) => (
                  <DataTableRow key={row.id} row={row} />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        </DndContext>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={processedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <ManageColumnsModal
        open={columnsModalOpen}
        onClose={() => setColumnsModalOpen(false)}
      />
      
      <AddRowModal
        open={addRowModalOpen}
        onClose={() => setAddRowModalOpen(false)}
      />
      
      <Dialog
        open={clearDialogOpen}
        onClose={() => setClearDialogOpen(false)}
      >
        <DialogTitle>Clear All Data?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete all {rows.length} rows? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClearDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleClearAllData} color="error" variant="contained">
            Clear All Data
          </Button>
        </DialogActions>
      </Dialog>
      
      <DragHelpTooltip />
    </Box>
  );
}
