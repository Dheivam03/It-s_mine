import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { BsBookmark, BsGrid3X3, BsSuitHeart } from 'react-icons/bs'

const ProfileTag = () => {
  return (
    <Flex
      justifyContent={'center'}
      gap={{base:4,md:10}}
      fontWeight={'bold'}
      w={'full'}
      textTransform={'uppercase'}
      >
        <Flex borderTop={'1px solid white'} alignItems={'center'} cursor={'poiter'} p={3} gap={1} >
          <Box fontSize={20} >
            <BsGrid3X3 fontWeight={'bold'}/>
          </Box>
          <Text fontSize={12} display={{base:'none',sm:'block'}}>Posts</Text>
        </Flex>
        <Flex  alignItems={'center'} cursor={'poiter'} p={3} gap={1} >
          <Box fontSize={20} >
            <BsBookmark fontWeight={'bold'}/>
          </Box>
          <Text fontSize={12} display={{base:'none',sm:'block'}}>Saved</Text>
        </Flex>
        <Flex  alignItems={'center'} cursor={'poiter'} p={3} gap={1} >
          <Box fontSize={20} >
            <BsSuitHeart  fontWeight={'bold'} />
          </Box>
          <Text fontSize={12} display={{base:'none',sm:'block'}}>Liked</Text>
        </Flex>
    </Flex>
  )
}

export default ProfileTag