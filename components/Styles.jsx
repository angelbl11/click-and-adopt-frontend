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
  padding-top: ${StatusBarHeight + 10}px;
  background-color: ${primary};
`;

export const InnerContainer = styled(View)`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const WelcomeContainer = styled(InnerContainer)`
  padding: 25px;
  padding-top: 10px;
  justify-content: center;
`;

export const PageLogo = styled(Image)`
  width: 150px;
  height: 150px;
`;

export const Avatar = styled(Image)`
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
    props.cuestionary == true &&
    `
    font-size: 16px;
    padding-top: 10px;
    margin-bottom: 15px;
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
    props.validation == true &&
    `
    color: ${red}
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
  props.secondButton == true &&
  `
background-color: ${red};
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
  padding-left: 55px;
  padding-right: 50px;
`;

export const ContractView = styled(View)`
justify-content: center;
flex-direction; row;
align-items: center;
padding: 20px;
padding-bottom:20px;
`;

export const ContractCheckBoxView = styled(View)`
justify-content: center;
flex-direction; row;
align-items: center;
padding: 20px;
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
