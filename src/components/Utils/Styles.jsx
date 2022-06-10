import styled from "styled-components";
import Constants from "expo-constants";
import { CARD } from "../Card/CardConstants";
import { LinearGradient } from "expo-linear-gradient";
const StatusBarHeight = Constants.statusBarHeight;

//Card Constants
const CARDWIDTH = CARD.WIDTH;
const CARDHEIGHT = CARD.HEIGHT;
const CARDBORDER = CARD.BORDER_RADIUS;

//Native Base Components
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

//Colors
export const Colors = {
  primary: "#FFFFFF",
  secondary: "#E5E7EB",
  tertiary: "#1F2937",
  darkLight: "#9CA3AF",
  brand: "#6A994E",
  green: "#10B981",
  red: "#BC4749",
  info: "#7E848F",
};

const { primary, secondary, tertiary, darkLight, brand, red, green, info } =
  Colors;

//General containers

export const StyledContainer = styled(View)`
  flex: 1;
  padding-top: ${StatusBarHeight}px;
  background-color: ${primary};
`;

export const InnerContainer = styled(View)`
  flex: 1;
  height: 100%;
  align-items: center;
`;

export const InfoContainer = styled(View)`
  margin-left: 140px;
  display: flex;
  flex-direction: column;
`;

export const ExtraView = styled(View)`
justify-content: center;
flex-direction; row;
align-items: center;
padding: 20px;
padding-bottom:150px;
`;

//General Text

export const PageTitle = styled(Heading)`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${brand};

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
   padding-top: 10px;
   margin-left: 13px;
  `}
   ${(props) =>
    props.about &&
    `
   padding-right: 273px;
   margin-top: 5px;
   font-size: 25px;
   font-weight: bold;
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
    font-weight: normal;
    padding-right: 260px;
    padding-left: 20px;
    margin-top: 8px;
    width: 100%;
    height: 20px;
    color: ${tertiary}
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

export const MsgBox = styled(Text)`
  text-align: center;
  font-size: 13px;
  color: ${(props) => (props.type == "Success" ? green : red)};
`;

export const ExtraText = styled(Text)`
  justify-content: center;
  align-content: center;
  color: ${tertiary};
  font-size: 15px;
`;

//Atributes
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

//Forms

export const StyledFormArea = styled(View)`
  width: 90%;
`;

//Form Input
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

//Form Label

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

//Form Input Icon

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

//Form Button & BtnText

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

export const UploadButtonText = styled(Text)`
  color: ${tertiary};
  font-size: 16px;
  font-weight: bold;
`;

//Text Area

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

//Contract

export const StyledTextContract = styled(Text)`
  color: ${tertiary};
  font-size: 15px;
  margin-bottom: 8px;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 12px;
  height: 480px;
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

//TextLink

export const TextLink = styled(Pressable)`
  justify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled(Text)`
  color: ${brand};
  font-size: 15px;
`;

//Generic Image
export const StyledImage = styled(Image)`
  justify-content: center;
  align-items: center;
  height: 50%;
  min-width: 90%;
`;

//Credential Component
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

//Cards

export const CardWrapper = styled(View)`
  position: absolute;
`;

export const CardPicture = styled(Image)`
  border-radius: ${CARDBORDER}px;
  width: ${CARDWIDTH}px;
  height: ${CARDHEIGHT}px;
`;

export const CardName = styled(Text)`
  position: absolute;
  bottom: 22px;
  left: 26px;
  font-size: 28px;
  padding-top: 12px;
  font-weight: bold;
  color: ${primary};
`;

export const CardGradient = styled(LinearGradient)`
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 110px;
  border-radius: ${CARDBORDER}px;
`;

export const CardCont = styled(View)`
  align-items: center;
`;

//Card choice

export const ChoiceContainer = styled(View)`
  border-width: 6px;
  padding-horizontal: 15px;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const ChoiceText = styled(Text)`
  font-size: 32px;
  padding-top: 12px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 4px;
`;

//Carrousel

export const CarruselButtonsWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  width: 100%;
  position: absolute;
  bottom: 110px;
  justify-content: space-evenly;
  margin-top: 13px;
  z-index: -1;
`;

export const CarruselButton = styled(IconButton)`
  background-color: white;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
  border-radius: 40px;
`;

//Reason/Info Component

export const ReasonTextContainer = styled(View)`
  flex-direction: row;
  width: 90%;
  ${(props) =>
    props.otherInfo &&
    `
    flex-direction:column;
`}
`;

export const ReasonText = styled(Text)`
  font-size: 18px;
  font-weight: normal;
  color: ${info};
  flex: 1;
  flex-wrap: wrap;
`;

export const UserInfoText = styled(Text)`
  font-size: 18px;
  font-weight: normal;
  padding-right: 260px;
  width: 100%;
  height: 40px;
  color: ${info};
`;

//Like Component

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