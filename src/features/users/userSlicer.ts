import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface User {
  id: number;
  name: string;
  repos_url: string;
  type: string;
}

export interface UserState {
  users: {
    total_count: number;
    list: User[];
  }
}

const initialState: UserState = {
  users: {
    total_count: 0,
    list: [],
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<{
      total_count: number;
      list: User[];
    }>) => {
      state.users.total_count = action.payload.total_count;
      state.users.list = action.payload.list;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUsers } = userSlice.actions

export default userSlice.reducer