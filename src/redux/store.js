import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './Slices/authenticationSlice';
import ngosReducer from './Slices/ngoSlice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['error_message', 'success_message']
  }

const authenticationPersistedReducer = persistReducer(persistConfig, authenticationReducer);

export const store = configureStore({
    reducer: {
        authentication: authenticationPersistedReducer,
        ngos: ngosReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


export let persistor = persistStore(store);
