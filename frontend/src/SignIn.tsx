import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
// import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import ForgotPassword from "../components/ForgotPassword";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import { useNavigate } from "react-router";

const Card = styled(MuiCard)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
        maxWidth: "450px",
    },
    boxShadow:
        "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
    ...theme.applyStyles("dark", {
        boxShadow:
            "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
    minHeight: "100%",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(4),
    },
    "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        zIndex: -1,
        inset: 0,
        backgroundImage:
            "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
        backgroundRepeat: "no-repeat",
        ...theme.applyStyles("dark", {
            backgroundImage:
                "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
        }),
    },
}));

export default function SignIn(props: { disableCustomTheme?: boolean }) {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
    const [open, setOpen] = React.useState(false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
    };

    const validateInputs = () => {
        const email = document.getElementById("email") as HTMLInputElement;
        const password = document.getElementById("password") as HTMLInputElement;

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage("Please enter a valid email address.");
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage("");
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage("Password must be at least 6 characters long.");
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage("");
        }

        return isValid;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (emailError || passwordError) {
            return;
        }
        const data = new FormData(event.currentTarget);
        console.log("posted form data: " + JSON.stringify(Object.fromEntries(data)));
        let fetchData = {
            method: "GET",
            body: JSON.stringify(Object.fromEntries(data)),
            headers: new Headers({
                "Content-Type": "application/json; charset=UTF-8",
            }),
        };
        try {
            await fetch("http://localhost:8080/auth", fetchData)
                .then((response) => response.json())
                .then((json) => console.log(json));
            navigate(`/dashboard/${fetchData.body}`);
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    const navigate = useNavigate();

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <SignInContainer direction='column' justifyContent='space-between'>
                <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
                <Card variant='outlined'>
                    <Typography
                        component='h1'
                        variant='h4'
                        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
                        Sign in
                    </Typography>
                    <Box
                        component='form'
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            gap: 2,
                        }}>
                        <FormControl>
                            <FormLabel htmlFor='email'>Email</FormLabel>
                            <TextField
                                error={emailError}
                                helperText={emailErrorMessage}
                                id='email'
                                type='email'
                                name='email'
                                placeholder='your@email.com'
                                autoComplete='email'
                                autoFocus
                                required
                                fullWidth
                                variant='outlined'
                                color={emailError ? "error" : "primary"}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='password'>Password</FormLabel>
                            <TextField
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                name='password'
                                placeholder='••••••'
                                type='password'
                                id='password'
                                autoComplete='current-password'
                                autoFocus
                                required
                                fullWidth
                                variant='outlined'
                                color={passwordError ? "error" : "primary"}
                            />
                        </FormControl>
                        {/* <FormControlLabel
                            control={<Checkbox value='remember' color='primary' />}
                            label='Remember me'
                        /> */}
                        <ForgotPassword open={open} handleClose={handleClose} />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            onClick={validateInputs}>
                            Sign in
                        </Button>
                        {/* <Link
                            component='button'
                            type='button'
                            onClick={handleClickOpen}
                            variant='body2'
                            sx={{ alignSelf: "center" }}>
                            Forgot your password?
                        </Link> */}
                    </Box>
                    <Divider>or</Divider>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Typography sx={{ textAlign: "center" }}>
                            Don&apos;t have an account?{" "}
                            <Link
                                component={"button"}
                                onClick={() => navigate("/signUp")}
                                variant='body2'
                                sx={{ alignSelf: "center", textDecorationLine: "underline" }}>
                                Sign up
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </SignInContainer>
        </AppTheme>
    );
}
