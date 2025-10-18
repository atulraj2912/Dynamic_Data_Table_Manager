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
} from '@mui/material';
import {
  ViewColumn as ViewColumnIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setSearchQuery,
  setSortState,
  setPage,
  setRowsPerPage,
  saveAllEdits,
  cancelAllEdits,
} from '@/store/slices/tableSlice';
import { toggleTheme } from '@/store/slices/themeSlice';
import { sortData, filterData, paginateData } from '@/utils/tableUtils';
import DataTableRow from './DataTableRow';
import ManageColumnsModal from './ManageColumnsModal';
import CSVActions from './CSVActions';

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
  
  const [columnsModalOpen, setColumnsModalOpen] = useState(false);

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
            
            <CSVActions />
            
            <Button
              variant="outlined"
              startIcon={<ViewColumnIcon />}
              onClick={() => setColumnsModalOpen(true)}
            >
              Manage Columns
            </Button>

            <IconButton onClick={() => dispatch(toggleTheme())} color="inherit">
              {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>
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

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {visibleColumns.map((column) => (
                  <TableCell key={column.id}>
                    <TableSortLabel
                      active={sortState.column === column.id}
                      direction={sortState.column === column.id ? sortState.direction || 'asc' : 'asc'}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={visibleColumns.length + 1} align="center">
                    No data found
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
    </Box>
  );
}
