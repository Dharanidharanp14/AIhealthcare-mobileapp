import React from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";

const DoctorCard = ({
  doctor,
  navigation,
  liked = false,
  onLike,
}) => {

  // Safety check
  if (!doctor) {
    return null;
  }

  // Doctor Info
  const handleDoctorPress = () => {
    navigation.navigate("DoctorInfo", {
      doctor: doctor,
    });
  };

  // Like / Unlike
  const handleLikePress = () => {
    if (onLike) {
      onLike(doctor.id);
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handleDoctorPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`View ${doctor.name}, ${doctor.specialty}`}
    >
      <Image
        source={{
          uri: doctor.image,
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {doctor.name.replace(/,\s*(M\.D\.|Ph\.D\.)$/, "")}
        </Text>
        <Text style={styles.specialty} numberOfLines={1}>
          {doctor.specialty}
        </Text>
        <View style={styles.metaRow}>
          <View style={styles.rating}>
            <Ionicons
              name="star"
              size={13}
              color={COLORS.primary}
            />
            <Text style={styles.ratingText}>
              {doctor.rating}
            </Text>
          </View>
          <Text style={styles.reviewCount}>
            {doctor.reviews} reviews
            </Text>
        </View>
      </View>

      <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={liked ? "Remove from favorites" : "Add to favorites"}
          onPress={handleLikePress}
          hitSlop={{
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
          }}
          style={styles.favoriteButton}
        >
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={20}
            color={liked ? COLORS.red : COLORS.gray}
          />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default DoctorCard;


const styles = StyleSheet.create({

  card: {
    minHeight: 102,
    marginBottom: 12,
    marginHorizontal: 30,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  image: {
    width: 62,
    height: 62,
    borderRadius: 12,
    backgroundColor: COLORS.softBlue,
  },

  content: {
    flex: 1,
    minWidth: 0,
    marginLeft: 12,
    marginRight: 8,
  },

  name: {
    color: COLORS.darkText,
    fontSize: 14,
    fontWeight: "700",
  },

  specialty: {
    marginTop: 4,
    color: COLORS.gray,
    fontSize: 12,
  },

  metaRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  ratingText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "700",
  },

  reviewCount: {
    color: COLORS.gray,
    fontSize: 11,
  },

  favoriteButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: COLORS.inputBackground,
  },

});