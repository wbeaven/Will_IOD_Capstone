import {
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AddIcon from "@mui/icons-material/Add";

export default function TeamHub() {
    const [teams, setTeams] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log("posted form data: " + JSON.stringify(Object.fromEntries(data)));
        const accessToken = localStorage.getItem("accessToken");
        let fetchData = {
            method: "POST",
            body: JSON.stringify(Object.fromEntries(data)),
            headers: new Headers({
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${accessToken}`,
            }),
        };
        try {
            const response = await fetch("http://localhost:8080/teams", fetchData);
            const result = await response.json();
            console.log("Team created:", result);
            handleClose();
            handleList();
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    const handleList = async () => {
        const accessToken = localStorage.getItem("accessToken");

        try {
            const response = await fetch("http://localhost:8080/teams/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const json = await response.json();
            setTeams(json.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        handleList();
    }, []);

    return (
        <>
            <Typography variant='h5'>Your Teams</Typography>
            <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"}>
                <Card
                    onClick={() => {
                        handleClickOpen();
                    }}
                    sx={{
                        minWidth: 200,
                        minHeight: 200,
                        m: 2,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        "&:hover": {
                            bgcolor: "#090909",
                        },
                    }}>
                    <Typography variant='h6'>Create a Team</Typography>
                    <AddIcon fontSize='large'></AddIcon>
                </Card>

                <Dialog open={open} onClose={handleClose}>
                    <form onSubmit={handleSubmit}>
                        <DialogTitle>Create a team</DialogTitle>
                        <DialogContent sx={{ pb: 0 }}>
                            <DialogContentText>Enter team details</DialogContentText>
                            <TextField
                                autoFocus
                                required
                                margin='dense'
                                id='teamName'
                                name='teamName'
                                label='Team Name'
                                type='text'
                                fullWidth
                                variant='standard'
                            />
                            <TextField
                                required
                                margin='dense'
                                id='jamName'
                                name='jamName'
                                label='Jam Name'
                                type='text'
                                fullWidth
                                variant='standard'
                            />
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type='submit'>Create</Button>
                            </DialogActions>
                        </DialogContent>
                    </form>
                </Dialog>

                {Array.isArray(teams) &&
                    teams.map((team: any, index: number) => (
                        <Card
                            key={index}
                            onClick={() => navigate(`/dashboard/teams/${team._id}`)}
                            sx={{
                                minWidth: 200,
                                minHeight: 200,
                                m: 2,
                                cursor: "pointer",
                                "&:hover": {
                                    bgcolor: "#090909",
                                },
                            }}>
                            <CardContent>
                                <Typography variant='h6'>{team.teamName}</Typography>
                                <Typography variant='h6' pt={1}>
                                    {team.jamName}
                                </Typography>
                                <Typography variant='body2' pt={2} color='text.secondary'>
                                    {team.filledRoles && team.filledRoles.length > 0
                                        ? `Roles: ${team.filledRoles.join(", ")}`
                                        : "No roles"}
                                </Typography>
                                <Typography variant='body2' pt={2} color='text.secondary'>
                                    Members:{" "}
                                    {team.members && team.members.length > 0
                                        ? team.members
                                              .map((member: any) => member.username)
                                              .join(", ")
                                        : "No members"}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
            </Box>
        </>
    );
}
