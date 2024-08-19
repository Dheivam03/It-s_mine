import { Box,InputGroup, InputRightElement, Text, useDisclosure } from '@chakra-ui/react'
import {
	Button,
	Flex,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";
import Comment from "../Profile/Comments";
import React, { useRef, useState ,useEffect} from 'react'
import { CommentLogo, NotificationsLogo, UnlikeLogo } from '../../assets/constants'
import usePostComment from '../../hooks/usePostComment';
import useAuthStore from '../../store/authStore';
import useLikePost from '../../hooks/useLikePost';

export const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
	const { isCommenting, handlePostComment } = usePostComment();
	const [comment, setComment] = useState("");
	const authUser = useAuthStore((state) => state.user);
	const commentRef = useRef(null);
	const { handleLikePost, isLiked, likes } = useLikePost(post);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleSubmitComment = async () => {
		await handlePostComment(post.id, comment);
		setComment("");
	};

    return (
        <Box marginTop={'auto'}>
            <Flex alignItems={'center'} w={'full'} my={2} gap={4}>
                <Box onClick={handleLikePost} cursor={'poiter'} fontSize={18}>
                    {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
                </Box>
                <Box cursor={'poiter'} fontSize={18} onClick={ ()=> commentRef.current.focus() } >
                    <CommentLogo />
                </Box>
            </Flex>
            <Text fontWeight={600} fontSize={'sm'}>
                {likes} Likes
            </Text>
            
            {!isProfilePage && <> <Text fontWeight={700}>
                {creatorProfile?.username} {" "}
                <Text as={'span'}  fontWeight={400}>
                    {post.caption}
                </Text>
            </Text>
            <Text fontSize={'sm'} color={'gray'} onClick={onOpen} >
                view all {post.comments.length} comments
            </Text>
                { authUser && (<CommentsModal isOpen={isOpen} onClose={onClose} post={post} />) }
            </>
            }
            <Flex fontSize={14} fontWeight={600} gap={2} w={'full'} alignItems={'center'} justifyContent={'space-between'} mb={4}>
                <InputGroup>
                    <Input placeholder='Add a comment...' variant={'flushed'} onChange={(e)=> setComment(e.target.value)} 
                        ref={commentRef}
                    />
                    <InputRightElement color={'blue.500'} _hover={{color:'white'}} transition={'0.2s ease=in-out'}
                        isLoading={isCommenting} onClick={handleSubmitComment}
                    > 
                        Post
                    </InputRightElement>
                </InputGroup>
            </Flex>
        </Box>
    )
}

const CommentsModal = ({ isOpen, onClose, post }) => {
	const { handlePostComment, isCommenting } = usePostComment();
	const commentRef = useRef(null);
	const commentsContainerRef = useRef(null);
	const handleSubmitComment = async (e) => {
		e.preventDefault();
		await handlePostComment(post.id, commentRef.current.value);
		commentRef.current.value = "";
	};

	useEffect(() => {
		const scrollToBottom = () => {
			commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
		};
		if (isOpen) {
			setTimeout(() => {
				scrollToBottom();
			}, 100);
		}
	}, [isOpen, post.comments.length]);


	return (
		<Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
			<ModalOverlay />
			<ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
				<ModalHeader>Comments</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<Flex
						mb={4}
						gap={4}
						flexDir={"column"}
						maxH={"250px"}
						overflowY={"auto"}
						ref={commentsContainerRef}
					>
						{post.comments.map((comment, idx) => (
							<Comment key={idx} comment={comment} />
						))}
					</Flex>
					<form onSubmit={handleSubmitComment} style={{ marginTop: "2rem" }}>
						<Input placeholder='Comment' size={"sm"} ref={commentRef} />
						<Flex w={"full"} justifyContent={"flex-end"}>
							<Button type='submit' ml={"auto"} size={"sm"} my={4} isLoading={isCommenting}>
								Post
							</Button>
						</Flex>
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};