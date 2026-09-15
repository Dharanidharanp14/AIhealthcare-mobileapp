import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BLUE = "#2864FF";
const LIGHT_BLUE = "#C9D6FF";
const MESSAGE_BG = "#EEF2FF";

const MessageScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color="#fff"
          />
        </TouchableOpacity>

        <Text style={styles.doctorName}>
          Dr. Olivia Turner
        </Text>

        <View style={styles.headerActions}>

          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons
              name="call-outline"
              size={20}
              color={BLUE}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons
              name="videocam-outline"
              size={20}
              color={BLUE}
            />
          </TouchableOpacity>

        </View>
      </View>

      {/* Messages */}
      <ScrollView
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messagesContent}
      >

        {/* Doctor message */}
        <View style={styles.doctorMessage}>
          <Text style={styles.messageText}>
            Hii how can I help you?
          </Text>
        </View>

        <Text style={styles.time}>09:00</Text>

        {/* User message */}
        <View style={styles.userMessage}>
          <Text style={styles.messageText}>
            Hii, I have a skin problem. Can you help me?
          </Text>
        </View>

        <Text style={styles.userTime}>09:30</Text>

        {/* Doctor message */}
        <View style={styles.doctorMessage}>
          <Text style={styles.messageText}>
            Sure, Can you please describe your problem?
          </Text>
        </View>

        <Text style={styles.time}>09:43</Text>

        {/* Voice message */}
        <View style={styles.voiceMessage}>

          <View style={styles.avatar}>
            <Text>👩</Text>
          </View>

          <TouchableOpacity>
            <Ionicons
              name="play"
              size={18}
              color="#fff"
            />
          </TouchableOpacity>

          <View style={styles.waveContainer}>
            <View style={styles.waveLine} />
            <View style={styles.waveDot} />
          </View>

          <Text style={styles.voiceTime}>
            02:50
          </Text>

        </View>

        <Text style={styles.userTime}>09:50</Text>

        {/* User message */}
        <View style={styles.userMessage}>
          <Text style={styles.messageText}>
            Thank you for your help. I will send you a voice message describing my problem.
          </Text>
        </View>

        <Text style={styles.userTime}>09:55</Text>

        {/* Typing */}
        <Text style={styles.typing}>
          Dr. Olivia is typing...
        </Text>

      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputArea}>

        <TouchableOpacity style={styles.attachButton}>
          <Ionicons
            name="attach-outline"
            size={25}
            color={BLUE}
          />
        </TouchableOpacity>

        <View style={styles.inputContainer}>

          <TextInput
            placeholder="Write Here..."
            placeholderTextColor="#AAB5D6"
            style={styles.input}
          />

          <TouchableOpacity>
            <Ionicons
              name="mic-outline"
              size={23}
              color={BLUE}
            />
          </TouchableOpacity>

        </View>

        <TouchableOpacity style={styles.sendButton}>
          <Ionicons
            name="send-outline"
            size={25}
            color="#fff"
          />
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  /* HEADER */

  header: {
    height: 106,
    backgroundColor: BLUE,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 28,
    paddingTop: 20,
  },

  doctorName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 15,
    flex: 1,
  },

  headerActions: {
    flexDirection: "row",
    gap: 10,
  },

  headerIcon: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  /* MESSAGES */

  messagesContainer: {
    flex: 1,
  },

  messagesContent: {
    paddingHorizontal: 30,
    paddingTop: 35,
    paddingBottom: 20,
  },

  doctorMessage: {
    alignSelf: "flex-end",
    backgroundColor: LIGHT_BLUE,
    maxWidth: "75%",
    paddingHorizontal: 15,
    paddingVertical: 13,
    borderRadius: 18,
    borderBottomRightRadius: 5,
  },

  userMessage: {
    alignSelf: "flex-start",
    backgroundColor: MESSAGE_BG,
    maxWidth: "70%",
    paddingHorizontal: 15,
    paddingVertical: 13,
    borderRadius: 18,
    borderBottomLeftRadius: 5,
    marginTop: 8,
  },

  messageText: {
    fontSize: 11,
    lineHeight: 14,
    color: "#333",
  },

  time: {
    color: "#7B9BFF",
    fontSize: 10,
    alignSelf: "flex-end",
    marginTop: 4,
    marginBottom: 8,
  },

  userTime: {
    color: "#7B9BFF",
    fontSize: 10,
    alignSelf: "flex-start",
    marginTop: 4,
    marginBottom: 8,
  },

  /* VOICE */

  voiceMessage: {
    alignSelf: "flex-start",
    width: "70%",
    height: 48,
    backgroundColor: MESSAGE_BG,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 8,
  },

  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },

  waveContainer: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
  },

  waveLine: {
    height: 3,
    backgroundColor: BLUE,
    width: "100%",
    borderRadius: 2,
  },

  waveDot: {
    position: "absolute",
    left: "60%",
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: BLUE,
  },

  voiceTime: {
    color: "#7B9BFF",
    fontSize: 8,
  },

  typing: {
    color: BLUE,
    fontSize: 11,
    marginTop: 5,
  },

  /* INPUT */

  inputArea: {
    height: 72,
    backgroundColor: LIGHT_BLUE,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    gap: 10,
  },

  attachButton: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  inputContainer: {
    flex: 1,
    height: 42,
    borderRadius: 22,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  input: {
    flex: 1,
    fontSize: 11,
    color: "#333",
  },

  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: BLUE,
    justifyContent: "center",
    alignItems: "center",
  },
});