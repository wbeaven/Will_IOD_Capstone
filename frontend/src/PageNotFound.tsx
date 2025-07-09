import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import AppTheme from "../shared-theme/AppTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightRoundSharpIcon from "@mui/icons-material/NightlightRoundSharp";
import SpeedDialAction from "@mui/material/SpeedDialAction";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const actions = [
    { icon: <Brightness4Icon />, name: "System" },
    { icon: <LightModeIcon />, name: "Light" },
    { icon: <NightlightRoundSharpIcon />, name: "Dark" },
];

function Copyright() {
    return (
        <Typography
            variant='body2'
            align='center'
            sx={{
                color: "text.secondary",
            }}>
            {"Copyright © "}
            <Link color='inherit' href='https://www.linkedin.com/in/williambeaven'>
                William Beaven
            </Link>{" "}
            {new Date().getFullYear()}.
        </Typography>
    );
}

export default function PageNotFound() {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    <div>prefersDarkMode: {prefersDarkMode.toString()}</div>;
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline enableColorScheme />
            <Container maxWidth='sm'>
                <Box height='97vh'>
                    <Grid
                        container
                        direction={"column"}
                        height='100%'
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        {/* <SpeedDial
                            ariaLabel='SpeedDial basic example'
                            sx={{ position: "absolute", top: 16, right: 16 }}
                            icon={<SpeedDialIcon />}
                            direction='down'>
                            {actions.map((action) => (
                                <SpeedDialAction key={action.name} icon={action.icon} />
                            ))}
                        </SpeedDial> */}
                        {/* <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} /> */}
                        <Typography variant='h1' component='h1' sx={{ mb: 2 }} align='center'>
                            404
                        </Typography>
                        <Typography variant='h4' component='h1' sx={{ mb: 2 }} align='center'>
                            Page Not Found
                        </Typography>
                        <Copyright />
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
