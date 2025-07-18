import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../../shared-theme/AppTheme";
import ColorModeSelect from "../../shared-theme/ColorModeSelect";
import { useNavigate } from "react-router";

const Card = styled(MuiCard)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: "auto",
    boxShadow:
        "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
    [theme.breakpoints.up("sm")]: {
        width: "450px",
    },
    ...theme.applyStyles("dark", {
        boxShadow:
            "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
    }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
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

export default function SignUp(props: { disableCustomTheme?: boolean }) {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
    const [usernameError, setUsernameError] = React.useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = React.useState("");

    const validateInputs = () => {
        const email = document.getElementById("email") as HTMLInputElement;
        const password = document.getElementById("password") as HTMLInputElement;
        const username = document.getElementById("username") as HTMLInputElement;

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

        if (!username.value || username.value.length < 1) {
            setUsernameError(true);
            setUsernameErrorMessage("Username is required.");
            isValid = false;
        } else {
            setUsernameError(false);
            setUsernameErrorMessage("");
        }

        return isValid;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (usernameError || emailError || passwordError) {
            return;
        }
        const data = new FormData(event.currentTarget);
        console.log("posted form data: " + JSON.stringify(Object.fromEntries(data)));
        let fetchData = {
            method: "POST",
            body: JSON.stringify(Object.fromEntries(data)),
            headers: new Headers({
                "Content-Type": "application/json; charset=UTF-8",
            }),
        };
        try {
            const response = await fetch("http://localhost:8080/users", fetchData);
            const json = await response.json();

            if (json.accessToken) {
                localStorage.setItem("accessToken", json.accessToken);
            } else {
                console.error("No access token found in response:", json);
                return;
            }

            navigate("/dashboard");
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    const navigate = useNavigate();

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
            <SignUpContainer direction='column' justifyContent='space-between'>
                <Card variant='outlined'>
                    <Typography
                        component='h1'
                        variant='h4'
                        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
                        Sign up
                    </Typography>
                    <Box
                        component='form'
                        onSubmit={handleSubmit}
                        sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <FormControl>
                            <FormLabel htmlFor='username'>Username</FormLabel>
                            <TextField
                                autoComplete='username'
                                name='username'
                                required
                                fullWidth
                                id='username'
                                placeholder='cool username'
                                error={usernameError}
                                helperText={usernameErrorMessage}
                                color={usernameError ? "error" : "primary"}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='email'>Email</FormLabel>
                            <TextField
                                required
                                fullWidth
                                id='email'
                                placeholder='your@email.com'
                                name='email'
                                autoComplete='email'
                                variant='outlined'
                                error={emailError}
                                helperText={emailErrorMessage}
                                color={passwordError ? "error" : "primary"}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='password'>Password</FormLabel>
                            <TextField
                                required
                                fullWidth
                                name='password'
                                placeholder='••••••'
                                type='password'
                                id='password'
                                autoComplete='new-password'
                                variant='outlined'
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                color={passwordError ? "error" : "primary"}
                            />
                        </FormControl>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            onClick={validateInputs}>
                            Sign up
                        </Button>
                    </Box>
                    <Divider>
                        <Typography sx={{ color: "text.secondary" }}>or</Typography>
                    </Divider>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Typography sx={{ textAlign: "center" }}>
                            Already have an account?{" "}
                            <Link
                                component={"button"}
                                onClick={() => navigate("/signIn")}
                                variant='body2'
                                sx={{ alignSelf: "center", textDecorationLine: "underline" }}>
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </SignUpContainer>
        </AppTheme>
    );
}
