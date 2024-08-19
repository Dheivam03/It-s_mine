import {
	Box,
	Button,
	CloseButton,
	Flex,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	Tooltip,
	useDisclosure,
} from "@chakra-ui/react";
import { CreatePostLogo } from "../../assets/constants";
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import usePriviewImg from '../../hooks/useProviewImg'
import useShowToast from "../../hooks/useShowToast";
import useCreatePost from "../../hooks/useCreatePost";

const CreatePost = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const imgRef = useRef(null)
	const { selectedFile, handleImageChange, setSelectedFile } = usePriviewImg();
	const [caption, setCaption] = useState('')
	const showToast = useShowToast()
	const { isLoading,handleCreatePost } = useCreatePost()

	const handlePriview = () => {
		try {
			handleCreatePost(selectedFile,caption);
			onClose();
			setCaption('');
			setSelectedFile(null)
		} catch (error) {
			showToast('Error', error.message, 'error')
		}
	}

	return (
		<>
			<Tooltip
				hasArrow
				label={"Create"}
				placement='right'
				ml={1}
				openDelay={500}
				display={{ base: "block", md: "none" }}
			>
				<Flex
					onClick={onOpen}
					alignItems={"center"}
					gap={4}
					_hover={{ bg: "whiteAlpha.400" }}
					borderRadius={6}
					p={2}
					w={{ base: 10, md: "full" }}
					justifyContent={{ base: "center", md: "flex-start" }}
				>
					<CreatePostLogo />
					<Button display={{ base: "none", md: "block" }} isLoading={isLoading} bg={'transparent'}>Create</Button>
				</Flex>
			</Tooltip>

			<Modal isOpen={isOpen} onClose={onClose} size='xl'>
				<ModalOverlay />

				<ModalContent bg={"black"} border={"1px solid gray"}>
					<ModalHeader>Create Post</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Textarea placeholder='Post caption...' onChange={(e) => { setCaption(e.target.value) }} />

						<BsFillImageFill
							style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
							size={16} onClick={() => { imgRef.current.click() }}
						/>
						<Input type='file' hidden ref={imgRef} onChange={handleImageChange} />
						{selectedFile && (
							<Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}>
								<Image src={selectedFile} alt='Selected img' />
								<CloseButton
									position={"absolute"}
									top={2}
									right={2}
									onClick={() => {
										setSelectedFile(null);
									}}
								/>
							</Flex>
						)}
					</ModalBody>

					<ModalFooter>
						<Button mr={3} onClick={handlePriview} >Post</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CreatePost;


