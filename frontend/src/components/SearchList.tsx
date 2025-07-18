import {
    List,
    ListItem,
    TextField,
    Card,
    CardContent,
    Typography,
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface SearchListProps {
    label: string;
    type: "users" | "teams";
}

const roleOptions = ["Designer", "Programmer", "Musician", "3D Artist", "2D Artist"];

export default function SearchList({ label, type }: SearchListProps) {
    const [items, setItems] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState<"name" | "jam" | "date">("name");
    const [roleFilter, setRoleFilter] = useState<string>("");
    const navigate = useNavigate();

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
            setItems(json.data);
        } catch (err) {
            console.error("Error fetching", type, ":", err);
        }
    };

    useEffect(() => {
        handleList();
    }, []);

    const filteredItems = items
        .filter((item) => {
            const lowerSearch = searchTerm.toLowerCase();

            const matchesSearch =
                type === "teams"
                    ? [item.teamName, item.jamName].some((field) =>
                          field?.toLowerCase().includes(lowerSearch)
                      )
                    : item.username?.toLowerCase().includes(lowerSearch);

            const roles = type === "teams" ? item.availableRoles : item.roles;
            const matchesRole = !roleFilter || (Array.isArray(roles) && roles.includes(roleFilter));

            return matchesSearch && matchesRole;
        })
        .sort((a, b) => {
            if (type === "teams") {
                if (sortOption === "name") return a.teamName.localeCompare(b.teamName);
                if (sortOption === "jam") return a.jamName.localeCompare(b.jamName);
                if (sortOption === "date")
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            } else {
                return a.username.localeCompare(b.username);
            }
            return 0;
        });

    return (
        <>
            <Box display='flex' gap={2} mb={2} flexWrap='wrap'>
                <TextField
                    label={type === "teams" ? "Search Teams" : "Search Users"}
                    variant='outlined'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ minWidth: 200 }}
                />
                {type === "teams" && (
                    <FormControl sx={{ minWidth: 150 }}>
                        <InputLabel>Sort by</InputLabel>
                        <Select
                            value={sortOption}
                            label='Sort by'
                            onChange={(e) => setSortOption(e.target.value as any)}>
                            <MenuItem value='name'>Team Name</MenuItem>
                            <MenuItem value='jam'>Jam Name</MenuItem>
                            <MenuItem value='date'>Created Date</MenuItem>
                        </Select>
                    </FormControl>
                )}
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>Filter by Role</InputLabel>
                    <Select
                        value={roleFilter}
                        label='Filter by Role'
                        onChange={(e) => setRoleFilter(e.target.value)}>
                        <MenuItem value=''>All</MenuItem>
                        {roleOptions.map((role) => (
                            <MenuItem key={role} value={role}>
                                {role}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <List>
                {filteredItems.map((item: any, index: number) => (
                    <ListItem key={index} disableGutters>
                        <Card
                            variant='outlined'
                            onClick={() => {
                                if (type === "users") {
                                    navigate(`/dashboard/profile/${item._id}`);
                                } else {
                                    navigate(`/dashboard/teams/${item._id}`);
                                }
                            }}
                            sx={{
                                width: "100%",
                                cursor: "pointer",
                                "&:hover": { bgcolor: "#272727" },
                            }}>
                            <CardContent>
                                <Typography variant='h6'>
                                    {type === "users" ? item.username : item.teamName}
                                </Typography>
                                {type === "users" && (
                                    <Typography variant='body2' color='text.secondary'>
                                        Roles:{" "}
                                        {item.roles?.length ? item.roles.join(", ") : "No roles"}
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
