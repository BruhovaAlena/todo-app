import { toast } from 'react-toastify';

export const errorToast = () =>
  toast.error('Something went wrong!', {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
