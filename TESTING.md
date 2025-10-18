# Testing Guide - Dynamic Data Table Manager

## How to Test All Features

### Prerequisites
```bash
cd d:\frontend
npm install
npm run dev
# Open http://localhost:3000
```

---

## Feature Testing Steps

### 1. ✅ Table Display
**Expected:** Table shows with 4 columns (Name, Email, Age, Role) and 10 rows

**Test:**
- [ ] Table renders without errors
- [ ] All columns are visible
- [ ] Data is properly formatted
- [ ] Page shows "Rows per page: 10"

---

### 2. ✅ Sorting
**Expected:** Clicking column headers sorts data ASC/DESC

**Test:**
1. Click "Name" column header
   - [ ] Data sorts alphabetically A-Z
   - [ ] Arrow points up
2. Click "Name" again
   - [ ] Data sorts Z-A
   - [ ] Arrow points down
3. Click "Age" column header
   - [ ] Numbers sort 26, 27, 28... or reverse

---

### 3. ✅ Global Search
**Expected:** Search filters across all columns

**Test:**
1. Type "Developer" in search box
   - [ ] Only Developer roles show
   - [ ] Count updates
2. Type "john"
   - [ ] Only John Doe shows
3. Type "28"
   - [ ] Shows rows with age 28
4. Clear search
   - [ ] All rows return

---

### 4. ✅ Pagination
**Expected:** Navigate through pages

**Test:**
1. Note "1-10 of 10"
2. Change "Rows per page" to 5
   - [ ] Shows "1-5 of 10"
   - [ ] Only 5 rows visible
3. Click next page arrow
   - [ ] Shows "6-10 of 10"
   - [ ] Next 5 rows displayed

---

### 5. ✅ Inline Editing
**Expected:** Double-click edits cells

**Test:**
1. Double-click any Name cell
   - [ ] Text field appears
   - [ ] Can type new value
2. Click green checkmark
   - [ ] Value saves
   - [ ] Edit mode exits
3. Double-click Age, enter "abc"
   - [ ] Red error appears
   - [ ] Error message shows
4. Enter valid age "25"
   - [ ] Error clears
   - [ ] Can save

---

### 6. ✅ Row Edit Mode
**Expected:** Edit button edits entire row

**Test:**
1. Click Edit icon on a row
   - [ ] All cells become editable
   - [ ] Save/Cancel icons appear
2. Change multiple values
3. Click Save (green checkmark)
   - [ ] All changes saved
   - [ ] Row exits edit mode
4. Click Edit again, make changes
5. Click Cancel (red X)
   - [ ] Changes discarded
   - [ ] Original values restored

---

### 7. ✅ Batch Editing
**Expected:** Edit multiple rows then save all

