import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  Ionicons,
} from "@expo/vector-icons";

import DateTimePicker from "@react-native-community/datetimepicker";

import COLORS from "../../constants/colors";

const BLUE = "#2864FF";

const EditProfileScreen = ({
  navigation,
  route,
}) => {


  const profile = route?.params?.profile || {
    fullName: "John Doe",
    phone: "+123 567 89000",
    email: "johndoe@example.com",
    dateOfBirth: "",
  };



  const [fullName, setFullName] = useState(
    profile.fullName
  );

  const [phone, setPhone] = useState(
    profile.phone
  );

  const [email, setEmail] = useState(
    profile.email
  );

  const [dateOfBirth, setDateOfBirth] = useState(
    profile.dateOfBirth
  );

  // ================= DATE PICKER =================

  const [showDatePicker, setShowDatePicker] =
    useState(false);

  const [selectedDate, setSelectedDate] =
    useState(new Date());

  // ================= OPEN DATE PICKER =================

  const handleDatePress = () => {
    setShowDatePicker(true);
  };


  const handleDateChange = (event, date) => {

    setShowDatePicker(false);

    if (date) {

      setSelectedDate(date);

      const day = String(
        date.getDate()
      ).padStart(2, "0");

      const month = String(
        date.getMonth() + 1
      ).padStart(2, "0");

      const year = date.getFullYear();

      const formattedDate =
        `${day} / ${month} / ${year}`;

      setDateOfBirth(formattedDate);
    }
  };



  const handleUpdateProfile = () => {

    if (!fullName.trim()) {

      Alert.alert(
        "Error",
        "Please enter your full name"
      );

      return;
    }

    const updatedProfile = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      dateOfBirth: dateOfBirth,
    };

    // Send updated profile to ProfileScreen

    navigation.navigate("ProfileHome", {
      updatedProfile: updatedProfile,
    });
  };

  return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >

          {/* ================= HEADER ================= */}

          <View style={styles.header}>

            <TouchableOpacity
              style={styles.backButton}
              onPress={() =>
                navigation.goBack()
              }
            >

              <Ionicons
                name="chevron-back"
                size={28}
                color={BLUE}
              />

            </TouchableOpacity>

            <Text style={styles.headerTitle}>
              Profile
            </Text>

            <View style={styles.headerSpace} />

          </View>


          {/* ================= PROFILE IMAGE ================= */}

          <View style={styles.imageSection}>

            <View style={styles.imageContainer}>

              <Image
                source={{
                  uri:
                    "https://randomuser.me/api/portraits/men/1.jpg",
                }}
                style={styles.profileImage}
              />

              <TouchableOpacity
                style={styles.editImageButton}
              >

                <Ionicons
                  name="create-outline"
                  size={17}
                  color="#fff"
                />

              </TouchableOpacity>

            </View>

          </View>


          {/* ================= FORM ================= */}

          <View style={styles.form}>

            {/* ================= FULL NAME ================= */}

            <View style={styles.fieldContainer}>

              <Text style={styles.label}>
                Full Name
              </Text>

              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Full Name"
                placeholderTextColor="#777"
              />

            </View>


            {/* ================= PHONE ================= */}

            <View style={styles.fieldContainer}>

              <Text style={styles.label}>
                Phone Number
              </Text>

              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="+123 567 89000"
                placeholderTextColor="#777"
                keyboardType="phone-pad"
              />

            </View>


            {/* ================= EMAIL ================= */}

            <View style={styles.fieldContainer}>

              <Text style={styles.label}>
                Email
              </Text>

              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="johndoe@example.com"
                placeholderTextColor="#777"
                keyboardType="email-address"
                autoCapitalize="none"
              />

            </View>


            {/* ================= DATE OF BIRTH ================= */}

            <View style={styles.fieldContainer}>

              <Text style={styles.label}>
                Date Of Birth
              </Text>

              <TouchableOpacity
                style={styles.dateInput}
                onPress={handleDatePress}
                activeOpacity={0.8}
              >

                <Text
                  style={[
                    styles.dateText,
                    !dateOfBirth &&
                      styles.placeholderDate,
                  ]}
                >
                  {dateOfBirth ||
                    "DD / MM / YYYY"}
                </Text>

                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={BLUE}
                />

              </TouchableOpacity>

            </View>


            {/* ================= DATE PICKER ================= */}

            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display={
                  Platform.OS === "ios"
                    ? "spinner"
                    : "calendar"
                }
                maximumDate={new Date()}
                onChange={handleDateChange}
              />
            )}

          </View>


          {/* ================= UPDATE BUTTON ================= */}

          <View style={styles.bottom}>

            <TouchableOpacity
              style={styles.updateButton}
              onPress={handleUpdateProfile}
              activeOpacity={0.8}
            >

              <Text style={styles.updateButtonText}>
                Update Profile
              </Text>

            </TouchableOpacity>

          </View>

        </ScrollView>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
};

export default EditProfileScreen;


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  keyboard: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,
    paddingBottom: 30,
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

  // ================= IMAGE =================

  imageSection: {
    alignItems: "center",

    marginTop: 8,

    marginBottom: 45,
  },

  imageContainer: {
    position: "relative",
  },

  profileImage: {
    width: 106,

    height: 106,

    borderRadius: 53,
  },

  editImageButton: {
    position: "absolute",

    right: -1,

    bottom: 0,

    width: 32,

    height: 32,

    borderRadius: 16,

    backgroundColor: BLUE,

    justifyContent: "center",

    alignItems: "center",
  },

  // ================= FORM =================

  form: {
    paddingHorizontal: 30,
  },

  fieldContainer: {
    marginBottom: 24,
  },

  label: {
    fontSize: 18,

    fontWeight: "500",

    color: "#111",

    marginBottom: 9,
  },

  input: {
    height: 45,

    borderRadius: 12,

    backgroundColor: "#E8EDFF",

    paddingHorizontal: 24,

    fontSize: 17,

    color: "#111",
  },

  // ================= DATE =================

  dateInput: {
    height: 45,

    borderRadius: 12,

    backgroundColor: "#E8EDFF",

    paddingHorizontal: 24,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  dateText: {
    fontSize: 17,

    color: "#111",
  },

  placeholderDate: {
    color: BLUE,
  },

  // ================= BOTTOM =================

  bottom: {
    flex: 1,

    justifyContent: "flex-end",

    alignItems: "center",

    paddingTop: 20,

    paddingBottom: 40,
  },

  updateButton: {
    width: 207,

    height: 45,

    borderRadius: 25,

    backgroundColor: BLUE,

    justifyContent: "center",

    alignItems: "center",
  },

  updateButtonText: {
    color: "#fff",

    fontSize: 20,

    fontWeight: "500",
  },

});