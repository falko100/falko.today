import nookies from 'nookies';
import { createContext, useContext, useEffect, useState } from 'react';
import { firebaseAuth, firebaseClient } from '@/lib/firebaseClient';
import type { User } from '@firebase/auth';
import { getAuth, signInWithRedirect } from 'firebase/auth';
import { GoogleAuthProvider } from '@firebase/auth';

const AuthContext = createContext<{ user: User | null }>({
  user: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return firebaseAuth.onIdTokenChanged(async (user) => {
      if (user === null) {
        setUser(null);
        nookies.destroy(undefined, 'token', { path: '/' });
        return;
      }

      const token = await user.getIdToken();
      setUser(user);
      nookies.set(undefined, 'token', token, { path: '/' });
    });
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebaseAuth.currentUser;
      if (user !== null) {
        await user.getIdToken(true);
      }
    }, 10 * 60000); // Every 10 minutes

    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export const login = () => {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(firebaseAuth, provider);
};

export const logout = () => {
  firebaseAuth.signOut();
};
