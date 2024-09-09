import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("Current user:", user);
  }, [user]);
  useEffect(() => {
    fetch("/check-session", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json().then((data) => {
            setUser(data.user);
          });
        } else {
          return res.json().then((errorObj) => {
            console.error(errorObj.error);
          });
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return React.useContext(UserContext);
}
