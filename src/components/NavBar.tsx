import MenuIcon from '@mui/icons-material/Menu';
import SearchBar from "./SearchBar";

interface DrawerOpenProps {
  drawerOpen: boolean,
  setDrawerOpen: (value: boolean) => void;
}

export default function NavBar({ drawerOpen, setDrawerOpen }: DrawerOpenProps) {
  const toggleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  }

  return (
    <nav
      className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 py-2 shadow-md transition-colors dark:bg-gray-800 dark:text-gray-200 bg-white text-gray-900"
      style={{ direction: "rtl" }}
    >
      <div className="flex items-center w-full lg:w-auto">
        <button
          onClick={toggleDrawerOpen}
          className="px-4 py-2 rounded-lg text-white font-semibold hover:scale-110 active:scale-90 transition-all duration-150"
        >
          <MenuIcon
            className="w-6 h-6"
            sx={{ color: "#d8d1d1ff" }}
          />
        </button>

        <h1 className="text-lg font-bold ml-2 lg:ml-4 transition-colors">
          System Logs
        </h1>
      </div>

      <div className="w-full lg:w-auto mt-2 lg:mt-0 lg:absolute lg:left-4">
        <SearchBar />
      </div>
    </nav>
  );
}
