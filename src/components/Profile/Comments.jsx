import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react'
import React from 'react'
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import {timeAgo} from '../../utils/timeAgo'

const Comments = ({ comment }) => {
  const { userProfile,isLoading } = useGetUserProfileById(comment.createdBy);

  if (isLoading) return <CommentSkeleton />
  return (
    <Flex gap={4}>
        <Avatar size={'sm'} src={userProfile.profilePicURL} alr='profile pic' />
        <Flex direction={'column'} 
            alignItems={'start'} gap={2}
        >
            <Text fontSize={12} fontWeight={'bold'}>{userProfile.username}</Text>
            <Text fontSize={12} color={'whiteAlpha.500'}>{timeAgo(comment.createdAt)}</Text>
        </Flex >
        <Text fontSize={14}>{comment.comment} </Text>
    </Flex>
  )
}

export default Comments;

const CommentSkeleton = () => {
	return (
		<Flex gap={4} w={"full"} alignItems={"center"}>
			<SkeletonCircle h={10} w='10' />
			<Flex gap={1} flexDir={"column"}>
				<Skeleton height={2} width={100} />
				<Skeleton height={2} width={50} />
			</Flex>
		</Flex>
	);
};