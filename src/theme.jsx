
import { extendTheme } from '@chakra-ui/react'
import {mode} from '@chakra-ui/theme-tools'
import { ChakraProvider } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const style = {
  global: (props)=>({
    body: {
      bg: mode('gray.100','#000')(props),
      color: mode('gray.900','whiteAlpha.900',(props)),
    },
  }),
};

const theme = extendTheme({ config, style })

export default theme