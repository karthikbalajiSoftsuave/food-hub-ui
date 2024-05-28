import { toast } from "react-toastify";
type Ttoast = {
  toast: string;
  toastType: "warn" | "info" | "success" | "error";
};
const Toaster = (props: Ttoast) => {
  return toast[props.toastType](props.toast, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
export default Toaster;
