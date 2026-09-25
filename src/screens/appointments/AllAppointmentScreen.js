import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  Ionicons,
} from "@expo/vector-icons";

import COLORS from "../../constants/colors";
import doctors from "../../data/doctors";

const AllAppointmentScreen = ({ navigation }) => {

  const [activeTab, setActiveTab] = useState("Complete");

  const appointmentDoctors = doctors.slice(0, 4);

  const renderDoctorImage = (doctor) => {
    if (doctor.image) {
      return doctor.image;
    }

    if (doctor.photo) {
      return doctor.photo;
    }

    return null;
  };

  const renderUpcomingCard = (doctor, index) => {
    return (
      <View style={styles.card} key={doctor.id || index}>

        <View style={styles.doctorRow}>

          {renderDoctorImage(doctor) ? (
            <Image
              source={renderDoctorImage(doctor)}
              style={styles.doctorImage}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons
                name="person"
                size={28}
                color={COLORS.white}
              />
            </View>
          )}

          <View style={styles.doctorInfo}>

            <Text style={styles.doctorName}>
              {doctor.name}
            </Text>

            <Text style={styles.specialty}>
              {doctor.specialty}
            </Text>

          </View>

        </View>

        <View style={styles.infoRow}>

          <View style={styles.infoBadge}>
            <Ionicons
              name="calendar-outline"
              size={11}
              color={COLORS.primary}
            />

            <Text style={styles.infoText}>
              {index === 0
                ? "Sunday, 12 June"
                : index === 1
                ? "Friday, 20 June"
                : "Tuesday, 15 June"}
            </Text>
          </View>

          <View style={styles.infoBadge}>

            <Ionicons
              name="time-outline"
              size={11}
              color={COLORS.primary}
            />

            <Text style={styles.infoText}>
              {index % 2 === 0
                ? "9:30 AM - 10:00 AM"
                : "2:30 PM - 3:00 PM"}
            </Text>

          </View>

        </View>

        <View style={styles.actionRow}>

          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() =>
              Alert.alert(
                "Appointment Details",
                `${doctor.name}\n${doctor.specialty}`
              )
            }
          >
            <Text style={styles.detailsText}>
              Details
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.roundButton}
          >
            <Ionicons
              name="checkmark"
              size={20}
              color={COLORS.primary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.roundButton}
            onPress={() =>
              navigation.navigate("CancelAppointment", {
                doctor,
              })
            }
          >
            <Ionicons
              name="close"
              size={20}
              color={COLORS.primary}
            />
          </TouchableOpacity>

        </View>

      </View>
    );
  };

  const renderCompleteCard = (doctor, index) => {
    return (
      <View style={styles.card} key={doctor.id || index}>

        <View style={styles.doctorRow}>

          {renderDoctorImage(doctor) ? (
            <Image
              source={renderDoctorImage(doctor)}
              style={styles.doctorImage}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons
                name="person"
                size={28}
                color={COLORS.white}
              />
            </View>
          )}

          <View style={styles.doctorInfo}>

            <Text style={styles.doctorName}>
              {doctor.name}
            </Text>

            <Text style={styles.specialty}>
              {doctor.specialty}
            </Text>

            <View style={styles.ratingRow}>

              <View style={styles.ratingBadge}>
                <Ionicons
                  name="star"
                  size={11}
                  color={COLORS.primary}
                />

                <Text style={styles.ratingText}>
                  {index === 1 ? "4" : "5"}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.heartButton}
              >
                <Ionicons
                  name="heart-outline"
                  size={13}
                  color={COLORS.primary}
                />
              </TouchableOpacity>

            </View>

          </View>

        </View>

        <View style={styles.completeActions}>

          <TouchableOpacity
            style={styles.rebookButton}
            onPress={() =>
              Alert.alert(
                "Re-Book",
                "Appointment re-book option selected"
              )
            }
          >
            <Text style={styles.rebookText}>
              Re-Book
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.reviewButton}
            onPress={() =>
              navigation.navigate("Review", {
                doctor,
              })
            }
          >
            <Text style={styles.reviewButtonText}>
              Add Review
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    );
  };

  const renderCancelledCard = (doctor, index) => {
    return (
      <View style={styles.cancelledCard} key={doctor.id || index}>

        <View style={styles.doctorRow}>

          {renderDoctorImage(doctor) ? (
            <Image
              source={renderDoctorImage(doctor)}
              style={styles.doctorImage}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons
                name="person"
                size={28}
                color={COLORS.white}
              />
            </View>
          )}

          <View style={styles.doctorInfo}>

            <Text style={styles.doctorName}>
              {doctor.name}
            </Text>

            <Text style={styles.specialty}>
              {doctor.specialty}
            </Text>

            <View style={styles.ratingRow}>

              <View style={styles.ratingBadge}>
                <Ionicons
                  name="star"
                  size={11}
                  color={COLORS.primary}
                />

                <Text style={styles.ratingText}>
                  {index === 1 ? "4" : "5"}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.heartButton}
              >
                <Ionicons
                  name="heart-outline"
                  size={13}
                  color={COLORS.primary}
                />
              </TouchableOpacity>

            </View>

          </View>

        </View>

        <View style={styles.completeActions}>

          <TouchableOpacity
            style={styles.rebookButton}
            onPress={() =>
              Alert.alert(
                "Re-Book",
                "Appointment re-book option selected"
              )
            }
          >
            <Text style={styles.rebookText}>
              Re-Book
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.reviewButton}
            onPress={() =>
              navigation.navigate("Review", {
                doctor,
              })
            }
          >
            <Text style={styles.reviewButtonText}>
              Add Review
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >

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
            All Appointment
          </Text>

          <View style={styles.headerSpace} />

        </View>

        {/* Tabs */}

        <View style={styles.tabs}>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "Complete" &&
                styles.activeTab,
            ]}
            onPress={() => setActiveTab("Complete")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Complete" &&
                  styles.activeTabText,
              ]}
            >
              Complete
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "Upcoming" &&
                styles.activeTab,
            ]}
            onPress={() => setActiveTab("Upcoming")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Upcoming" &&
                  styles.activeTabText,
              ]}
            >
              Upcoming
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "Cancelled" &&
                styles.activeTab,
            ]}
            onPress={() => setActiveTab("Cancelled")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Cancelled" &&
                  styles.activeTabText,
              ]}
            >
              Cancelled
            </Text>
          </TouchableOpacity>

        </View>

        {/* Cards */}

        <View style={styles.list}>

          {appointmentDoctors.map((doctor, index) => {

            if (activeTab === "Upcoming") {
              return renderUpcomingCard(
                doctor,
                index
              );
            }

            if (activeTab === "Complete") {
              return renderCompleteCard(
                doctor,
                index
              );
            }

            return renderCancelledCard(
              doctor,
              index
            );
          })}

        </View>

      </ScrollView>

    </SafeAreaView>
  );
};

