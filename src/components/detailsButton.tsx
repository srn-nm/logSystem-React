import InfoIcon from '@mui/icons-material/Info';
import React from "react";
import { IconButton, Tooltip } from "@mui/material";

export default function LoadingIconButton() {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  });

  return (
    <Tooltip title="Show Details">
      <IconButton onClick={() => setLoading(true)} size="small">
        <InfoIcon color="primary" />
      </IconButton>
    </Tooltip>
  );
}