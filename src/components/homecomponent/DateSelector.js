import React, { useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import COLORS from "../../constants/colors";

const DateSelector = ({ selectedDate, setSelectedDate }) => {
  // Generate next 30 real dates
  const dates = useMemo(() => {
    const today = new Date();

    return Array.from({ length: 30 }, (_, index) => {
      const date = new Date(today);

      date.setDate(today.getDate() + index);

      return {
        date: date.getDate(),

        day: date
          .toLocaleDateString("en-US", {
            weekday: "short",
          })
          .toUpperCase(),

        month: date
          .toLocaleDateString("en-US", {
            month: "short",
          })
          .toUpperCase(),

        fullDate: [
          date.getFullYear(),
          String(date.getMonth() + 1).padStart(2, "0"),
          String(date.getDate()).padStart(2, "0"),
        ].join("-"),
      };
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {dates.map((item) => {
          const selected = selectedDate === item.fullDate;

          return (
            <TouchableOpacity
              key={item.fullDate}
              activeOpacity={0.8}
              onPress={() => setSelectedDate(item.fullDate)}
              style={[
                styles.dateCard,
                selected && styles.selectedCard,
              ]}
            >
              {/* Date */}
              <Text
                style={[
                  styles.date,
                  selected && styles.selectedText,
                ]}
              >
                {item.date}
              </Text>

              {/* Day */}
              <Text
                style={[
                  styles.day,
                  selected && styles.selectedText,
                ]}
              >
                {item.day}
              </Text>

              {/* Month */}
              <Text
                style={[
                  styles.month,
                  selected && styles.selectedText,
                ]}
              >
                {item.month}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default DateSelector;

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
  },

  scrollContent: {
    paddingHorizontal: 30,
    gap: 8,
  },

  dateCard: {
    width: 70,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    borderRadius: 17,
    backgroundColor: COLORS.white,
  },

  selectedCard: {
    backgroundColor: COLORS.primary,
  },

  date: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.black,
  },

  day: {
    fontSize: 10,
    fontWeight: "500",
    color: "#555",
  },

  month: {
    fontSize: 10,
    fontWeight: "500",
    color: "#555",
  },

  selectedText: {
    color: COLORS.white,
  },
});