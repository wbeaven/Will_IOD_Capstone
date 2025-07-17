import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputLabel,
    MenuItem,
    OutlinedInput,
    TextField,
    Typography,
} from "@mui/material";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Team() {
    const { id } = useParams();
    const [team, setTeam] = useState<any>(null);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [filledRoles, setFilledRoles] = useState<string[]>([]);
    const [availableRoles, setAvailableRoles] = useState<string[]>([]);

    const handleClickOpen = () => {
        setFilledRoles(team?.filledRoles || []);
        setAvailableRoles(team?.availableRoles || []);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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

    const roles = ["Designer", "Programmer", "Musician", "3D Artist", "2D Artist"];

    const fetchTeam = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            console.error("No access token found");
            return;
        }
        const user = JSON.parse(atob(token!.split(".")[1]));

        setCurrentUserId(user.id);

        try {
            const res = await fetch(`http://localhost:8080/teams/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const json = await res.json();
            setTeam(json.data);
        } catch (err) {
            console.error("Error fetching team:", err);
        }
    };

    useEffect(() => {
        fetchTeam();
    }, []);

    const handleFilledChange = (event: SelectChangeEvent<string[]>) => {
        const { value } = event.target;
        setFilledRoles(typeof value === "string" ? value.split(",") : value);
    };

    const handleAvailableChange = (event: SelectChangeEvent<string[]>) => {
        const { value } = event.target;
        setAvailableRoles(typeof value === "string" ? value.split(",") : value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            teamName: formData.get("teamName"),
            jamName: formData.get("jamName"),
            description: formData.get("description"),
            filledRoles,
            availableRoles,
        };

        const accessToken = localStorage.getItem("accessToken");
        try {
            const response = await fetch(`http://localhost:8080/teams/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log("Team updated:", result);

            handleClose();
            fetchTeam();
        } catch (err) {
            console.error("Error updating team:", err);
        }
    };

    const handleJoin = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            console.error("No access token");
            return;
        }

        const user = JSON.parse(atob(token.split(".")[1]));
        const userId = user.id;

        try {
            const res = await fetch(`http://localhost:8080/teams/${id}/join`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ userId }),
            });

            const json = await res.json();
            if (json.result === 200) {
                console.log("Joined team");
                fetchTeam();
            } else {
                console.error("Failed to join team:", json.error);
            }
        } catch (err) {
            console.error("Error joining team:", err);
        }
    };

    if (!team || !currentUserId) return <Typography>There was an error</Typography>;

    const isMember = team.members.some((m: any) => m._id === currentUserId);
    const isAdmin = team.admin === currentUserId;

    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Edit team details</DialogTitle>
                    <DialogContent sx={{ pb: 0 }}>
                        <TextField
                            autoFocus
                            margin='dense'
                            id='teamName'
                            name='teamName'
                            label='Team Name'
                            type='text'
                            fullWidth
                            variant='standard'
                            defaultValue={team?.teamName}
                            required
                        />
                        <TextField
                            margin='dense'
                            id='jamName'
                            name='jamName'
                            label='Jam Name'
                            type='text'
                            fullWidth
                            variant='standard'
                            defaultValue={team?.jamName}
                            required
                        />
                        <TextField
                            margin='dense'
                            id='description'
                            name='description'
                            label='Description'
                            type='text'
                            fullWidth
                            variant='standard'
                            defaultValue={team?.description}
                        />
                        <InputLabel id='filled-roles-label' sx={{ pt: 3 }}>
                            Filled Roles
                        </InputLabel>
                        <Select
                            id='filled-roles'
                            label='Filled Roles'
                            multiple
                            value={filledRoles}
                            onChange={handleFilledChange}
                            input={<OutlinedInput id='filled-roles' label='Filled Roles' />}
                            renderValue={(selected) => (
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}>
                            {roles.map((role) => (
                                <MenuItem key={role} value={role}>
                                    {role}
                                </MenuItem>
                            ))}
                        </Select>
                        <InputLabel id='available-roles-label' sx={{ pt: 3 }}>
                            Available Roles
                        </InputLabel>
                        <Select
                            id='available-roles'
                            label='Available Roles'
                            multiple
                            value={availableRoles}
                            onChange={handleAvailableChange}
                            input={<OutlinedInput id='availableRoles' label='Available Roles' />}
                            renderValue={(selected) => (
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}>
                            {roles.map((role) => (
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

            <Typography variant='h3'>{team.teamName}</Typography>
            <Box sx={{ position: "fixed", top: 100, right: 60, display: "flex", gap: 6 }}>
                {!isMember && (
                    <Button variant='outlined' onClick={() => handleJoin()}>
                        Join Team
                    </Button>
                )}
                {isAdmin && (
                    <Button variant='outlined' onClick={() => handleClickOpen()}>
                        Edit Team
                    </Button>
                )}
            </Box>
            {/* <Typography variant='h6' mt={3}>
                Game Jam
            </Typography> */}
            <Typography variant='h4' mt={2}>
                {team.jamName}
            </Typography>

            <Typography variant='h4' mt={3}>
                Project Description
            </Typography>
            <Typography mt={2}>{team.description || "No description provided."}</Typography>

            <Typography variant='h4' mt={3}>
                Members
            </Typography>
            <Typography mt={2}>
                {team.members?.length > 0
                    ? team.members.map((m: any) => m.username || m.toString()).join(", ")
                    : "No members yet"}
            </Typography>

            <Typography variant='h4' mt={3}>
                Filled Roles
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", mt: 4, pl: 6, gap: 7 }}>
                {team.filledRoles.length > 0 ? (
                    team.filledRoles.map((role: string) => (
                        <Chip key={role} label={role} color={getRoleColor(role)} />
                    ))
                ) : (
                    <Typography>No filled roles</Typography>
                )}
            </Box>

            <Typography variant='h4' mt={3}>
                Available Roles
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", mt: 4, pl: 6, gap: 7 }}>
                {team.availableRoles.length > 0 ? (
                    team.availableRoles.map((role: string) => (
                        <Chip key={role} label={role} color={getRoleColor(role)} />
                    ))
                ) : (
                    <Typography>No available roles</Typography>
                )}
            </Box>
        </Box>
    );
}
