import { gql } from "@apollo/client";

export const GET_ADOPTED_INFO = gql`
  query ($getAdoptedInfoId: String!) {
    getAdoptedInfo(id: $getAdoptedInfoId) {
      id
      adoptedPetDescription
      adoptedPetName
      adoptedPetProtocol
      ageOfAdoptedPet
      coexistenceWithOtherPets
      genderOfAdoptedPet
      isHealthyWithKids
      isHealthyWithOtherPets
      isAvailableToBeAdopted
      typeOfAdoptedPet
      petPicture {
        filename
      }
    }
  }
`;

export const GET_ADOPTER_INFO = gql`
  query getAdopterInfo($getAdopterInfoId: String!) {
    getAdopterInfo(id: $getAdopterInfoId) {
      adopterInfo {
        id
        haveCat
        haveDog
        havePets
        hadPets
        hadPetsValue
        hadPetsDate
        numberOfDogs
        numberOfCats
        isAgreeWithProtocol
        isChildren
        isAvailableToAdopt
        petAgePreferences
        petPreferences
        petSizePreferences
        reasonToAdopt
        petGenderPreferences
        numberOfDays
        numberOfMonths
        numberOfYears
      }
      userInfo {
        account
        age
        fullName
        id
        email
        profilePicture {
          filename
        }
      }
    }
  }
`;

export const GET_RANDOM_PETS = gql`
  query getRandomPet($userId: String!) {
    getRandomPet(userId: $userId) {
      pets {
        adoptedPetDescription
        adoptedPetName
        adoptedPetProtocol
        coexistenceWithOtherPets
        genderOfAdoptedPet
        id
        isHealthyWithKids
        isHealthyWithOtherPets
        petPicture {
          filename
        }
        typeOfAdoptedPet
      }
      numOfLikes
    }
  }
`;

export const GET_RANDOM_ADOPTERS = gql`
  query getRandomAdopter($userId: String!) {
    getRandomAdopter(userId: $userId) {
      petPreferences
      id
      petAgePreferences
      petGenderPreferences
      hadPets
      hadPetsDate
      hadPetsValue
      haveCat
      haveDog
      havePets
      isAgreeWithProtocol
      isChildren
      numberOfCats
      numberOfDays
      numberOfDogs
      numberOfMonths
      numberOfYears
      petSizePreferences
      reasonToAdopt
      userId {
        account
        age
        fullName
        email
        id
        profilePicture {
          filename
        }
      }
    }
  }
`;

export const GET_ADOPTER_LIKES = gql`
  query getPetsLikes($userId: String!) {
    getPetsLikes(userId: $userId) {
      numOfLikes
      likes {
        date
        petId {
          id
          adoptedPetDescription
          adoptedPetName
          adoptedPetProtocol
          ageOfAdoptedPet
          coexistenceWithOtherPets
          genderOfAdoptedPet
          id
          isHealthyWithKids
          isHealthyWithOtherPets
          petPicture {
            filename
          }
          typeOfAdoptedPet
        }
      }
    }
  }
`;
