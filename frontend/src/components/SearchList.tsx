// import { Card, CardContent, List, ListItem, TextField, Typography } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
// import { useAuthVerify } from "../hooks/useAuthVerify";

// interface SearchListProps {
//     label: string;
//     type: "users" | "teams";
// }

// export default function SearchList({ label, type }: SearchListProps) {
//     const [users, setUsers] = useState([]);

//     useAuthVerify();

//     const handleList = async () => {
//         const accessToken = localStorage.getItem("accessToken");

//         try {
//             const response = await fetch("http://localhost:8080/users", {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             });

//             const json = await response.json();
//             setUsers(json.data);
//         } catch (err) {
//             console.error("Error: ", err);
//         }
//     };

//     useEffect(() => {
//         handleList();
//     }, []);

//     const navigate = useNavigate();

//     return (
//         <>
//             <TextField id='filled-basic' label={label} variant='filled' />
//             <List>
//                 {Array.isArray(users) &&
//                     users.map((user: any, index: number) => (
//                         <ListItem key={index} disableGutters>
//                             <Card
//                                 onClick={() => navigate(`/dashboard/profile/${user._id}`)}
//                                 sx={{
//                                     width: "100%",
//                                     padding: 2,
//                                     cursor: "pointer",
//                                     "&:hover": {
//                                         backgroundColor: "#272727",
//                                     },
//                                 }}>
//                                 <CardContent>
//                                     <Typography variant='h6'>{user.username}</Typography>
//                                     <Typography variant='body2'>
//                                         {user.roles && user.roles.length > 0
//                                             ? `Roles: ${user.roles.join(", ")}`
//                                             : "No roles"}
//                                     </Typography>
//                                 </CardContent>
//                             </Card>
//                         </ListItem>
//                     ))}
//             </List>
//         </>
//     );
// }
import { List, ListItem, TextField, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthVerify } from "../hooks/useAuthVerify";

interface SearchListProps {
    label: string;
    type: "users" | "teams";
}

export default function SearchList({ label, type }: SearchListProps) {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    useAuthVerify();

    const handleList = async () => {
        const accessToken = localStorage.getItem("accessToken");

        try {
            const response = await fetch(`http://localhost:8080/${type}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const json = await response.json();
            setItems(json.data); // assuming { result: 200, data: [...] }
        } catch (err) {
            console.error("Error fetching", type, ":", err);
        }
    };

    useEffect(() => {
        handleList();
    }, []);

    return (
        <>
            <TextField id='filled-basic' label={label} variant='filled' fullWidth />
            <List>
                {Array.isArray(items) &&
                    items.map((item: any, index: number) => (
                        <ListItem key={index} disableGutters>
                            <Card
                                variant='outlined'
                                onClick={() => {
                                    if (type === "users") {
                                        navigate(`/dashboard/profile/${item._id}`);
                                    } else {
                                        navigate(`/dashboard/team/${item._id}`);
                                    }
                                }}
                                sx={{
                                    width: "100%",
                                    cursor: "pointer",
                                    "&:hover": { backgroundColor: "#272727" },
                                }}>
                                <CardContent>
                                    <Typography variant='h6'>
                                        {type === "users" ? item.username : item.teamName}
                                    </Typography>
                                    {type === "users" && (
                                        <Typography variant='body2' color='text.secondary'>
                                            Roles:{" "}
                                            {item.roles?.length
                                                ? item.roles.join(", ")
                                                : "No roles"}
                                        </Typography>
                                    )}
                                    {type === "teams" && (
                                        <>
                                            <Typography variant='h6'>{item.jamName}</Typography>
                                            <Typography variant='body2' color='text.secondary'>
                                                Available Roles:{" "}
                                                {item.availableRoles?.length
                                                    ? item.availableRoles.join(", ")
                                                    : "No roles"}
                                            </Typography>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </ListItem>
                    ))}
            </List>
        </>
    );
}
