import React, { useContext, useState } from 'react';

const ContextAlert = React.createContext();

export const useCustomContext = () => {
  return useContext(ContextAlert);
};

const Context = ({ children }) => {
  const [id, setId] = useState('');

  return (
    <ContextAlert.Provider
      value={{
        id: id,
        setId: setId,
      }}
    >
      {children}
    </ContextAlert.Provider>
  );
};
export default Context;
