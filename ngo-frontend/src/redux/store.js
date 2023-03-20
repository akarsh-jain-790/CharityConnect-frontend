import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './Slices/authenticationSlice';
import booksReducer from './Slices/bookSlice';
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
// const booksPersistedReducer = persistReducer(persistConfig, booksReducer);

export const store = configureStore({
    reducer: {
        authentication: authenticationPersistedReducer,
        book: booksReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


export let persistor = persistStore(store);
