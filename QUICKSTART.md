# 🚀 Quick Start Guide

## Get the App Running in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to: **http://localhost:3000**

---

## 🎯 Quick Feature Tour (5 minutes)

### 1. Try Searching (30 seconds)
- Type "Developer" in the search box
- Notice how the table filters in real-time
- Clear the search to see all data again

### 2. Sort the Data (30 seconds)
- Click on the "Age" column header
- See the data sort from lowest to highest
- Click again to reverse the sort

### 3. Edit a Cell (1 minute)
- **Double-click** on any name in the table
- Change the name
- Click the green checkmark to save
- Click the red X to cancel

### 4. Manage Columns (1 minute)
- Click "Manage Columns" button
- Uncheck "Email" to hide it
- Add a new column called "Department" (type: Text)
- Drag columns to reorder them
- Close the modal and see your changes

### 5. Export Data (30 seconds)
- Click "Export CSV"
- Check your Downloads folder
- Open the CSV in Excel or any text editor

### 6. Import New Data (1 minute)
- Click "Import CSV"
- Select the `public/sample-data.csv` file
- See 15 rows loaded into the table

### 7. Toggle Theme (15 seconds)
- Click the sun/moon icon in the top right
- Watch the theme switch between light and dark
- Your preference is automatically saved

### 8. Delete a Row (30 seconds)
- Click the red trash icon on any row
- Confirm the deletion in the popup
- The row disappears from the table

---

## 🎨 Color Scheme

### Light Mode
- Background: #f5f5f5
- Paper: #ffffff
- Primary: #1976d2 (Blue)
- Secondary: #dc004e (Pink)

### Dark Mode
- Background: #121212
- Paper: #1e1e1e
- Primary: #90caf9 (Light Blue)
- Secondary: #f48fb1 (Light Pink)

---

## ⌨️ Keyboard Tips

- **Double-click**: Edit a cell
- **Enter/Tab**: While editing, saves and moves to next field
- **Escape**: Cancel editing
- **Click outside**: Auto-saves edit

---

## 📊 Sample Data Included

The app comes pre-loaded with 10 sample employees:
- Mix of Developers, Designers, and Managers
- Ages ranging from 26-45
- Valid email addresses
- Ready to edit, delete, or replace

---

## 🔧 Common Actions

### Add a New Column
1. Click "Manage Columns"
2. Type column name (e.g., "Salary")
3. Select type (Number for salary)
4. Click the + button

### Bulk Edit Multiple Rows
1. Double-click first cell to edit
2. Make your changes
3. Edit another row
4. Click "Save All Changes" to commit all edits

### Reset Everything
1. Clear browser data for localhost:3000
2. Refresh the page
3. Default data will reload

---

## 📱 Mobile-Friendly

The table works great on mobile:
- Toolbar buttons wrap on small screens
- Table scrolls horizontally if needed
- Touch-friendly buttons and controls
- Responsive spacing

---

## 🐛 Troubleshooting

**Q: Can't see my changes after refresh**  
A: Check if localStorage is enabled in your browser

**Q: CSV import failed**  
A: Ensure your CSV has headers and is comma-separated

**Q: Edit not saving**  
A: Check for validation errors (red border/text)

**Q: Build failed**  
A: Run `npm install` again to ensure all dependencies are installed

---

## 📦 Project Files Overview

```
Key Files You Might Want to Modify:

📄 types/index.ts
   └─ Add new TypeScript types here

📄 store/slices/tableSlice.ts
   └─ Modify table state logic here

📄 components/DataTable.tsx
   └─ Main table component

📄 utils/validation.ts
   └─ Add custom validation rules

📄 theme/index.ts
   └─ Customize colors and styling
```

---

## 🎓 What You'll Learn

By exploring this project, you'll understand:
- ✅ Redux Toolkit state management
- ✅ Material UI component library
- ✅ TypeScript type safety
- ✅ Next.js App Router
- ✅ CSV file handling
- ✅ Drag-and-drop interactions
- ✅ Form validation patterns
- ✅ localStorage persistence
- ✅ Responsive design techniques

---

## 🚢 Ready to Deploy?

```bash
# Build for production
npm run build

# Test production build locally
npm start

# Deploy to Vercel (recommended)
vercel deploy
```

---

**Need Help?** Check the main [README.md](./README.md) for detailed documentation!

**Happy Coding! 🎉**
