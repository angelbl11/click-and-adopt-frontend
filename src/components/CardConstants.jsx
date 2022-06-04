import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");

const CARD = {
  WIDTH: width * 0.9,
  HEIGHT: height * 0.6,
  BORDER_RADIUS: 20,
};

export default CARD;
