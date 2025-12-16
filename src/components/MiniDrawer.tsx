import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import TableChartIcon from '@mui/icons-material/TableChart';
import BarChartIcon from '@mui/icons-material/BarChart';

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

const drawerGroups: DrawerGroup[] = [
  {
    groupName: "Dashboard",
    items: [],
    path: "/Dashboard",
    icon: <BarChartIcon className="text-gray-700 dark:text-gray-200" />,
    iconandName: (
      <>
        <BarChartIcon className="text-gray-700 dark:text-gray-200" />
        <div className="pl-2 text-gray-700 dark:text-gray-200">Dashboard</div>
      </>
    ),
  },
  {
    groupName: "Logs",
    items: [],
    path: "/Logs",
    icon: <TableChartIcon className="text-gray-700 dark:text-gray-200" />,
    iconandName: (
      <>
        <TableChartIcon className="text-gray-700 dark:text-gray-200" />
        <div className="pl-2 text-gray-700 dark:text-gray-200">Log Table</div>
      </>
    ),
  },
  {
    groupName: "Logout",
    items: [],
    path: "/Login",
    icon: <LogoutIcon className="text-gray-700 dark:text-gray-200" />,
    iconandName: (
      <>
        <LogoutIcon className="text-gray-700 dark:text-gray-200" />
        <div className="pl-2 text-gray-700 dark:text-gray-200">Logout</div>
      </>
    ),
  },
];

export default function MiniDrawer({ drawerOpen, setDrawerOpen }: DrawerOpenProps) {
  const navigate = useNavigate();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleGroup = (groupName: string) => {
    setOpenGroups((prev) => ({ ...prev, [groupName]: !prev[groupName] }));
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const DrawerContent = (
    <div className="flex flex-col h-full p-4 bg-white dark:bg-gray-800 transition-colors">
      {isMobile && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <CloseIcon className="text-gray-700 dark:text-gray-200" />
          </button>
        </div>
      )}

      {drawerGroups.map((group) => {
        const isOpen = openGroups[group.groupName] ?? true;
        const hasItems = group.items.length > 0;

        return (
          <div
            key={group.groupName}
            className={`mb-4 flex flex-col ${drawerOpen ? "" : "w-7"} hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors`}
          >
            {hasItems ? (
              <div
                className={`flex items-center justify-between cursor-pointer px-1 mb-1 py-1 rounded`}
                onClick={() => toggleGroup(group.groupName)}
              >
                {drawerOpen ? (
                  <span className="text-gray-500 dark:text-gray-400 uppercase text-xs text-sm font-medium">
                    {group.groupName}
                  </span>
                ) : (
                  <div className="flex items-center justify-center w-full text-gray-500 dark:text-gray-400">
                    {group.icon}
                  </div>
                )}
                {drawerOpen && (
                  <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
                    {isOpen ? 
                      <ExpandLessIcon className="text-gray-500 dark:text-gray-400" /> : 
                      <ExpandMoreIcon className="text-gray-500 dark:text-gray-400" />
                    }
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => group.path && handleNavigation(group.path)}
                className={`text-left w-full p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center ${
                  drawerOpen ? "justify-start" : "justify-center"
                }`}
              >
                {drawerOpen ? group.iconandName : group.icon}
              </button>
            )}

            {hasItems && isOpen && drawerOpen && (
              <div className="ml-2">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.path)}
                    className="w-full text-left p-2 mb-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div>
      {isMobile ? (
        <div
          className={`fixed inset-0 z-50 transition-all duration-300 ${
            drawerOpen ? "visible" : "invisible"
          }`}
          style={{
            backgroundColor: drawerOpen ? "rgba(0, 0, 0, 0.5)" : "transparent",
          }}
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className={`absolute right-0 top-0 h-full bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ${
              drawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
            style={{ width: "85vw" }}
            onClick={(e) => e.stopPropagation()}
          >
            {DrawerContent}
          </div>
        </div>
      ) : (

        <div
          className={`fixed right-0 top-0 h-full bg-white dark:bg-gray-800 border-l border-gray-300 dark:border-gray-700 shadow-lg transition-all duration-300 ${
            drawerOpen ? "overflow-y-auto overflow-x-hidden" : "overflow-hidden"
          }`}
          style={{
            width: drawerOpen ? `${drawerWidth}px` : "55px",
            transition: "width 0.3s ease",
          }}
        >
          {DrawerContent}
        </div>
      )}
    </div>
  );
}