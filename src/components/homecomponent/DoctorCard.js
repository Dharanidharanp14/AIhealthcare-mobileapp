import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DoctorCard = ({ doctor }) => {
  return (
    <TouchableOpacity style={styles.card}>

      <Image
        source={{ uri: doctor.image }}
        style={styles.image}
      />

      <View style={styles.content}>

        <Text
          style={styles.name}
          numberOfLines={1}
        >
          {doctor.name}
        </Text>

        <Text style={styles.specialty}>
          {doctor.specialty}
        </Text>

        <View style={styles.bottom}>

          <View style={styles.badge}>
            <Ionicons
              name="star"
              size={10}
              color="#2864F0"
            />

            <Text style={styles.badgeText}>
              {doctor.rating}
            </Text>
          </View>

          <View style={styles.badge}>
            <Ionicons
              name="chatbubble-outline"
              size={10}
              color="#2864F0"
            />

            <Text style={styles.badgeText}>
              {doctor.reviews}
            </Text>
          </View>

        </View>

      </View>

      <View style={styles.rightIcons}>

        <Ionicons
          name="help-circle-outline"
          size={20}
          color="#2864F0"
        />

        <Ionicons
          name="heart-outline"
          size={20}
          color="#2864F0"
        />

      </View>

    </TouchableOpacity>
  );
};

export default DoctorCard;

const styles = StyleSheet.create({
  card: {
    height: 74,
    marginBottom: 8,
    marginHorizontal: 30,

    borderRadius: 18,

    backgroundColor: "#C8D6FF",

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 12,
  },

  image: {
    width: 55,
    height: 55,
    borderRadius: 28,
  },

  content: {
    flex: 1,
    marginLeft: 10,
  },

  name: {
    backgroundColor: "#FFF",
    borderRadius: 15,

    paddingHorizontal: 12,
    paddingVertical: 5,

    fontSize: 11,
    color: "#2864F0",
  },

  specialty: {
    fontSize: 9,
    color: "#444",
    marginTop: 3,
    marginLeft: 12,
  },

  bottom: {
    flexDirection: "row",
    gap: 6,
    marginTop: 3,
  },

  badge: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,

    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  badgeText: {
    fontSize: 9,
    color: "#2864F0",
  },

  rightIcons: {
    gap: 5,
  },
});