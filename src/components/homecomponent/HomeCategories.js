import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";

const HomeCategories = ({ active, setActive }) => {
  return (
    <View style={styles.container}>

      <TouchableOpacity
        onPress={() => setActive("Doctors")}
        style={styles.item}
      >
        <Ionicons
          name="medkit-outline"
          size={32}
          color={COLORS.primary}
        />

        <Text style={styles.text}>
          Doctors
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setActive("Favorite")}
        style={styles.item}
      >
        <Ionicons
          name="heart-outline"
          size={32}
          color={COLORS.primary}
        />

        <Text style={styles.text}>
          Favorite
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default HomeCategories;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 30,
    marginTop: 20,
    gap: 38,
  },

  item: {
    alignItems: "center",
  },

  text: {
    marginTop: 5,
    fontSize: 13,
    color: COLORS.primary,
  },
});