//Async storage
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { createContext, useState } from "react";

let principalUser = {
  id: null,
  fullName: null,
  account: null,
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

          console.log(principalUser);
        }
      } catch (error) {
        await AsyncStorage.removeItem("@storage_Key");
      }
    }
  } catch (e) {}
};

const AuthContext = createContext({
  user: null,
  login: (loginData) => {},
  logout: () => {},
  register: (registerData) => {},
});

getData();

const AuthProvider = (props) => {
  const [user, setUser] = useState(principalUser);

  const login = async (loginData) => {
    await AsyncStorage.setItem("@storage_Key", loginData.token);
    const data = jwtDecode(loginData.token);
    setUser(data);

    console.log(user.id);
  };

  const register = async (registerData) => {
    await AsyncStorage.setItem("@storage_Key", registerData.token);
    const data = jwtDecode(registerData.token);
    setUser(data);
    console.log(user.id);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("@storage_Key");

    setUser({
      id: null,
      fullName: null,
      account: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: user, login: login, logout: logout, register: register }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };