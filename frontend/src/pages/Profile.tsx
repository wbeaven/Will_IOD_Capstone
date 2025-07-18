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
    Card,
    List,
    ListItem,
    CardContent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

interface Team {
    _id: string;
    teamName: string;
    jamName: string;
    availableRoles: string[];
    members: string[];
}

interface Screenshot {
    img: {
        data: string;
        contentType: string;
    };
}

interface User {
    _id: string;
    username: string;
    email: string;
    description?: string;
    roles: string[];
    screenshots?: Screenshot[];
    teams: Team[];
}

export default function Profile() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [roles, setRoles] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
    const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

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

    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
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

    const handleClose = () => {
        setOpen(false);
    };

    const handleImageClick = (src: string) => {
        setEnlargedImage(src);
        setIsImageDialogOpen(true);
    };

    const handleImageDialogClose = () => {
        setIsImageDialogOpen(false);
        setEnlargedImage(null);
    };

    const handleRoleChange = (event: SelectChangeEvent<string[]>) => {
        const { value } = event.target;
        setRoles(typeof value === "string" ? value.split(",") : value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formElement = e.currentTarget;
        const formData = new FormData();

        const description = new FormData(formElement).get("description");
        formData.append("description", typeof description === "string" ? description : "");

        roles.forEach((role) => formData.append("roles", role));
        selectedFiles.forEach((file) => formData.append("screenshots", file));

        const accessToken = localStorage.getItem("accessToken");
        try {
            const response = await fetch(`http://localhost:8080/users/${user?._id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
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
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
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
                        <InputLabel id='roles-label' sx={{ pt: 3 }}>
                            Previous Work Screenshots
                        </InputLabel>
                        <Button variant='contained' component='label'>
                            Upload Files
                            <input
                                type='file'
                                hidden
                                multiple
                                accept='image/*'
                                onChange={handleFileChange}
                            />
                        </Button>

                        {selectedFiles.length > 0 && (
                            <Box mt={2}>
                                <Typography variant='body2'>Selected Files:</Typography>
                                <ul>
                                    {selectedFiles.map((file, index) => (
                                        <li key={index}>{file.name}</li>
                                    ))}
                                </ul>
                            </Box>
                        )}
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type='submit'>Submit</Button>
                        </DialogActions>
                    </DialogContent>
                </form>
            </Dialog>

            <Dialog open={isImageDialogOpen} onClose={handleImageDialogClose} maxWidth='lg'>
                <img
                    src={enlargedImage || ""}
                    alt='Enlarged Screenshot'
                    style={{ maxWidth: "90vw", maxHeight: "90vh", borderRadius: 8 }}
                />
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

            <Typography variant='h4' mt={3}>
                Previous Work
            </Typography>
            {user.screenshots && user.screenshots.length > 0 ? (
                <Box display='flex' flexWrap='wrap' gap={2} mt={2}>
                    {user.screenshots.map((screenshot, index) => {
                        const src = `data:${screenshot.img.contentType};base64,${screenshot.img.data}`;
                        return (
                            <img
                                key={index}
                                src={src}
                                alt={`Screenshot ${index + 1}`}
                                style={{
                                    maxHeight: "150px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                }}
                                onClick={() => handleImageClick(src)}
                            />
                        );
                    })}
                </Box>
            ) : (
                <Typography>No screenshots uploaded.</Typography>
            )}

            <Typography variant='h4' mt={3}>
                Teams
            </Typography>
            <List>
                {Array.isArray(user.teams) &&
                    user.teams.map((team: any, index: number) => (
                        <ListItem key={index} disableGutters>
                            <Card
                                onClick={() => {
                                    navigate(`/dashboard/teams/${team._id}`);
                                }}
                                sx={{
                                    width: "50%",
                                    cursor: "pointer",
                                    "&:hover": { bgcolor: "#090909" },
                                }}>
                                <CardContent>
                                    <Typography variant='h5'>{team.teamName}</Typography>
                                    <Typography variant='h6'>{team.jamName}</Typography>
                                    <Typography variant='body2' color='text.secondary'>
                                        Available Roles:{" "}
                                        {team.availableRoles?.length
                                            ? team.availableRoles.join(", ")
                                            : "No roles"}
                                    </Typography>
                                    <Typography variant='body2' color='text.secondary'>
                                        Members:{" "}
                                        {team.members && team.members.length > 0
                                            ? team.members
                                                  .map((member: any) => member.username)
                                                  .join(", ")
                                            : "No members"}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </ListItem>
                    ))}
            </List>
        </Box>
    );
}
