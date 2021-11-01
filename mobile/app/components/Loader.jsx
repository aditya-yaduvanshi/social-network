import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Loader = () => {
  return (
    <>
      <View style={styles.view}>
        <Image 
          source={require("../assets/loading-buffering.gif")} 
          style={styles.img}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  img: {
    width: 50,
    height: 50
  }
})

export default Loader;