import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../constants/colors";

const AppointmentSchedule = ({ selectedDate, appointments = [] }) => {
  const date = selectedDate
    ? new Date(`${selectedDate}T00:00:00`)
    : new Date();
  const validDate = Number.isNaN(date.getTime()) ? new Date() : date;
  const dateLabel = validDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const selectedAppointments = appointments.filter(
    (appointment) => appointment.date === selectedDate
  );

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <View style={styles.headingText}>
          <Text style={styles.title}>Appointments</Text>
          <Text style={styles.dateLabel}>{dateLabel}</Text>
        </View>
        <Ionicons
          name="calendar-outline"
          size={22}
          color={COLORS.primary}
        />
      </View>

      {selectedAppointments.length > 0 ? (
        <View style={styles.appointmentList}>
          {selectedAppointments.map((appointment, index) => (
            <View
              key={appointment.id || `${appointment.date}-${appointment.time}-${index}`}
              style={styles.appointment}
            >
              <View style={styles.timeColumn}>
                <Text style={styles.time}>{appointment.time}</Text>
              </View>
              <View style={styles.appointmentDetails}>
                <Text style={styles.doctorName} numberOfLines={1}>
                  {appointment.doctorName || "Appointment"}
                </Text>
                {!!appointment.description && (
                  <Text style={styles.description} numberOfLines={2}>
                    {appointment.description}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Ionicons
              name="calendar-clear-outline"
              size={21}
              color={COLORS.mutedBlue}
            />
          </View>
          <View style={styles.emptyText}>
            <Text style={styles.emptyTitle}>No appointments scheduled</Text>
            <Text style={styles.description}>
              There are no appointments for this day.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default AppointmentSchedule;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginTop: 20,
    paddingTop: 16,
    paddingBottom: 4,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  headingText: {
    flex: 1,
  },

  title: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "700",
  },

  dateLabel: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 3,
  },

  appointmentList: {
    gap: 10,
  },

  appointment: {
    flexDirection: "row",
    alignItems: "stretch",
    borderRadius: 10,
    backgroundColor: COLORS.softBlue,
    overflow: "hidden",
  },

  timeColumn: {
    minWidth: 66,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },

  time: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.primary,
  },

  appointmentDetails: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  emptyState: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },

  emptyIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.softBlue,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  emptyText: {
    flex: 1,
  },

  emptyTitle: {
    color: COLORS.darkText,
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 3,
  },

  doctorName: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "600",
  },

  description: {
    color: COLORS.gray,
    fontSize: 11,
    lineHeight: 15,
  },
});