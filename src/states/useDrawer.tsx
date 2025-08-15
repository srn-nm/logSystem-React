import { useState } from "react";

export function useDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => setIsDrawerOpen(open);

  return { isDrawerOpen, toggleDrawer };
}
