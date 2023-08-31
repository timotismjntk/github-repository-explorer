import { configureStore } from '@reduxjs/toolkit'

// redux slicer
import userReducer from '../features/users/userSlicer'
import repositoriesReducer from '../features/repositories/repositoriesSlicer'

export const store = configureStore({
  reducer: {
    users: userReducer,
    repositories: repositoriesReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch