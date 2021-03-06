//Async storage
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { createContext, useState } from "react";

let principalUser = {
  id: null,
  fullName: null,
  account: null,
  age: null,
  email: null,
};

const getData = async () => {
  try {
    let value = await AsyncStorage.getItem("@storage_Key");
    if (value !== null) {
      try {
        value = jwtDecode(value);
        if (value?.exp * 1000 < Date.now() && value) {
          localStorage.removeItem("@storage_Key");
        } else {
          principalUser = value;
        }
      } catch (error) {
        await AsyncStorage.removeItem("@storage_Key");
      }
    }
  } catch (e) {}
};

const AuthContext = createContext({
  user: { id: null, fullName: null, account: null, age: null, email: null },
  setUser: () => {},
  login: (loginData) => {},
  logout: () => {},
});

getData();

const AuthProvider = (props) => {
  const [user, setUser] = useState(principalUser);

  const login = async (loginData) => {
    await AsyncStorage.setItem("@storage_Key", loginData.token);
    const data = jwtDecode(loginData.token);
    setUser({
      email: data.email,
      id: data.id,
      account: loginData.account,
      age: loginData.age,
      fullName: loginData.fullName,
    });
  };

  const logout = async () => {
    await AsyncStorage.removeItem("@storage_Key");

    setUser({
      id: null,
      fullName: null,
      account: null,
      age: null,
      fullName: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: user, login: login, logout: logout, setUser: setUser }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
