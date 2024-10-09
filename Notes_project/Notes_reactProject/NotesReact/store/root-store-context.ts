import { Children, createContext, useContext } from "react";
import store from "./store";
import DataStore from "./store";

export const RootStoreContext = createContext<DataStore | null>(null);

export const useStores = () => {
  const context = useContext(RootStoreContext);
  if (context === null) {
    throw new Error("");
  }
  return context;
};

// export const RootContext = createContext(store);

// export const RootContextProvider = ({Children}) =>
//     {
//         return <RootContext.Provider value={store}>
//                 {Children}
//         </RootContext.Provider>
//     }
