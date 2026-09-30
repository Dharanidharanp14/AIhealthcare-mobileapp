import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  Ionicons,
} from "@expo/vector-icons";

import COLORS from "../../constants/colors";
import CommonHeader from "../../components/CommonHeader";

const BLUE = COLORS.blue;

const PrivacyPolicyScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>

      {/* ================= HEADER ================= */}

      <CommonHeader
        title="Privacy Policy"
        navigation={navigation}
        backIconColor={BLUE}
      />


      {/* ================= CONTENT ================= */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* Last Update */}

        <Text style={styles.lastUpdate}>
          Demo notice updated: September 30, 2026
        </Text>


        {/* First Paragraph */}

        <Text style={styles.paragraph}>
          This notice describes the current prototype only. It is not a final privacy policy. Before using a production healthcare service, review its published privacy policy and contact the service with questions about how it handles your information.
        </Text>


        {/* Second Paragraph */}

        <Text style={styles.paragraph}>
          Profile details in this build are held in app memory and are not connected to an account server; they may be cleared when the app restarts. The app may request permission for notifications and request a push token. Do not enter sensitive health, identity, or payment information in this prototype.
        </Text>


        {/* ================= TERMS ================= */}

        <Text style={styles.sectionTitle}>
          Terms & Conditions
        </Text>


        {/* Point 1 */}

        <View style={styles.pointContainer}>

          <Text style={styles.number}>
            1.
          </Text>

          <Text style={styles.pointText}>
            Provider profiles and appointment details shown in this prototype may be sample content. Verify provider credentials and appointment information directly with the clinic before relying on them.
          </Text>

        </View>


        {/* Point 2 */}

        <View style={styles.pointContainer}>

          <Text style={styles.number}>
            2.
          </Text>

          <Text style={styles.pointText}>
            Booking, cancellation, review, and messaging actions in this build are demonstrations. They do not submit information to a healthcare provider.
          </Text>

        </View>


        {/* Point 3 */}

        <View style={styles.pointContainer}>

          <Text style={styles.number}>
            3.
          </Text>

          <Text style={styles.pointText}>
            Information in this app is not medical advice, diagnosis, or treatment. Ask a licensed healthcare professional about care decisions.
          </Text>

        </View>


        {/* Point 4 */}

        <View style={styles.pointContainer}>

          <Text style={styles.number}>
            4.
          </Text>

          <Text style={styles.pointText}>
            If you may be experiencing a medical emergency, contact your local emergency services. Do not use this prototype to request urgent care.
          </Text>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen;


// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  // ================= HEADER =================

  header: {
    height: 65,

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 28,

    marginTop: 8,
  },

  backButton: {
    width: 50,

    justifyContent: "center",
  },

  headerTitle: {
    flex: 1,

    textAlign: "center",

    color: BLUE,

    fontSize: 22,

    fontWeight: "700",
  },

  headerSpace: {
    width: 50,
  },

  // ================= CONTENT =================

  content: {
    paddingHorizontal: 30,

    paddingTop: 8,

    paddingBottom: 40,
  },

  lastUpdate: {
    color: COLORS.softPurple,

    fontSize: 10,

    marginBottom: 10,
  },

  paragraph: {
    color: COLORS.searchText,

    fontSize: 11,

    lineHeight: 13,

    marginBottom: 14,
  },

  // ================= TERMS =================

  sectionTitle: {
    color: BLUE,

    fontSize: 19,

    fontWeight: "600",

    marginTop: 10,

    marginBottom: 8,
  },

  pointContainer: {
    flexDirection: "row",

    alignItems: "flex-start",

    marginBottom: 13,
  },

  number: {
    width: 15,

    color: COLORS.searchText,

    fontSize: 11,

    lineHeight: 13,
  },

  pointText: {
    flex: 1,

    color: COLORS.searchText,

    fontSize: 11,

    lineHeight: 13,
  },

});