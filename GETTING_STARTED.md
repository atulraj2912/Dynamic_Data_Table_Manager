# Getting Started - Empty Table Mode

## 🎉 Changes Made

The application now starts with an **empty table** instead of hardcoded sample data!

## 📝 How to Add Data

### Option 1: Add Rows Manually

1. Click the **"Add Row"** button (blue button in the toolbar)
2. Fill in the form fields:
   - **Name** (required, min 2 characters)
   - **Email** (required, valid email format)
   - **Age** (required, number between 1-149)
   - **Role** (required, min 2 characters)
3. Click **"Add Row"** to save
4. Repeat to add more rows

### Option 2: Import CSV File

1. Click the **"Import CSV"** button (in the toolbar)
2. Select a CSV file from your computer
3. The data will be imported automatically
4. Any validation errors will be shown

**CSV Format Example:**
```csv
id,name,email,age,role
1,John Doe,john@example.com,28,Developer
2,Jane Smith,jane@example.com,32,Designer
```

### Option 3: Use Sample Data

1. Download the sample CSV file from: `http://localhost:3000/sample-data.csv`
2. Import it using the "Import CSV" button

## ✨ Features Available

Once you have data in the table, you can:

### Data Management
- ✅ **Add rows** - Click "Add Row" button
- ✅ **Edit rows** - Click edit icon or double-click a cell
- ✅ **Delete rows** - Click delete icon
- ✅ **Bulk edit** - Edit multiple rows and save all at once

### Table Operations
- ✅ **Search** - Type in the search box to filter across all fields
- ✅ **Sort** - Click column headers to sort
- ✅ **Paginate** - Use pagination controls at the bottom
- ✅ **Customize columns** - Click "Manage Columns" to show/hide/reorder

### Import/Export
- ✅ **Import CSV** - Load data from CSV files
- ✅ **Export CSV** - Download current data as CSV

### Visual Customization
- ✅ **Theme toggle** - Switch between light/dark mode (rightmost button)
- ✅ **Drag columns** - Reorder columns by dragging headers
- ✅ **Responsive** - Works on all screen sizes

## 💾 Data Persistence

- Data is automatically saved to **browser localStorage**
- Your data persists between page refreshes
- Clear data: Open DevTools (F12) → Console → Type `localStorage.clear()` → Refresh

## 🎯 Empty State

When the table is empty, you'll see:
- A friendly message: "No data available"
- Instructions on how to add data
- Quick "Add Row" button
- All features remain accessible in the toolbar

## 📊 Sample CSV Data

A sample CSV file with 15 rows is included at `/public/sample-data.csv`:
- Contains: ID, Name, Email, Age, Role
- Perfect for testing all features
- Download: `http://localhost:3000/sample-data.csv`

## 🚀 Quick Start

1. **Start the app:**
   ```bash
   npm run dev
   ```

2. **Open browser:**
   ```
   http://localhost:3000
   ```

3. **Add your first row:**
   - Click "Add Row"
   - Fill in the form
   - Click "Add Row" button
   - See your data appear!

4. **Or import sample data:**
   - Download `/public/sample-data.csv`
   - Click "Import CSV"
   - Select the file
   - Done!

## 🎨 What Changed?

### Before:
```typescript
const initialState: TableState = {
  rows: sampleData, // 10 hardcoded rows
  // ...
}
```

### After:
```typescript
const initialState: TableState = {
  rows: [], // Empty array - user adds data
  // ...
}
```

### New Components:
- ✅ `AddRowModal.tsx` - Form to add new rows
- ✅ "Add Row" button in toolbar
- ✅ Empty state message with instructions
- ✅ Field validation (email format, age range, required fields)

### New Features:
- ✅ Manual row creation with validation
- ✅ Empty state UI with helpful instructions
- ✅ Better user onboarding experience
- ✅ Clean slate for user data

## 📱 User Experience

### First Visit:
1. User sees empty table with clear instructions
2. Two clear options: "Add Row" or "Import CSV"
3. Quick action button in empty state
4. No confusion about sample data vs. real data

### Adding Data:
1. Click "Add Row" → Modal opens
2. Fill form with validation feedback
3. Submit → Success message → Data appears
4. Continue adding or start using other features

### Importing Data:
1. Click "Import CSV"
2. Select file
3. Data validates and loads
4. Start working immediately

## 🎉 Benefits

1. **Clean Start** - No confusion about removing sample data
2. **User Control** - Users own their data from the start
3. **Better UX** - Clear instructions guide new users
4. **Professional** - Production-ready empty state
5. **Flexible** - Easy to add data manually or bulk import

Enjoy your clean, empty table! 🚀
