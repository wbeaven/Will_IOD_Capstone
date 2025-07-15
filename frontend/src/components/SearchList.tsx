import { List, TextField } from "@mui/material";

export default function SearchList(props: { label: string }) {
    return (
        <>
            <TextField id='filled-basic' label={props.label} variant='filled' />
            <List></List>
        </>
    );
}
