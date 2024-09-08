
import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check-session")
      .then((res) => {
        if (res.status === 200) {
          return res.json().then(setUser);
        } else {
          return res.json().then((errorObj) => {
            toast.error(errorObj.error);
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
