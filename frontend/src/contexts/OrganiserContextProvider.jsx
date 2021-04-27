import React from "react";
import useGet from "../hooks/useGet";

const OrganiserContext = React.createContext({ isUserOrganiser: false });

function OrganiserContextProvider({ children, roadTripId }) {
    const { response } = useGet(`/api/roadtrip/${roadTripId}/isUserOrganiser`);
    const isUserOrganiser = response?.data?.result || false;

    return (
        <OrganiserContext.Provider value={{ isUserOrganiser }}>
            {children}
        </OrganiserContext.Provider>
    );
}

export {
    OrganiserContext,
    OrganiserContextProvider
};
