import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../constants/colors";

const BLUE = COLORS.primary || "#2864FF";
const LIGHT_BLUE = "#C9D5FF";

const ContactUs = () => {

  const contactData = [
    {
      title: "Customer Service",
      icon: "headset-outline",
    },
    {
      title: "Website",
      icon: "globe-outline",
    },
    {
      title: "Whatsapp",
      icon: "call-outline",
    },
    {
      title: "Facebook",
      icon: "logo-facebook",
    },
    {
      title: "Instagram",
      icon: "logo-instagram",
    },
  ];

  return (
    <View style={styles.container}>

      {contactData.map((item, index) => (

        <TouchableOpacity
          key={index}
          style={styles.contactRow}
          activeOpacity={0.8}
        >

          {/* ICON */}

          <View style={styles.iconContainer}>

            <Ionicons
              name={item.icon}
              size={24}
              color={BLUE}
            />

          </View>

          {/* TITLE */}

          <Text style={styles.title}>
            {item.title}
          </Text>

          {/* ARROW */}

          <Ionicons
            name="chevron-down"
            size={23}
            color={BLUE}
          />

        </TouchableOpacity>

      ))}

    </View>
  );
};

export default ContactUs;


const styles = StyleSheet.create({

  container: {
    paddingHorizontal: 30,
    paddingTop: 30,
  },

  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: LIGHT_BLUE,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },

  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.black,
  },

});