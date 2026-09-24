import { createContext, useEffect, useState  } from "react";
import { getMe } from "./services/auth.api";
import { clearAuthToken } from "../../config/api";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const getAndSetUser = async () => {
      try {
        const data = await getMe();
        if (isActive) {
          setUser(data?.user ?? null);
        }
      } catch {
        if (isActive) {
          clearAuthToken();
          setUser(null);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    getAndSetUser();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
