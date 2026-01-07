import toast from 'react-hot-toast';

export const toastStyle = {
  width: '100%',
  backgroundColor: '#333',
  color: '#fff',
  fontSize: '16px',
  marginBottom: '80px',
};

export const showToast = {
  success: (msg: string) =>
    toast.success(msg, {
      position: 'bottom-center',
      style: toastStyle,
    }),

  error: (msg: string) =>
    toast.error(msg, {
      position: 'bottom-center',
      style: toastStyle,
    }),

  loading: (msg: string) =>
    toast.loading(msg, {
      position: 'bottom-center',
      style: toastStyle,
    }),

  dismiss: () => toast.dismiss(),
};
