import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const successNotify = (msg: string) => {
    toast.success(msg, {
        position: toast.POSITION.BOTTOM_CENTER
    });
};
export const errorNotify = (msg: string) => {
    toast.error(msg, {
        position: toast.POSITION.BOTTOM_CENTER
    });
};
