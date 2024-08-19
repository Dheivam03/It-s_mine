import { Avatar, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import useAuthStore from '../../store/authStore'
import useLogout from '../../hooks/useLogout'
import { Link } from 'react-router-dom'

export const SuggestedHeader = () => {
  const authUser = useAuthStore((state) => state.user)
  const { handleLogout, loggingOut } = useLogout();

  if (!authUser) return null;

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
      <Flex alignItems={'center'} gap={2}>
        <Link to={`${authUser.username}`} >
          <Avatar size={'lg'} src={authUser.profilePicURL} />
        </Link>
        <Link to={`${authUser.username}`}>
          <Text fontSize={12} fontWeight={'bold'} >
            {authUser.username}
          </Text>
        </Link>
      </Flex>
      <Button
        size={"xs"}
        background={"transparent"}
        _hover={{ background: "transparent" }}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.400"}
        onClick={handleLogout}
        isLoading={loggingOut}
        cursor={"pointer"}
      >
        Log out
      </Button>
    </Flex>
  )
}
