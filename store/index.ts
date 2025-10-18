import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, createMigrate } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tableReducer from './slices/tableSlice';
import themeReducer from './slices/themeSlice';

// Migration to convert Set to Array for editingRows
const migrations = {
  1: (state: any) => {
    return {
      ...state,
      table: {
        ...state.table,
        editingRows: [], // Reset editingRows to empty array
        editedData: {}, // Reset editedData
      },
    };
  },
  2: (state: any) => {
    // Force reset editing state to ensure it's properly initialized as array
    return {
      ...state,
      table: {
        ...state.table,
        editingRows: Array.isArray(state.table?.editingRows) ? state.table.editingRows : [],
        editedData: state.table?.editedData || {},
      },
    };
  },
  3: (state: any) => {
    // Clear all hardcoded data - start with empty table
    console.log('Migration v3: Clearing hardcoded data');
    return {
      ...state,
      table: {
        ...state.table,
        rows: [], // Clear all existing rows
        editingRows: [],
        editedData: {},
      },
    };
  },
};

const persistConfig = {
  key: 'root',
  version: 3, // Bumped version to clear hardcoded data
  storage,
  whitelist: ['table', 'theme'],
  migrate: createMigrate(migrations, { debug: true }), // Enable debug to see migration logs
};

const rootReducer = combineReducers({
  table: tableReducer,
  theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Removed ignoredPaths - editingRows is now an array (serializable)
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
