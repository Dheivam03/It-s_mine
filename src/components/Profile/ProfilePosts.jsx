import { Box, Grid, Skeleton, VStack,Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import ProfilePost from "./ProfilePost"
import useGetUserPosts from "../../hooks/useGetUserPosts";


const ProfilePosts = () => {
    const { isLoading, posts } = useGetUserPosts();
    const noPostsFound = !isLoading && posts.length === 0;
	if (noPostsFound) return <NoPostsFound />;

    return (
        <Grid
            templateColumns={{ sm: 'repeat(1,1fr)', md: 'repeat(3,1fr)' }}
            gap={1}
            columnGap={1}
        >
            {isLoading && [0, 1, 2].map((_, ind) => (
                <VStack key={ind} alignItems={'flex-start'} gap={4}>
                    <Skeleton w={'full'}>
                        <Box h={'300px'} >content wrapped</Box>
                    </Skeleton>
                </VStack>
            ))}
            {!isLoading && (
                <>
                    {posts.map((post,id)=>(
                        <ProfilePost post={post} key={id} />
                    ))}
                </>
            )}
        </Grid>
    )
}

export default ProfilePosts

const NoPostsFound = () => {
	return (
		<Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>
			<Box fontSize={"2xl"}>No Posts Found🤔</Box>
		</Flex>
	);
};