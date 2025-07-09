import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

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
                        <Typography variant='h1' component='h1' sx={{ mb: 2 }} align='center'>
                            Work In Progress
                        </Typography>
                        <Typography variant='h4' component='h1' sx={{ mb: 2 }} align='center'>
                            Come back later for more
                        </Typography>
                        <Copyright />
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
