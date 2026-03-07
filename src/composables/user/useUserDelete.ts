import { useMutation } from "@tanstack/vue-query";

import Api from "services/api";

export const useUserDelete = () =>
{
    return useMutation({
        mutationFn: async (userId: number) =>
        {
            const response = await Api.delete(`/users/${userId}`);
            return response.data;
        }
    });
};