// bayad az in ham estefade beshe, yano refreshbutton ro az code datatable joda konam
//baraye in kar niaz be dastresi be functione fetch data hast

import RefreshIcon from '@mui/icons-material/Refresh';
import React from "react";
import { IconButton, Tooltip } from "@mui/material";

export default function RefreshButton() {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    try {

    } finally {
      setLoading(false);
    }
  });

  return (
    <Tooltip title="Refresh">
      <IconButton  onClick={() => setLoading(true)} loading={loading} size="small">
        <RefreshIcon/>
      </IconButton>
    </Tooltip>
  );
}