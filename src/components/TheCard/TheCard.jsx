import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";

import Pic1 from "../../assets/PET1.jpg";
import Pic2 from "../../assets/PET2.jpg";
import Pic3 from "../../assets/PET3.jpg";
import Pic4 from "../../assets/PET4.jpg";
import Pic5 from "../../assets/PET5.jpg";
import Pic6 from "../../assets/PET6.jpg";
import CardStack, { Card } from "react-native-card-stack-swiper";

const TheCard = () => {
  const cardRef = useRef(null);
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <CardStack
        style={styles.content}
        ref={cardRef}
        disableTopSwipe={true}
        disableBottomSwipe={true}
      >
        <Card style={styles.card}>
          <View style={styles.imageWrapper}>
            <ImageBackground style={styles.theImage} source={Pic1}>
              <Text styles={styles.label}>Hey</Text>
            </ImageBackground>
          </View>
        </Card>
        <Card style={styles.card}>
          <Image resizeMode="cover" style={styles.image} source={Pic2} />
        </Card>
        <Card style={styles.card}>
          <Image resizeMode="cover" style={styles.image} source={Pic3} />
        </Card>
        <Card style={styles.card}>
          <Image resizeMode="cover" style={styles.image} source={Pic4} />
        </Card>
        <Card style={styles.card}>
          <Image resizeMode="cover" style={styles.image} source={Pic5} />
        </Card>
        <Card style={styles.card}>
          <Image resizeMode="cover" style={styles.image} source={Pic6} />
        </Card>
      </CardStack>
    </View>
  );
};

export default TheCard;

const { height, width } = Dimensions.get("screen");

console.log("height", height);
console.log("width", width);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    // height: 460,
    // width: 300,
    width: width - 100,
    height: height - 300,
    borderRadius: 15,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomButtonContainer: {
    width: 220,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backbutton: {
    width: 55,
    height: 55,
    borderWidth: 6,
    borderColor: "rgb(246,190,66)",
    borderRadius: 55,
    marginTop: -15,
    justifyContent: "center",
    alignItems: "center",
  },
  rightSwipe: {
    width: 75,
    height: 75,
    backgroundColor: "#fff",
    borderRadius: 75,
    borderWidth: 6,
    borderColor: "#01df8a",
  },
  leftSwipe: {
    width: 75,
    height: 75,
    backgroundColor: "#fff",
    borderRadius: 75,
    borderWidth: 6,
    borderColor: "#fd267d",
  },
  label: {
    lineHeight: 400,
    marginTop: 90,
    textAlign: "center",
    fontSize: 55,
    fontFamily: "System",
    color: "#ffffff",
    backgroundColor: "transparent",
  },
  imageWrapper: {
    overflow: "hidden",
  },
  theImage: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
});
