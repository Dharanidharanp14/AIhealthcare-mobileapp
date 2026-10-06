import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
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
import * as ImagePicker from "expo-image-picker";
import COLORS from "../../constants/colors";
import CommonHeader from "../../components/CommonHeader";
import { useCustomAlert } from "../../components/CustomAlertProvider";
import {
  getUserProfile,
  setUserProfile,
} from "../../store/userStore";

const BLUE = COLORS.blue;

const EditProfileScreen = ({ navigation, route }) => {
  const { showAlert } = useCustomAlert();

  const profile =route?.params?.profile ||
    getUserProfile();

  const [fullName, setFullName] = useState( profile?.fullName || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [email, setEmail] = useState( profile?.email || "");
  const [dateOfBirth, setDateOfBirth] = useState(profile?.dateOfBirth || "");
  const [profileImage, setProfileImage] = useState( profile?.image || "https://randomuser.me/api/portraits/men/1.jpg" );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dateOfBirth ? convertStringToDate(dateOfBirth) : new Date() );

  function convertStringToDate(dateString) {

    if (!dateString) {
      return new Date();
    }

    const parts =
      dateString.split("/");

    if (parts.length !== 3) {
      return new Date();
    }

    const day =
      parseInt(parts[0], 10);

    const month =
      parseInt(parts[1], 10) - 1;

    const year =
      parseInt(parts[2], 10);

    return new Date(
      year,
      month,
      day
    );
  }

  const handleImagePress = async () => {

    try {

      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {

        showAlert(
          "Permission Required",
          "Please allow photo library access to select a profile picture.",
          [],
          "error"
        );

        return;
      }

      const result =
        await ImagePicker.launchImageLibraryAsync({

          mediaTypes:
            ["images"],

          allowsEditing: true,

          aspect: [1, 1],

          quality: 0.8,
        });


      // User selected image

      if (!result.canceled) {

        const selectedImage =
          result.assets[0].uri;

        setProfileImage(
          selectedImage
        );
      }

    } catch (error) {

      console.log(
        "Image picker error:",
        error
      );

      showAlert(
        "Error",
        "Unable to select image. Please try again.",
        [],
        "error"
      );
    }
  };


  // ================= DATE PRESS =================

  const handleDatePress = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (
    event,
    date
  ) => {

    setShowDatePicker(false);

    if (date) {

      setSelectedDate(date);

      const day =
        String(
          date.getDate()
        ).padStart(2, "0");

      const month =
        String(
          date.getMonth() + 1
        ).padStart(2, "0");

      const year =
        date.getFullYear();

      const formattedDate =
        `${day} / ${month} / ${year}`;

      setDateOfBirth(
        formattedDate
      );
    }
  };


  // ================= UPDATE PROFILE =================

  const handleUpdateProfile = () => {

    if (!fullName.trim()) {

      showAlert(
        "Name required",
        "Please enter your full name.",
        [],
        "error"
      );

      return;
    }


    const updatedProfile = {

      fullName:
        fullName.trim(),

      phone:
        phone.trim(),

      email:
        email.trim(),

      dateOfBirth:
        dateOfBirth,

      image:
        profileImage,
    };


    // Save profile

    setUserProfile(
      updatedProfile
    );


    // Navigate back to profile

    navigation.navigate(
      "Main",
      {
        screen: "Profile",

        params: {
          updatedProfile:
            updatedProfile,
        },
      }
    );
  };


  return (

    <SafeAreaView
      style={styles.container}
    >

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

          contentContainerStyle={
            styles.scroll
          }
        >

          {/* HEADER */}

          <CommonHeader
            title="Profile"
            navigation={navigation}
            backIconColor={BLUE}
          />


          {/* ================= PROFILE IMAGE ================= */}

          <View
            style={styles.imageSection}
          >

            <View
              style={styles.imageContainer}
            >

              <Image
                source={{
                  uri: profileImage,
                }}
                style={
                  styles.profileImage
                }
              />


              {/* EDIT IMAGE BUTTON */}

              <TouchableOpacity
                style={
                  styles.editImageButton
                }

                onPress={
                  handleImagePress
                }

                activeOpacity={0.8}
              >

                <Ionicons
                  name="create-outline"
                  size={17}
                  color={
                    COLORS.white
                  }
                />

              </TouchableOpacity>

            </View>


            {/* CHANGE PHOTO TEXT */}

            <TouchableOpacity
              onPress={
                handleImagePress
              }
            >

              <Text
                style={
                  styles.changePhotoText
                }
              >
                Change Profile Picture
              </Text>

            </TouchableOpacity>

          </View>


          {/* ================= FORM ================= */}

          <View
            style={styles.form}
          >

            {/* FULL NAME */}

            <View
              style={
                styles.fieldContainer
              }
            >

              <Text
                style={styles.label}
              >
                Full Name
              </Text>

              <TextInput
                style={styles.input}

                value={fullName}

                onChangeText={
                  setFullName
                }

                placeholder="Full Name"

                placeholderTextColor={
                  COLORS.gray
                }
              />

            </View>


            {/* PHONE */}

            <View
              style={
                styles.fieldContainer
              }
            >

              <Text
                style={styles.label}
              >
                Phone Number
              </Text>

              <TextInput
                style={styles.input}

                value={phone}

                onChangeText={
                  setPhone
                }

                placeholder="+123 567 89000"

                placeholderTextColor={
                  COLORS.gray
                }

                keyboardType="phone-pad"
              />

            </View>


            {/* EMAIL */}

            <View
              style={
                styles.fieldContainer
              }
            >

              <Text
                style={styles.label}
              >
                Email
              </Text>

              <TextInput
                style={styles.input}

                value={email}

                onChangeText={
                  setEmail
                }

                placeholder="johndoe@example.com"

                placeholderTextColor={
                  COLORS.gray
                }

                keyboardType="email-address"

                autoCapitalize="none"
              />

            </View>


            {/* DATE OF BIRTH */}

            <View
              style={
                styles.fieldContainer
              }
            >

              <Text
                style={styles.label}
              >
                Date Of Birth
              </Text>


              <TouchableOpacity
                style={
                  styles.dateInput
                }

                onPress={
                  handleDatePress
                }

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


            {/* DATE PICKER */}

            {showDatePicker && (

              <DateTimePicker

                value={
                  selectedDate
                }

                mode="date"

                display={
                  Platform.OS === "ios"
                    ? "spinner"
                    : "calendar"
                }

                maximumDate={
                  new Date()
                }

                onChange={
                  handleDateChange
                }

                onDismiss={() =>
                  setShowDatePicker(
                    false
                  )
                }
              />

            )}

          </View>


          {/* ================= UPDATE BUTTON ================= */}

          <View
            style={styles.bottom}
          >

            <TouchableOpacity
              style={
                styles.updateButton
              }

              onPress={
                handleUpdateProfile
              }

              activeOpacity={0.8}
            >

              <Text
                style={
                  styles.updateButtonText
                }
              >
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
    backgroundColor:
      COLORS.white,
  },

  keyboard: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,
    paddingBottom: 30,
  },


  // ================= IMAGE =================

  imageSection: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 35,
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

  changePhotoText: {
    marginTop: 10,

    fontSize: 12,

    color: BLUE,

    fontWeight: "500",
  },

  form: {
    paddingHorizontal: 30,
  },

  fieldContainer: {
    marginBottom: 24,
  },

  label: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.darkText,
    marginBottom: 9,
  },

  input: {
    height: 45,
    borderRadius: 12,
    backgroundColor: COLORS.QUESTION_BG,
    paddingHorizontal: 24,
    fontSize: 17,
    color: COLORS.apple,
  },

  dateInput: {
    height: 45,
    borderRadius: 12,
    backgroundColor: COLORS.QUESTION_BG,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between",
  },

  dateText: {
    fontSize: 17,
    color: COLORS.apple,
  },

  placeholderDate: {
    color: BLUE,
  },

  bottom: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 40,
  },

  updateButton: {
    width: 207,
    height: 45,
    borderRadius: 25,
    backgroundColor:COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  updateButtonText: {
    color:COLORS.white,
    fontSize: 20,
    fontWeight: "500",
  },
});