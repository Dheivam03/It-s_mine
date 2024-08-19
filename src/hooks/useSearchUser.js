import React,{ useState } from 'react'
import useShowToast from './useShowToast';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import { firestore } from '../Firebase/Firebase';

const useSearchUser = () => {
    const [user,setUser] = useState(null);
    const [isLoading,setIsLoading] = useState(false)
    const showToast = useShowToast()
    

    const getUserProfile = async(username)=> {
        try {
            setIsLoading(true)
            const q=query(collection(firestore,'users'),where('username','==',username))
            const userSnap = await getDocs(q)
            if(userSnap.empty){
                return showToast('Error','No User Found','error')
            }
            userSnap.forEach(doc => {
                setUser(doc.data())
            });

        } catch (error) {
            console.log(error.message)
            showToast('Error',error.message,'error')
            setUser(null)
        } finally {
            setIsLoading(false)
        }
    }
  return { user, isLoading, getUserProfile, setUser }
}

export default useSearchUser;