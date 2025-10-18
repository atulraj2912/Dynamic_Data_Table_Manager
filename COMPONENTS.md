# Component Documentation

## Component Hierarchy

```
App (layout.tsx)
└── Providers
    ├── Redux Provider (store)
    └── MUI Theme Provider
        └── DataTable (main component)
            ├── Toolbar
            │   ├── Search Input
            │   ├── CSVActions
            │   ├── Manage Columns Button
            │   └── Theme Toggle
            ├── Table
            │   ├── TableHead (with sorting)
            │   └── TableBody
            │       └── DataTableRow (multiple)
            │           └── EditableCell (multiple)
            ├── Pagination
            └── ManageColumnsModal
```

---

## Component Details

### 1. **Providers.tsx**
**Purpose**: Root provider component that wraps the entire app

**Props**: 
- `children: React.ReactNode`

**Features**:
- Redux Provider for state management
- PersistGate for rehydration
- MUI Theme Provider for styling
- Loading indicator during rehydration

**Dependencies**:
- `react-redux`
- `redux-persist`
- `@mui/material`

---

### 2. **DataTable.tsx**
**Purpose**: Main table component with all features

**State Management**:
- Uses Redux for: rows, columns, search, sort, pagination
- Local state for: column modal visibility

**Key Features**:
- Global search
- Column sorting
- Pagination controls
- CSV import/export
- Column management
- Theme toggle
- Batch edit actions

**Hooks Used**:
- `useAppSelector` - Read Redux state
- `useAppDispatch` - Dispatch Redux actions
- `useMemo` - Optimize filtered/sorted data
- `useState` - Local UI state

---

### 3. **DataTableRow.tsx**
**Purpose**: Individual table row with edit/delete actions

**Props**:
```typescript
{
  row: TableRow  // Row data to display
}
```

**Features**:
- Renders visible columns only
- Shows edit/delete buttons
- Handles row editing state
- Delete confirmation dialog
- Integrates with EditableCell

**Actions**:
- Edit: Enters edit mode for entire row
- Delete: Shows confirmation then removes row
- Save: Commits edits to Redux store
- Cancel: Discards pending edits

---

### 4. **EditableCell.tsx**
**Purpose**: Cell that can switch between view and edit mode

**Props**:
```typescript
{
  value: string | number,        // Current cell value
  columnId: string,             // Column identifier
  isEditing: boolean,           // Edit mode flag
  onDoubleClick: () => void,    // Enter edit mode
  onChange: (val) => void,      // Update value
  type: 'string' | 'number'     // Data type
}
```

**Features**:
- Double-click to edit
- Real-time validation
- Error messages
- Auto-focus on edit
- Type-specific inputs

**Validation**:
- Uses `validateField` utility
- Shows errors inline
- Prevents invalid saves

---

### 5. **ManageColumnsModal.tsx**
**Purpose**: Modal for managing column visibility and order

**Props**:
```typescript
{
  open: boolean,              // Modal visibility
  onClose: () => void        // Close handler
}
```

**Features**:
- Add new columns (text/number)
- Show/hide columns (checkboxes)
- Drag-and-drop reordering
- Real-time preview

**Components**:
- `SortableColumnItem` - Draggable column item
- Uses `@dnd-kit` for drag-and-drop
- Material UI Dialog

---

### 6. **CSVActions.tsx**
**Purpose**: Import and export CSV files

**Features**:
- File upload input (hidden)
- Import button triggers file picker
- Export button downloads CSV
- Success/error notifications

**File Handling**:
- Import: Uses PapaParse library
- Export: Uses FileSaver.js
- Validation on import
- Only exports visible columns

**Notifications**:
- Snackbar for success messages
- Alert for error messages
- Auto-dismiss after 3-6 seconds

---

### 7. **MUIThemeProvider.tsx**
**Purpose**: Provides Material UI theme based on Redux state

**Features**:
- Reads theme mode from Redux
- Switches between light/dark themes
- Includes CssBaseline for consistent styling

**Theme Configuration**:
- Defined in `theme/index.ts`
- Custom colors for each mode
- Component-level overrides

---

## Redux Store Structure

### **tableSlice.ts**

**State**:
```typescript
{
  rows: TableRow[]              // All table data
  columns: Column[]             // Column configurations
  searchQuery: string           // Search term
  sortState: SortState          // Sort column & direction
  page: number                  // Current page
  rowsPerPage: number           // Rows per page
  editingRows: Set<string>      // Row IDs being edited
  editedData: Record<...>       // Pending edits
}
```

