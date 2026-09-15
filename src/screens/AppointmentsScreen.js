import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet,View,Text} from "react-native";
import COLORS from "../constants/colors";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
});

function AppointmentsScreen() {
    return(
        <SafeAreaView style={styles.container}>
                <View>
                    <Text>Appointments</Text>
                </View>
        </SafeAreaView>
    )
}

export default AppointmentsScreen;