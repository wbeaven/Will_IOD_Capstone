import { useEffect } from "react";
import { useNavigate } from "react-router";

export const useAuthVerify = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");

                let res = await fetch("http://localhost:8080/auth/verify", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    credentials: "include",
                });

                if (res.status === 401 || res.status === 403) {
                    const refreshRes = await fetch("http://localhost:8080/auth/refresh", {
                        method: "GET",
                        credentials: "include",
                    });

                    if (!refreshRes.ok) {
                        throw new Error("Refresh failed");
                    }

                    const refreshData = await refreshRes.json();
                    const newAccessToken = refreshData.accessToken;
                    localStorage.setItem("accessToken", newAccessToken);

                    res = await fetch("http://localhost:8080/auth/verify", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${newAccessToken}`,
                        },
                        credentials: "include",
                    });

                    if (!res.ok) {
                        throw new Error("Retry after refresh failed");
                    }
                }

                const data = await res.json();
                console.log("User verified:", data);
            } catch (err) {
                console.error("Verification failed:", err);
                navigate("/signin");
            }
        };

        verify();
    }, [navigate]);
};
