import React, { useState } from 'react'
import useShowToast from './useShowToast'

const useProviewImg = () => {
    const [selectedFile,setSelectedFile] = useState(null)
    const showToast = useShowToast()
    const handleImageChange = async (e)=>{
        const file=e.target.files[0]
        if(file && file.type.startsWith('image/')){
            if(file.size > 2*1024*1024){
                showToast('Error','selected img shold be < 2MB','error')
                setSelectedFile(null)
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
				setSelectedFile(reader.result);
			};

			reader.readAsDataURL(file);

        } else {
            showToast('Error','pls upload an image file','error');
        }
    }
  return { selectedFile,handleImageChange,setSelectedFile }
}

export default useProviewImg