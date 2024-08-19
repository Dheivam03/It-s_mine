import { Container, Flex,Link, Skeleton, SkeletonCircle, Text, VStack } from "@chakra-ui/react"
import ProfileHeader from "../../components/Profile/ProfileHeader"
import ProfilePosts from "../../components/Profile/ProfilePosts"
import ProfileTag from "../../components/Profile/ProfileTag"
import { Link as RouterLink, useParams } from "react-router-dom"
import useGetUserProfile from "../../hooks/useGetUserProfile"

const ProfilePage = () => {

    const {username} = useParams();
    const { userProfile,isLoading} = useGetUserProfile(username);
    const notFound = !userProfile && !isLoading
    
    if(notFound) return <UserNotFound />

    return (
        <Container maxW={'container.lg'} py={5}>
            <Flex py={10} flexDirection={'column'} pl={{ base: 4, md: 10 }} w={'full'} mx={'auto'} px={4}>
            {!isLoading && userProfile && <ProfileHeader />}
            {isLoading && <ProfileHeaderSkeleton />}
            </Flex>
            <Flex px={{ base:2 , md:4 }} maxW={'full'} mx={'auto'}
              direction={'column'} >
                <ProfileTag />
                <ProfilePosts />
            </Flex>
        </Container>
    )
}
// borderColor={'whiteAlpha.300'} borderTop={'1px solid'}
export default ProfilePage

const ProfileHeaderSkeleton = () => {
	return (
		<Flex
			gap={{ base: 4, sm: 10 }}
			py={10}
			direction={{ base: "column", sm: "row" }}
			justifyContent={"center"}
			alignItems={"center"}
		>
			<SkeletonCircle size='24' />

			<VStack alignItems={{ base: "center", sm: "flex-start" }} gap={2} mx={"auto"} flex={1}>
				<Skeleton height='12px' width='150px' />
				<Skeleton height='12px' width='100px' />
			</VStack>
		</Flex>
	);
};

const UserNotFound = () => {
	return (
		<Flex flexDir='column' textAlign={"center"} mx={"auto"}>
			<Text fontSize={"2xl"}>User Not Found</Text>
			<Link as={RouterLink} to={"/"} color={"blue.500"} w={"max-content"} mx={"auto"}>
				Go home
			</Link>
		</Flex>
	);
};