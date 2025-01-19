import { Redirect, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Linking, Platform, StyleSheet, Text, TextInput, ToastAndroid, Touchable, TouchableOpacity, View } from 'react-native';


import gsheet from "../../lib/gsheet"
import readExcelFromUrl from "../../lib/fetchFromSheet"
import SelectInput from "../../lib/SelectInput"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { formatDistance } from 'date-fns';
function index(props) {
    const sections = [
        {
            hedaer: "Choose your class",
            items: [
                { id: "semester", label: "Semester", type: "select" },
                { id: "section", label: "Section", type: "select" },
            ],

        },

        {
            hedaer: "Google Sheet config",
            items: [
                { id: "gsheet", label: "Config Object", type: "MultiLineText" },

            ],
        }
    ]

    const [config, setConfig] = useState({ semester: "Select", section: "Select" })
    const [gsheetForm, setGsheetForm] = useState(gsheet());
    const [data, setData] = useState({});
    const [updatedAt, setUpdatedAt] = useState(null);



    async function save() {
        try {

            const gSheetObjectForm = JSON.parse(gsheetForm)
            if (gSheetObjectForm) {
                await AsyncStorage.setItem('config', JSON.stringify({ ...config, gsheet: gSheetObjectForm }));
                Toast.show({
                    type: 'success',
                    text1: 'Configuration',
                    text2: 'Saved!',
                    visibilityTime: 1000
                });
            }


        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Configuration',
                text2: 'Save failed, JSON error!',
                visibilityTime: 2000
            });
        }
    }

    useEffect(() => {
        //getting saved sheet data
        async function getSheet() {
            let sheetData = await AsyncStorage.getItem("sheetData");
            if (sheetData) return (JSON.parse(sheetData));
            else return (false);
        }
        const fetchData = async () => {
            const theData = await getSheet();
            if (theData) {

                setData(theData);
                setUpdatedAt(new Date(theData.updated))
            }
        };

        fetchData();

        //setting saved config
        async function configSetter() {
            let config = await AsyncStorage.getItem("config");
            if (config) {
                const configFromStorage = JSON.parse(config)
                setConfig({ semester: configFromStorage.semester, section: configFromStorage.section })
                setGsheetForm(JSON.stringify(configFromStorage.gsheet))
            }
        }
        configSetter();


    }, [])

    useEffect(() => {
        //console.log(data.data)
    }, [data])
    return (
        <View style={s.container}>
            <View style={s.titleCont}>
                <View>
                    <Text style={s.title}>Configuration</Text>
                    <Text style={s.subTitle}>Update your configuration here.</Text>
                </View>

                <View>

                    <Text style={s.save} onPress={() => save()}>Save</Text>
                </View>
            </View>

            {sections.map((section, key) => <View key={key}>
                <Text style={s.sectionHeader}>{section.hedaer}</Text>
                <View style={s.inputWraper}>
                    {section.items.map((input, keyOfInput) =>

                        <View key={keyOfInput} style={section.items[0].id == "gsheet" ? s.inputContObject : s.inputCont} >
                            <Text >{input.label}</Text>

                            {input.id != "gsheet" && <View style={s.inputShowRight}>

                                <SelectInput
                                    value={config[input.id]}
                                    list={data ? data : null}
                                    id={input.id}
                                    config={{ config, setConfig }}

                                />

                            </View>}

                            {input.id == "gsheet" && <TextInput
                                value={gsheetForm}

                                onChangeText={text => setGsheetForm(text)}
                                multiline={true}
                                style={{ height: 250 }}
                            />}


                        </View>)}


                </View>
            </View>)
            }
            {
                updatedAt &&


                <View style={s.updated}>
                    <Text>
                        Sheet updated {formatDistance(updatedAt, new Date())} ago.
                    </Text>
                </View>
            }
            <View style={s.updated}>
                <Text style={{ textDecorationLine: "underline" }} onPress={() => Linking.openURL("tg://resolve?domain=sheet_routine")}>
                    Join our telegram channel for updates, bug report or feature request.
                </Text>
            </View>
        </View >
    );
}
const s = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingBottom: 150,

    },
    title: {
        fontSize: 32,
        color: "white",
    },
    titleCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",

    },
    save: {
        color: "white",
        borderColor: "white",
        borderWidth: 0.5,
        padding: 5,
        borderRadius: 7
    },
    sectionHeader: {
        textAlign: "center",
        fontSize: 20,
        color: "white",
        paddingVertical: 10
    },
    subTitle: {
        fontSize: 16,
        color: "gray",

    },
    inputCont: {
        backgroundColor: "gray",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"


    },
    inputContObject: {
        backgroundColor: "gray",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,




    },
    inputWraper: {
        gap: 5,
    },
    inputShowRight: {
        flexDirection: "row",
        alignItems: "center",

    },
    dropdown: {
        color: 'black',
    },
    updated: {
        backgroundColor: "gray",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10
    }
})
export default index;