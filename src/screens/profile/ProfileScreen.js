import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { SafeAreaView } from "react-native-safe-area-context";

import COLORS from "../../constants/colors";
import CommonHeader from "../../components/CommonHeader";

import {
  getUserProfile,
  setUserProfile,
  subscribeToUserProfile,
} from "../../store/userStore";


const BLUE = COLORS.blue;
const LIGHT_BLUE = COLORS.paleBlue;


const ProfileScreen = ({ navigation, route }) => {

  // =====================================================
  // PROFILE STATE
  // =====================================================

  const [profile, setProfile] = useState(
    getUserProfile()
  );

  const [logoutVisible, setLogoutVisible] =
    useState(false);


  // =====================================================
  // GET UPDATED PROFILE
  // =====================================================

  useEffect(() => {

    const unsubscribe = subscribeToUserProfile(() => {
      setProfile(getUserProfile());
    });


    // Receive updated profile from EditProfileScreen
    if (route?.params?.updatedProfile) {

      const nextProfile =
        route.params.updatedProfile;

      setProfile(nextProfile);

      setUserProfile(nextProfile);


      // Clear navigation parameter
      navigation.setParams({
        updatedProfile: undefined,
      });
    }


    return unsubscribe;

  }, [route?.params?.updatedProfile]);


  // =====================================================
  // MENU ITEMS
  // =====================================================

  const menuItems = [
    {
      title: "Profile",
      icon: "person-outline",
    },

    {
      title: "Privacy Policy",
      icon: "lock-closed-outline",
    },

    {
      title: "Settings",
      icon: "settings-outline",
    },

    {
      title: "Help",
      icon: "help-outline",
    },

    {
      title: "Logout",
      icon: "log-out-outline",
    },
  ];


  // =====================================================
  // MENU PRESS
  // =====================================================

  const handleMenuPress = (title) => {

    // PROFILE
    if (title === "Profile") {

      navigation.navigate("EditProfile", {
        profile: getUserProfile(),
      });

      return;
    }


    // PRIVACY POLICY
    if (title === "Privacy Policy") {

      navigation.navigate("PrivacyPolicy");

      return;
    }


    // SETTINGS
    if (title === "Settings") {

      navigation.navigate("Settings", {
        currentPassword:
          route?.params?.currentPassword,
      });

      return;
    }


    // HELP
    if (title === "Help") {

      navigation.navigate("HelpCenter");

      return;
    }


    // LOGOUT
    if (title === "Logout") {

      setLogoutVisible(true);

      return;
    }
  };


  // =====================================================
  // EDIT PROFILE BUTTON
  // =====================================================

  const handleEditProfile = () => {

    navigation.navigate("EditProfile", {
      profile: getUserProfile(),
    });
  };


  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {

    setLogoutVisible(false);

    navigation.navigate("SignIn");
  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <SafeAreaView
      style={styles.container}
      edges={["top", "left", "right"]}
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <CommonHeader
        title="My Profile"
        navigation={navigation}
        backIconColor={BLUE}
        style={styles.profileHeader}
        titleStyle={styles.headerTitle}
      />


      {/* =================================================
          PROFILE CONTENT
      ================================================= */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* =================================================
            PROFILE IMAGE
        ================================================= */}

        <View style={styles.profileSection}>

          <View style={styles.imageContainer}>

            <Image
              source={{
                uri:
                  "https://randomuser.me/api/portraits/men/1.jpg",
              }}
              style={styles.profileImage}
            />


            {/* EDIT IMAGE */}

            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditProfile}
              activeOpacity={0.8}
            >

              <Ionicons
                name="create-outline"
                size={17}
                color={COLORS.white}
              />

            </TouchableOpacity>

          </View>


          {/* USER NAME */}

          <Text style={styles.name}>
            {profile?.fullName || "User"}
          </Text>

        </View>


        {/* =================================================
            MENU
        ================================================= */}

        <View style={styles.menuContainer}>

          {menuItems.map((item, index) => (

            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() =>
                handleMenuPress(item.title)
              }
              activeOpacity={0.7}
            >

              {/* MENU ICON */}

              <View style={styles.menuIcon}>

                <Ionicons
                  name={item.icon}
                  size={25}
                  color={BLUE}
                />

              </View>


              {/* MENU TITLE */}

              <Text style={styles.menuTitle}>
                {item.title}
              </Text>


              {/* ARROW */}

              {item.title !== "Logout" && (

                <Ionicons
                  name="chevron-forward"
                  size={22}
                  color={LIGHT_BLUE}
                  style={styles.arrow}
                />

              )}

            </TouchableOpacity>

          ))}

        </View>

      </ScrollView>


      {/* =================================================
          LOGOUT MODAL
      ================================================= */}

      <Modal
        visible={logoutVisible}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setLogoutVisible(false)
        }
      >

        <View style={styles.modalOverlay}>

          <View style={styles.logoutModal}>

            {/* TITLE */}

            <Text style={styles.logoutTitle}>
              Logout
            </Text>


            {/* MESSAGE */}

            <Text style={styles.logoutMessage}>
              Are you sure you want to log out?
            </Text>


            {/* BUTTONS */}

            <View style={styles.logoutButtons}>

              {/* CANCEL */}

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() =>
                  setLogoutVisible(false)
                }
                activeOpacity={0.8}
              >

                <Text style={styles.cancelText}>
                  Cancel
                </Text>

              </TouchableOpacity>


              {/* LOGOUT */}

              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
                activeOpacity={0.8}
              >

                <Text style={styles.logoutButtonText}>
                  Yes, Logout
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        </View>

      </Modal>

    </SafeAreaView>
  );
};


