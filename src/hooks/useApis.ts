import { useContext } from "react";
import { ApiContext } from "../contexts/ApiContext";

export function useApis() {
  const apiContext = useContext(ApiContext);

  if (!Object.keys(ApiContext).length) {
    return new Error("useApis should be used with ApiContext");
  }

  const { apis } = apiContext;

  return apis;
}
