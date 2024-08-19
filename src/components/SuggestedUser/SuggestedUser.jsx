import { Avatar, Flex, Text, VStack ,Link, Button} from '@chakra-ui/react'

import React, { useState } from 'react'
import useFollowUser from '../../hooks/useFollowUser'
import useAuthStore from '../../store/authStore'


export const SuggestedUser = ({user,setUser}) => {
    const authUser = useAuthStore((state)=> state.user)
    // const { setUser } = useAuthStore();
    const { handleFollowUser,isLoading,isFollowing } = useFollowUser(user.uid)
    const handleFollow = ()=>{
        handleFollowUser();
        setUser({
            ...user,
            followers:isFollowing
            ? user.followers.filter((follower) => follower.uid !== authUser.uid)
            : [...user.followers, authUser],
        })   
    }
    const searchOwn = user.uid==authUser.uid
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
        <Flex alignItems={'center'} gap={2}>
            <Avatar size={'lg'} src={user.profilePicURL} />
            <VStack >
            <Text fontSize={12} fontWeight={'bold'} >
                {user.username}
            </Text>
            <Text fontSize={12} fontWeight={'medium'} color={'gray.500'}>
                {user.followers.length} followers
            </Text>
            </VStack>
        </Flex>
        {!searchOwn && <Button h={'max-content'} color={'blue.300'} onClick={handleFollow} cursor={'poiter'} bg={'transparent'} p={0} fontSize={13} fontWeight={'medium'}
            _hover={{ color:'white.300' }} isLoading={isLoading} >
            {isFollowing?'Unfollow':'Follow'}
            </Button> }
    </Flex>
  )
}
