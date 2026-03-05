import Cookies from "js-cookie";

import { useRouter } from "vue-router";

export const useLogout = () => {
    const router = useRouter();
    const logout = (): void => {
        Cookies.remove("user");
        Cookies.remove("token");

        router.push("/login");
    }
    return { logout };
}