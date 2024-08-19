import { Box, Container, Flex } from '@chakra-ui/react'
import React from 'react'
import FeedPosts from '../../components/FeedPost/FeedPosts'
import { SuggestedUsers } from '../../components/SuggestedUser/SuggestedUsers'

export const HomePage = () => {
  return (
    <Container maxW={'container.lg'}>
      <Flex gap={20}>
        <Box flex={2} py={10} >
          <FeedPosts />
        </Box>
        <Box maxW={'300px'} display={{base:'none',md:'block'}} flex={3} mr={20}>
          <SuggestedUsers />
        </Box>
      </Flex>
    </Container>
  )
}
