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

import {
  Ionicons,
} from "@expo/vector-icons";

import COLORS from "../../constants/colors";

const BLUE = "#2864FF";
const LIGHT_BLUE = "#C9D6FF";

const ProfileScreen = ({ navigation, route }) => {

  // ================= PROFILE STATE =================

  const [profile, setProfile] = useState({
    fullName: "John Doe",
    phone: "+123 567 89000",
    email: "johndoe@example.com",
    dateOfBirth: "",
  });

  const [logoutVisible, setLogoutVisible] =
    useState(false);

  // ================= GET UPDATED PROFILE =================

  useEffect(() => {

    if (route?.params?.updatedProfile) {

      setProfile(
        route.params.updatedProfile
      );

      // Remove params after reading
      navigation.setParams({
        updatedProfile: undefined,
      });
    }

  }, [route?.params?.updatedProfile]);

  // ================= MENU =================

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

  // ================= MENU PRESS =================

  const handleMenuPress = (title) => {

    if (title === "Profile") {

      navigation.navigate("EditProfile", {
        profile: profile,
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
    }
  };

  // ================= EDIT PROFILE =================

  const handleEditProfile = () => {

    navigation.navigate("EditProfile", {
      profile: profile,
    });

  };

  // ================= LOGOUT =================

  const handleLogout = () => {

    setLogoutVisible(false);

    navigation.getParent()?.getParent()?.navigate("SignIn");
  };

  return (
    <View style={styles.container}>

      {/* ================= HEADER ================= */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color={BLUE}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          My Profile
        </Text>

        <View style={styles.headerSpace} />

      </View>

      {/* ================= PROFILE CONTENT ================= */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* ================= PROFILE IMAGE ================= */}

        <View style={styles.profileSection}>

          <View style={styles.imageContainer}>

            <Image
              source={{
                uri:
                  "https://randomuser.me/api/portraits/men/1.jpg",
              }}
              style={styles.profileImage}
            />

            {/* Edit Image Button */}

            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditProfile}
              activeOpacity={0.8}
            >
              <Ionicons
                name="create-outline"
                size={17}
                color="#fff"
              />
            </TouchableOpacity>

          </View>

          {/* UPDATED NAME */}

          <Text style={styles.name}>
            {profile.fullName}
          </Text>

        </View>

        {/* ================= MENU ================= */}

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

              {/* Icon */}

              <View style={styles.menuIcon}>

                <Ionicons
                  name={item.icon}
                  size={25}
                  color={BLUE}
                />

              </View>

              {/* Title */}

              <Text style={styles.menuTitle}>
                {item.title}
              </Text>

              {/* Arrow */}

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

      {/* ================= LOGOUT MODAL ================= */}

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

            <Text style={styles.logoutTitle}>
              Logout
            </Text>

            <Text style={styles.logoutMessage}>
              Are you sure you want to log out?
            </Text>

            <View style={styles.logoutButtons}>

              {/* Cancel */}

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() =>
                  setLogoutVisible(false)
                }
              >
                <Text style={styles.cancelText}>
                  Cancel
                </Text>
              </TouchableOpacity>

              {/* Logout */}

              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Text style={styles.logoutButtonText}>
                  Yes, Logout
                </Text>
              </TouchableOpacity>

            </View>

          </View>

        </View>

      </Modal>

    </View>
  );
};

export default ProfileScreen;


// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // ================= HEADER =================

  header: {
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 28,
    paddingTop: 15,
  },

  backButton: {
    width: 50,
    justifyContent: "center",
  },

  headerTitle: {
    color: BLUE,
    fontSize: 22,
    fontWeight: "700",
  },

  headerSpace: {
    width: 50,
  },

  // ================= CONTENT =================

  content: {
    paddingBottom: 30,
  },

  // ================= PROFILE =================

  profileSection: {
    alignItems: "center",
    marginTop: 0,
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

  // ================= EDIT BUTTON =================

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

  // ================= NAME =================

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginTop: 8,
  },

  // ================= MENU =================

  menuContainer: {
    paddingHorizontal: 30,
  },

  menuItem: {
    height: 56,
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
    color: "#111",
    fontWeight: "500",
    flex: 1,
  },

  arrow: {
    marginRight: 0,
  },

  // ================= MODAL =================

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(40, 100, 255, 0.55)",
    justifyContent: "flex-end",
  },

  logoutModal: {
    backgroundColor: "#fff",

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
    color: "#111",
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
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

});