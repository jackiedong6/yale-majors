/* eslint-disable no-use-before-define */
import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {MajorNames} from "../data/majorNames"
import "./styles.css"

const Searchbar = ({onChange}) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    return (
        <div className = "searchbar">
        <Autocomplete
            open={open}
            onOpen={() => {
                if (inputValue) {
                    setOpen(true);
                }
            }}
            onClose={() => setOpen(false)}
            inputValue={inputValue}
            onInputChange={(e, value, reason) => {
                setInputValue(value);
                // onChange(value);
                if (!value) {
                    setOpen(false);
                }
            }}
            onChange={(event, value) => onChange(value)}
            options={MajorNames}
            getOptionLabel={(option) => option.majorName}
            style={{
                width: "100%",
            }}
            renderInput={(params) => (
                <TextField {...params} label="Select a Major" variant="outlined"

                />
            )}

        />
        </div>
    );
}

export default Searchbar