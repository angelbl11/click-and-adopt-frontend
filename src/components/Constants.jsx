const { Dimensions } = require("react-native");

const { width, height } = Dimensions.get("screen");

export const CARD = {
  WIDTH: width * 0.9,
  HEIGHT: height * 0.78,
  BORDER_RADIUS: 20,
};
