import React from 'react';
import useGet from '../hooks/useGet';

const OrganiserContext = React.createContext({ isUserOrganiser: false, organiser: undefined });

function OrganiserContextProvider({ children, roadTripId }) {
  const { response: organiserResponse } = useGet(`/api/roadtrip/${roadTripId}/organiser`);
  const organiser = organiserResponse?.data || undefined;
  const { response: isUserOrganiserResponse } = useGet(`/api/roadtrip/${roadTripId}/isUserOrganiser`);
  const isUserOrganiser = isUserOrganiserResponse?.data?.result || false;

  return <OrganiserContext.Provider value={{ isUserOrganiser, organiser }}>{children}</OrganiserContext.Provider>;
}

export { OrganiserContext, OrganiserContextProvider };
