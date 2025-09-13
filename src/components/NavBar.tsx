import React, { useState } from "react";
import MyDrawer from "./MiniDrawer";
import { useDrawer } from "../states/useDrawer";
import { motion } from "framer-motion";
import MenuIcon from '@mui/icons-material/Menu';
import SearchBar from "./SearchBar";
import List from "./List";


interface DrawerOpenProps {
  drawerOpen: boolean,
  setDrawerOpen: (value: boolean) => void;
}

export default function NavBar({ drawerOpen, setDrawerOpen }: DrawerOpenProps) {

  const toggleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <>
    
      <nav className="flex items-center justify-between px-0 py-3 shadow-md transition-colors dark:bg-gray-800 dark:text-white  bg-white text-gray-900" style={{ direction: "rtl" }}>
        <div className="flex items-center pr-4">
          <button
            onClick={() => toggleDrawerOpen()}
            className="
                px-4 py-2 rounded-lg 
                text-white font-semibold
                hover:scale-120 active:scale-90
                transition-all duration-150"
          >
            <MenuIcon
              className="w-6 h-6 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            ></MenuIcon>
      
  
          </button>
          <h1 className="text-xl font-bold transition-colors ">System Logs</h1>

          <div className="absolute left-0 align-middle "><SearchBar ></SearchBar></div>
    
        </div>
      </nav>

    </>
  );
}


