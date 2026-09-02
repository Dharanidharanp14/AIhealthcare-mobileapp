import React, { useMemo, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import doctors from "../data/doctors";
import HomeHeader from "../components/homecomponent/homeheader";
import SearchBar from "../components/homecomponent/searchbar";
import HomeCategories from "../components/homecomponent/HomeCategories";
import DateSelector from "../components/homecomponent/DateSelector";
import DoctorCard from "../components/homecomponent/DoctorCard";
import AppointmentSchedule from "../components/homecomponent/AppointmentSchedule"
import COLORS from "../constants/colors";

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Doctors");
  const [selectedDate, setSelectedDate] = useState("11");

  const filteredDoctors = useMemo(() => {
    if (!search.trim()) {
      return doctors;
    }

    return doctors.filter((doctor) =>
      doctor.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      doctor.specialty
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        <HomeHeader />

        <SearchBar
          value={search}
          onChangeText={setSearch}
        />

        <HomeCategories
          active={category}
          setActive={setCategory}
        />

        <View style={styles.dateselector}>
          <DateSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <AppointmentSchedule />
        </View>



        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Recommended Doctors
          </Text>

          <Text style={styles.seeAll}>
            See All
          </Text>
        </View>

        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
            />
          ))
        ) : (
          <Text style={styles.noResult}>
            No doctors found
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
    backgroundColor: "#FFF",
  },

  appointment: {
    marginHorizontal: 30,
    marginTop: 15,
    marginBottom: 15,

    height: 100,

    backgroundColor: "#E0E8FF",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",
  },

  appointmentText: {
    color: "#2864F0",
    fontSize: 11,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 30,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },

  seeAll: {
    fontSize: 10,
    color: "#2864F0",
  },

  noResult: {
    textAlign: "center",
    marginTop: 30,
    color: "#777",
  },

  dateselector: {
    backgroundColor: COLORS.lightBlue,
    borderRadius: 20,
    marginHorizontal: 30,
    marginTop: 10,
    height: 300,
  }
});