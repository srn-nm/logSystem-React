import { createContext } from "react";

export interface DataContextType {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export default DataContext;