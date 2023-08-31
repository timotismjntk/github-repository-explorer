import React from 'react';

// type
import type { User } from '../features/users/userSlicer';
import { Box, Button, Text } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import ListRepositories from './ListRepositories';

export default function ListUser({
    users,
    handleSelectUser,
    selectedUser,
    showingUserSearch,
}: {
    users: User[], 
    selectedUser: User | null,
    handleSelectUser: (user: User) => void,
    showingUserSearch: string,
}) {

  if (users.length === 0 && showingUserSearch.length > 0) {
    return (
        <Box width="100%">
          <Text>No users found</Text>
        </Box>
      );
  }

  return (
    <>
      {users.map((user: User, index: number) => (
        <Box key={index} width="100%">
          <Button
            onClick={() => handleSelectUser(user)}
            justifyContent="space-between"
            width="100%"
            backgroundColor="#f3f4f7"
            borderRadius="0"
            padding={1}
          >
            <Text>{user.name}</Text>
            {selectedUser?.id === user.id ? (
              <ChevronUpIcon />
            ) : (
              <ChevronDownIcon />
            )}
          </Button>
          {selectedUser?.id === user.id && (
            <ListRepositories user={selectedUser} />
          )}
        </Box>
      ))}
    </>
  );
}
