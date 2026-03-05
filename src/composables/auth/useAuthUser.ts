import Cookies from "js-cookie";

interface User {
    id: number;
    name: string;
    email: string;
}

export const useAuthUser = (): User | null => {
    const userCookie = Cookies.get("user");
    return userCookie ? JSON.parse(userCookie) as User : null;
}