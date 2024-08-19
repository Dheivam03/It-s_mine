import { Box, Flex, VStack, Image,Text } from '@chakra-ui/react'
import React, { useState } from 'react';
import { GoogleAuth } from './GoogleAuth';
import { Login } from './Login';
import { Signup } from './Signup';

export const AuthForm = () => {
    const [IsLogin,setIsLogin] = useState(true);
    const [input,setInputs] = useState({
        email:"",
        password: "",
        confirmpassword: "",
    });

  return (<>
    <Box border={'1px solid gray'} borderRadius={4} px={4}>
        <VStack spacing={4}>
            <Image src='/logo.png' alt='logo' h={24} cursor={'pointer'} />
            { IsLogin ? <Login /> : <Signup /> }
            {/* OR text */}
            <Flex justifyContent={'center'} alignItems={'center'} w={'full'} my={2} gap={1}>
                <Box flex={2} h={'1px'} bg={'gray.100'} />
                <Text mx={1} color={'white'}>OR</Text>
                <Box flex={2} h={'1px'} bg={'gray.100'} />
            </Flex>

            <GoogleAuth status={IsLogin} />
        </VStack>
    </Box>
    <Box border={'1px solid gray'} borderRadius={4} padding={5}>
        <Flex alignItems={'center'} justifyContent={'center'}>
            <Box mx={2} fontSize={14}>
                { IsLogin ? "Don't have an account?" : "Already have an account?"}
            </Box>
            <Box mx={2} fontSize={14} onClick={()=>{setIsLogin(!IsLogin)}} cursor={'pointer'} color={'blue.500'}>
                { IsLogin ? "Register Now" : "Sign In"}
            </Box>
        </Flex>
    </Box>
  </>  
  )
}
