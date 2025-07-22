import { configureStore } from '@reduxjs/toolkit';
import terminalReducer from '@/features/terminal/terminalSlice';

export const store = configureStore({
  reducer: {
    terminal: terminalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['terminal/addCommand'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 