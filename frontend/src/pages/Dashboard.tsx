import * as React from "react";
import {
    AppBar,
    Box,
    Button,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchList from "../components/SearchList";
import { Outlet, useNavigate, useLocation } from "react-router";
import { useLogout } from "../hooks/useLogout";
import { useAuthVerify } from "../hooks/useAuthVerify";

const drawerWidth = 240;

export default function ResponsiveDrawer() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    useAuthVerify();
    const navigate = useNavigate();
    const location = useLocation();

    const showSearchLists = /^\/dashboard\/?$/.test(location.pathname);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const LogoutButton = () => {
        const logout = useLogout();

        return (
            <Button
                variant='contained'
                sx={{
                    ml: "auto",
                    background: `linear-gradient(to bottom right, ${"red"}, ${"orange"})`,
                    "&:hover": {
                        background: `linear-gradient(to bottom right, ${"darkRed"}, ${"orangeRed"})`,
                    },
                }}
                onClick={logout}>
                Logout
            </Button>
        );
    };

    const token = localStorage.getItem("accessToken");
    if (!token) {
        return;
    }
    const decodedUser = JSON.parse(atob(token.split(".")[1]));

    const drawer = (
        <div>
            <Toolbar sx={{ justifyContent: "center" }}>
                <img src='./Capstone_Icon_Large.png' alt='Site logo' loading='lazy' width={"30%"} />
            </Toolbar>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => navigate(`/dashboard/profile/${decodedUser.id}`)}>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Profile"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/dashboard/")}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Dashboard"} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/dashboard/teams/")}>
                        <ListItemIcon>
                            <GroupsIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Teams"} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Settings"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position='fixed'
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}>
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        edge='start'
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant='h4'
                        noWrap
                        component='div'
                        color='#e2511f'
                        sx={{
                            background: `linear-gradient(to bottom right, ${"red"}, ${"orange"})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontWeight: "bold",
                        }}>
                        Game Jam Hub
                    </Typography>
                    <LogoutButton />
                </Toolbar>
            </AppBar>
            <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                <Drawer
                    variant='temporary'
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                    }}
                    slotProps={{
                        root: {
                            keepMounted: true,
                        },
                    }}>
                    {drawer}
                </Drawer>
                <Drawer
                    variant='permanent'
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                    }}
                    open>
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component='main'
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                <Toolbar />
                <Outlet />
                {showSearchLists && (
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Stack spacing={2} sx={{ px: 2, flex: 1 }}>
                            <SearchList label='Search Users' type='users' />
                        </Stack>
                        <Stack spacing={2} sx={{ px: 2, flex: 1 }}>
                            <SearchList label='Search Teams' type='teams' />
                        </Stack>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
