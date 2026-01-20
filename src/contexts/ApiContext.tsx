import { createContext, useMemo } from "react";
import { getApisInstance, type Apis } from "../services";

interface IApiContext {
  apis: Apis;
}

export const ApiContext = createContext({} as IApiContext);

interface ApiContextProps {
  children: React.ReactNode;
}

export function ApiProvider({ children }: ApiContextProps) {
  const apis: Apis = useMemo(() => getApisInstance(), []);

  return <ApiContext.Provider value={{ apis }}>{children}</ApiContext.Provider>;
}
