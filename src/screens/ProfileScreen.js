import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BLUE = "#2864FF";
const LIGHT_BLUE = "#C9D6FF";

const ProfileScreen = ({ navigation }) => {
  const menuItems = [
    {
      title: "Profile",
      icon: "person-outline",
    },
    {
      title: "Favorite",
      icon: "heart-outline",
    },
    {
      title: "Payment Method",
      icon: "card-outline",
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
      // navigation.navigate("ProfileDetails");
    }

    if (title === "Favorite") {
      // navigation.navigate("Favorite");
    }

    if (title === "Payment Method") {
      // navigation.navigate("PaymentMethod");
    }

    if (title === "Privacy Policy") {
      // navigation.navigate("PrivacyPolicy");
    }

    if (title === "Settings") {
      // navigation.navigate("Settings");
    }

    if (title === "Help") {
      // navigation.navigate("Help");
    }

    if (title === "Logout") {
     navigation.navigate("SignIn");
    }
  };

  return (
    <View style={styles.container}>

      {/* Header */}
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* Profile Image */}
        <View style={styles.profileSection}>

          <View style={styles.imageContainer}>

            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/men/1.jpg",
              }}
              style={styles.profileImage}
            />

            {/* Edit button */}
            <TouchableOpacity style={styles.editButton}>
              <Ionicons
                name="create-outline"
                size={17}
                color="#fff"
              />
            </TouchableOpacity>

          </View>

          <Text style={styles.name}>
            John Doe
          </Text>

        </View>

        {/* Menu */}
        <View style={styles.menuContainer}>

          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => handleMenuPress(item.title)}
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

    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  /* HEADER */

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

  /* CONTENT */

  content: {
    paddingBottom: 30,
  },

  /* PROFILE */

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

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginTop: 8,
  },

  /* MENU */

  menuContainer: {
    paddingHorizontal: 30,
  },

  menuItem: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
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
});