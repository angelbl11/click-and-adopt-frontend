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
      numOfLikes
      users {
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
          email
          fullName
          profilePicture {
            filename
          }
          id
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

export const GET_ADOPTED_LIKES = gql`
  query getUserLikes($userId: String!) {
    getUserLikes(userId: $userId) {
      likes {
        likedUserId {
          hadPets
          hadPetsDate
          hadPetsValue
          haveCat
          haveDog
          havePets
          id
          isAgreeWithProtocol
          isChildren
          numberOfCats
          numberOfDays
          numberOfDogs
          numberOfMonths
          numberOfYears
          petAgePreferences
          petGenderPreferences
          petPreferences
          petSizePreferences
          reasonToAdopt
          userId {
            account
            age
            email
            fullName
            password
            profilePicture {
              filename
            }
            id
          }
        }
        date
      }
    }
  }
`;
