import { createChatSimulation } from '@/api/chat';
import { CreateChat, CreateChatResponse } from '@/api/schemas/chat';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useCreateChatSimulation = () => {
  const router = useRouter();

  const mutation = useMutation<CreateChatResponse, Error, CreateChat>({
    mutationKey: ['createSimulation'],
    mutationFn: (simulation: CreateChat) => createChatSimulation(simulation),
    onSuccess: response => {
      router.push(`/simulations/details/${response._id}/chat`);
    },
    onError: error => {
      console.log(error);
    }
  });
  return mutation;
};

export default useCreateChatSimulation;
