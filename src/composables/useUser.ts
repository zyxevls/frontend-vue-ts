import { useQuery } from "@tanstack/vue-query";
import Cookies from "js-cookie";

import Api from "services/api";

export interface User
{
    id: number;
    name: string;
    email: string;
}

export const useUser = () =>
{
    return useQuery<User[]>({
        queryKey: ["users"],
        queryFn: async () =>
        {
            const token = Cookies.get("token");

            const response = await Api.get("/users", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const candidates: unknown[] = [
                response.data,
                response.data?.data,
                response.data?.users,
                response.data?.data?.data,
                response.data?.data?.users,
            ];

            const users = candidates.find((item) => Array.isArray(item));
            return (users as User[] | undefined) ?? [];
        }
    });
}
