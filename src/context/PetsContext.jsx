import React, { createContext, useState } from "react";

const PetsContext = createContext({
  pets: [],
  setPets: () => {},
});

const PetsProvider = (props) => {
  const [pets, setPets] = useState([]);
  return (
    <PetsContext.Provider value={{ pets: pets, setPets: setPets }} {...props} />
  );
};

export { PetsContext, PetsProvider };
