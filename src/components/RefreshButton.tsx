import { IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

interface RefreshButtonProps {
  onRefresh: () => void;
  loading?: boolean;
  tooltipTitle?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const RefreshButton: React.FC<RefreshButtonProps> = ({
  onRefresh,
  loading = false,
  tooltipTitle = "Refresh",
  size = "small",
  className = ""
}) => {
  return (
    <Tooltip title={tooltipTitle}>
      <IconButton 
        onClick={onRefresh} 
        disabled={loading}
        size={size}
        className={className}
        sx={{ 
          color: "#e5e7eb",
          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
          '&:disabled': { color: "#e5e7eb" }
        }}
      >
        <RefreshIcon className={loading ? "animate-spin" : ""}  />
      </IconButton>
    </Tooltip>
  );
};