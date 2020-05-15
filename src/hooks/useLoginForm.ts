import { useForm } from 'react-hook-form';
import useCurrentUser from 'hooks/useCurrentUser'

interface LoginFormData {
  loginId: string
  password: string
  rememberme: boolean
}

function useLoginForm({ redirectTo } = { redirectTo: ""}) {
  const { register, handleSubmit } = useForm<LoginFormData>({
    defaultValues:{
      rememberme: true
    }
  })

  const {
    loginErrorMessage: errorMessage,
    requestAccessToken
  } = useCurrentUser();

  const submitForm = handleSubmit((data: LoginFormData) => {
    requestAccessToken({
      ...data,
      redirectTo
    })
  })

  return {
    register,
    errorMessage,
    submitForm
  }
}

export default useLoginForm