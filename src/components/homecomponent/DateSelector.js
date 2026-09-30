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
      <Text style={styles.sectionTitle}>Select date</Text>
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
              accessibilityRole="button"
              accessibilityLabel={`${item.day}, ${item.month} ${item.date}`}
              accessibilityState={{ selected }}
              onPress={() => setSelectedDate(item.fullDate)}
              style={[
                styles.dateCard,
                selected && styles.selectedCard,
              ]}
            >
              {/* Month */}
              <Text
                style={[
                  styles.month,
                  selected && styles.selectedText,
                ]}
              >
                {item.month}
              </Text>

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
    marginTop: 18,
  },

  sectionTitle: {
    color: COLORS.darkText,
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 12,
    paddingHorizontal: 30,
  },

  scrollContent: {
    paddingHorizontal: 30,
    paddingBottom: 3,
    gap: 9,
  },

  dateCard: {
    width: 60,
    height: 84,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  selectedCard: {
    backgroundColor: COLORS.primary,
  },

  date: {
    fontSize: 23,
    fontWeight: "600",
    color: COLORS.black,
    lineHeight: 27,
  },

  day: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.softText,
  },

  month: {
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.primary,
  },

  selectedText: {
    color: COLORS.white,
  },
});