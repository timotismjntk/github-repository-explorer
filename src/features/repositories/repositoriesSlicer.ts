import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Repository {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
}

export interface RepositoriesState {
  repositories: {
    list: Repository[];
  }
}

const initialState: RepositoriesState = {
    repositories: {
    list: [],
  },
}

export const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    setRepositories: (state, action: PayloadAction<{
      list: Repository[];
    }>) => {
      state.repositories.list = action.payload.list;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setRepositories } = repositoriesSlice.actions

export default repositoriesSlice.reducer