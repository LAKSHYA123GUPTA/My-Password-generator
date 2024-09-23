import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
export default function WarningComponent() {
  return (
    <Stack sx={{ width: "100%", marginTop: "10px" }} spacing={2}>
      <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        <div style={{ color: "red" }}>
          <b>After use,delete password from clipboard.</b>
        </div>
      </Alert>
    </Stack>
  );
}