**Test:**
1. Double-click cell in row 1, make change (don't save yet)
2. Double-click cell in row 2, make change
   - [ ] "Save All Changes" button appears
   - [ ] "Cancel All Changes" button appears
3. Click "Save All Changes"
   - [ ] All edits committed
   - [ ] Buttons disappear
4. Edit 2 more rows
5. Click "Cancel All Changes"
   - [ ] All edits discarded

---

### 8. ✅ Delete Row
**Expected:** Delete with confirmation

**Test:**
1. Click Delete (trash) icon on any row
   - [ ] Confirmation dialog appears
   - [ ] Shows warning message
2. Click "Cancel"
   - [ ] Dialog closes
   - [ ] Row remains
3. Click Delete again
4. Click "Delete" in dialog
   - [ ] Row removed from table
   - [ ] Count decreases

---

### 9. ✅ Manage Columns Modal
**Expected:** Add, show/hide, reorder columns

**Test:**
1. Click "Manage Columns" button
   - [ ] Modal opens
2. **Add Column:**
   - Type "Department" in input
   - Select "Text" type
   - Click + button
   - [ ] "Department" appears in list
   - [ ] Checkbox is checked
3. **Hide Column:**
   - Uncheck "Email"
   - Close modal
   - [ ] Email column hidden in table
4. **Show Column:**
   - Reopen modal
   - Check "Email"
   - [ ] Email column reappears
5. **Reorder:**
   - Drag "Age" above "Name"
   - Close modal
   - [ ] Column order changes in table

---

### 10. ✅ CSV Import
**Expected:** Upload CSV file

**Test:**
1. Click "Import CSV" button
   - [ ] File picker opens
2. Select `public/sample-data.csv`
   - [ ] Success message appears
   - [ ] Table shows 15 rows (from CSV)
   - [ ] Data replaces old data
3. Try importing invalid file (e.g., .txt)
   - [ ] Error message appears

---

### 11. ✅ CSV Export
**Expected:** Download CSV file

**Test:**
1. Hide some columns (e.g., Email)
2. Click "Export CSV" button
   - [ ] File downloads
   - [ ] Opens in Excel/text editor
   - [ ] Contains visible columns only
   - [ ] Data matches table
   - [ ] File named "table-export.csv"

---

### 12. ✅ Theme Toggle
**Expected:** Switch between light/dark modes

**Test:**
1. Click sun/moon icon
   - [ ] Background changes
   - [ ] Text colors invert
   - [ ] Table styling updates
   - [ ] Animation is smooth
2. Refresh page
   - [ ] Theme persists
3. Toggle again
   - [ ] Returns to original theme

---

### 13. ✅ Column Drag & Drop
**Expected:** Reorder columns by dragging

**Test:**
1. Open "Manage Columns"
2. Hover over drag handle (≡ icon)
   - [ ] Cursor changes
3. Drag "Role" to top
   - [ ] Visual feedback during drag
   - [ ] Column moves in list
4. Close modal
   - [ ] Table reflects new order
5. Refresh page
   - [ ] Order persists

---

### 14. ✅ State Persistence
**Expected:** Data persists after refresh

**Test:**
1. Edit some data
2. Add a custom column
3. Hide a column
4. Change theme
5. Refresh page (F5)
   - [ ] All edits remain
   - [ ] Custom column still there
   - [ ] Hidden column still hidden
   - [ ] Theme unchanged

---

### 15. ✅ Validation
**Expected:** Validation prevents invalid data

**Test:**
1. **Email validation:**
   - Edit email to "invalid"
   - [ ] Red border appears
   - [ ] Error message: "Invalid email format"
   - [ ] Cannot save
   - Change to "valid@email.com"
   - [ ] Error clears

2. **Age validation:**
   - Edit age to "abc"
   - [ ] Error: "Age must be a number between 1 and 149"
   - Edit to "200"
   - [ ] Error appears
   - Edit to "30"
   - [ ] Error clears

3. **Required fields:**
   - Clear name field
   - [ ] Error: "This field is required"

---

### 16. ✅ Responsive Design
**Expected:** Works on mobile

**Test:**
1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select "iPhone 12 Pro"
   - [ ] Toolbar wraps
   - [ ] Buttons are touch-friendly
   - [ ] Table scrolls horizontally
   - [ ] Modal fits screen
   - [ ] All features work
4. Try "iPad" size
   - [ ] Layout adjusts
   - [ ] No overlapping elements

---

### 17. ✅ Error Handling
**Expected:** User-friendly error messages

**Test:**
1. Import invalid CSV
   - [ ] Error notification appears
   - [ ] Message is clear
   - [ ] Can dismiss
2. Enter invalid data
   - [ ] Inline error shows
   - [ ] Red styling applied

---

### 18. ✅ Performance
**Expected:** Fast and smooth

**Test:**
1. Add 50 rows (import large CSV)
2. Search quickly
   - [ ] Results instant
3. Sort different columns
   - [ ] No lag
4. Edit multiple cells
   - [ ] Responsive input

---

## Build Testing

### Test Production Build
```bash
npm run build
```
**Expected:**
- [ ] ✓ Compiled successfully
- [ ] ✓ Linting passes
- [ ] ✓ Type checking passes
- [ ] No errors or warnings

### Test Production Server
```bash
npm start
```
**Expected:**
- [ ] Server starts on port 3000
- [ ] All features work in production mode
- [ ] No console errors

---

## Browser Compatibility

### Test in Multiple Browsers
- [ ] Chrome (primary)
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

## Accessibility Testing

### Keyboard Navigation
1. Press Tab
   - [ ] Focus moves logically
   - [ ] Can reach all buttons
2. Press Enter on buttons
   - [ ] Activates correctly
3. Press Escape in modal
   - [ ] Modal closes

### Screen Reader
- [ ] Buttons have labels
- [ ] Table has structure
- [ ] Form fields have labels

---

## Final Checklist

### Core Features
- [ ] Table displays correctly
- [ ] Sorting works
- [ ] Search works
- [ ] Pagination works
- [ ] Columns manageable
- [ ] CSV import works
- [ ] CSV export works

### Bonus Features
- [ ] Inline editing works
- [ ] Validation works
- [ ] Row actions work
- [ ] Theme toggle works
- [ ] Drag-and-drop works
- [ ] Responsive works

### Quality
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Build succeeds
- [ ] Fast performance
- [ ] Clean UI/UX

---

## Bug Reporting Template

If you find issues:

```
**Bug Title:** [Brief description]

**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Behavior:**


**Actual Behavior:**


**Browser:** Chrome/Firefox/Safari/Edge
**Version:** 

**Screenshots:** (if applicable)
```

---

## Test Results Summary

Date Tested: _____________
Tester: _____________

**Overall Result:** ✅ Pass / ❌ Fail

**Notes:**


**Issues Found:**
1. 
2. 
3. 

---

**All tests passing = Ready for production! 🎉**
