import React, { useContext } from 'react';

const ContextAlert = React.createContext();

export const useCustomContext = () => {
  return useContext(ContextAlert);
};

const Context = ({ children }) => {
  //   const [data, setData] = useState('data');
  return (
    <ContextAlert.Provider value={{ data: 'Home' }}>
      {children}
    </ContextAlert.Provider>
  );
};
export default Context;
