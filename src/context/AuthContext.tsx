import { createContext, useState, useEffect } from "react";

import {
  analytics,
  auth,
  database,
  firebase,
} from "../service/FirebaseService";
import { setUserProperties } from "firebase/analytics";

type AuthContextType = {
  user: UserProps | undefined;
  updateUser: (user: UserProps) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

type AuthContextProviderType = {
  children: React.ReactNode;
};

export type UserProps = {
  id: string;
  name: string;
  photoURL: string;
};

export function AuthContextProvider({ children }: AuthContextProviderType) {
  const [user, setUser] = useState<UserProps>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (user) {
        const { displayName, uid, photoURL } = user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account.");
        }

        setUser({
          id: uid,
          name: displayName,
          photoURL: photoURL,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      console.log(result.user);

      const { displayName, uid, photoURL } = result.user;

      if (!displayName) {
        throw new Error("Missing information from Google Account.");
      }

      const newUser: UserProps = {
        id: uid || "",
        name: displayName || "",
        photoURL: photoURL || "",
      };

      setUser(newUser);

      if (typeof analytics === "undefined") return;
      setUserProperties(analytics, { is_logged: true });
    }
  }

  async function signOut() {
    await auth.signOut();
    setUser(undefined);

    if (typeof analytics === "undefined") return;
    setUserProperties(analytics, { is_logged: false });
  }

  async function updateUser(user: UserProps) {
    const userRef = database.ref(`users/${user?.id}`);
    await userRef.update(user);
    setUser(user);
  }

  return (
    <AuthContext.Provider
      value={{ user, updateUser, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
