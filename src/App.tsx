import { ToastContainer } from 'react-toastify';

import Providers from './providers';
import Routes from './routes';

function App() {
  return (
    <Providers>
      <Routes />
      <ToastContainer />
    </Providers>
  );
}

export default App;
