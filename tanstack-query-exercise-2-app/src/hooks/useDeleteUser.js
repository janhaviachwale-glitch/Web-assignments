
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../api/users";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, simulateFailure = false }) =>
      deleteUser({ userId, simulateFailure }),

    onMutate: async ({ userId }) => {
      // Cancel ongoing requests so they don't overwrite our optimistic update.
      await queryClient.cancelQueries({
        queryKey: ["users"],
      });

      // Save the current list in case the deletion fails.
      const previousUsers = queryClient.getQueryData(["users"]);

      // Immediately remove the selected user from the UI.
      queryClient.setQueryData(["users"], (oldUsers) =>
        oldUsers?.filter((user) => user.id !== userId),
      );

      return { previousUsers };
    },

    onError: (_error, _variables, context) => {
      // Restore the original list if the deletion fails.
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
    },

    onSettled: () => {
      // Refresh the query to reconcile the cache with the server.
      return queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}
