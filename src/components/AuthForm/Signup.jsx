import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Button, Flex, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { useState } from "react";
import useSignupWithEmail from "../../hooks/useSignupWithEmail.js";

export const Signup = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        fullname:"",
    });
    const [visible, setVisible] = useState(false);
    const { loading, error, signup } = useSignupWithEmail();

    return (
        <>
            <Input type="text" placeholder="username" size={'sm'}
            value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })} />
            <Input type="text" placeholder="fullname" size={'sm'}
            value={inputs.fullname} onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })} />
            <Input type='email' fontSize={12} size={'sm'} placeholder='Email'
                value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />

            <InputGroup >
                <Input type={!visible ? 'password' : 'text'} fontSize={12} size={'sm'} placeholder='Password'
                    value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
                <InputRightElement h={'full'}>
                    <Button variant={'ghost'} size={'sm'} onClick={() => setVisible(!visible)} >
                        {visible ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                </InputRightElement>
            </InputGroup>

            <InputGroup >
                <Input type={!visible ? 'password' : 'text'} fontSize={12} size={'sm'} placeholder='Confirm Password'
                    value={inputs.confirmpassword} onChange={(e) => setInputs({ ...inputs, confirmpassword: e.target.value })} />
                <InputRightElement h={'full'}>
                    <Button variant={'ghost'} size={'sm'} onClick={() => setVisible(!visible)} >
                        {visible ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                </InputRightElement>
            </InputGroup>

            {error && <Alert status='error' fontSize={13} p={2} borderRadius={4} >
                <AlertIcon fontSize={13} />
                {error.message} {console.log(error)}
            </Alert>}

            <Button colorScheme='blue' w='full' size={'sm'}
                isLoading={loading} onClick={()=> {signup(inputs)} }
                fontSize={14}>
                Sign Up
            </Button>
        </>
    )
}
