import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store.ts';
import App from './App.tsx';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Loader from './shared/components/Loader.tsx';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
);
