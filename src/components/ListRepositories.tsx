import React, { useEffect, useState } from 'react';
import { StarIcon } from '@chakra-ui/icons';
import { Box, Flex, Spinner, Text, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

// features
import { setRepositories } from '../features/repositories/repositoriesSlicer';

// type
import type { User } from '../features/users/userSlicer';
import type { Repository } from '../features/repositories/repositoriesSlicer';
import type { RootState } from '../store';

// service
import octokit from '../services/octokit';

export default function ListRepositories({ user }: { user: User }) {
  const toast = useToast();
  const dispatch = useDispatch();
  const [isLoadingSearchRepository, setIsLoadingSearchRepository] = useState<boolean>(false);
  const repositories = useSelector((state: RootState) => state.repositories.repositories);

  useEffect(() => {
    if (user) {
      const fetchRepos = async () => {
        try {
          setIsLoadingSearchRepository(true);
          const result = await octokit.request(`GET /users/${user.name}/repos`);

          if (result.data) {
            if (result.data.length > 0) {
              dispatch(
                setRepositories({
                  list: result.data.map((item: Repository) => ({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    stargazers_count: item.stargazers_count,
                  })),
                })
              );
              setIsLoadingSearchRepository(false);
            } else {
              setIsLoadingSearchRepository(false);
              dispatch(setRepositories({ list: [] }));
            }
          }
        } catch (error) {
          console.log(error);
          setIsLoadingSearchRepository(false);
          toast({
            title: 'Error',
            description: (error as Error)?.message || 'Something went wrong',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top',
          });
        }
      };

      fetchRepos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (isLoadingSearchRepository) {
    return (
      <Box width="100%" display="flex" justifyContent="center" p={4}>
        <Spinner />
      </Box>
    );
  }

  if (repositories.list.length === 0) {
    return (
      <Box width="100%" display="flex" justifyContent="center" p={4}>
        <Text fontSize="12px" fontWeight="semibold">
          No repositories found for {user.name}
        </Text>
      </Box>
    );
  }

  return (
    <>
      {repositories.list.slice(0, 2).map((item: Repository, index: number) => (
        <Box
            key={index}
            paddingBlock={4}
            paddingLeft={1}
            paddingRight="8px"
            paddingBottom="10%"
            backgroundColor="#caccd1"
            width="95%"
            mt={2}
            ml={3}
        >
            <Flex justifyContent="space-between">
                <Text fontSize="14px" fontWeight="bold">
                    {item.name}
                </Text>
                <Flex alignItems="center" justifyContent="space-between">
                    <Text fontSize="12px" fontWeight="bold" mr={1}>
                        {item.stargazers_count}
                    </Text>
                    <StarIcon color="black" boxSize="10px" />
                </Flex>
            </Flex>
            <Text fontSize="12px">{item.description}</Text>
        </Box>
      ))}
    </>
  );
}
