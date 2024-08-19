import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { SuggestedHeader } from './SuggestedHeader'
import { SuggestedUser } from './SuggestedUser'
import useGetSuggestedUsers from '../../hooks/useGetSuggestedUsers'
import useSearchUser from '../../hooks/useSearchUser'

export const SuggestedUsers = () => {
    const { setUser } = useSearchUser();
    const { isLoading, suggestedUsers } = useGetSuggestedUsers();

    if (isLoading) return null;
    return (
        <VStack my={8} px={6} gap={4}>
            <SuggestedHeader />

            {suggestedUsers.length !== 0 && (
				<Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
					<Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
						Suggested for you
					</Text>
					<Text fontSize={12} fontWeight={"bold"} _hover={{ color: "gray.400" }} cursor={"pointer"}>
						See All
					</Text>
				</Flex>
			)}

			{suggestedUsers.map((user) => (
				<SuggestedUser user={user} key={user.id} setUser={setUser} />
			))}

            {/* Footer */}

            <Box fontSize={12} color={'gray.500'} mt={2} fontWeight={'medium'}>
            © 2024 Built By{" "}
                <Link href={'#'} color={'blue.500'} cursor={'poiter'} fontSize={14} target='_blank'>
                    heisaprogrammer
                </Link> 
            </Box>
        </VStack>
    )
}
