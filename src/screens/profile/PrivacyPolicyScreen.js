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

const BLUE = "#2864FF";

const PrivacyPolicyScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>

      {/* ================= HEADER ================= */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color={BLUE}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Privacy Policy
        </Text>

        <View style={styles.headerSpace} />

      </View>


      {/* ================= CONTENT ================= */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* Last Update */}

        <Text style={styles.lastUpdate}>
          Last Update: 14/08/2024
        </Text>


        {/* First Paragraph */}

        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Praesent pellentesque congue lorem, vel
          tincidunt tortor placerat a. Proin ac diam quam.
          Aenean in sagittis magna, ut feugiat diam. Fusce a
          scelerisque neque, sed accumsan metus.
        </Text>


        {/* Second Paragraph */}

        <Text style={styles.paragraph}>
          Nunc auctor tortor in dolor luctus, quis euismod
          urna tincidunt. Aenean arcu metus, bibendum at
          rhoncus at, volutpat ut lacus. Morbi pellentesque
          malesuada eros semper ultrices. Vestibulum lobortis
          enim vel neque auctor, a ultrices ex placerat.
          Mauris ut lacinia justo, sed suscipit tortor. Nam
          egestas nulla posuere neque tincidunt porta.
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
            Ut lacinia justo sit amet lorem sodales accumsan.
            Proin malesuada eleifend fermentum. Donec
            condimentum, nunc at rhoncus faucibus, ex nisi
            laoreet ipsum, eu pharetra eros est vitae orci.
            Morbi quis rhoncus mi. Nullam lacinia ornare
            accumsan. Duis laoreet, ex eget rutrum pharetra,
            lectus nisl posuere risus, vel facilisis nisi tellus
            ac turpis.
          </Text>

        </View>


        {/* Point 2 */}

        <View style={styles.pointContainer}>

          <Text style={styles.number}>
            2.
          </Text>

          <Text style={styles.pointText}>
            Ut lacinia justo sit amet lorem sodales accumsan.
            Proin malesuada eleifend fermentum. Donec
            condimentum, nunc at rhoncus faucibus, ex nisi
            laoreet ipsum, eu pharetra eros est vitae orci.
            Morbi quis rhoncus mi. Nullam lacinia ornare
            accumsan. Duis laoreet, ex eget rutrum pharetra,
            lectus nisl posuere risus, vel facilisis nisi tellus.
          </Text>

        </View>


        {/* Point 3 */}

        <View style={styles.pointContainer}>

          <Text style={styles.number}>
            3.
          </Text>

          <Text style={styles.pointText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Praesent pellentesque congue lorem, vel
            tincidunt tortor placerat a. Proin ac diam quam.
            Aenean in sagittis magna, ut feugiat diam.
          </Text>

        </View>


        {/* Point 4 */}

        <View style={styles.pointContainer}>

          <Text style={styles.number}>
            4.
          </Text>

          <Text style={styles.pointText}>
            Nunc auctor tortor in dolor luctus, quis euismod
            urna tincidunt. Aenean arcu metus, bibendum at
            rhoncus at, volutpat ut lacus. Morbi pellentesque
            malesuada eros semper ultrices. Vestibulum lobortis
            enim vel neque auctor, a ultrices ex placerat.
            Mauris ut lacinia justo, sed suscipit tortor. Nam
            egestas nulla posuere neque.
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
    color: "#9AAFFF",

    fontSize: 10,

    marginBottom: 10,
  },

  paragraph: {
    color: "#333",

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

    color: "#333",

    fontSize: 11,

    lineHeight: 13,
  },

  pointText: {
    flex: 1,

    color: "#333",

    fontSize: 11,

    lineHeight: 13,
  },

});