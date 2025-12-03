import React, { useState } from "react";
import { IconButton, Button, Box, Drawer, Typography} from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TableChartIcon from '@mui/icons-material/TableChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import type { ClassNames } from "@emotion/react";

const drawerWidth = 240;

interface DrawerOpenProps {
  drawerOpen: boolean;
  setDrawerOpen: (value: boolean) => void;
}

interface DrawerItem {
  id: string;
  label: string;
  path: string;
}

interface DrawerGroup {
  groupName: string;
  items: DrawerItem[];
  icon: React.ReactNode;
  path?: string;
  iconandName: React.ReactNode;
}

const groups: DrawerGroup[] = [
  {
    groupName: "Dashboard",
    items: [],
    path: "/Dashboard",
    icon: <BarChartIcon />,
    iconandName: (
      <>
        <BarChartIcon />
        <div className="pl-2">Dashboard</div>
      </>
    ),
  },
  {
    groupName: "Logs",
    items: [],
    path: "/Logs",
    icon: <TableChartIcon />,
    iconandName: (
      <>
        <TableChartIcon />
        <div className="pl-2">Log Table</div>
      </>
    ),
  },
  {
    groupName: "Logout",
    items: [],
    path: "/Login",
    icon: <LogoutIcon />,
    iconandName: (
      <>
        <LogoutIcon />
        <div className="pl-2">Logout</div>
      </>
    ),
  },
  
];

const PermanentDrawer = styled(Drawer)(({ theme }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.standard,
  }),
  "& .MuiDrawer-paper": {
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
  },
}));

export default function MiniDrawer({ drawerOpen, setDrawerOpen }: DrawerOpenProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupName: string) => {
    setOpenGroups((prev) => ({ ...prev, [groupName]: !prev[groupName] }));
  };

  const DrawerContent = (
    <Box className="flex flex-col h-full p-4 bg-white dark:bg-gray-800 transition-colors">
      {isSmDown && (
        <Box className="flex justify-end mb-4">
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon className="text-gray-700 dark:text-gray-200" />
          </IconButton>
        </Box>
      )}

      {groups.map((group) => {
        const isOpen = openGroups[group.groupName] ?? true;
        const hasItems = group.items.length > 0;

        return (
          <Box  key={group.groupName} 
                className={`mb-4 flex flex-col ${drawerOpen ? "" : "w-7"} `}
                sx={{"&:hover": { backgroundColor: "rgba(201, 191, 191, 0.5)" }, borderRadius: 1, }}
          >
            {hasItems ? (
              <Box
                className={`flex items-center justify-between cursor-pointer px-1 mb-1 `}
                
                onClick={() => toggleGroup(group.groupName)}
              >
                {drawerOpen ? (
                  <Typography
                    variant="subtitle2"
                    className="text-gray-500 dark:text-gray-400 uppercase text-xs"
                    sx={{ fontSize: "1.1rem" }}
                  >
                    {group.groupName}
                  </Typography>
                ) : (
                  <Box className="flex items-center justify-center w-full text-gray-500 dark:text-gray-400">
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
                className={`text-left text-gray-500 dark:text-gray-400 text-2xs w-full`}
                sx={{
                  justifyContent: "flex-start",
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "1rem",
                  padding: "5px",
                  paddingLeft: "0px",
                  color: "#d8d1d1ff",
                }}
              >
                {drawerOpen ? group.iconandName : group.icon}
              </Button>
            )}

            {hasItems &&
              isOpen &&
              group.items.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className="mb-2 text-left w-full"
                  sx={{
                    justifyContent: "flex-start",
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "1.125rem",
                    "&:hover": { backgroundColor: "rgba(201, 191, 191, 0.5)" },
                  }}
                >
                  {drawerOpen ? item.label : ""}
                </Button>
              ))}
          </Box>
        );
      })}
    </Box>
  );

  return (
    <Box>
      {isSmDown ? (
        <SwipeableDrawer
          anchor="right"
          open={drawerOpen}
          onOpen={() => setDrawerOpen(true)}
          onClose={() => setDrawerOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ "& .MuiDrawer-paper": { width: "100vw", transition: "none" } }}
        >
          {DrawerContent}
        </SwipeableDrawer>
      ) : (
        <PermanentDrawer
          anchor="right"
          variant="permanent"
          open={drawerOpen}
          sx={{
            width: drawerOpen ? drawerWidth : 55,
            "& .MuiDrawer-paper": {
              width: drawerOpen ? drawerWidth : 55,
              boxShadow: "-4px 0 10px rgba(0,0,0,0.5)",
              borderLeft: "1px solid black",
              overflowY: drawerOpen ? "auto" : "hidden", 
              overflowX: "hidden", 
            },
          }}
        >
          {DrawerContent}
        </PermanentDrawer>
      )}
    </Box>
  );
}