export default AllAppointmentScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  scroll: {
    paddingBottom: 100,
  },

  header: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
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

  tabs: {
    flexDirection: "row",
    paddingHorizontal: 30,
    marginTop: 15,
    gap: 8,
  },

  tab: {
    flex: 1,
    height: 29,
    borderRadius: 18,
    backgroundColor: COLORS.lightBlue,
    justifyContent: "center",
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: COLORS.primary,
  },

  tabText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "500",
  },

  activeTabText: {
    color: COLORS.white,
  },

  list: {
    paddingHorizontal: 30,
    marginTop: 30,
  },

  card: {
    backgroundColor: COLORS.lightBlue,
    borderRadius: 16,
    padding: 15,
    marginBottom: 18,
  },

  cancelledCard: {
    backgroundColor: COLORS.lightBlue,
    borderRadius: 16,
    padding: 15,
    marginBottom: 18,
  },

  doctorRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  doctorImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#B8C0C0",
  },

  imagePlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#AEB7B7",
    justifyContent: "center",
    alignItems: "center",
  },

  doctorInfo: {
    flex: 1,
    marginLeft: 14,
  },

  doctorName: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "600",
  },

  specialty: {
    color: COLORS.black,
    fontSize: 11,
    marginTop: 3,
  },

  infoRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 5,
  },

  infoBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 15,
    paddingHorizontal: 8,
    height: 19,
    flex: 1,
  },

  infoText: {
    color: COLORS.primary,
    fontSize: 8,
    marginLeft: 4,
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },

  detailsButton: {
    flex: 1,
    height: 27,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  detailsText: {
    color: COLORS.white,
    fontSize: 16,
  },

  roundButton: {
    width: 28,
    height: 28,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },

  ratingRow: {
    flexDirection: "row",
    marginTop: 8,
    gap: 8,
  },

  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 8,
    height: 19,
  },

  ratingText: {
    color: COLORS.primary,
    fontSize: 9,
    marginLeft: 3,
  },

  heartButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },

  completeActions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },

  rebookButton: {
    flex: 1,
    height: 28,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },

  rebookText: {
    color: COLORS.primary,
    fontSize: 16,
  },

  reviewButton: {
    flex: 1,
    height: 28,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  reviewButtonText: {
    color: COLORS.white,
    fontSize: 16,
  },

});