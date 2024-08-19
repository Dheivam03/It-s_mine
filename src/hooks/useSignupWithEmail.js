import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../Firebase/Firebase';
import { Alert, AlertIcon } from '@chakra-ui/react';
import { useState } from 'react';
import useShowToast from './useShowToast';



const useSignupWithEmail = () => {
    const [
        createUserWithEmailAndPassword,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const showToast = useShowToast();

    const signup = async (inputs) => {

        if (!inputs.username || !inputs.email || !inputs.password || !inputs.confirmpassword) {
            showToast('ERROR','kindly fill all the feilds','error');
            return
        }

        if (inputs.confirmpassword !== inputs.password) {
            showToast('ERROR','pass!=cnfm_pass','error');
            return;
        }

        const usersRef = collection(firestore, "users");

		const q = query(usersRef, where("username", "==", inputs.username));
		const querySnapshot = await getDocs(q);
        // console.log(querySnapshot)

        if(!querySnapshot.empty) {
            showToast("Error","Username already taken",'error');
            return;
        }

        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);

            if (!newUser && error) {
                showToast('ERROR','Can not create a new user this time','error');
                return;
            }

            if (newUser) {
                const userDoc = {
                    uid: newUser.user.uid,
                    fullanme: inputs.fullname,
                    email: inputs.email,
                    username: inputs.username,
                    bio: "",
                    profilePicURL: "",
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now(),
                };

                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc));
            }

        } catch (error) {
            console.log(error)
        }

    }

    return { loading, error, signup }
}

export default useSignupWithEmail;
