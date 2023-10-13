/* eslint-disable import/no-extraneous-dependencies */
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { IpcRendererEvent } from 'electron';
import App from './App';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <ToastContainer />
  </>
);

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*');

// Use contextBridge
window.ipcRenderer.on(
  'main-process-message',
  (_event: IpcRendererEvent, message: string) => {
    // eslint-disable-next-line no-console
    console.log(message);
  }
);
