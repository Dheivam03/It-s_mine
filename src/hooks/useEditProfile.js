import { useState } from 'react'
import useUserProfileStore from '../store/userProfileStore';
import useAuthStore from '../store/authStore';
import { firestore, storage } from '../Firebase/Firebase';
import useShowToast from './useShowToast';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';

const useEditProfile = () => {
    const showToast = useShowToast()
    const [ isUpdating,setIsUpdating ] = useState(false);
    const {setUserProfile} = useUserProfileStore()
    const {user,setUser} = useAuthStore();

    const editProfile = async (inputs,selectedFile) =>{
        if(isUpdating || !user) return;

        const storageRef = ref(storage,`profilePics/${user.uid}`);
        const docRef = doc(firestore,'users',user.uid);

        let URL = "";
        try {

            if (selectedFile) {
				await uploadString(storageRef, selectedFile, "data_url");
				URL = await getDownloadURL(ref(storage, `profilePics/${user.uid}`));
			}
            setIsUpdating(true)

			const updatedUser = {
				...user,
				fullname: inputs.fullname || user.fullname,
				username: inputs.username || user.username,
				bio: inputs.bio || user.bio,
				profilePicURL: URL || user.profilePicURL,
			};

            await updateDoc(docRef, updatedUser);
            setUser(updatedUser);
            localStorage.setItem('user-info',JSON.stringify(updatedUser));
            setUserProfile(updatedUser);
            showToast('Success','Profile updated successfuly','success')
        } catch (error) {
            showToast('Error',error.message,'error');
            console.log(error.message)
        } finally {{
            setIsUpdating(false);
        }}
    }

  return {editProfile,isUpdating}
}

export default useEditProfile