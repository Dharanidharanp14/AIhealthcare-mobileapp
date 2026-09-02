import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import COLORS from "../../constants/colors";

const dates = [
  { date: "9", day: "MON" },
  { date: "10", day: "TUE" },
  { date: "11", day: "WED" },
  { date: "12", day: "THU" },
  { date: "13", day: "FRI" },
  { date: "14", day: "SAT" },
];

const DateSelector = ({
  selectedDate,
  setSelectedDate,
}) => {
  return (
    <View style={styles.container}>

      {dates.map((item) => {
        const selected = selectedDate === item.date;

        return (
          <TouchableOpacity
            key={item.date}
            onPress={() => setSelectedDate(item.date)}
            style={[
              styles.dateCard,
              selected && styles.selectedCard,
            ]}
          >
            <Text
              style={[
                styles.date,
                selected && styles.selectedText,
              ]}
            >
              {item.date}
            </Text>

            <Text
              style={[
                styles.day,
                selected && styles.selectedText,
              ]}
            >
              {item.day}
            </Text>
          </TouchableOpacity>
        );
      })}

    </View>
  );
};

export default DateSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
    paddingHorizontal: 30,
    marginTop: 28,
  },

  dateCard: {
    width: 45,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 17,
    backgroundColor: COLORS.white,
  },

  selectedCard: {
    backgroundColor: COLORS.primary,
  },

  date: {
    fontSize: 20,
    color: COLORS.black,
    fontWeight: "500",
  },

  day: {
    fontSize: 10,
    color: "#555",
    marginTop: 5,
  },

  selectedText: {
    color: COLORS.white,
  },
});