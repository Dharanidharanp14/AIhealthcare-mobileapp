
import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import COLORS from "../constants/colors";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/Custombutton";
import CommonHeader from "../components/CommonHeader";
import { useCustomAlert } from "../components/CustomAlertProvider";
import SocialButtons from "../components/Socialbutton";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpScreen = ({ navigation }) => {
  const { showAlert } = useCustomAlert();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

const handleSignup = () => {
  if (!fullName || !email || !password || !mobile || !dob) {
    showAlert("Missing information", "Please fill all fields", [], "error");
    return;
  }
  showAlert(
    "Account created",
    "Your account has been created successfully.",
    [
      {
        text: "Continue",
        onPress: () =>
          navigation.navigate("SignIn", {
            userProfile: {
              fullName,
              email,
              phone: mobile,
              dateOfBirth: dob,
            },
          }),
      },
    ],
    "success"
  );
};

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    
  
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    setDob(`${day}/${month}/${year}`);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.statusbar}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Header */}
        <CommonHeader
          title="New Account"
          navigation={navigation}
        />

        {/* Form */}
        <View style={styles.content}>
          <Text style={styles.title}>
            Hello!
          </Text>

          <Text style={styles.description}>
            Create your account and start your
            healthcare journey.
          </Text>

          <CustomInput
            label="Full Name"
            placeholder="John Doe"
            value={fullName}
            onChangeText={setFullName}
          />

          <CustomInput
            label="Email"
            placeholder="example@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <CustomInput
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <CustomInput
            label="Mobile Number"
            placeholder="+91 98765 43210"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
          />

          {/* Date of Birth with Date Picker */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={showDatepicker}
          >
            <View pointerEvents="none">
              <CustomInput
                label="Date Of Birth"
                placeholder="DD / MM / YYYY"
                value={dob}
                onChangeText={setDob}
                keyboardType="numeric"
                editable={false}
              />
            </View>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onValueChange={onChangeDate}
              onDismiss={() => setShowDatePicker(false)}
              maximumDate={new Date()}
            />
          )}

          <Text style={styles.terms}>
            By continuing, you agree to our Terms &
            Conditions and Privacy Policy.
          </Text>

          <CustomButton
            title="Sign Up"
            onPress={handleSignup}
          />

          <Text style={styles.or}>
            or
          </Text>

          <SocialButtons />

          <View style={styles.accountRow}>
            <Text style={styles.accountText}>
              Already have an account?
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SignIn")
              }
            >
              <Text style={styles.link}>
                {" "}Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  scroll: {
    flexGrow: 1,
    paddingBottom: 30,
  },

  header: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    marginTop: 20,
  },

  headerTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },

  content: {
    paddingHorizontal: 25,
    paddingTop: 15,
  },

  title: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: "700",
  },

  description: {
    color: COLORS.gray,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 7,
    marginBottom: 25,
  },

  terms: {
    color: COLORS.gray,
    fontSize: 9,
    lineHeight: 14,
    textAlign: "center",
    marginBottom: 15,
  },

  or: {
    textAlign: "center",
    color: COLORS.gray,
    fontSize: 11,
    marginVertical: 15,
  },

  accountRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  accountText: {
    color: COLORS.gray,
    fontSize: 10,
  },

  link: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: "600",
  },
});