**Actions**:
- `setRows` - Replace all rows
- `addRow` - Add single row
- `updateRow` - Update row by ID
- `deleteRow` - Remove row by ID
- `setColumns` - Set column config
- `addColumn` - Add new column
- `toggleColumnVisibility` - Show/hide column
- `reorderColumns` - Change column order
- `setSearchQuery` - Update search
- `setSortState` - Update sort
- `setPage` - Change page
- `setRowsPerPage` - Change page size
- `startEditingRow` - Enter edit mode
- `stopEditingRow` - Exit edit mode
- `updateEditedData` - Update pending edits
- `saveAllEdits` - Commit all edits
- `cancelAllEdits` - Discard all edits

---

### **themeSlice.ts**

**State**:
```typescript
{
  mode: 'light' | 'dark'
}
```

**Actions**:
- `toggleTheme` - Switch between light/dark

---

## Utility Functions

### **csvUtils.ts**
```typescript
parseCSV(file: File): Promise<TableRow[]>
  // Parse CSV file to table rows

exportToCSV(rows, columns, filename)
  // Export visible data to CSV

validateCSVStructure(file, requiredColumns): Promise<boolean>
  // Check CSV has required columns
```

### **validation.ts**
```typescript
validateEmail(email: string): boolean
  // Check valid email format

validateAge(age: number): boolean
  // Check age is 1-149

validateRequired(value: any): boolean
  // Check value is not empty

validateField(fieldId, value): ValidationResult
  // Validate field by type
```

### **tableUtils.ts**
```typescript
sortData(data, sortState): TableRow[]
  // Sort rows by column

filterData(data, searchQuery): TableRow[]
  // Filter rows by search term

paginateData(data, page, rowsPerPage): TableRow[]
  // Get rows for current page
```

---

## Type Definitions

### **TableRow**
```typescript
{
  id: string
  name: string
  email: string
  age: number
  role: string
  [key: string]: string | number  // Dynamic fields
}
```

### **Column**
```typescript
{
  id: string              // Unique identifier
  label: string           // Display name
  visible: boolean        // Show/hide
  order: number           // Display order
  type: 'string' | 'number'  // Data type
}
```

### **SortState**
```typescript
{
  column: string | null        // Column ID
  direction: 'asc' | 'desc' | null
}
```

---

## Styling Approach

### Material UI Theme
- Uses `createTheme` for consistent styling
- Separate light and dark themes
- Component-specific overrides

### Responsive Design
- Uses MUI breakpoints
- Flexbox layouts
- Mobile-first approach

### Custom Styles
- `sx` prop for inline styles
- Theme-aware values
- Consistent spacing scale

---

## Performance Considerations

### Optimizations
1. **useMemo**: Caching filtered/sorted data
2. **React.memo**: Preventing unnecessary re-renders
3. **Code Splitting**: Automatic with Next.js
4. **Lazy Loading**: Modal components

### Best Practices
- Immutable state updates in Redux
- Efficient array operations
- Minimal component nesting
- Selective Redux subscriptions

---

## Testing Strategy

### Unit Tests (Recommended)
- Redux reducers
- Utility functions
- Validation logic

### Integration Tests (Recommended)
- Component interactions
- Redux action flows
- CSV import/export

### E2E Tests (Recommended)
- Complete user workflows
- Cross-browser testing
- Mobile responsiveness

---

## Extending the Application

### Add a New Column Type
1. Update `Column` type in `types/index.ts`
2. Add validation in `utils/validation.ts`
3. Handle in `EditableCell.tsx`
4. Update `ManageColumnsModal.tsx`

### Add Backend Integration
1. Create API routes in `app/api/`
2. Add Redux Thunks for async actions
3. Replace local data with API calls
4. Add loading states

### Add More Features
- Multi-select rows
- Advanced filtering
- Column resizing
- Virtualization for large datasets
- Export to Excel/PDF

---

## Dependencies

### Core
- `next`: ^15.5.6
- `react`: ^19.1.0
- `typescript`: ^5

### State Management
- `@reduxjs/toolkit`: ^2.5.0
- `react-redux`: ^9.2.0
- `redux-persist`: ^6.0.0

### UI
- `@mui/material`: ^5.16.7
- `@mui/icons-material`: ^5.16.7
- `@emotion/react`: ^11.13.5
- `@emotion/styled`: ^11.13.5

### Utilities
- `papaparse`: ^5.4.1
- `file-saver`: ^2.0.5
- `@dnd-kit/core`: ^6.3.1
- `@dnd-kit/sortable`: ^9.0.0
- `react-hook-form`: ^7.54.2

---

**For more information, see [README.md](./README.md) and [FEATURES.md](./FEATURES.md)**
