import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";

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
        <>
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
                            404
                        </Typography>
                        <Typography variant='h4' component='h1' sx={{ mb: 2 }} align='center'>
                            Page Not Found
                        </Typography>
                        <Copyright />
                    </Grid>
                </Box>
            </Container>
        </>
    );
}
