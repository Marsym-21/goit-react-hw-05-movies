import React, { useContext, useState } from 'react';

const ContextAlert = React.createContext();

export const useCustomContext = () => {
  return useContext(ContextAlert);
};

const Context = ({ children }) => {
  const [id, setId] = useState('');
  const [statusC, setStatusc] = useState(false);
  const [statusR, setStatusr] = useState(false);
  return (
    <ContextAlert.Provider
      value={{
        id: id,
        setId: setId,
        statusC: statusC,
        setStatusc: setStatusc,
        statusR: statusR,
        setStatusr: setStatusr,
      }}
    >
      {children}
    </ContextAlert.Provider>
  );
};
export default Context;