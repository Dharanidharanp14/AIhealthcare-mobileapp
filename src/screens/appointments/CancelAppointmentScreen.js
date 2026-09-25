import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  Ionicons,
} from "@expo/vector-icons";

import COLORS from "../../constants/colors";

const reasons = [
  "Rescheduling",
  "Weather Conditions",
  "Unexpected Work",
  "Others",
];

const CancelAppointmentScreen = ({
  navigation,
  route,
}) => {

  const [selectedReason, setSelectedReason] =
    useState("Weather Conditions");

  const [reasonText, setReasonText] =
    useState("");

  const doctor = route?.params?.doctor;

  const handleCancel = () => {

    if (!selectedReason) {
      Alert.alert(
        "Please select a reason"
      );
      return;
    }

    Alert.alert(
      "Appointment Cancelled",
      "Your appointment has been cancelled.",
      [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("AllAppointment"),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.content}>

        {/* Header */}

        <View style={styles.header}>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons
              name="chevron-back"
              size={28}
              color={COLORS.primary}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Cancel Appointment
          </Text>

          <View style={styles.headerSpace} />

        </View>

        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua.
        </Text>

        {/* Reasons */}

        <View style={styles.reasons}>

          {reasons.map((reason) => {

            const selected =
              selectedReason === reason;

            return (
              <TouchableOpacity
                key={reason}
                style={[
                  styles.reasonRow,
                  selected &&
                    styles.selectedReason,
                ]}
                onPress={() =>
                  setSelectedReason(reason)
                }
              >

                <Ionicons
                  name={
                    selected
                      ? "radio-button-on"
                      : "radio-button-off"
                  }
                  size={22}
                  color={COLORS.primary}
                />

                <Text style={styles.reasonText}>
                  {reason}
                </Text>

              </TouchableOpacity>
            );
          })}

        </View>

        <Text style={styles.reasonDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua.
        </Text>

        {/* Text Area */}

        <TextInput
          style={styles.textArea}
          placeholder="Enter Your Reason Here..."
          placeholderTextColor={COLORS.primary}
          value={reasonText}
          onChangeText={setReasonText}
          multiline
          textAlignVertical="top"
        />

        <View style={styles.bottom}>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>
              Cancel Appointment
            </Text>
          </TouchableOpacity>

        </View>

      </View>

    </SafeAreaView>
  );
};

export default CancelAppointmentScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  content: {
    flex: 1,
    paddingHorizontal: 30,
  },

  header: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  backButton: {
    width: 40,
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: "700",
  },

  headerSpace: {
    width: 40,
  },

  description: {
    color: COLORS.black,
    fontSize: 11,
    lineHeight: 14,
    marginTop: 5,
  },

  reasons: {
    marginTop: 35,
  },

  reasonRow: {
    height: 33,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    paddingHorizontal: 3,
  },

  selectedReason: {
    backgroundColor: COLORS.lightBlue,
    paddingHorizontal: 3,
  },

  reasonText: {
    color: COLORS.black,
    fontSize: 14,
    marginLeft: 8,
  },

  reasonDescription: {
    color: "#8DA8FF",
    fontSize: 10,
    lineHeight: 12,
    marginTop: 15,
  },

  textArea: {
    height: 167,
    backgroundColor: "#E8EDFF",
    borderRadius: 17,
    padding: 13,
    fontSize: 12,
    color: COLORS.black,
    marginTop: 12,
  },

  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 100,
  },

  cancelButton: {
    height: 49,
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },

  cancelButtonText: {
    color: COLORS.white,
    fontSize: 20,
  },

});