import { useTheme } from "../../context/ThemeContext.js";
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

import CommonHeader from "../../components/CommonHeader";

import {
  getUserProfile,
  setUserProfile,
  subscribeToUserProfile,
} from "../../store/userStore";


const DEFAULT_PROFILE_IMAGE =
  "https://randomuser.me/api/portraits/men/1.jpg";

const ProfileScreen = ({ navigation, route }) => {
  const { colors: COLORS } = useTheme();
  const styles = createStyles(COLORS);
 
  const [profile, setProfile] = useState(
    getUserProfile()
  );

  const [logoutVisible, setLogoutVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToUserProfile(() => {
      const latestProfile = getUserProfile();

      setProfile(latestProfile);
    });

    if (route?.params?.updatedProfile) {
      const nextProfile = route.params.updatedProfile;
      setProfile(nextProfile);
      setUserProfile(nextProfile);

      navigation.setParams({
        updatedProfile: undefined,
      });
    }

    return unsubscribe;
  }, [route?.params?.updatedProfile]);

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

  const handleMenuPress = (title) => {
    if (title === "Profile") {
      navigation.navigate("EditProfile", {
        profile: getUserProfile(),
      });

      return;
    }

    if (title === "Privacy Policy") {
      navigation.navigate("PrivacyPolicy");

      return;
    }

    if (title === "Settings") {
      navigation.navigate("Settings", {
        currentPassword:
          route?.params?.currentPassword,
      });

      return;
    }

    if (title === "Help") {
      navigation.navigate("HelpCenter");

      return;
    }

    if (title === "Logout") {
      setLogoutVisible(true);

      return;
    }
  };


  const handleEditProfile = () => {
    navigation.navigate("EditProfile", {
      profile: getUserProfile(),
    });
  };

  const handleLogout = () => {
    setLogoutVisible(false);

    navigation.navigate("SignIn");
  };

  const profileImage =
    profile?.image || DEFAULT_PROFILE_IMAGE;


  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "left", "right"]}
    >
  
      <CommonHeader
        title="My Profile"
        navigation={navigation}
        backIconColor={COLORS.blue}
        style={styles.profileHeader}
        titleStyle={styles.headerTitle}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        <View style={styles.profileSection}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: profileImage,
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
                  color={COLORS.blue}
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
                  color={COLORS.paleBlue}
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


const createStyles = (COLORS) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

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

  content: {
    paddingBottom: 30,
  },

  profileSection: {
    alignItems: "center",
    marginTop: 5,
    marginBottom: 30,
  },

  imageContainer: {
    position: "relative",
  },

  profileImage: {
    width: 106,
    height: 106,
    borderRadius: 53,
  },

  editButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.blue,
    justifyContent: "center",
    alignItems: "center",
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.darkText,
    marginTop: 8,
  },

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
    backgroundColor: COLORS.paleBlue,
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

  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlayBlue,
    justifyContent: "flex-end",
  },

  logoutModal: {
    backgroundColor: COLORS.surface,
    height: 205,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 30,
    paddingTop: 25,
    paddingBottom: 20,
    alignItems: "center",
  },

  logoutTitle: {
    color: COLORS.blue,
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
    backgroundColor: COLORS.paleBlue,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },

  cancelText: {
    color: COLORS.blue,
    fontSize: 17,
    fontWeight: "600",
  },

  logoutButton: {
    flex: 1,
    height: 43,
    backgroundColor: COLORS.blue,
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