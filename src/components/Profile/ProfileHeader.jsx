import { Avatar, AvatarGroup, Button,  Flex, Text, VStack, useDisclosure } from "@chakra-ui/react"
import useUserProfileStore from "../../store/userProfileStore"
import EditProfile from "./EditProfile";
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";
// import { useDisclosure } from "@chakra-ui/react";

const ProfileHeader = () => {
  const {isOpen,onOpen,onClose} = useDisclosure();
  const {user} = useAuthStore()
  const {userProfile} = useUserProfileStore();
  const {handleFollowUser,isUpdating,isFollowing} = useFollowUser(userProfile.uid);
  const viewOwnProfile = user && user.username==userProfile.username
  const viewOthersProfile = user && user.username!=userProfile.username

  return (
    <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: 'column', sm: "row" }}>
      <AvatarGroup size={{ base: 'xl', md: '2xl' }} justifyContent={'center'} alignSelf={'flex-start'} mx={'auto'} >
        <Avatar  src={userProfile.profilePicURL}  />

      </AvatarGroup>

      <VStack alignItems={'start'} gap={2} mx={'auto'} flex={1} >
        <Flex gap={4} direction={{ base: 'column', sm: 'row' }}
          justifyContent={{ base: 'center', sm: 'flex-start' }}
          alignItems={'center'}
          w={'full'}
        >
          <Text fontSize={{ base: 'md', sm: 'lg' }}>
            {userProfile.username}
          </Text>

          { userProfile && (<Flex gap={4} alignItems={'center'} justifyContent={'center'} >
            {viewOwnProfile && <Button bg={'white'} color={'black'} _hover={{ bg: 'whiteAlpha.800' }} size={{ base: 'xs', md: 'sm' }}
              onClick={onOpen}
            >
              Edit profile
            </Button>}
            {viewOthersProfile && <Button bg={'blue.500'} color={'whiteAlpha.800'} _hover={{ bg: 'blue.700' }} size={{ base: 'xs', md: 'sm' }}
              onClick={handleFollowUser} isLoading={isUpdating}
            >
            
            {isFollowing? 'unfollow':'follow' }
            </Button>}
          </Flex>)}
        </Flex>
        <Flex alignItems={'center'} gap={{ base: 2, sm: 4 }} >
            <Text fontSize={{base:'xs',md:'sm'}}>
              <Text fontWeight={'bold'} mr={1} as={'span'}>{userProfile.posts.length}</Text>
              Post
            </Text>
            <Text fontSize={{base:'xs',md:'sm'}}>
              <Text fontWeight={'bold'} mr={1} as={'span'}>{userProfile.followers.length}</Text>
              followers
            </Text>
            <Text fontSize={{base:'xs',md:'sm'}}>
              <Text fontWeight={'bold'} mr={1} as={'span'}>{userProfile.following.length}</Text>
              following
            </Text>
          </Flex>
          <Text fontWeight={'bold'} fontSize={'sm'}>{userProfile.fullname}</Text>
          <Text fontSize={'sm'} >{userProfile.bio}</Text>
      </VStack>
      {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
    </Flex>
  )
}

export default ProfileHeader