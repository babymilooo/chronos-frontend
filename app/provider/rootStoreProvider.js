import React, { createContext } from 'react';
import RootStore from '../store/rootStore';

const rootStore = new RootStore();
export const RootStoreContext = createContext(rootStore);

const RootStoreProvider = ({ children }) => {
    return (
        <RootStoreContext.Provider value={rootStore}>
            {children}
        </RootStoreContext.Provider>
    );
}

export default RootStoreProvider;