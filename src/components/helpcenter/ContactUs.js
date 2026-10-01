import React from "react";
import {
  Linking,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { useCustomAlert } from "../CustomAlertProvider";

const ContactUs = () => {
  const { showAlert } = useCustomAlert();
  const contactData = [
    {
      title: "Customer Service",
      detail: "+91 6382872107",
      icon: "call-outline",
      url: "tel:+916382872107",
    },
    {
      title: "Email Support",
      detail: "dharanidharan8607@gmail.com",
      icon: "mail-outline",
      url: "mailto:dharanidharan8607@gmail.com",
    },
    {
      title: "Website",
      detail: "example.com/healthcare-demo",
      icon: "globe-outline",
      url: "https://example.com/healthcare-demo",
    },
    {
      title: "WhatsApp",
      detail: "+91 6382872107",
      icon: "logo-whatsapp",
      url: "https://wa.me/916382872107",
    },
    {
      title: "Facebook",
      detail: "@your_demo_page",
      icon: "logo-facebook",
      url: "https://example.com/demo-facebook",
    },
    {
      title: "Instagram",
      detail: "@your_demo_page",
      icon: "logo-instagram",
      url: "https://example.com/demo-instagram",
    },
  ];

  const openContactLink = async (item) => {
    try {
      await Linking.openURL(item.url);
    } catch {
      showAlert(
        "Link unavailable",
        `Could not open ${item.title}. Check that a compatible app is installed.`,
        [],
        "error"
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.demoNote}>
        Sample contact details for testing. Replace before publishing.
      </Text>
      {contactData.map((item) => (
        <TouchableOpacity
          key={item.title}
          style={styles.contactRow}
          activeOpacity={0.75}
          accessibilityRole="link"
          accessibilityLabel={`${item.title}: ${item.detail}`}
          onPress={() => openContactLink(item)}
        >
          <View style={styles.iconContainer}>
            <Ionicons name={item.icon} size={21} color={COLORS.primary} />
          </View>
          <View style={styles.contactText}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.detail} numberOfLines={1}>
              {item.detail}
            </Text>
          </View>
          <Ionicons name="open-outline" size={18} color={COLORS.primary} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default ContactUs;


const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 28,
  },

  demoNote: {
    marginBottom: 14,
    color: COLORS.gray,
    fontSize: 11,
    lineHeight: 16,
  },

  contactRow: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: COLORS.white,
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.softBlue,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  contactText: {
    flex: 1,
    minWidth: 0,
    marginRight: 8,
  },

  title: {
    color: COLORS.darkText,
    fontSize: 14,
    fontWeight: "600",
  },

  detail: {
    marginTop: 3,
    color: COLORS.gray,
    fontSize: 12,
  },

});