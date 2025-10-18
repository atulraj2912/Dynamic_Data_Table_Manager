export interface TableRow {
  id: string;
  name: string;
  email: string;
  age: number;
  role: string;
  [key: string]: string | number;
}

export interface Column {
  id: string;
  label: string;
  visible: boolean;
  order: number;
  type: 'string' | 'number';
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  column: string | null;
  direction: SortDirection;
}

export interface TableState {
  rows: TableRow[];
  columns: Column[];
  searchQuery: string;
  sortState: SortState;
  page: number;
  rowsPerPage: number;
  editingRows: string[]; // Changed from Set to array for persistence
  editedData: Record<string, Partial<TableRow>>;
}

export interface ThemeState {
  mode: 'light' | 'dark';
}
