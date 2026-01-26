import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putUserInfo } from '../putUserInfo';
import { UpdateUserInfoPayload } from '../types/userInfos';

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: (data: UpdateUserInfoPayload) => putUserInfo(data),
    onSuccess: () => {
      // Invalidate user info query if it exists
      void queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });

  return {
    updateProfileMutation,
  };
}
