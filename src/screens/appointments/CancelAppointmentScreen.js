import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  Ionicons,
} from "@expo/vector-icons";

import COLORS from "../../constants/colors";
import CommonHeader from "../../components/CommonHeader";
import { useCustomAlert } from "../../components/CustomAlertProvider";

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
  const { showAlert } = useCustomAlert();

  const [selectedReason, setSelectedReason] =
    useState("Weather Conditions");

  const [reasonText, setReasonText] =
    useState("");

  const doctor = route?.params?.doctor;

  const handleCancel = () => {

    if (!selectedReason) {
      showAlert("Select a reason", "Choose a reason before continuing.", [], "error");
      return;
    }

    showAlert(
      "Appointment Cancelled",
      "Your appointment has been cancelled.",
      [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("AllAppointment"),
        },
      ],
      "success"
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.content}>

        {/* Header */}

        <CommonHeader
          title="Cancel Appointment"
          navigation={navigation}
        />

        <Text style={styles.description}>
          Choose the reason that best describes your request. This prototype does not send cancellation requests to a clinic, so contact your provider directly to confirm any changes.
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
          Add a brief note if you need to explain your request. Do not include sensitive medical or payment information.
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
    color: COLORS.softPeriwinkle,
    fontSize: 10,
    lineHeight: 12,
    marginTop: 15,
  },

  textArea: {
    height: 167,
    backgroundColor: COLORS.QUESTION_BG,
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