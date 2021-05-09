import { toast } from 'react-toastify';

const defaultOpts = {
  autoClose: 3000,
  pauseOnHover: true,
  position: 'bottom-left'
}

const Toastr = {
  info: (msg) => {
    return toast.info(msg, defaultOpts);
  },
  error: (msg) => {
    return toast.error(msg, defaultOpts);
  }
}

export default Toastr
