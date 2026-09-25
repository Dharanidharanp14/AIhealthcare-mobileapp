import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import COLORS from "../constants/colors";

const DoctorInfoScreen = ({ navigation, route }) => {

  const doctor = route?.params?.doctor;

  if (!doctor) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Doctor information not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color={COLORS.primary}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Doctor Details
        </Text> 

      </View>


      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* DOCTOR IMAGE */}

        <View style={styles.imageContainer}>

          <Image
            source={{
              uri: doctor.image,
            }}
            style={styles.doctorImage}
          />

        </View>


        {/* NAME */}

        <Text style={styles.doctorName}>
          {doctor.name}
        </Text>


        {/* SPECIALTY */}

        <Text style={styles.specialty}>
          {doctor.specialty}
        </Text>


        {/* RATING */}

        <View style={styles.ratingContainer}>

          <View style={styles.ratingItem}>

            <Ionicons
              name="star"
              size={16}
              color={COLORS.primary}
            />

            <Text style={styles.ratingText}>
              {doctor.rating}
            </Text>

          </View>


          <View style={styles.ratingItem}>

            <Ionicons
              name="chatbubble-outline"
              size={16}
              color={COLORS.primary}
            />

            <Text style={styles.ratingText}>
              {doctor.reviews}
            </Text>

          </View>

        </View>


        {/* ABOUT */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            About Doctor
          </Text>

          <Text style={styles.description}>
            Dr. {doctor.name
              .replace("Dr. ", "")
              .split(",")[0]}{" "}
            is a professional specialist in{" "}
            {doctor.specialty}. The doctor provides
            personalized healthcare services and
            treatment based on each patient's needs.
          </Text>

        </View>


        {/* INFORMATION CARDS */}

        <View style={styles.infoRow}>

          <View style={styles.infoCard}>

            <View style={styles.iconCircle}>
              <Ionicons
                name="medkit-outline"
                size={20}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.infoValue}>
              10+
            </Text>

            <Text style={styles.infoLabel}>
              Experience
            </Text>

          </View>


          <View style={styles.infoCard}>

            <View style={styles.iconCircle}>
              <Ionicons
                name="people-outline"
                size={20}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.infoValue}>
              {doctor.reviews}+
            </Text>

            <Text style={styles.infoLabel}>
              Patients
            </Text>

          </View>


          <View style={styles.infoCard}>

            <View style={styles.iconCircle}>
              <Ionicons
                name="star-outline"
                size={20}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.infoValue}>
              {doctor.rating}
            </Text>

            <Text style={styles.infoLabel}>
              Rating
            </Text>

          </View>

        </View>


        {/* AVAILABLE TIME */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Availability
          </Text>

          <View style={styles.availability}>

            <View style={styles.availabilityItem}>

              <Ionicons
                name="time-outline"
                size={20}
                color={COLORS.primary}
              />

              <View>
                <Text style={styles.availableTitle}>
                  Monday - Friday
                </Text>

                <Text style={styles.availableTime}>
                  09:00 AM - 05:00 PM
                </Text>
              </View>

            </View>

          </View>

        </View>


      </ScrollView>

    </SafeAreaView>
  );
};

export default DoctorInfoScreen;


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  header: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    marginTop: 8,
  },

  backButton: {
    width: 45,
    justifyContent: "center",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "700",
  },

  favoriteButton: {
    width: 45,
    alignItems: "flex-end",
  },

  scrollContent: {
    paddingHorizontal: 30,
    paddingBottom: 40,
  },

  imageContainer: {
    alignItems: "center",
    marginTop: 15,
  },

  doctorImage: {
    width: 135,
    height: 135,
    borderRadius: 68,
  },

  doctorName: {
    textAlign: "center",
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "700",
    marginTop: 18,
  },

  specialty: {
    textAlign: "center",
    color: "#555",
    fontSize: 12,
    marginTop: 6,
  },

  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginTop: 15,
  },

  ratingItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#E8EDFF",
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 20,
  },

  ratingText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "600",
  },

  section: {
    marginTop: 28,
  },

  sectionTitle: {
    color: "#111",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 8,
  },

  description: {
    color: "#666",
    fontSize: 12,
    lineHeight: 19,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },

  infoCard: {
    width: "31%",
    backgroundColor: "#E8EDFF",
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 13,
  },

  iconCircle: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  infoValue: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "700",
    marginTop: 5,
  },

  infoLabel: {
    color: "#666",
    fontSize: 9,
    marginTop: 3,
  },

  availability: {
    backgroundColor: "#E8EDFF",
    borderRadius: 15,
    padding: 15,
  },

  availabilityItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  availableTitle: {
    color: "#222",
    fontSize: 12,
    fontWeight: "600",
  },

  availableTime: {
    color: "#666",
    fontSize: 10,
    marginTop: 3,
  },

  bookButton: {
    height: 48,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  bookButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "600",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    color: "#777",
    fontSize: 14,
  },

});