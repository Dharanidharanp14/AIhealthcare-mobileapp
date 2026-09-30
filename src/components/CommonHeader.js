import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";

const CommonHeader = ({
  title,
  subtitle,
  navigation,
  onBackPress,
  showBackButton = true,
  rightContent,
  style,
  titleStyle,
  subtitleStyle,
  backButtonStyle,
  leftContainerStyle,
  rightContainerStyle,
  backIconColor = COLORS.primary,
}) => {
  const handleBackPress = onBackPress || (() => navigation?.goBack());

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.side, leftContainerStyle]}>
        {showBackButton ? (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={handleBackPress}
            style={[
              styles.backButton,
              subtitle && styles.backButtonWithSubtitle,
              backButtonStyle,
            ]}
          >
            <Ionicons
              name="chevron-back"
              size={25}
              color={backIconColor}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.titleGroup}>
        <Text
          style={[styles.title, titleStyle]}
          numberOfLines={1}
          includeFontPadding={false}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={[styles.subtitle, subtitleStyle]}
            numberOfLines={1}
            includeFontPadding={false}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View style={[styles.side, styles.rightContent, rightContainerStyle]}>
        {rightContent}
      </View>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  container: {
    height: 72,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  side: {
    width: 45,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonWithSubtitle: {
    transform: [{ translateY: -10 }],
  },
  titleGroup: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  title: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 24,
    textAlign: "center",
  },
  subtitle: {
    color: COLORS.gray,
    fontSize: 13,
    marginTop: 4,
    textAlign: "center",
  },
  rightContent: {
    alignItems: "center",
    justifyContent: "center",
  },
});
