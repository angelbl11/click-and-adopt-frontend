import React, { createContext, useState } from "react";
import { ip } from "../graphql/client";
const PetsContext = createContext({
  pets: [],
  setPets: () => {},
  setPetImage: () => {},
  petImage: [],
  petId: "",
  setPetId: () => {},
});

const PetsProvider = (props) => {
  const [pets, setPets] = useState([]);
  const [petImage, setPetImage] = useState([]);
  const [petId, setPetId] = useState();
  return (
    <PetsContext.Provider
      value={{
        pets: pets,
        setPets: setPets,
        petImage: petImage,
        setPetImage: setPetImage,
        setPetId: setPetId,
        petId: petId,
      }}
      {...props}
    />
  );
};

export { PetsContext, PetsProvider };
