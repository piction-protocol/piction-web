import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { createAccountSuccess } from "modules/account/actions";
import { createAccount } from "modules/account/requests";

export interface SignupFormData {
  loginId: string
  email: string
  password: string
  passwordCheck: string
  username: string
  agree: boolean
}

function useSignupForm({ redirectTo } = { redirectTo: "/" }) {
  const dispatch = useDispatch()
  const {
    register,
    errors,
    setError,
    handleSubmit
  } = useForm<SignupFormData>()

  const submitForm = handleSubmit(async (data: SignupFormData) => {
    try {
      const res = await createAccount(data)
      dispatch(createAccountSuccess({
        accessToken: res.accessToken,
        redirectTo
      }))
    } catch(error) {
      const { field, message } = error.response.data
      setError(field, "validation", message)
    }
  })

  return {
    register,
    errors,
    submitForm
  }
}

export default useSignupForm