
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Button, useWindowDimensions } from 'react-native';

import courses from './../lib/courses.json';
import { formatDistance } from 'date-fns';
export default function App() {
    const [data, setData] = useState({});
    const [config, setConfig] = useState({ semester: "Select", section: "Select" })
    const [updatedAt, setUpdatedAt] = useState(null);
    const today = (new Date).getDay();
    const nextDay = today >= 4 ? 0 : today + 1
    const fontScale = useWindowDimensions().fontScale;
    function getClassDetails(raw, type) {
        if (type == "course") {
            const courseA = raw.split("[")
            const temp = courseA[0].trim().split("-");
            let courseName = "";
            if (temp.length > 1) courseName = temp[0] + " " + temp[1].split(" ")[0];
            else {
                const temp = courseA[0].trim().split(" ");
                courseName = temp[0] + " " + temp[1];
            }
            return (courses[courseName])
        }
        else {
            const matches = [...raw.matchAll(/\[([\w]+)\]/g)];
            const teachers = matches.map(match => data.teachers ? data.teachers[match[1]] : "Sync Routine please");
            return (teachers)

        }




    }
    useEffect(() => {

        //getting saved sheet data
        async function getSheet() {
            let sheetData = await AsyncStorage.getItem("sheetData");
            if (sheetData) {
                setData(JSON.parse(sheetData));
                setUpdatedAt(new Date(JSON.parse(sheetData).updated))
            }
            else return (false);
        }


        getSheet();

        //getting saved config
        async function configSetter() {
            let config = await AsyncStorage.getItem("config");
            if (config) {
                const configFromStorage = JSON.parse(config)
                setConfig({ semester: configFromStorage.semester, section: configFromStorage.section })

            }
        }
        configSetter();
    }, [])
    return (<>
        <View style={styles.container} >

            {
                updatedAt &&


                <View style={styles.updated}>
                    <Text style={{ ...styles.dark, ...styles.textCenter }} >Semester: {config.semester}({config.section}) { }</Text>
                    <Text style={{ ...styles.dark, ...styles.textCenter }}>
                        S: {formatDistance(updatedAt, new Date())} ago.
                    </Text>
                </View>
            }

            {(config.semester != 'Select' && data.data) && data.days.map((day, dayKey) =>
                <View key={dayKey + 321} style={{ borderWidth: (today == dayKey) ? 3 : 0, borderColor: "grey", borderStyle: "dotted", borderRadius: 15 }}>
                    <Text style={{ ...styles.dark, ...styles.textCenter, fontSize: fontScale * 25 }} key={dayKey}>  {day}</Text>
                    <View key={dayKey + 123} style={styles.perDay}>

                        {data.data[dayKey][config.semester][config.section].map((sub, subKey) => <View>
                            {sub[0] &&
                                <View key={subKey} style={styles.classRow}>
                                    <Text style={{ ...styles.dark, ...styles.time }}>{data.times[subKey]}{(sub[1] > 1) && <>{"\n"}{data.times[subKey + sub[1] - 1]}</>}</Text>
                                    <View style={{ ...styles.classContainer }}>
                                        <Text selectable style={{ ...styles.dark, ...styles.textCenter, fontSize: fontScale * 20 }}>{getClassDetails(sub[0], "course")}</Text>

                                        <View style={styles.teacherView}>{getClassDetails(sub[0], "teachers").map((v, k) => <Text key={k} style={{ ...styles.dark }}>{k + 1}. {v}</Text>)}</View>

                                        <Text style={{ ...styles.dark }}>{sub[0]}</Text>
                                    </View>
                                </View>
                            }
                        </View>)}

                    </View>
                </View>)
            }
            {config.semester == "Select" && < View style={styles.hints}>
                <Text style={{ ...styles.dark }}>
                    1. Make a Sync first (may takes 2-5 minutes). {"\n"}
                    2. Then go to Config and select semester, section then press Save button. {"\n"}
                    3. Now go to Home to view your routine. {"\n"}
                    4. Regularly make sync. {"\n"}
                </Text>

            </View>}

        </View >

    </>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100vh",
        marginBottom: 150,

    },

    dark: {
        color: "white",
    },
    textCenter: {
        textAlign: "center"
    },
    classRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "#111113",
        borderRadius: 15,

    },
    classContainer: {
        backgroundColor: "#222224",
        alignItems: "center",
        flex: 7,
        borderRadius: 15,
        margin: 10,
        padding: 5,
        gap: 15,
    },
    time: {

        alignSelf: "center"
    },
    teacherView: {
        gap: 5
    },
    perDay: {
        gap: 10,


    },
    updated: {
        backgroundColor: "#222224",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10
    },
    hints: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",



    }
});
