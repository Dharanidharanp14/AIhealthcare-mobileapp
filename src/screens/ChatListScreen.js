import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Image,
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
import {
  getConversations,
  subscribeToConversations,
} from "../data/chats";

const ChatListScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [conversations, setConversations] = useState(getConversations);

  useEffect(() => {
    return subscribeToConversations(() => {
      setConversations(getConversations());
    });
  }, []);

  const filteredConversations = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return conversations;

    return conversations.filter((conversation) =>
      `${conversation.name} ${conversation.specialty} ${conversation.lastMessage}`
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  const openConversation = (conversation) => {
    navigation.navigate("MessageChat", {
      conversationId: conversation.id,
    });
  };

  const renderConversation = ({ item }) => (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`Open conversation with ${item.name}`}
      onPress={() => openConversation(item)}
      style={styles.conversationRow}
      activeOpacity={0.72}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.conversationContent}>
        <View style={styles.topLine}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.specialty} numberOfLines={1}>
          {item.specialty}
        </Text>
        <View style={styles.previewLine}>
          <Text style={styles.preview} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <CommonHeader
        title="Messages"
        onBackPress={() => navigation.navigate("Home")}
      />
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={19} color={COLORS.gray} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search conversations"
          placeholderTextColor={COLORS.gray}
          style={styles.searchInput}
          returnKeyType="search"
        />
      </View>
      <Text style={styles.sectionTitle}>Recent conversations</Text>
      <FlatList
        data={filteredConversations}
        keyExtractor={(item) => item.id}
        renderItem={renderConversation}
        contentContainerStyle={[
          styles.listContent,
          filteredConversations.length === 0 && styles.emptyList,
        ]}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={(
          <View style={styles.emptyState}>
            <Ionicons
              name="chatbubbles-outline"
              size={30}
              color={COLORS.mutedBlue}
            />
            <Text style={styles.emptyTitle}>No conversations found</Text>
            <Text style={styles.emptyText}>
              Try a different name or search term.
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  searchBox: {
    height: 46,
    marginHorizontal: 24,
    marginTop: 8,
    marginBottom: 22,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: COLORS.inputBackground,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 0,
    color: COLORS.darkText,
    fontSize: 14,
  },
  sectionTitle: {
    marginHorizontal: 24,
    marginBottom: 8,
    color: COLORS.darkText,
    fontSize: 15,
    fontWeight: "700",
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 84,
  },
  conversationRow: {
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.softBlue,
  },
  conversationContent: {
    flex: 1,
    minWidth: 0,
    marginLeft: 13,
  },
  topLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  name: {
    flex: 1,
    color: COLORS.darkText,
    fontSize: 14,
    fontWeight: "700",
  },
  time: {
    color: COLORS.gray,
    fontSize: 10,
  },
  specialty: {
    marginTop: 2,
    color: COLORS.gray,
    fontSize: 11,
  },
  previewLine: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  preview: {
    flex: 1,
    color: COLORS.softText,
    fontSize: 12,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  unreadCount: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "700",
  },
  separator: {
    height: 1,
    marginLeft: 65,
    backgroundColor: COLORS.border,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emptyTitle: {
    marginTop: 12,
    color: COLORS.darkText,
    fontSize: 15,
    fontWeight: "600",
  },
  emptyText: {
    marginTop: 5,
    color: COLORS.gray,
    fontSize: 12,
    textAlign: "center",
  },
});
