import { type Id, toast } from 'react-toastify';

import { IPC_EVENTS } from '@common/constants';

const notify = (
  message: string,
  type: 'info' | 'success' | 'warning' | 'error' = 'info',
  image?: string
) => {
  Notification.requestPermission().then(() => {
    // eslint-disable-next-line no-new
    new Notification(type.toLocaleUpperCase(), {
      body: message,
      icon: image,
      data: { time: new Date(Date.now()).toString() },
      image,
    });
  });

  window.ipcRenderer.send(IPC_EVENTS.CHANGE_BADGE_COUNT, {
    title: type.toLocaleUpperCase(),
    body: message,
    badgeCount: 1,
  });

  return '';
};

export default function notification(
  message: string,
  type: 'info' | 'success' | 'warning' | 'error' | 'desktop' = 'info',
  image?: string
): Id {
  if (type === 'desktop') {
    return notify(message, 'info', image);
  }

  return toast[type](message, {
    position: 'bottom-right',
    toastId: type,
    autoClose: 1500,
    updateId: type,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}
