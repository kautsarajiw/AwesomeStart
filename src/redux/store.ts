import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import authReducer from './slices/authSlice';


// Konfigurasi persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// Membuat persisted reducer
const persistedReducer = persistReducer(persistConfig, authReducer);

// Konfigurasi store Redux dengan middleware
export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Nonaktifkan serializable check untuk mendukung redux-persist
    }),
});

// Membuat persistor untuk persist state
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
