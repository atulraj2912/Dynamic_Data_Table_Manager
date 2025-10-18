import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableRow, Column, SortState, TableState } from '@/types';

const defaultColumns: Column[] = [
  { id: 'name', label: 'Name', visible: true, order: 0, type: 'string' },
  { id: 'email', label: 'Email', visible: true, order: 1, type: 'string' },
  { id: 'age', label: 'Age', visible: true, order: 2, type: 'number' },
  { id: 'role', label: 'Role', visible: true, order: 3, type: 'string' },
];

const sampleData: TableRow[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', age: 28, role: 'Developer' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', age: 32, role: 'Designer' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', age: 45, role: 'Manager' },
  { id: '4', name: 'Alice Williams', email: 'alice@example.com', age: 26, role: 'Developer' },
  { id: '5', name: 'Charlie Brown', email: 'charlie@example.com', age: 35, role: 'Developer' },
  { id: '6', name: 'Eva Davis', email: 'eva@example.com', age: 29, role: 'Designer' },
  { id: '7', name: 'Frank Miller', email: 'frank@example.com', age: 41, role: 'Manager' },
  { id: '8', name: 'Grace Lee', email: 'grace@example.com', age: 27, role: 'Developer' },
  { id: '9', name: 'Henry Wilson', email: 'henry@example.com', age: 38, role: 'Designer' },
  { id: '10', name: 'Iris Taylor', email: 'iris@example.com', age: 31, role: 'Developer' },
];

const initialState: TableState = {
  rows: sampleData,
  columns: defaultColumns,
  searchQuery: '',
  sortState: { column: null, direction: null },
  page: 0,
  rowsPerPage: 10,
  editingRows: [], // Changed from Set to array
  editedData: {},
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<TableRow[]>) => {
      state.rows = action.payload;
    },
    addRow: (state, action: PayloadAction<TableRow>) => {
      state.rows.push(action.payload);
    },
    updateRow: (state, action: PayloadAction<{ id: string; data: Partial<TableRow> }>) => {
      const index = state.rows.findIndex(row => row.id === action.payload.id);
      if (index !== -1) {
        state.rows[index] = { ...state.rows[index], ...action.payload.data } as TableRow;
      }
    },
    deleteRow: (state, action: PayloadAction<string>) => {
      state.rows = state.rows.filter(row => row.id !== action.payload);
    },
    setColumns: (state, action: PayloadAction<Column[]>) => {
      state.columns = action.payload;
    },
    addColumn: (state, action: PayloadAction<Column>) => {
      state.columns.push(action.payload);
    },
    toggleColumnVisibility: (state, action: PayloadAction<string>) => {
      const column = state.columns.find(col => col.id === action.payload);
      if (column) {
        column.visible = !column.visible;
      }
    },
    reorderColumns: (state, action: PayloadAction<Column[]>) => {
      state.columns = action.payload.map((col, index) => ({ ...col, order: index }));
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.page = 0;
    },
    setSortState: (state, action: PayloadAction<SortState>) => {
      state.sortState = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
      state.page = 0;
    },
    startEditingRow: (state, action: PayloadAction<string>) => {
      console.log('startEditingRow reducer called with:', action.payload);
      console.log('Current editingRows before:', state.editingRows);
      if (!state.editingRows.includes(action.payload)) {
        state.editingRows.push(action.payload);
        console.log('Row added. editingRows after:', state.editingRows);
      } else {
        console.log('Row already in editingRows');
      }
    },
    stopEditingRow: (state, action: PayloadAction<string>) => {
      state.editingRows = state.editingRows.filter(id => id !== action.payload);
      delete state.editedData[action.payload];
    },
    updateEditedData: (state, action: PayloadAction<{ id: string; data: Partial<TableRow> }>) => {
      state.editedData[action.payload.id] = {
        ...state.editedData[action.payload.id],
        ...action.payload.data,
      };
    },
    saveAllEdits: (state) => {
      state.editingRows.forEach(rowId => {
        const editedRow = state.editedData[rowId];
        if (editedRow) {
          const index = state.rows.findIndex(row => row.id === rowId);
          if (index !== -1) {
            state.rows[index] = { ...state.rows[index], ...editedRow } as TableRow;
          }
        }
      });
      state.editingRows = [];
      state.editedData = {};
    },
    cancelAllEdits: (state) => {
      state.editingRows = [];
      state.editedData = {};
    },
  },
});

export const {
  setRows,
  addRow,
  updateRow,
  deleteRow,
  setColumns,
  addColumn,
  toggleColumnVisibility,
  reorderColumns,
  setSearchQuery,
  setSortState,
  setPage,
  setRowsPerPage,
  startEditingRow,
  stopEditingRow,
  updateEditedData,
  saveAllEdits,
  cancelAllEdits,
} = tableSlice.actions;

export default tableSlice.reducer;
