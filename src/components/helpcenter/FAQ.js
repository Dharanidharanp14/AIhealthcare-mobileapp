import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";

const FAQ = () => {
  const [activeCategory, setActiveCategory] =
    useState("Popular Topic");
  const [openQuestion, setOpenQuestion] =
    useState(0);
  const faqData = [
    {
      question: "How do I update my profile?",
      answer:
        "Open Profile and choose Edit Profile to change your name, phone number, email address, or date of birth. Select Update Profile when you are finished.",
    },

    {
      question: "Can I book an appointment in this app?",
      answer:
        "This prototype displays sample provider and appointment screens, but it does not send booking requests to a clinic. Contact your provider directly to arrange a visit.",
    },

    {
      question: "Does cancelling here notify my clinic?",
      answer:
        "No. The cancellation screen currently shows a local confirmation only. Contact your clinic directly to confirm or change an appointment.",
    },

    {
      question: "Can I send a message to a doctor?",
      answer:
        "The conversation shown in this prototype is for demonstration. Messages are not delivered to a provider; use your clinic's verified contact method instead.",
    },

    {
      question: "Is this app a substitute for medical advice?",
      answer:
        "No. Information in this app is not a diagnosis or treatment plan. Speak with a licensed healthcare professional about your health.",
    },

    {
      question: "Will my profile changes still be here after restarting?",
      answer:
        "Not necessarily. This prototype keeps profile details in app memory and does not save them to an account server. Avoid entering sensitive health or payment information.",
    },

  ];

  const toggleQuestion = (index) => {
    if (openQuestion === index) {
      setOpenQuestion(null);
    } else {
      setOpenQuestion(index);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {/* CATEGORY */}
      <View style={styles.categoryRow}>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            activeCategory === "Popular Topic" &&
              styles.activeCategory,
          ]}
          onPress={() =>
            setActiveCategory("Popular Topic")
          }
        >
          <Text
            style={[
              styles.categoryText,
              activeCategory === "Popular Topic" &&
                styles.activeCategoryText,
            ]}
          >
            Popular Topic
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          style={[
            styles.categoryButton,
            activeCategory === "General" &&
              styles.activeCategory,
          ]}
          onPress={() =>
            setActiveCategory("General")
          }
        >

          <Text
            style={[
              styles.categoryText,
              activeCategory === "General" &&
                styles.activeCategoryText,
            ]}
          >
            General
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          style={[
            styles.categoryButton,
            activeCategory === "Services" &&
              styles.activeCategory,
          ]}
          onPress={() =>
            setActiveCategory("Services")
          }
        >

          <Text
            style={[
              styles.categoryText,
              activeCategory === "Services" &&
                styles.activeCategoryText,
            ]}
          >
            Services
          </Text>

        </TouchableOpacity>

      </View>


      {/* QUESTIONS */}

      {faqData.map((item, index) => {

        const isOpen = openQuestion === index;

        return (

          <View key={index}>

            <TouchableOpacity
              style={styles.questionBox}
              onPress={() =>
                toggleQuestion(index)
              }
              activeOpacity={0.8}
            >

              <Text style={styles.questionText}>
                {item.question}
              </Text>

              <Ionicons
                name={
                  isOpen
                    ? "chevron-up"
                    : "chevron-down"
                }
                size={21}
                color={COLORS.primary}
              />

            </TouchableOpacity>


            {/* ANSWER */}

            {isOpen && (

              <View style={styles.answerContainer}>

                <Text style={styles.answerText}>
                  {item.answer}
                </Text>

              </View>

            )}

          </View>

        );

      })}

    </ScrollView>

  );
};

export default FAQ;


const styles = StyleSheet.create({

  container: {
    paddingHorizontal: 30,
    paddingTop: 12,
    paddingBottom: 30,
  },

  categoryRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 28,
  },

  categoryButton: {
    flex: 1,

    height: 27,

    borderRadius: 15,

    backgroundColor: COLORS.lightBlue,

    justifyContent: "center",
    alignItems: "center",
  },

  activeCategory: {
    backgroundColor: COLORS.primary,
  },

  categoryText: {
    color: COLORS.primary,
    fontSize: 11,
  },

  activeCategoryText: {
    color: COLORS.white,
  },

  questionBox: {
    minHeight: 33,

    borderRadius: 18,

    backgroundColor: COLORS.QUESTION_BG,

    paddingHorizontal: 13,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginBottom: 9,
  },

  questionText: {
    flex: 1,

    color: COLORS.gray,

    fontSize: 11,

    marginRight: 8,
  },

  answerContainer: {
    paddingHorizontal: 20,

    paddingTop: 0,

    paddingBottom: 12,
  },

  answerText: {
    color: COLORS.gray,

    fontSize: 10,

    lineHeight: 13,
  },

});