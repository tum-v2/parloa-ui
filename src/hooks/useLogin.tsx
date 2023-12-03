import { Auth } from '@/api/schemas/auth';
import { LoginAccessCode, postLoginAccessCode } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';

const useLogin = () => {
  const mutation = useMutation<Auth, Error, LoginAccessCode>({
    mutationKey: ['login'],
    mutationFn: (variables: LoginAccessCode) => postLoginAccessCode(variables)
  });
  return mutation;
};

export default useLogin;
