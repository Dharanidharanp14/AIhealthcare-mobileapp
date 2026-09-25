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

const BLUE = COLORS.primary || "#2864FF";
const LIGHT_BLUE = "#C9D5FF";
const QUESTION_BG = "#E8EDFF";

const FAQ = () => {

  const [activeCategory, setActiveCategory] =
    useState("Popular Topic");

  const [openQuestion, setOpenQuestion] =
    useState(0);


  const faqData = [

    {
      question: "Lorem ipsum dolor sit amet?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam.",
    },

    {
      question: "Lorem ipsum dolor sit amet?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a.",
    },

    {
      question: "Lorem ipsum dolor sit amet?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a.",
    },

    {
      question: "Lorem ipsum dolor sit amet?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a.",
    },

    {
      question: "Lorem ipsum dolor sit amet?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a.",
    },

    {
      question: "Lorem ipsum dolor sit amet?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a.",
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
                color={BLUE}
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

    backgroundColor: LIGHT_BLUE,

    justifyContent: "center",
    alignItems: "center",
  },

  activeCategory: {
    backgroundColor: BLUE,
  },

  categoryText: {
    color: BLUE,
    fontSize: 11,
  },

  activeCategoryText: {
    color: COLORS.white,
  },

  questionBox: {
    minHeight: 33,

    borderRadius: 18,

    backgroundColor: QUESTION_BG,

    paddingHorizontal: 13,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginBottom: 9,
  },

  questionText: {
    flex: 1,

    color: "#555",

    fontSize: 11,

    marginRight: 8,
  },

  answerContainer: {
    paddingHorizontal: 20,

    paddingTop: 0,

    paddingBottom: 12,
  },

  answerText: {
    color: "#555",

    fontSize: 10,

    lineHeight: 13,
  },

});