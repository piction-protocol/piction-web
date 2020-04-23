import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Cookies } from 'react-cookie'

export interface CurrentUser {
  loginId: string
  email: string
  username: string
  picture: string
  createdAt: number
}

export interface Authentication {
  accessToken: string | null
  error: string | null
}

interface CurrentUserState {
  auth: Authentication
  user: CurrentUser | null
}

export interface LoginPayload {
  loginId: string
  password: string
  rememberme: boolean
  redirectTo: string | null
}

const cookies = new Cookies();

const initialState: CurrentUserState = {
  auth: {
    accessToken: cookies.get('access_token') as string || null,
    error: null
  },
  user: null
}

const slice = createSlice({
  name: "currentUser",
  initialState: initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<LoginPayload>) => {
      state.auth.accessToken = null
      state.auth.error = null
      state.user = null
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.auth.accessToken = action.payload
      state.auth.error = null
      state.user = null
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.auth.accessToken = null
      state.auth.error = action.payload
      state.user = null
    },
    logoutRequest: (state) => {
      state.auth.accessToken = null
      state.auth.error = null
      state.user = null
    },
    fetchCurrentUserRequest(state) {
      state.user = null
    },
    fetchCurrentUserSuccess(state, action: PayloadAction<CurrentUser>) {
      state.user = action.payload
    },
    fetchCurrentUserFailure(state, action) {
      state.user = null
    }
  }
})

export const { 
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  fetchCurrentUserRequest,
  fetchCurrentUserSuccess,
  fetchCurrentUserFailure
} = slice.actions;
export default slice.reducer;