import { useNavigate } from "react-router";

export const useLogout = () => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const response = await fetch("http://localhost:8080/auth/logout", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 204) {
                localStorage.removeItem("accessToken");
                navigate("/signin");
            } else {
                console.error("Unexpected logout response:", response.status);
            }
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return logout;
};
