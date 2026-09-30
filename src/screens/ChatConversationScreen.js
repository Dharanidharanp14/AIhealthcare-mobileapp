import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import CommonHeader from "../components/CommonHeader";
import { useCustomAlert } from "../components/CustomAlertProvider";
import {
  addMessageToConversation,
  getConversations,
  markConversationRead,
  subscribeToConversations,
} from "../data/chats";

const ChatConversationScreen = ({ navigation, route }) => {
  const { showAlert } = useCustomAlert();
  const [conversations, setConversations] = useState(getConversations);
  const [draft, setDraft] = useState("");
  const messagesRef = useRef(null);
  const conversationId =
    route?.params?.conversationId ||
    route?.params?.conversation?.id ||
    conversations[0]?.id;
  const conversation =
    conversations.find((item) => item.id === conversationId) || conversations[0];

  useEffect(() => {
    return subscribeToConversations(() => {
      setConversations(getConversations());
    });
  }, []);

  useEffect(() => {
    if (conversation) {
      markConversationRead(conversation.id);
    }
  }, [conversation?.id]);

  const sendMessage = () => {
    const text = draft.trim();
    if (!text || !conversation) return;

    const time = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    addMessageToConversation(conversation.id, text, time);
    setDraft("");
  };

  const showCallSetupNotice = (callType) => {
    showAlert(
      `${callType} calling unavailable`,
      "Live calls need a calling service and a signaling server. No call provider is configured in this demo.",
      [],
      "info"
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <CommonHeader
          title={conversation.name}
          subtitle={conversation.specialty}
          navigation={navigation}
          style={styles.header}
          titleStyle={styles.headerTitle}
          subtitleStyle={styles.headerSubtitle}
          backIconColor={COLORS.white}
          leftContainerStyle={styles.headerSide}
          rightContainerStyle={styles.headerSide}
          rightContent={(
            <View style={styles.headerActions}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Voice call"
                onPress={() => showCallSetupNotice("Audio")}
                style={styles.headerIcon}
              >
                <Ionicons name="call-outline" size={18} color={COLORS.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Video call"
                onPress={() => showCallSetupNotice("Video")}
                style={styles.headerIcon}
              >
                <Ionicons name="videocam-outline" size={18} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          )}
        />

        <ScrollView
          ref={messagesRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() => messagesRef.current?.scrollToEnd({ animated: true })}
        >
          {(conversation?.messages || []).map((message) => {
            const isSent = message.sender === "me";

            return (
              <View
                key={message.id}
                style={[styles.messageRow, isSent ? styles.sentRow : styles.receivedRow]}
              >
                <View
                  style={[
                    styles.messageBubble,
                    isSent ? styles.sentMessage : styles.receivedMessage,
                  ]}
                >
                  <Text style={[styles.messageText, isSent && styles.sentMessageText]}>
                    {message.text}
                  </Text>
                  <Text style={[styles.messageTime, isSent && styles.sentMessageTime]}>
                    {message.time}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <Text style={styles.demoNotice}>
          Demo chat. Messages are not delivered to a provider.
        </Text>
        <View style={styles.composer}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Write a message..."
            placeholderTextColor={COLORS.gray}
            style={styles.input}
            returnKeyType="send"
            onSubmitEditing={sendMessage}
            accessibilityLabel="Message"
          />
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Send message"
            onPress={sendMessage}
            disabled={!draft.trim()}
            style={[styles.sendButton, !draft.trim() && styles.sendButtonDisabled]}
          >
            <Ionicons name="send" size={18} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatConversationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboard: {
    flex: 1,
  },
  header: {
    height: 84,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
  },
  headerSide: {
    width: 76,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 21,
  },
  headerSubtitle: {
    color: COLORS.paleSoftBlue,
    fontSize: 11,
    marginTop: 3,
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 20,
    gap: 14,
  },
  messageRow: {
    width: "100%",
    flexDirection: "row",
  },
  sentRow: {
    justifyContent: "flex-end",
  },
  receivedRow: {
    justifyContent: "flex-start",
  },
  messageBubble: {
    maxWidth: "84%",
    minWidth: 72,
    paddingHorizontal: 13,
    paddingTop: 10,
    paddingBottom: 7,
    borderRadius: 16,
  },
  sentMessage: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  receivedMessage: {
    backgroundColor: COLORS.softBlue,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    color: COLORS.darkText,
    fontSize: 14,
    lineHeight: 19,
  },
  sentMessageText: {
    color: COLORS.white,
  },
  messageTime: {
    alignSelf: "flex-end",
    marginTop: 4,
    color: COLORS.gray,
    fontSize: 10,
  },
  sentMessageTime: {
    color: COLORS.paleSoftBlue,
  },
  demoNotice: {
    alignSelf: "center",
    marginBottom: 8,
    color: COLORS.gray,
    fontSize: 10,
  },
  composer: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  input: {
    flex: 1,
    minHeight: 42,
    maxHeight: 100,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 21,
    backgroundColor: COLORS.inputBackground,
    color: COLORS.darkText,
    fontSize: 14,
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  sendButtonDisabled: {
    opacity: 0.45,
  },
});
