import { useMutation } from '@tanstack/react-query';

export function useBaseMutation<TData = unknown, TVariables = void>(
  api: (variables: TVariables) => Promise<TData>,
) {
  return useMutation<TData, Error, TVariables>({
    mutationFn: api,
  });
}
