import styled from "styled-components";
import Constants from "expo-constants";
const StatusBarHeight = Constants.statusBarHeight;

import {
  Input,
  View,
  Text,
  Heading,
  Image,
  Pressable,
  TextArea,
  IconButton,
} from "native-base";

//colors
export const Colors = {
  primary: "#FFFFFF",
  secondary: "#E5E7EB",
  tertiary: "#1F2937",
  darkLight: "#9CA3AF",
  brand: "#6A994E",
  green: "#10B981",
  red: "#BC4749",
};
const { primary, secondary, tertiary, darkLight, brand, red, green } = Colors;
export const StyledContainer = styled(View)`
  flex: 1;
  padding-top: ${StatusBarHeight}px;
  background-color: ${primary};
`;

export const InnerContainer = styled(View)`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const Pic = styled(Image)`
  width: 100px;
  height: 100px;
  margin: auto;
  border-radius: 50px;
  border-width: 2px;
  border-color: ${secondary};
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const WelcomeImage = styled(Image)`
  height: 50%;
  min-width: 100%;
`;

export const PageTitle = styled(Heading)`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${brand};
  padding: 10px;
  ${(props) =>
    props.welcome &&
    `
  font-size: 35px;
  `}
  ${(props) =>
    props.contract &&
    `
  font-size: 25px;
  margin-bottom: 10px;
  padding: 2px;
  `}
   ${(props) =>
    props.profile &&
    `
   padding-right: 300px;
   font-size: 35px;
  `}
   ${(props) =>
    props.about &&
    `
   padding-right: 270px;
   padding-top: 13px;
   font-size: 25px;
   font-weight: bold;
  `}
`;

export const AtributesContainer = styled(View)`
  text-align: left;
`;

export const AtributesLabel = styled(Text)`
  font-size: 14px;
  margin-bottom: 12px;
  font-weight: normal;
  color: ${darkLight};
  padding-right: 230px;
  height: 18px;
`;

export const SubTitle = styled(Text)`
  font-size: 18px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${tertiary};
  ${(props) =>
    props.welcome &&
    `
  margin-bottom: 5px;
  font-weight: normal;
  `}
  ${(props) =>
    props.likeComponent &&
    `
    font-weight: bold;
    margin-bottom:6px;
  `}
  ${(props) =>
    props.cuestionary == true &&
    `
    font-size: 16px;
    padding-top: 10px;
    margin-bottom: 15px;
`}
${(props) =>
    props.profile &&
    `
    font-size: 22px;
    padding-top: 20px;
    margin-bottom: 15px;
`}
${(props) =>
    props.typeOfUserLabel &&
    `
    font-size: 16px;
    margin-bottom: 15px;
    font-weight: normal;
    color: ${darkLight}
`}
${(props) =>
    props.atributes &&
    `
    font-size: 20px;
    margin-bottom: 15px;
    font-weight: normal;
    padding-right: 260px;
    padding-left: 20px;
    width: 100%;
    height: 100px;
    color: ${darkLight}
`}
${(props) =>
    props.adoptedAtributes &&
    `
    font-size: 20px;
    margin-bottom: 15px;
    font-weight: normal;
    padding-top: 8px;
    padding-right: 260px;
    padding-left: 20px;
    width: 100%;
    height: 100px;
    color: ${darkLight}
`}
`;

export const StyledFormArea = styled(View)`
  width: 90%;
`;

export const StyledTextInput = styled(Input)`
  background-color: ${secondary};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${tertiary};
`;

export const StyledInputLabel = styled(Text)`
  color: ${tertiary};
  font-size: 13px;
  text-align: left;
  ${(props) =>
    props.validation &&
    `
    color: ${red}
`}
  ${(props) =>
    props.userStatus &&
    `
    color: ${darkLight}
`}
`;

export const StyledTextContract = styled(Text)`
  color: ${tertiary};
  font-size: 15px;
  margin-bottom: 8px;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 12px;
  height: 480px;
`;

