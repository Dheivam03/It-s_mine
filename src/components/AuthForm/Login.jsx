import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Button, Input ,InputGroup, InputRightElement  } from "@chakra-ui/react";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

export const Login = () => {
    const [input, setInputs] = useState({
        email: "",
        password: "",
    });
    const { signIn,loading,error } = useLogin();
    const [visible, setVisible] = useState(false);
    return (
        <>
            <Input type='email' fontSize={12} size={'sm'} placeholder='Email'
                value={input.email} onChange={(e) => setInputs({ ...input, email: e.target.value })} />
            <InputGroup >
                <Input type={!visible ? 'password' : 'text'} fontSize={12} size={'sm'} placeholder='Password'
                    value={input.password} onChange={(e) => setInputs({ ...input, password: e.target.value })} />
                <InputRightElement h={'full'}>
                    <Button variant={'ghost'} size={'sm'} onClick={() => setVisible(!visible)} >
                        {visible ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                </InputRightElement>
            </InputGroup>
            {error && (
				<Alert status='error' fontSize={13} p={2} borderRadius={4}>
					<AlertIcon fontSize={12} />
					{error.message}
				</Alert>
			)}
            <Button colorScheme='blue' w='full' size={'sm'} fontSize={14}
                isLoading={loading} onClick={()=> {signIn(input)}}
            >
               Sign In
            </Button>

            
            
        </>
    )
}
