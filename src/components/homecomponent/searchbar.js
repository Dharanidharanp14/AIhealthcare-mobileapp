import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";

const SearchBar = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>

      <Ionicons
        name="options-outline"
        size={25}
        color="#333"
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search doctors..."
        placeholderTextColor="#777"
        style={styles.input}
      />

      <Ionicons
        name="search-outline"
        size={28}
        color={COLORS.primary}
      />

    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    height: 74,
    marginHorizontal: 30,
    backgroundColor: COLORS.lightBlue,
    borderRadius: 37,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
  },

  input: {
    flex: 1,
    marginHorizontal: 12,
    fontSize: 17,
    color: COLORS.black,
  },
});