import React, { useState } from 'react';
import './App.css';
import type { RootState } from '../src/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  Flex,
  Spinner,
  useToast,
} from '@chakra-ui/react';

// services
import octokit from './services/octokit';

// features user
import { setUsers } from './features/users/userSlicer';

// type user
import type { User } from './features/users/userSlicer';

// components
import ListUser from './components/ListUser';

export default function App() {
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showingUser, setShowingUser] = useState<boolean>(false);
  const [showingUserSearch, setShowingUserSearch] = useState<string>('');
  const [isLoadingSearchUser, setIsLoadingSearchUser] = useState<boolean>(false);
  const users = useSelector((state: RootState) => state.users.users);
  const dispatch = useDispatch();

  const handleSelectUser = (user: User) => {
    setSelectedUser(prev => (prev?.id === user.id ? null : user));
  };

  const handleSearch = async () => {
    if (search.trim().length > 0) {
      setIsLoadingSearchUser(true);
      try {
        const result = await octokit.request('GET /search/users', {
          q: search,
          per_page: 5,
        });

        if (result.data) {
          if (result.data.items.length > 0) {
            setShowingUser(true);
            setShowingUserSearch(search);
            dispatch(
              setUsers({
                total_count: result.data.items.length,
                list: result.data.items.map(item => ({
                  id: item.id,
                  name: item.login,
                  repos_url: item.repos_url,
                  type: item.type,
                }))
              })
            );
            setIsLoadingSearchUser(false);
          } else {
            setShowingUser(false);
            setShowingUserSearch(search);
            dispatch(
              setUsers({
                total_count: 0,
                list: []
              })
            );
            setIsLoadingSearchUser(false);
          }
        }
      } catch (error) {
        setIsLoadingSearchUser(false);
        setShowingUserSearch(search);
        toast({
          title: 'Error',
          description: (error as Error)?.message || 'Something went wrong',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      }
    } else {
      toast({
        title: 'Error',
        description: 'Username cannot be empty',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <Box
      minW="100vw"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      style={{overflow: 'auto'}}
    >
      <Box width="300px"> 
        <VStack spacing={4} width="100%" maxWidth="container.xl" padding={4}>
          <Input
            placeholder="Enter username"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <Button
            background="#0099e5"
            fontSize="sm"
            color="white"
            size="md"
            borderRadius="2px"
            width="full"
            onClick={handleSearch}
            isLoading={isLoadingSearchUser}
          >
            Search
          </Button>
          {showingUser && (
            <Flex w="100%">
              <Text fontSize="14px">
                Showing users for "{showingUserSearch}"
              </Text>
            </Flex>
          )}
          {isLoadingSearchUser ? (
            <Spinner />
          ) : (
            <ListUser
              users={users.list}
              selectedUser={selectedUser}
              handleSelectUser={handleSelectUser}
              showingUserSearch={showingUserSearch}
            />
          )}
        </VStack>
      </Box>
    </Box>
  );
}
