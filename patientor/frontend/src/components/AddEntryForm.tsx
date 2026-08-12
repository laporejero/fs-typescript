import { useState } from "react";
import { 
    TextField, 
    Button, 
    Box, 
    MenuItem, 
    Alert, 
    Chip,
    FormControl,
    OutlinedInput,
    Select,
    type SelectChangeEvent,
    InputLabel, 
} from "@mui/material";
import { Diagnosis, EntryFormValues, EntryType } from "../types";

interface AddEntryFormProps {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
    error?: string;
    diagnoses: Diagnosis[];
}

const AddEntryForm = ({ onSubmit, onCancel, error, diagnoses }: AddEntryFormProps) => {
    const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
    const [date, setDate] = useState("");
    const [specialist, setSpecialist] = useState("");
    const [description, setDescription] = useState("");
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    // Health check field state
    const [healthCheckRating, setHealthCheckRating] = useState("");
    // Occupational Healthcare fields states
    const [employerName, setEmployerName] = useState("");
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
    // Hospital fields states
    const [dischargeDate, setDischargeDate] = useState("");
    const [dischargeCriteria, setDischargeCriteria] = useState("")

    const [diagnosisMenuOpen, setDiagnosisMenuOpen] = useState(false);

    const submit = (event: React.FormEvent) => {
        event.preventDefault()

        const commonFields = {
            date, 
            specialist, 
            description, 
            diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined,
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
                type="date"
                label="Date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                margin="normal"
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    },
                }}
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

            <FormControl fullWidth margin="normal">
                <InputLabel id="diagnosis-codes-label">
                    Diagnosis codes
                </InputLabel>

                <Select<string[]>
                    labelId="diagnosis-code-label"
                    multiple
                    value={diagnosisCodes}
                    open={diagnosisMenuOpen}
                    onOpen={() => setDiagnosisMenuOpen(true)}
                    onClose={() => setDiagnosisMenuOpen(false)}
                    onChange={(event: SelectChangeEvent<string[]>) => {
                        setDiagnosisCodes(event.target.value as string[]);
                        setDiagnosisMenuOpen(false);
                    }}
                    input={<OutlinedInput label="Diagnosis codes" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {selected.map((code) => (
                                <Chip 
                                    key={code} 
                                    label={code} 
                                    onDelete={() => {
                                        setDiagnosisCodes(
                                            diagnosisCodes.filter(
                                                (selectedCode) => selectedCode !== code
                                            )
                                        )
                                    }}
                                    onMouseDown={(event) => { event.stopPropagation(); }}
                                />
                            ))}
                        </Box>
                    )}
                >
                    {diagnoses.map((diagnosis) => (
                        <MenuItem key={diagnosis.code} value={diagnosis.code}>
                            {diagnosis.code} - {diagnosis.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {entryType === "HealthCheck" && (
                <TextField
                    select
                    fullWidth
                    label="Health check rating"
                    value={healthCheckRating}
                    onChange={(event) => setHealthCheckRating(event.target.value)}
                    margin="normal"
                >
                    <MenuItem value="0">0 - Healthy</MenuItem>
                    <MenuItem value="1">1 - Low risk</MenuItem>
                    <MenuItem value="2">2 - High risk</MenuItem>
                    <MenuItem value="3">3 - Critical risk</MenuItem>
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
                        type="date"
                        value={sickLeaveStartDate}
                        onChange={(event) => setSickLeaveStartDate(event.target.value)}
                        margin="normal"
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                    />

                    <TextField 
                        fullWidth
                        label="Sick leave start date"
                        type="date"
                        value={sickLeaveEndDate}
                        onChange={(event) => setSickLeaveEndDate(event.target.value)}
                        margin="normal"
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                    />
                </>
            )}

            {entryType === "Hospital" && (
                <>
                    <TextField 
                        fullWidth
                        label="Discharge date"
                        type="date"
                        value={dischargeDate}
                        onChange={(event) => setDischargeDate(event.target.value)}
                        margin="normal"
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
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