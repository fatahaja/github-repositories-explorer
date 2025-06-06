import React, { createContext, useState, useContext, type ReactNode } from 'react';
import type { IUserData } from '../components/list-user';
import type { IRepositoryData } from '../components/list-repository';

interface AppContextType {
  userData?: IUserData[];
  setUserData: React.Dispatch<React.SetStateAction<IUserData[] | undefined>>;
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  repositoryData?: IRepositoryData[];
  setRepositoryData: React.Dispatch<React.SetStateAction<IRepositoryData[] | undefined>>;
}

const defaultContextValue: AppContextType = {
  userData: undefined,
  setUserData: () => { },
  keyword: '',
  setKeyword: () => { },
  repositoryData: undefined,
  setRepositoryData: () => { }
};

const AppContext = createContext<AppContextType>(defaultContextValue);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<IUserData[]>();
  const [keyword, setKeyword] = useState<string>('');
  const [repositoryData, setRepositoryData] = useState<IRepositoryData[]>()

  return (
    <AppContext.Provider value={{ userData, setUserData, keyword, setKeyword, repositoryData, setRepositoryData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
