// import { Button, Flex, Image, Text } from "@chakra-ui/react"
// import { useSignInWithGoogle } from "react-firebase-hooks/auth";
// import { auth, firestore } from "../../Firebase/Firebase";
// import useShowToast from "../../hooks/useShowToast";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import useAuthStore from "../../store/authStore";

// export const GoogleAuth = ({ status }) => {

//     const showToast = useShowToast();
//     const [signInWithGoogle, error] = useSignInWithGoogle(auth);
//     const loginUser = useAuthStore((state) => state.login);

//     const handleGoogleAuth = async () => {
//         try {
//             const newUser = await signInWithGoogle();
//             if (!newUser && error) {
//                 showToast('Error', error.message, 'error');
//                 return;
//             }
//             const userRef = doc(firestore, 'users', newUser.user.uid);
//             const userSnap = await getDoc(userRef);


//             if (userSnap.exists()) {
//                 const userDoc = userSnap.data();
//                 localStorage.setItem('user-info', JSON.stringify(userDoc));
//                 loginUser(userDoc);
//             } else {
//                 const userDoc = {
//                     uid: newUser.user.uid,
//                     email: newUser.user.email,
//                     username: newUser.user.email.split("@")[0],
//                     fullName: newUser.user.displayName,
//                     bio: "",
//                     profilePicURL: newUser.user.photoURL,
//                     followers: [],
//                     following: [],
//                     posts: [],
//                     createdAt: Date.now(),
//                 }
//                 await setDoc(doc(firestore, 'users', newUser.user.uid), userDoc);
//                 localStorage.setItem('user-info', JSON.stringify(userDoc));
//                 loginUser(userDoc);
//             }

//         } catch (error) {

//         }


//     }

//     return (
//         <>
//             <Flex justifyContent={'center'} alignItems={'center'} cursor={'pointer'}
//                 onClick={handleGoogleAuth}
//             >
//                 <Image src='/google.png' alt='google logo' w={5} />
//                 <Text color={'blue.500'} mx={2} my={2}>
//                     {status ? "sign in" : 'sign up'} with google
//                 </Text>
//             </Flex>
//         </>
//     )
// }

import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, firestore } from "../../Firebase/Firebase";
import useShowToast from "../../hooks/useShowToast";
import { doc, getDoc, setDoc } from "firebase/firestore";
import useAuthStore from "../../store/authStore";

export const GoogleAuth = ({ status }) => {
  const showToast = useShowToast();
  const provider = new GoogleAuthProvider();
  const loginUser = useAuthStore((state) => state.login);

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const newUser = result.user;

      if (!newUser) {
        showToast("Error", "Google sign-in failed.", "error");
        return;
      }

      const userRef = doc(firestore, "users", newUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userDoc = userSnap.data();
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      } else {
        const userDoc = {
          uid: newUser.uid,
          email: newUser.email,
          username: newUser.displayName,
          fullname: newUser.email.split('@')[0],
          bio: "",
          profilePicURL: newUser.photoURL,
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };

        await setDoc(doc(firestore, "users", newUser.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      showToast("Error", "An error occurred. Please try again.", "error");
    }
  };

  return (
    <>
      <Flex justifyContent="center" alignItems="center" cursor="pointer" onClick={handleGoogleAuth}>
        <Image src="/google.png" alt="google logo" w={5} />
        <Text color="blue.500" mx={2} my={2}>
          {status ? "Sign in" : "Sign up"} with Google
        </Text>
      </Flex>
    </>
  );
};
