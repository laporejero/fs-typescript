import { useState } from "react";
import { TextField, Button, Box, MenuItem, Alert } from "@mui/material";
import { HealthCheckEntryFormValues } from "../types";

interface AddEntryFormProps {
    onSubmit: (values: HealthCheckEntryFormValues) => void;
    onCancel: () => void;
    error?: string;
}

const AddEntryForm = ({ onSubmit, onCancel, error }: AddEntryFormProps) => {
    const [date, setDate] = useState("");
    const [specialist, setSpecialist] = useState("");
    const [description, setDescription] = useState("");
    const [diagnosisCodes, setDiagnosisCodes] = useState("");
    const [healthCheckRating, setHealthCheckRating] = useState("");

    const submit = (event: React.FormEvent) => {
        event.preventDefault()

        onSubmit({ 
            type: "HealthCheck",
            date, 
            specialist, 
            description, 
            diagnosisCodes: diagnosisCodes ? diagnosisCodes.split(",").map(code => code.trim()) : undefined,
            healthCheckRating: Number(healthCheckRating),
        });
    };

    return (
        <Box component="form" onSubmit={submit}>            
            <h2>New Health Check Entry</h2>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <TextField
                fullWidth
                label="Date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                margin="normal"
            />

            <TextField 
                fullWidth
                label="Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                margin="normal"
            />

            <TextField 
                fullWidth
                label="Specialist"
                value={specialist}
                onChange={(event) => setSpecialist(event.target.value)}
                margin="normal"
            />

            <TextField 
                fullWidth
                label="Diagnosis codes"
                value={diagnosisCodes}
                onChange={(event) => setDiagnosisCodes(event.target.value)}
                margin="normal"
                helperText="Separate multiple codes with commas"
            />

            <TextField
                select
                fullWidth
                label="Health check rating"
                value={healthCheckRating}
                onChange={(event) => setHealthCheckRating(event.target.value)}
                margin="normal"
            >
                <MenuItem value="0">Healthy</MenuItem>
                <MenuItem value="1">Low risk</MenuItem>
                <MenuItem value="2">High rish</MenuItem>
                <MenuItem value="3">Critical risk</MenuItem>
            </TextField>

            <Button type="submit" variant="contained">
                Add
            </Button>

            <Button onClick={onCancel}>
                Cancel
            </Button>
        </Box>
    )
}

export default AddEntryForm;