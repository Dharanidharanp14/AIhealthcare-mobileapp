import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../constants/colors";

const AppointmentSchedule = ({ selectedDate }) => {
  const times = ["9 AM", "10 AM", "11 AM", "12 PM"];

  // Convert YYYY-MM-DD to a readable date
  const getSelectedDateInfo = () => {
    if (!selectedDate) {
      const today = new Date();

      return {
        date: today.getDate(),
        day: today.toLocaleDateString("en-US", {
          weekday: "long",
        }),
        isToday: true,
      };
    }

    // Avoid timezone problems with YYYY-MM-DD
    const [year, month, day] = selectedDate.split("-");

    const date = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );

    const today = new Date();

    const isToday =
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();

    return {
      date: date.getDate(),
      day: date.toLocaleDateString("en-US", {
        weekday: "long",
      }),
      isToday,
    };
  };

  const selectedDateInfo = getSelectedDateInfo();

  return (
    <View style={styles.container}>

      {/* Selected Date */}
      <Text style={styles.title}>
        {selectedDateInfo.date} {selectedDateInfo.day}
        {selectedDateInfo.isToday ? " - Today" : ""}
      </Text>

      <View style={styles.schedule}>

        {/* Time column */}
        <View style={styles.times}>
          {times.map((time) => (
            <Text
              key={time}
              style={styles.time}
            >
              {time}
            </Text>
          ))}
        </View>

        {/* Schedule lines */}
        <View style={styles.lines}>

          {times.map((time, index) => (
            <View
              key={time}
              style={styles.lineRow}
            >

              {/* Dashed line */}
              <View style={styles.dashedLine} />

              {/* Appointment */}
              {index === 1 && (
                <View style={styles.appointment}>

                  <View style={styles.appointmentContent}>

                    <Text style={styles.doctorName}>
                      Dr. Olivia Turner, M.D.
                    </Text>

                    <Text style={styles.description}>
                      Treatment and prevention of
                    </Text>

                    <Text style={styles.description}>
                      skin and photodermatitis.
                    </Text>

                  </View>

                  <View style={styles.close}>
                    <Ionicons
                      name="close"
                      size={12}
                      color={COLORS.primary}
                    />
                  </View>

                </View>
              )}

            </View>
          ))}

        </View>

      </View>
    </View>
  );
};

export default AppointmentSchedule;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginTop: 25,
    height: 140,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    padding: 15,
  },

  title: {
    textAlign: "right",
    color: COLORS.primary,
    fontSize: 10,
    marginRight: 5,
    marginBottom: 8,
  },

  schedule: {
    flexDirection: "row",
    flex: 1,
  },

  times: {
    width: 38,
    justifyContent: "space-between",
    paddingVertical: 2,
  },

  time: {
    fontSize: 9,
    color: COLORS.primary,
  },

  lines: {
    flex: 1,
    justifyContent: "space-between",
  },

  lineRow: {
    height: 25,
    justifyContent: "center",
    position: "relative",
  },

  dashedLine: {
    borderTopWidth: 1,
    borderColor: COLORS.primary,
    borderStyle: "dashed",
    width: "100%",
  },

  appointment: {
    position: "absolute",
    left: 10,
    top: -8,
    width: "80%",
    height: 45,
    borderRadius: 12,
    backgroundColor: COLORS.lightBlue,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  appointmentContent: {
    flex: 1,
  },

  doctorName: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: "600",
  },

  description: {
    color: "#555",
    fontSize: 8,
  },

  close: {
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
});