import React, { useState } from "react";
import MuiDrawer from "@mui/material/Drawer";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/HomeFilled";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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
    groupName: "Home",
    items: [],
    path: "/",
    icon: <HomeIcon />,
    iconandName: (
      <>
        <HomeIcon />
        <div className="pl-2">Home Page</div>
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

const PermanentDrawer = styled(MuiDrawer)(({ theme }) => ({
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
          <Box key={group.groupName} className="mb-4 flex flex-col">
            {hasItems ? (
              <Box
                className="flex items-center justify-between cursor-pointer px-1 mb-1"
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
                className="p-0 text-left w-full text-gray-500 dark:text-gray-400 uppercase text-2xs"
                sx={{
                  justifyContent: "flex-start",
                  paddingLeft: "0px",
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": { backgroundColor: "rgba(201, 191, 191, 0.5)" },
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
            },
          }}
        >
          {DrawerContent}
        </PermanentDrawer>
      )}
    </Box>
  );
}
