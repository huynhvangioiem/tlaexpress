import { toast } from 'react-toastify';

export function toastSuccess(message) {
  if (message) {
    toast.success(message);
  }
}

export function toastError(error) {
  let toastData = '';
  if (typeof error === 'string') {
    toastData = error;
  } else if (typeof error === 'object') {
    Object.keys(error).forEach(key => {
      var errorElement =  error[key];
      toastData += errorElement[0];
    });
  }
  if (toastData && typeof toastData === 'string' && toastData !== '') {
    toast.error(toastData);
  }
}
