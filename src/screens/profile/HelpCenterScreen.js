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

import FAQ from "../../components/helpcenter/FAQ";
import ContactUs from "../../components/helpcenter/ContactUs";


const HelpCenterScreen = ({ navigation }) => {

  const [activeTab, setActiveTab] =
    useState("Contact Us");


  return (

    <SafeAreaView style={styles.container}>

      {/* BLUE HEADER */}

      <View style={styles.header}>

        {/* BACK */}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >

          <Ionicons
            name="chevron-back"
            size={28}
            color={COLORS.white}
          />

        </TouchableOpacity>


        {/* TITLE */}

        <Text style={styles.headerTitle}>
          Help Center
        </Text>


        {/* SUBTITLE */}

        <Text style={styles.subtitle}>
          How Can We Help You?
        </Text>


        {/* SEARCH */}

        <View style={styles.searchContainer}>

          <Ionicons
            name="search-outline"
            size={18}
            color={COLORS.primary}
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#C4D0F5"
          />

        </View>

      </View>


      {/* TABS */}

      <View style={styles.tabs}>

        {/* FAQ */}

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "FAQ" &&
              styles.activeTab,
          ]}
          onPress={() => setActiveTab("FAQ")}
          activeOpacity={0.8}
        >

          <Text
            style={[
              styles.tabText,
              activeTab === "FAQ" &&
                styles.activeTabText,
            ]}
          >
            FAQ
          </Text>

        </TouchableOpacity>


        {/* CONTACT US */}

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "Contact Us" &&
              styles.activeTab,
          ]}
          onPress={() =>
            setActiveTab("Contact Us")
          }
          activeOpacity={0.8}
        >

          <Text
            style={[
              styles.tabText,
              activeTab === "Contact Us" &&
                styles.activeTabText,
            ]}
          >
            Contact Us
          </Text>

        </TouchableOpacity>

      </View>


      {/* CONTENT */}

      <View style={styles.content}>

        {activeTab === "FAQ" ? (
          <FAQ />
        ) : (
          <ContactUs />
        )}

      </View>

    </SafeAreaView>

  );
};

export default HelpCenterScreen;


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  /* HEADER */

  header: {
    height: 168,

    backgroundColor: COLORS.primary,

    paddingHorizontal: 30,

    position: "relative",
  },

  backButton: {
    position: "absolute",

    left: 27,
    top: 27,

    zIndex: 10,
  },

  headerTitle: {
    color: COLORS.white,

    textAlign: "center",

    fontSize: 22,

    fontWeight: "700",

    marginTop: 25,
  },

  subtitle: {
    color: "#DDE5FF",

    textAlign: "center",

    fontSize: 14,

    marginTop: 19,
  },

  /* SEARCH */

  searchContainer: {
    height: 39,

    backgroundColor: COLORS.white,

    borderRadius: 22,

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 13,

    marginTop: 17,
  },

  searchInput: {
    flex: 1,

    height: "100%",

    marginLeft: 8,

    fontSize: 13,

    color: COLORS.black,
  },

  /* TABS */

  tabs: {
    flexDirection: "row",

    paddingHorizontal: 30,

    gap: 12,

    marginTop: 14,

    marginBottom: 8,
  },

  tab: {
    flex: 1,

    height: 41,

    borderRadius: 22,

    backgroundColor: "#C9D5FF",

    justifyContent: "center",

    alignItems: "center",
  },

  activeTab: {
    backgroundColor: COLORS.primary,
  },

  tabText: {
    color: COLORS.primary,

    fontSize: 17,

    fontWeight: "500",
  },

  activeTabText: {
    color: COLORS.white,
  },

  /* CONTENT */

  content: {
    flex: 1,
  },

});