import { toast, type Id } from 'react-toastify';

export default function notification(
  message: string,
  type: 'info' | 'success' | 'warning' | 'error' = 'info'
): Id {
  return toast[type](message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}
