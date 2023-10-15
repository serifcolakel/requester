/* eslint-disable import/no-extraneous-dependencies */
import ReactDOM from 'react-dom/client';
import { IpcRendererEvent } from 'electron';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);

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
