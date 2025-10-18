'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import MUIThemeProvider from './MUIThemeProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MUIThemeProvider>
          {children}
        </MUIThemeProvider>
      </PersistGate>
    </Provider>
  );
}
