import React, { createContext, useState } from "react";
import { ip } from "../graphql/client";
const PetsContext = createContext({
  pets: [],
  setPets: () => {},
  setPetImage: () => {},
  petImage: [],
  petId: "",
  setPetId: () => {},
  num: 0,
  setNum: () => {},
});

const PetsProvider = (props) => {
  const [pets, setPets] = useState([]);
  const [petImage, setPetImage] = useState([]);
  const [petId, setPetId] = useState("");
  const [num, setNum] = useState(0);
  return (
    <PetsContext.Provider
      value={{
        pets: pets,
        setPets: setPets,
        petImage: petImage,
        setPetImage: setPetImage,
        setPetId: setPetId,
        petId: petId,
        num,
        setNum,
      }}
      {...props}
    />
  );
};

export { PetsContext, PetsProvider };
