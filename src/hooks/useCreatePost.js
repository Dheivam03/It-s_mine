import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from '../store/authStore'
import usePostStore from "../store/postStore";
import useUserProfileStore from "../store/userProfileStore";
import { useLocation } from "react-router-dom";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL,ref , uploadString } from "firebase/storage";
import { firestore, storage } from '../Firebase/Firebase';

function useCreatePost() {
	const showToast = useShowToast();
	const [isLoading, setIsLoading] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const createPost = usePostStore((state) => state.createPost);
	const addPost = useUserProfileStore((state) => state.addPost);
	const userProfile = useUserProfileStore((state) => state.userProfile);
	const { pathname } = useLocation();

	const handleCreatePost = async (selectedFile, caption) => {
		if (isLoading) return;
		if (!selectedFile) {
            showToast('Error','Please select an image','error')
            throw new Error("Please select an image");
        }
		setIsLoading(true);
		const newPost = {
			caption: caption,
			likes: [],
			comments: [],
			createdAt: Date.now(),
			createdBy: authUser.uid,
		}; 

		try {
			const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
			const userDocRef = doc(firestore, "users", authUser.uid);
			const imageRef = ref(storage, `posts/${postDocRef.id}`);
            // const imageRef = await (await storage.ref()).child(`posts/${postDocRef.id}`);

            await uploadString(imageRef, selectedFile, "data_url");
			newPost.imageURL = await getDownloadURL(imageRef);
             
            await updateDoc(postDocRef, { imageURL: newPost.imageURL });
			await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });

			if (userProfile.uid === authUser.uid) createPost({ ...newPost, id: postDocRef.id });

			if (pathname !== "/" && userProfile.uid === authUser.uid) addPost({ ...newPost, id: postDocRef.id });

			showToast("Success", "Post created successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
            console.log(error.message)
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, handleCreatePost };
}

export default useCreatePost