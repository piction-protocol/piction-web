import { createAction } from '@reduxjs/toolkit'

interface CreateAccountSuccessPayload {
  accessToken: string
  redirectTo: string
}

export const createAccountSuccess = createAction<CreateAccountSuccessPayload>("account/createAccountSuccess")