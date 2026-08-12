import { useState } from "react";
import { TextField, Button, Box, MenuItem, Alert } from "@mui/material";
import { EntryFormValues, EntryType } from "../types";

interface AddEntryFormProps {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
    error?: string;
}

const AddEntryForm = ({ onSubmit, onCancel, error }: AddEntryFormProps) => {
    const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
    const [date, setDate] = useState("");
    const [specialist, setSpecialist] = useState("");
    const [description, setDescription] = useState("");
    const [diagnosisCodes, setDiagnosisCodes] = useState("");
    // Health check field state
    const [healthCheckRating, setHealthCheckRating] = useState("");
    // Occupational Healthcare fields states
    const [employerName, setEmployerName] = useState("");
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
    // Hospital fields states
    const [dischargeDate, setDischargeDate] = useState("");
    const [dischargeCriteria, setDischargeCriteria] = useState("")

    const submit = (event: React.FormEvent) => {
        event.preventDefault()

        const commonFields = {
            date, 
            specialist, 
            description, 
            diagnosisCodes: diagnosisCodes ? diagnosisCodes.split(",").map(code => code.trim()) : undefined,
        };

        if (entryType === "HealthCheck") {
            onSubmit({
                ...commonFields,
                type: "HealthCheck",
                healthCheckRating: Number(healthCheckRating),
            });
        }

        if (entryType === "OccupationalHealthcare") {
            onSubmit({
                ...commonFields,
                type: "OccupationalHealthcare",
                employerName,
                sickLeave:
                    sickLeaveStartDate && sickLeaveEndDate
                        ? {
                            startDate: sickLeaveStartDate,
                            endDate: sickLeaveEndDate,
                        }
                        : undefined,
            });
        }

        if (entryType === "Hospital") {
            onSubmit({
                ...commonFields,
                type: "Hospital",
                discharge: {
                    date: dischargeDate,
                    criteria: dischargeCriteria,
                },
            });
        }
    };

    return (
        <Box component="form" onSubmit={submit}>            
            <h2>New Entry</h2>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <TextField
                select
                fullWidth
                label="Entry Type"
                value={entryType}
                onChange={(event) => setEntryType(event.target.value as EntryType)}
                margin="normal"
            >
                <MenuItem value="HealthCheck">Health Check</MenuItem>
                <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
                <MenuItem value="Hospital">Hospital</MenuItem>
            </TextField>

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

            {entryType === "HealthCheck" && (
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
            )}

            {entryType === "OccupationalHealthcare" && (
                <>
                    <TextField 
                        fullWidth
                        label="Employer name"
                        value={employerName}
                        onChange={(event) => setEmployerName(event.target.value)}
                        margin="normal"
                    />

                    <TextField 
                        fullWidth
                        label="Sick leave start date"
                        value={sickLeaveStartDate}
                        onChange={(event) => setSickLeaveStartDate(event.target.value)}
                        margin="normal"
                    />

                    <TextField 
                        fullWidth
                        label="Sick leave start date"
                        value={sickLeaveEndDate}
                        onChange={(event) => setSickLeaveEndDate(event.target.value)}
                        margin="normal"
                    />
                </>
            )}

            {entryType === "Hospital" && (
                <>
                    <TextField 
                        fullWidth
                        label="Discharge date"
                        value={dischargeDate}
                        onChange={(event) => setDischargeDate(event.target.value)}
                        margin="normal"
                    />

                    <TextField 
                        fullWidth
                        label="Discharge criteria"
                        value={dischargeCriteria}
                        onChange={(event) => setDischargeCriteria(event.target.value)}
                        margin="normal"
                    />
                </>
            )}

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