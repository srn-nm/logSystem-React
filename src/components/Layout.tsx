import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import MiniDrawer from "./MiniDrawer";

export default function Layout() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    
    <Box className="flex justify-end min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors stretch">
      
      <Box className="flex flex-col flex-1 min-h-screen h-full stretch">
        <NavBar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />

        <motion.main
          className="flex-1 h-full stretch"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div><Outlet /></div>
        </motion.main>

        <footer className=" flex items-center justify-center px-6 py-4 shadow-lg transition-colors dark:bg-gray-800 dark:text-white bg-white text-gray-900 text-xs">
          .تمامی حقوق متعلق به کیتکو می باشد
        </footer>
      </Box>

      <MiniDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
  
    </Box>
  );
}