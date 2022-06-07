import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  UserLikeWrapper,
} from "../../components/Utils/Styles";

import LikedUserComponent from "../../components/RenderObjects/LikedUserComponent";
const AdoptedLikesScreen = () => {
  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageTitle>Likes</PageTitle>
        <UserLikeWrapper>
          <LikedUserComponent
            url={
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            }
            date={"12/02/2022"}
            name={"Chleo"}
          ></LikedUserComponent>
          <LikedUserComponent
            url={
              "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            }
            name={"William"}
            date={"14/03/2022"}
          ></LikedUserComponent>
        </UserLikeWrapper>
      </InnerContainer>
    </StyledContainer>
  );
};

export default AdoptedLikesScreen;
