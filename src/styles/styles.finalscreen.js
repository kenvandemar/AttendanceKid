import GlobalStyles from "./styles.global";
import { StyleSheet } from "react-native";

export const FinalScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },

  imageFinalView: {
    flex: 4,
    marginTop: 60,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowColor: "#000",
    width: "100%",
    height: "43%",
    borderRadius: 7
  },

  imageFinal: {
    width: "100%",
    height: "100%",
    borderRadius: 7
  },
  kidInfo: {
    flex: 7,
    marginTop: 50
  },
  kidNameText: {
    color: "rgb(114, 114, 114)",
    fontSize: 55,
    fontWeight: "600",
    fontFamily: "HelveticaNeue"
  },
  checkInView: {
    flexDirection: "row",
    marginTop: 40
  },
  checkInText: {
    fontFamily: "HelveticaNeue",
    fontSize: 30,
    fontWeight: "500"
  },
  checkInTimeText: {
    color: "rgb(146, 146, 146)",
    fontFamily: "HelveticaNeue",
    fontSize: 30,
    marginLeft: 30
  },

  achievementView: {
    flexDirection: "row",
    marginTop: 40
  },
  achievementText: {
    color: "rgb(146, 146, 146)",
    fontFamily: "HelveticaNeue",
    fontSize: 30,
    fontWeight: "600"
  },
  achievementImage: {
    color: "rgb(255, 137, 47)",
    fontFamily: "HelveticaNeue",
    fontSize: 30,
    fontWeight: "600",
    marginLeft: 30
  },

  //PUZZLE FIELD

  puzzleView: {
    marginTop: 20,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgb(251, 140, 67)",
    height: 300,
    width: 330,
    justifyContent: "center",
    alignItems: "flex-start"
  },

  squareView: {
    height: 290,
    width: 320,
    // backgroundColor: "rgba(0,0,0,0)",
    zIndex: 99999999999,
    position: "absolute"
  },
  puzzleImage: {
    width: 280,
    height: 260
  },

  puzzlePieceView: {
    width: 108,
    height: 110,
    backgroundColor: "rgba(0,0,0, 0)",
    borderStyle: "solid",
    borderRightColor: "lightgray",
    borderRightWidth: 1,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1
  },

  // BACK HOME BUTTON
  backBtnView: {
    borderStyle: "solid",
    borderWidth: 5,
    borderColor: "rgb(91, 187, 251)",
    borderRadius: 8,
    width: 200,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 90
  },
  backBtnText: {
    fontFamily: "HelveticaNeue",
    color: "rgb(91, 187, 251)",
    fontSize: 50,
    fontWeight: "900"
  },
  // HONEY BIG JAR
  bigJarView: {
    flexDirection: "row",
    marginTop: 80
  },

  plusSign: {
    alignSelf: "center",
    marginRight: 20
  }
});
