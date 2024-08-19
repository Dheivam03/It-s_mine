import { useSignOut } from "react-firebase-hooks/auth"
import { auth } from "../Firebase/Firebase";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";


const useLogout = () => {
    const [ signout, loggingOut, error] = useSignOut(auth);
    const showToast = useShowToast();
    const logoutUser = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = async () =>{
        try {
            await signout();
            localStorage.removeItem('user-info');
            logoutUser();
            navigate('/auth');
        } catch (error) {
            showToast('ERROR',error.message,'error');
        }
    }

  return {handleLogout,loggingOut,error}
}

export default useLogout



