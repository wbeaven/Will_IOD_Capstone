import * as React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import GroupsIcon from "@mui/icons-material/Groups";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Stack, useMediaQuery } from "@mui/material";
import SearchList from "../components/SearchList";

const drawerWidth = 240;

export default function ResponsiveDrawer() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

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

    const drawer = (
        <div>
            <Toolbar sx={{ justifyContent: "center" }}>
                <img
                    src='./src/assets/Capstone_Icon_Large.png'
                    alt='Site logo'
                    loading='lazy'
                    width={"30%"}
                />
            </Toolbar>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Profile"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
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
                    <ListItemButton>
                        <ListItemIcon>
                            <GroupsIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Teams"} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                {["Settings"].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
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
                    <Typography variant='h5' noWrap component='div'>
                        Game Jam Hub
                    </Typography>
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
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Stack spacing={2} sx={{ px: 2 }}>
                        <SearchList label='Search Users' />
                        <List>
                            <ListItem>Item 1</ListItem>
                            <ListItem>Item 2</ListItem>
                            <ListItem>Item 3</ListItem>
                        </List>
                        <Typography sx={{ marginBottom: 2 }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
                            non enim praesent elementum facilisis leo vel. Risus at ultrices mi
                            tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non
                            tellus. Convallis convallis tellus id interdum velit laoreet id donec
                            ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
                            suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
                            quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
                            proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
                            tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
                            varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
                            Lorem donec massa sapien faucibus et molestie ac.
                        </Typography>
                    </Stack>
                    <Stack spacing={2} sx={{ px: 2 }}>
                        <SearchList label='Search Teams' />
                        <List>
                            <ListItem>Item 1</ListItem>
                            <ListItem>Item 2</ListItem>
                            <ListItem>Item 3</ListItem>
                        </List>
                        <Typography sx={{ marginBottom: 2 }}>
                            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
                            ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum
                            integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi
                            lacus sed viverra tellus. Purus sit amet volutpat consequat mauris.
                            Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
                            vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra
                            accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac.
                            Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique
                            senectus et. Adipiscing elit duis tristique sollicitudin nibh sit.
                            Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra
                            maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
                            aliquam ultrices sagittis orci a.
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}
