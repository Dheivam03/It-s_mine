import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../Firebase/Firebase";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";

const useLogin = () => {
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  const signIn = async (input) => {
    if (!input.email || !input.password) {
      showToast('Error', 'Please fill all fields.', 'error');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(input.email, input.password);

      if (userCredential) { // Check if login was successful (userCredential exists)
        const userDocRef = doc(firestore, 'users', userCredential.user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists) {
          localStorage.setItem('user-info', JSON.stringify(userDocSnap.data()));
          loginUser(userDocSnap.data());
        } else {
          console.warn("User document not found in Firestore. Consider creating it on first login.");
        }
      } else {
        console.warn("Login failed (userCredential is null).");
        showToast('Error', 'Login failed. Please check your credentials.', 'error');
      }
    } catch (error) {
      console.error("Error during login:", error);
      showToast('Error', error.message, 'error');
    }
  };

  return { signIn, loading, error };
};

export default useLogin;
