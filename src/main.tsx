import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './pages/router';
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { platonDev } from './utils/platon-dev';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Notification from './components/notification/notification';
import { store } from './store';
import { Provider } from 'react-redux';
import './index.less';

const { provider } = configureChains([platonDev], [publicProvider()]);
const client = createClient({
  autoConnect: true,
  provider,
});

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8C72FF',
    },
  },
  shape: {
    borderRadius: 10,
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <WagmiConfig client={client}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
          <Notification />
        </ThemeProvider>
      </WagmiConfig>
    </Provider>
  </React.StrictMode>,
);
