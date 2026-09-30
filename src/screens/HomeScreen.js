import React, { useMemo, useState } from "react";

import {
  View,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import doctors from "../data/doctors";
import appointments from "../data/appointments";

import HomeHeader from "../components/homecomponent/homeheader";
import SearchBar from "../components/homecomponent/searchbar";
import HomeCategories from "../components/homecomponent/HomeCategories";
import DateSelector from "../components/homecomponent/DateSelector";
import DoctorCard from "../components/homecomponent/DoctorCard";
import AppointmentSchedule from "../components/homecomponent/AppointmentSchedule";

import COLORS from "../constants/colors";

const toDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const HomeScreen = ({ navigation }) => {

  const [search, setSearch] = useState("");

  const [category, setCategory] =
    useState("Doctors");

  const [selectedDate, setSelectedDate] = useState(() =>
    toDateKey(new Date())
  );


  // STORE LIKED DOCTOR IDs

  const [likedDoctors, setLikedDoctors] =
    useState([]);


  // LIKE / UNLIKE

  const handleLike = (doctorId) => {

    setLikedDoctors((previous) => {

      if (previous.includes(doctorId)) {

        // REMOVE FROM FAVORITE

        return previous.filter(
          (id) => id !== doctorId
        );

      }

      // ADD TO FAVORITE

      return [
        ...previous,
        doctorId,
      ];
    });
  };


  // FILTER DOCTORS

  const filteredDoctors = useMemo(() => {

    let result = doctors;


    // FAVORITE FILTER

    if (category === "Favorite") {

      result = result.filter(
        (doctor) =>
          likedDoctors.includes(doctor.id)
      );

    }


    // SEARCH FILTER

    if (search.trim()) {

      result = result.filter(
        (doctor) =>
          doctor.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          doctor.specialty
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }


    return result;

  }, [
    search,
    category,
    likedDoctors,
  ]);


  return (

    <SafeAreaView
      style={styles.container}
    >

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* HEADER */}

        <HomeHeader
          navigation={navigation}
        />


        {/* SEARCH */}

        <SearchBar
          value={search}
          onChangeText={setSearch}
        />


        {/* CATEGORIES */}

        <HomeCategories
          active={category}
          setActive={setCategory}
        />


        {/* DATE */}

        <View
          style={styles.dateselector}
        >

          <DateSelector
            selectedDate={selectedDate}
            setSelectedDate={
              setSelectedDate
            }
          />

          <AppointmentSchedule
            selectedDate={selectedDate}
            appointments={appointments}
          />

        </View>


        {/* TITLE */}

        <View
          style={styles.sectionHeader}
        >

          <Text
            style={styles.sectionTitle}
          >
            {category === "Favorite"
              ? "Favorite Doctors"
              : "Recommended Doctors"}
          </Text>

        </View>


        {/* DOCTORS */}

        {filteredDoctors.length > 0 ? (

          filteredDoctors.map(
            (doctor) => (

              <DoctorCard
                key={doctor.id}

                doctor={doctor}

                navigation={navigation}

                liked={
                  likedDoctors.includes(
                    doctor.id
                  )
                }

                onLike={handleLike}
              />

            )
          )

        ) : (

          <Text
            style={styles.noResult}
          >
            {category === "Favorite"
              ? "No favorite doctors"
              : "No doctors found"}
          </Text>

        )}

      </ScrollView>

    </SafeAreaView>
  );
};


export default HomeScreen;


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  scrollContent: {
    paddingBottom: 112,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 30,

    marginTop: 15,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.darkText,
  },

  noResult: {
    textAlign: "center",
    marginTop: 30,
    color: COLORS.gray,
    fontSize: 13,
  },

  dateselector: {
    marginTop: 8,
    paddingBottom: 8,
  },

});