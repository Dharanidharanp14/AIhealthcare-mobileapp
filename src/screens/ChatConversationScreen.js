import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
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
  const [attachments, setAttachments] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const inputRef = useRef(null);
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
    if ((!text && attachments.length === 0) || !conversation) return;

    const time = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    addMessageToConversation(conversation.id, text, time, attachments);
    setDraft("");
    setAttachments([]);
    setSelection({ start: 0, end: 0 });
  };

  const pickImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
      });
      if (result.canceled) return;

      setAttachments((current) => [
        ...current,
        ...result.assets.map((asset) => ({
          uri: asset.uri,
          name: asset.fileName || "Image",
          mimeType: asset.mimeType || "image/jpeg",
        })),
      ]);
    } catch (error) {
      Alert.alert(
        "Unable to select images",
        error instanceof Error ? error.message : String(error)
      );
    }
  };

  const pickFiles = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: true,
        copyToCacheDirectory: true,
      });
      if (result.canceled) return;

      setAttachments((current) => [
        ...current,
        ...result.assets.map((asset) => ({
          uri: asset.uri,
          name: asset.name,
          mimeType: asset.mimeType || "application/octet-stream",
        })),
      ]);
    } catch (error) {
      Alert.alert(
        "Unable to select files",
        error instanceof Error ? error.message : String(error)
      );
    }
  };

  const showAttachmentOptions = () => {
    Alert.alert("Add attachment", "Choose what you want to attach.", [
      { text: "Photo library", onPress: pickImages },
      { text: "Files (PDF, etc.)", onPress: pickFiles },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const insertEmoji = (emoji) => {
    const start = selection.start;
    const end = selection.end;
    const nextDraft = `${draft.slice(0, start)}${emoji}${draft.slice(end)}`;
    const caret = start + emoji.length;
    setDraft(nextDraft);
    setSelection({ start: caret, end: caret });
    setShowEmojiPicker(false);
    inputRef.current?.focus();
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
        behavior={Platform.OS === "ios" ? "padding" : "height"}
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
                  {(message.attachments || []).map((attachment, index) => (
                    attachment.mimeType?.startsWith("image/") ||
                    attachment.mimeType === "image" ? (
                      <Image
                        key={`${attachment.uri}-${index}`}
                        source={{ uri: attachment.uri }}
                        style={styles.messageImage}
                        accessibilityLabel={attachment.name}
                      />
                    ) : (
                      <View
                        key={`${attachment.uri}-${index}`}
                        style={styles.messageFile}
                      >
                        <Ionicons
                          name="document-text-outline"
                          size={20}
                          color={isSent ? COLORS.white : COLORS.primary}
                        />
                        <Text
                          style={[
                            styles.messageFileName,
                            isSent && styles.sentMessageText,
                          ]}
                          numberOfLines={2}
                        >
                          {attachment.name}
                        </Text>
                      </View>
                    )
                  ))}
                  {message.text ? (
                    <Text
                      style={[
                        styles.messageText,
                        isSent && styles.sentMessageText,
                      ]}
                    >
                      {message.text}
                    </Text>
                  ) : null}
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
        {showEmojiPicker && (
          <View style={styles.emojiPicker}>
            {["😀", "😂", "🥰", "😊", "👍", "🙏", "❤️", "🎉", "😢", "😮", "👏", "🤔"].map(
              (emoji) => (
                <TouchableOpacity
                  key={emoji}
                  accessibilityRole="button"
                  accessibilityLabel={`Insert ${emoji} emoji`}
                  onPress={() => insertEmoji(emoji)}
                  style={styles.emojiButton}
                >
                  <Text style={styles.emoji}>{emoji}</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        )}
        {attachments.length > 0 && (
          <ScrollView
            horizontal
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.attachmentList}
            showsHorizontalScrollIndicator={false}
          >
            {attachments.map((attachment, index) => (
              <View
                key={`${attachment.uri}-${index}`}
                style={styles.pendingAttachment}
              >
                <Ionicons
                  name={
                    attachment.mimeType?.startsWith("image/")
                      ? "image-outline"
                      : "document-text-outline"
                  }
                  size={17}
                  color={COLORS.primary}
                />
                <Text style={styles.pendingAttachmentName} numberOfLines={1}>
                  {attachment.name}
                </Text>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel={`Remove ${attachment.name}`}
                  onPress={() =>
                    setAttachments((current) =>
                      current.filter((_, attachmentIndex) => attachmentIndex !== index)
                    )
                  }
                  hitSlop={8}
                >
                  <Ionicons name="close-circle" size={18} color={COLORS.gray} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}
        <View style={styles.composer}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Add image or file"
            onPress={showAttachmentOptions}
            style={styles.composerAction}
          >
            <Ionicons name="add-circle-outline" size={25} color={COLORS.primary} />
          </TouchableOpacity>
          <TextInput
            ref={inputRef}
            value={draft}
            onChangeText={setDraft}
            onSelectionChange={(event) => setSelection(event.nativeEvent.selection)}
            placeholder="Write a message..."
            placeholderTextColor={COLORS.gray}
            style={styles.input}
            selection={selection}
            returnKeyType="send"
            onSubmitEditing={sendMessage}
            accessibilityLabel="Message"
          />
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Show emoji"
            onPress={() => {
              if (showEmojiPicker) {
                setShowEmojiPicker(false);
                inputRef.current?.focus();
              } else {
                Keyboard.dismiss();
                setShowEmojiPicker(true);
              }
            }}
            style={styles.composerAction}
          >
            <Ionicons name="happy-outline" size={23} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Send message"
            onPress={sendMessage}
            disabled={!draft.trim() && attachments.length === 0}
            style={[
              styles.sendButton,
              !draft.trim() && attachments.length === 0 && styles.sendButtonDisabled,
            ]}
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
  emojiPicker: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  emojiButton: {
    width: "16%",
    alignItems: "center",
    paddingVertical: 7,
  },
  emoji: {
    fontSize: 25,
  },
  attachmentList: {
    gap: 8,
    paddingHorizontal: 14,
    paddingBottom: 8,
  },
  pendingAttachment: {
    maxWidth: 190,
    minHeight: 34,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 9,
    borderRadius: 17,
    backgroundColor: COLORS.inputBackground,
  },
  pendingAttachmentName: {
    flexShrink: 1,
    color: COLORS.darkText,
    fontSize: 12,
  },
  messageImage: {
    width: 200,
    height: 160,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: COLORS.inputBackground,
  },
  messageFile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 5,
  },
  messageFileName: {
    flex: 1,
    color: COLORS.darkText,
    fontSize: 13,
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
  composerAction: {
    width: 28,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
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