export const LeftIcon = styled(View)`
  left: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled(Pressable)`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled(Pressable)`
padding: 15px;
background- color: ${brand};
justify-content: center;
align-items: center;
border-radius: 5px;
margin-vertical: 5px;
height: 60px;


${(props) =>
  props.secondButton &&
  `
background-color: ${red};
`}

${(props) =>
  props.carrouselAccess &&
  `
background-color: transparent;
height:380px;
`}

`;

export const ButtonText = styled(Text)`
  color: ${primary};
  font-size: 16px;
`;

export const MsgBox = styled(Text)`
  text-align: center;
  font-size: 13px;
  color: ${(props) => (props.type == "SUCCESS" ? green : red)};
`;

export const ExtraView = styled(View)`
justify-content: center;
flex-direction; row;
align-items: center;
padding: 20px;
padding-bottom:150px;
`;

export const ExtraText = styled(Text)`
  justify-content: center;
  align-content: center;
  color: ${tertiary};
  font-size: 15px;
`;

export const TextLink = styled(Pressable)`
  justify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled(Text)`
  color: ${brand};
  font-size: 15px;
`;

export const Separation = styled(View)`
  height: 1px;
  width: 100%;
  margin-vertical: 20px;
`;

export const ContractText = styled(Text)`
  color: ${tertiary};
  font-size: 14px;
`;

export const ContractView = styled(View)`
  margin: 50px;
  text-align: center;
  align-content: center;
  width: auto;
  padding: 0 18px 0 18px;
`;

export const ContractCheckBoxView = styled(View)`
  justify-content: center;
  align-items: center;
  width: 90%;
`;

export const StyledTextArea = styled(TextArea)`
  background-color: ${secondary};
  padding: 15px;
  border-radius: 5px;
  font-size: 13px;
  height: 80px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${tertiary};
`;

export const StyledImage = styled(Image)`
  justify-content: center;
  align-items: center;
  height: 50%;
  min-width: 90%;
`;

export const ChildWrapper = styled(View)`
  flex: 50%;
  flex-wrap: wrap;
  margin-bottom: 10px;
  flex-direction: row;
  margin: 5px;
  height: auto;
  justify-content: center;
  padding-top: 12px;
`;

export const SwitchWrapper = styled(View)`
  width: auto;
  flex-direction: row;
  height: auto;
  padding: 5px;
  align-items: center;
  justify-content: center;
`;

export const LabelWrapper = styled(View)`
  text-align: center;
  padding-left: 20px;
`;

export const AdoptedItemWrapper = styled(View)`
  width: auto;
  padding-right: 20px;
  padding-left: 20px;
  padding-bottom: 10px;
`;

export const CardContainer = styled(View)`
  width: 90%;
  max-width: 260px;
  height: 300px;
  padding-top: 18px;
`;

export const Card = styled(View)`
  position: absolute;
  background-color: #fff;
  width: 100%;
  max-width: 260px;
  height: 390px;
  shadow-color: black;
  shadow-opacity: 0.2;
  shadow-radius: 13px;
  border-radius: 13px;
  resize-mode: cover;
`;

export const CardImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 12px;
`;

export const CardTitle = styled(Text)`
  position: absolute;
  bottom: 0;
  margin: 10px;
  color: #fff;
`;

export const InfoText = styled(Text)`
  height: 28px;
  justify-content: center;
  display: flex;
  z-index: -100;
`;

export const CarruselButtonsWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  width: 100%;
  bottom: -150px;
  justify-content: space-evenly;
  margin-top: 13px;
`;

export const CarruselButton = styled(IconButton)`
  background-color: white;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
  border-radius: 40px;
`;

export const LikeComponentWrapper = styled(View)`
  flex-direction: row;
  display: flex;
  align-content: flex-start;
  margin: 22px 65px 0 30px;
`;

export const LikeComponentInfoWrapper = styled(View)`
  margin-left: 8px;
`;

export const LikeComponentDate = styled(Text)`
  font-size: 14px;
  color: ${darkLight};
`;

export const UserLikeWrapper = styled(View)`
  display: flex;
  margin: 18px;
  flex-flow: column wrap;
  height: 30%;
`;
