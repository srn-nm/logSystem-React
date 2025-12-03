import InfoIcon from '@mui/icons-material/Info';
import React from "react";
import { IconButton, Tooltip } from "@mui/material";

interface DetailsButtonProps {
  logID: string|number|null;
}

export default function DetailsButton({ logID }: DetailsButtonProps) {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  });

  return (
    <Tooltip title="Show Details">
      <IconButton onClick={() => setLoading(true)} loading={loading} size="small">
        <InfoIcon style={{ color: "#e5e7eb" }}/>
      </IconButton>
    </Tooltip>
  );
}