export default ProfileScreen;


// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  // =====================================================
  // MAIN CONTAINER
  // =====================================================

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },


  // =====================================================
  // HEADER
  // =====================================================

  profileHeader: {
    height: 65,
    paddingHorizontal: 20,
  },

  headerTitle: {
    color: COLORS.primary,

    fontSize: 22,

    fontWeight: "700",

    textAlign: "center",
  },


  // =====================================================
  // CONTENT
  // =====================================================

  content: {
    paddingBottom: 30,
  },


  // =====================================================
  // PROFILE SECTION
  // =====================================================

  profileSection: {
    alignItems: "center",

    marginTop: 5,

    marginBottom: 30,
  },


  // =====================================================
  // IMAGE
  // =====================================================

  imageContainer: {
    position: "relative",
  },

  profileImage: {
    width: 106,

    height: 106,

    borderRadius: 53,
  },


  // =====================================================
  // EDIT BUTTON
  // =====================================================

  editButton: {
    position: "absolute",

    right: 0,

    bottom: 0,

    width: 32,

    height: 32,

    borderRadius: 16,

    backgroundColor: BLUE,

    justifyContent: "center",

    alignItems: "center",
  },


  // =====================================================
  // NAME
  // =====================================================

  name: {
    fontSize: 22,

    fontWeight: "700",

    color: COLORS.darkText,

    marginTop: 8,
  },


  // =====================================================
  // MENU
  // =====================================================

  menuContainer: {
    paddingHorizontal: 30,
  },

  menuItem: {
    height: 64,

    flexDirection: "row",

    alignItems: "center",
  },

  menuIcon: {
    width: 40,

    height: 40,

    borderRadius: 22,

    backgroundColor: LIGHT_BLUE,

    justifyContent: "center",

    alignItems: "center",

    marginRight: 20,
  },

  menuTitle: {
    fontSize: 17,

    color: COLORS.darkText,

    fontWeight: "500",

    flex: 1,
  },

  arrow: {
    marginRight: 0,
  },


  // =====================================================
  // LOGOUT MODAL
  // =====================================================

  modalOverlay: {
    flex: 1,

    backgroundColor: COLORS.overlayBlue,

    justifyContent: "flex-end",
  },

  logoutModal: {
    backgroundColor: COLORS.white,

    height: 205,

    borderTopLeftRadius: 28,

    borderTopRightRadius: 28,

    paddingHorizontal: 30,

    paddingTop: 25,

    paddingBottom: 20,

    alignItems: "center",
  },

  logoutTitle: {
    color: BLUE,

    fontSize: 20,

    fontWeight: "700",

    marginBottom: 15,
  },

  logoutMessage: {
    color: COLORS.darkText,

    fontSize: 14,

    marginBottom: 24,

    textAlign: "center",
  },

  logoutButtons: {
    width: "100%",

    flexDirection: "row",

    gap: 12,
  },

  cancelButton: {
    flex: 1,

    height: 43,

    backgroundColor: LIGHT_BLUE,

    borderRadius: 23,

    justifyContent: "center",

    alignItems: "center",
  },

  cancelText: {
    color: BLUE,

    fontSize: 17,

    fontWeight: "600",
  },

  logoutButton: {
    flex: 1,

    height: 43,

    backgroundColor: BLUE,

    borderRadius: 23,

    justifyContent: "center",

    alignItems: "center",
  },

  logoutButtonText: {
    color: COLORS.white,

    fontSize: 16,

    fontWeight: "600",
  },

});