import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
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

const ReviewScreen = ({
  navigation,
  route,
}) => {

  const doctor = route?.params?.doctor;

  const [rating, setRating] = useState(4);
  const [comment, setComment] = useState("");

  const doctorName =
    doctor?.name || "Dr. Olivia Turner, M.D.";

  const specialty =
    doctor?.specialty || "Dermato-Endocrinology";

  const doctorImage =
    doctor?.image || doctor?.photo;

  const handleReview = () => {

    Alert.alert(
      "Review Added",
      "Thank you for your review.",
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
            Review
          </Text>

          <View style={styles.headerSpace} />

        </View>

        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua.
        </Text>

        {/* Doctor */}

        <View style={styles.doctorContainer}>

          {doctorImage ? (
            <Image
              source={doctorImage}
              style={styles.doctorImage}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons
                name="person"
                size={45}
                color={COLORS.white}
              />
            </View>
          )}

          <Text style={styles.doctorName}>
            {doctorName}
          </Text>

          <Text style={styles.specialty}>
            {specialty}
          </Text>

          {/* Rating */}

          <View style={styles.ratingContainer}>

            <Ionicons
              name="heart"
              size={20}
              color={COLORS.primary}
            />

            {[1, 2, 3, 4, 5].map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => setRating(item)}
              >
                <Ionicons
                  name={
                    item <= rating
                      ? "star"
                      : "star-outline"
                  }
                  size={20}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            ))}

          </View>

        </View>

        {/* Comment */}

        <TextInput
          style={styles.commentBox}
          placeholder="Enter Your Comment Here..."
          placeholderTextColor={COLORS.primary}
          value={comment}
          onChangeText={setComment}
          multiline
          textAlignVertical="top"
        />

        {/* Button */}

        <View style={styles.bottom}>

          <TouchableOpacity
            style={styles.reviewButton}
            onPress={handleReview}
          >
            <Text style={styles.reviewButtonText}>
              Add Review
            </Text>
          </TouchableOpacity>

        </View>

      </View>

    </SafeAreaView>
  );
};

export default ReviewScreen;

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

  doctorContainer: {
    alignItems: "center",
    marginTop: 25,
  },

  doctorImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#B8C0C0",
  },

  imagePlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#AEB7B7",
    justifyContent: "center",
    alignItems: "center",
  },

  doctorName: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: "600",
    marginTop: 18,
  },

  specialty: {
    color: COLORS.black,
    fontSize: 12,
    marginTop: 3,
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.lightBlue,
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 25,
    marginTop: 7,
  },

  commentBox: {
    height: 151,
    backgroundColor: "#E8EDFF",
    borderRadius: 17,
    marginTop: 15,
    padding: 13,
    fontSize: 12,
    color: COLORS.black,
  },

  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 100,
  },

  reviewButton: {
    height: 49,
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },

  reviewButtonText: {
    color: COLORS.white,
    fontSize: 20,
  },

});