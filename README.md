# Dynamic Data Table Manager 🚀This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



A feature-rich, production-ready data table management application built with Next.js 15, TypeScript, Redux Toolkit, and Material UI.## Getting Started



## ✨ FeaturesFirst, run the development server:



### Core Features```bash

- ✅ **Dynamic Data Table** - Display and manage tabular data with professional UInpm run dev

- ✅ **Column Sorting** - Click column headers to sort ASC/DESC# or

- ✅ **Global Search** - Search across all fields in real-timeyarn dev

- ✅ **Pagination** - Client-side pagination (5, 10, 25, or 50 rows per page)# or

- ✅ **Dynamic Column Management** - Add, show/hide, and reorder columnspnpm dev

- ✅ **CSV Import/Export** - Import data from CSV files and export visible columns# or

- ✅ **State Persistence** - Column preferences and data persist using localStoragebun dev

```

### Bonus Features

- ✅ **Inline Row Editing** - Double-click any cell to edit, with real-time validationOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- ✅ **Batch Edit Actions** - "Save All" and "Cancel All" buttons for bulk operations

- ✅ **Row Actions** - Edit and Delete buttons with confirmation dialogsYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

- ✅ **Theme Toggle** - Switch between Light and Dark modes

- ✅ **Column Reordering** - Drag and drop to reorder columnsThis project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

- ✅ **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices

- ✅ **Input Validation** - Real-time validation for email, age, and required fields## Learn More

- ✅ **Error Handling** - User-friendly error messages for CSV import failures

To learn more about Next.js, take a look at the following resources:

## 🛠️ Tech Stack

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- **Framework**: Next.js 15 (App Router)- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

- **Language**: TypeScript

- **State Management**: Redux Toolkit + Redux PersistYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

- **UI Library**: Material UI (MUI) v5

- **Form Handling**: React Hook Form## Deploy on Vercel

- **CSV Processing**: PapaParse

- **Drag & Drop**: @dnd-kitThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

- **File Export**: FileSaver.js

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🚀 Getting Started

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

3. **Explore the features**:
   - Try searching for data in the search box
   - Click column headers to sort
   - Double-click any cell to edit inline
   - Click "Manage Columns" to add new fields or hide existing ones
   - Import/Export CSV files
   - Toggle between light and dark themes

## 📖 Usage Guide

### Searching & Filtering
- Use the global search box to filter rows across all columns
- Search is case-insensitive and searches all visible fields

### Sorting
- Click any column header to sort ascending
- Click again to sort descending
- The active sort column is indicated with an arrow

### Inline Editing
- **Double-click** any cell to enter edit mode
- Edit the value directly in the cell
- Click the **Save** icon (✓) to save changes
- Click the **Cancel** icon (✕) to discard changes
- Use **"Save All Changes"** button to save multiple edits at once

### Managing Columns
1. Click the **"Manage Columns"** button
2. **Add new columns**: Enter a column name, select type (Text/Number), and click +
3. **Show/Hide columns**: Use checkboxes to toggle column visibility
4. **Reorder columns**: 
   - **In Modal**: Drag and drop columns using the drag handle icon
   - **In Table Header**: Drag any column header directly to reorder (grab the drag indicator icon)
5. Column preferences are automatically saved

### Column Reordering (Drag & Drop)
You can reorder columns in two ways:

**Method 1: Table Header (Direct)**
- Look for the drag indicator icon (⋮⋮) next to each column name
- Click and drag the drag indicator to reorder columns
- The column will move smoothly to its new position
- Changes are saved automatically

**Method 2: Manage Columns Modal**
- Open "Manage Columns" modal
- Use the drag handle on the left of each column
- Drag and drop to reorder
- Changes apply immediately

### CSV Import/Export

#### Import CSV
1. Click **"Import CSV"** button
2. Select a CSV file from your computer
3. The file should have headers matching your column names
4. Data will be validated and imported

#### Export CSV
1. Click **"Export CSV"** button
2. Only visible columns will be exported
3. File downloads automatically as `table-export.csv`

### Row Actions
- **Edit Button**: Click to enter edit mode for the entire row
- **Delete Button**: Click to delete a row (with confirmation dialog)

### Theme Toggle
- Click the sun/moon icon in the toolbar to switch between light and dark modes
- Theme preference is automatically saved

## 📁 Project Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main page with DataTable
│   └── globals.css         # Global styles
├── components/
│   ├── DataTable.tsx       # Main table component
│   ├── DataTableRow.tsx    # Table row with actions
│   ├── EditableCell.tsx    # Editable cell component
│   ├── ManageColumnsModal.tsx  # Column management modal
│   ├── CSVActions.tsx      # CSV import/export
│   ├── MUIThemeProvider.tsx    # Theme provider
│   └── Providers.tsx       # Redux + Theme providers
├── store/
│   ├── index.ts            # Redux store configuration
│   ├── hooks.ts            # Typed Redux hooks
│   └── slices/
│       ├── tableSlice.ts   # Table state management
│       └── themeSlice.ts   # Theme state management
├── types/
│   └── index.ts            # TypeScript type definitions
├── utils/
│   ├── csvUtils.ts         # CSV import/export utilities
│   ├── tableUtils.ts       # Table filtering/sorting utilities
│   └── validation.ts       # Input validation utilities
└── theme/
    └── index.ts            # MUI theme configuration
```

