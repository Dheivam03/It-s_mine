import { Box, Flex, Spinner } from '@chakra-ui/react'
import React from 'react'
import SideBar from '../components/SideBar/SideBar'
import { useLocation } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../Firebase/Firebase'
import Navbar from '../Navbar/Navbar'
import useAuthStore from '../store/authStore'


export const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading, error] = useAuthState(auth);
  const authuser = useAuthStore();
  const canRenderSidebar = user && pathname !== '/auth';
  const canRenderNavbar = !user && pathname !== '/auth' && !loading;

  const checkingUserIsAuth = !user && loading;
  if (checkingUserIsAuth) return <PageLayoutSpinner />;

  return (
    <Flex flexDir={ canRenderNavbar ? "column" : "row" }>
      {/* Side bar */}
      {canRenderSidebar ?
        (<Box w={{ base: '70px', md: '240px' }}>
          <SideBar />
        </Box>) : null}

      {canRenderNavbar ? <Navbar /> : null}

      {/* page content */}
      <Box flex={1} w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }} mx={'auto'} >
        {children}
      </Box>
    </Flex>
  )
}

const PageLayoutSpinner = () => {
  return (
    <Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
      <Spinner size='xl' />
    </Flex>
  );
};
