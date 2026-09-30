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

import FAQ from "../../components/helpcenter/FAQ";
import ContactUs from "../../components/helpcenter/ContactUs";


const HelpCenterScreen = ({ navigation }) => {

  const [activeTab, setActiveTab] =
    useState("Contact Us");

  return (
    <SafeAreaView style={styles.container}>

      {/* ================= HEADER ================= */}

      <View style={styles.header}>

        <CommonHeader
          title="Help Center"
          subtitle="How Can We Help You?"
          navigation={navigation}
          backIconColor={COLORS.white}
          style={styles.bannerHeader}
          titleStyle={styles.headerTitle}
          subtitleStyle={styles.headerSubtitle}
        />

        {/* ================= SEARCH ================= */}

        <View style={styles.searchContainer}>

          <Ionicons
            name="search-outline"
            size={19}
            color={COLORS.primary}
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor={COLORS.subtleBlue}
          />

        </View>

      </View>


      {/* ================= TABS ================= */}

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


      {/* ================= CONTENT ================= */}

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

  /* ================= HEADER ================= */

  header: {
    height: 168,

    backgroundColor: COLORS.primary,

    paddingHorizontal: 30,
  },

  bannerHeader: {
    height: 78,

    paddingHorizontal: 0,
  },

  headerTitle: {
    color: COLORS.white,

    fontSize: 21,

    fontWeight: "700",

    textAlign: "center",
  },

  headerSubtitle: {
    color: COLORS.paleSoftBlue,

    fontSize: 13,

    marginTop: 4,

    textAlign: "center",
  },

  /* ================= SEARCH ================= */

  searchContainer: {
    height: 42,

    backgroundColor: COLORS.white,

    borderRadius: 22,

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 14,

    marginTop: 10,
  },

  searchInput: {
    flex: 1,

    height: "100%",

    marginLeft: 8,

    fontSize: 13,

    color: COLORS.black,
  },

  /* ================= TABS ================= */

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

    backgroundColor: COLORS.lightLavender,

    justifyContent: "center",

    alignItems: "center",
  },

  activeTab: {
    backgroundColor: COLORS.primary,
  },

  tabText: {
    color: COLORS.primary,

    fontSize: 16,

    fontWeight: "500",
  },

  activeTabText: {
    color: COLORS.white,
  },

  /* ================= CONTENT ================= */

  content: {
    flex: 1,
  },

});