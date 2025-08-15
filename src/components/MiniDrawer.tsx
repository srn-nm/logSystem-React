import React, { useState } from "react";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import type { Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { red } from "@mui/material/colors";

const drawerWidth = 240;

interface DrawerOpenProps {
  drawerOpen: boolean;
  setDrawerOpen: (value: boolean) => void;
}

interface StyledDrawerProps {
  open?: boolean;
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
});

const closedMixin = (theme: Theme): CSSObject => ({
  width: 60,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  boxShadow: "none",
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<StyledDrawerProps>(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open
    ? {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": {
          ...openedMixin(theme),
          borderLeft: "1px solid black",
          boxShadow: "-4px 0 10px rgba(0,0,0,0.5)",
          transition: "width 0.3s ease",
        },
      }
    : {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": {
          ...closedMixin(theme),
          borderLeft: "1px solid black",
          boxShadow: "-4px 0 10px rgba(0,0,0,0.5)",
          transition: "width 0.3s ease",
        },
      }),
}));

interface DrawerItem {
  id: string;
  label: string;
  path: string;
}

interface DrawerGroup {
  groupName: string;
  items: DrawerItem[];
  icon:  React.ReactNode;
  path?: string; 
}

const groups: DrawerGroup[] = [
  {
    groupName: "Reports",
    items: [], 
    path: "/reports",
    icon: "",
  },
  {
    groupName: "Main",
    items: [
      { id: "1", label: "Dashboard", path: "/" },
      { id: "2", label: "Orders", path: "/orders" },
    ],
    icon: "",
  },
  {
    groupName: "Management",
    items: [
      { id: "3", label: "Products", path: "/products" },
      { id: "4", label: "Settings", path: "/settings" },
    ],
    icon: "",
  },
  
];

export default function MiniDrawer({ drawerOpen, setDrawerOpen }: DrawerOpenProps) {
  const navigate = useNavigate();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupName: string) => {
    setOpenGroups((prev) => ({ ...prev, [groupName]: !prev[groupName] }));
  };

  return (
    <Box>
      <Drawer variant="permanent" open={drawerOpen} anchor="right">
        <Box
          className="flex flex-col h-full p-2 bg-white dark:bg-gray-800 transition-colors p-4"
          sx={{ boxShadow: "none", border: "none" }}
        >
          {groups.map((group) => {
            const isOpen = openGroups[group.groupName] ?? true;
            const hasItems = group.items.length > 0;

            return (
              <Box key={group.groupName} className="mb-4 flex flex-col">
                {hasItems ? (
                  <Box className="flex items-center justify-between cursor-pointer px-1 mb-1" onClick={() => toggleGroup(group.groupName)}>
                    {drawerOpen ? (
                      <Typography variant="subtitle2" className="text-gray-500 dark:text-gray-400 uppercase text-xs"sx={{ fontSize: "1.1rem" }}>
                        {group.groupName}
                      </Typography>
                    ) : (
                      
                      <Box className="flex items-center justify-center w-full text-gray-500  dark:text-gray-400">
                        {group.icon}
                      </Box>
                    )}

                    {drawerOpen && (
                      <IconButton size="small">
                        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    )}
                  </Box>
                ) : (
                  <Button
                    onClick={() => group.path && navigate(group.path)}
                    className="mb-2 text-left w-full text-gray-500 dark:text-gray-400 uppercase text-xs"
                    sx={{ justifyContent: drawerOpen ? "flex-start" : "center", borderRadius: 2, textTransform: "none", fontSize: "1.125rem", "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" } }}>
                    {drawerOpen ? group.groupName : group.icon }
                  </Button>
                )}

                {hasItems && isOpen && group.items.map((item) => (
                    <Button key={item.id} onClick={() => navigate(item.path)} className="mb-2 text-left w-full " sx={{ justifyContent: "flex-start", borderRadius: 2, textTransform: "none", fontSize: "1.125rem", "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" }}}>
                      {drawerOpen ? item.label : ""}
                    </Button>
                  ))}
              </Box>
            );
          })}
        </Box>
      </Drawer>
    </Box>
  );
}