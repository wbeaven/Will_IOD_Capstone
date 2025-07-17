import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    InputLabel,
    Select,
    OutlinedInput,
    Chip,
    MenuItem,
    DialogActions,
    Button,
    Typography,
    type SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

interface User {
    _id: string;
    username: string;
    email: string;
    description?: string;
    roles: string[];
}

export default function Profile() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [roles, setRoles] = useState<string[]>([]);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const getRoleColor = (
        role: string
    ): "primary" | "secondary" | "success" | "warning" | "error" => {
        if (role.includes("Artist")) return "primary";
        if (role.includes("Programmer")) return "secondary";
        if (role.includes("Designer")) return "success";
        if (role.includes("Musician")) return "warning";
        return "error";
    };

    const allRoles = ["Designer", "Programmer", "Musician", "3D Artist", "2D Artist"];

    const { id: viewedUserId } = useParams();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchUser = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            console.error("No access token found");
            return;
        }

        const decodedUser = JSON.parse(atob(token.split(".")[1]));
        const currentUserId = decodedUser.id;
        setCurrentUserId(currentUserId);

        const idToFetch = viewedUserId || currentUserId;

        try {
            const res = await fetch(`http://localhost:8080/users/${idToFetch}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const json = await res.json();
            setUser(json.data);
            setRoles(json.data.roles || []);
        } catch (err) {
            console.error("Error fetching user:", err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [viewedUserId]);

    const handleRoleChange = (event: SelectChangeEvent<string[]>) => {
        const { value } = event.target;
        setRoles(typeof value === "string" ? value.split(",") : value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            description: formData.get("description"),
            roles,
        };

        const accessToken = localStorage.getItem("accessToken");
        try {
            const response = await fetch(`http://localhost:8080/users/${user?._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log("User updated:", result);

            handleClose();
            fetchUser();
        } catch (err) {
            console.error("Error updating user:", err);
        }
    };

    const isOwner = currentUserId === viewedUserId || !viewedUserId;

    if (!user) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Edit user details</DialogTitle>
                    <DialogContent sx={{ pb: 0 }}>
                        <TextField
                            autoFocus
                            margin='dense'
                            id='description'
                            name='description'
                            label='Description'
                            type='text'
                            fullWidth
                            variant='standard'
                            defaultValue={user?.description}
                        />
                        <InputLabel id='roles-label' sx={{ pt: 3 }}>
                            Roles
                        </InputLabel>
                        <Select
                            id='roles'
                            label='Roles'
                            multiple
                            value={roles}
                            onChange={handleRoleChange}
                            input={<OutlinedInput id='filled-roles' label='Filled Roles' />}
                            renderValue={(selected) => (
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}>
                            {allRoles.map((role) => (
                                <MenuItem key={role} value={role}>
                                    {role}
                                </MenuItem>
                            ))}
                        </Select>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type='submit'>Submit</Button>
                        </DialogActions>
                    </DialogContent>
                </form>
            </Dialog>

            <Typography variant='h3'>{user.username}</Typography>

            <Box sx={{ position: "fixed", top: 100, right: 60, display: "flex", gap: 6 }}>
                {isOwner && (
                    <Button variant='outlined' onClick={() => handleClickOpen()}>
                        Edit Profile
                    </Button>
                )}
            </Box>

            <Typography variant='h4' mt={3}>
                Description
            </Typography>
            <Typography mt={2}>{user.description || "No description provided."}</Typography>

            <Typography variant='h4' mt={3}>
                Roles
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", mt: 4, pl: 6, gap: 7 }}>
                {user.roles.length > 0 ? (
                    user.roles.map((role: string) => (
                        <Chip key={role} label={role} color={getRoleColor(role)} />
                    ))
                ) : (
                    <Typography>No roles</Typography>
                )}
            </Box>
        </Box>
    );
}