## 🎯 Key Features Explained

### Redux State Management
- **Table State**: Manages rows, columns, search, sort, pagination, and editing
- **Theme State**: Manages light/dark mode preference
- **Redux Persist**: Automatically saves state to localStorage

### Validation
- **Email**: Must be valid email format (e.g., user@example.com)
- **Age**: Must be a number between 1 and 149
- **Required Fields**: Name, Email, Age, and Role cannot be empty
- **Custom Fields**: Dynamic validation based on field type

### Responsive Design
- Mobile-friendly interface with adaptive layouts
- Touch-friendly controls for mobile devices
- Flexible toolbar that wraps on smaller screens

## 🔧 Configuration

### Default Columns
The table starts with these default columns:
- Name (Text)
- Email (Text)
- Age (Number)
- Role (Text)

### Pagination Options
- 5 rows per page
- 10 rows per page (default)
- 25 rows per page
- 50 rows per page

### Sample Data
The application comes with 10 sample rows. You can:
- Edit or delete existing rows
- Import your own data via CSV
- Add custom columns dynamically

## 🐛 Troubleshooting

### CSV Import Issues
- Ensure your CSV file has headers
- Check that column names match existing columns
- Verify the file is properly formatted (comma-separated)

### Editing Not Working
- Make sure you **double-click** the cell to enter edit mode
- Check that the field validation passes (e.g., valid email format)

### State Not Persisting
- Check browser console for localStorage errors
- Ensure cookies/storage is enabled in your browser

## 📝 Sample CSV Format

Create a CSV file with this format to import data:

```csv
id,name,email,age,role
1,John Doe,john@example.com,28,Developer
2,Jane Smith,jane@example.com,32,Designer
3,Bob Johnson,bob@example.com,45,Manager
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
npm run build
vercel deploy
```

### Other Platforms
Build the project and deploy the `.next` folder:
```bash
npm run build
npm start
```

## 🤝 Contributing

This is an interview task project. Feel free to use it as a template or learning resource!

## 📄 License

MIT License - Feel free to use this project for learning or as a portfolio piece.

## 🎓 Learning Resources

This project demonstrates:
- Next.js 15 App Router patterns
- Redux Toolkit best practices
- Material UI component composition
- TypeScript type safety
- CSV data processing
- Drag-and-drop interactions
- Form validation
- State persistence
- Responsive design principles

---

**Built with ❤️ using Next.js, TypeScript, Redux Toolkit, and Material UI**
# Dynamic_Data_Table_Manager
