import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View, FlatList, Modal, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

function ModalInput(props) {
    const [isActive, setIsActive] = useState(false)
    const [semester, setSemester] = useState(["Sync plz"])
    const [section, setSection] = useState(["Sync plz"])

    function updateConfig(id, value) {
        if (value) props.config.setConfig({ ...props.config.config, [id]: value });
        setIsActive(false);
    }


    useEffect(() => {
        const sem = props.config.config.semester;
        props.list.data && props.list.data[0][sem] && setSection(Object.keys(props.list.data[0][sem]));
    }, [props.config.config.semester])

    useEffect(() => {

        props.list.data && setSemester(Object.keys(props.list.data[0]));
    }, [props.list])
    return (<View>
        <TouchableWithoutFeedback onPress={() => setIsActive(true)} >
            <View style={styles.flexRow}>
                <Text style={{ color: "black" }} >{props.value ? props.value : ""}</Text>
                <Ionicons name="chevron-forward" size={24} color="black" />
            </View>
        </TouchableWithoutFeedback>
        {isActive &&

            <Modal visible={isActive} transparent>
                <View style={styles.wraper}>
                    <View style={styles.cont}>

                        <FlatList
                            data={props.id === "semester" ? semester : section}
                            renderItem={({ item }) =>

                                <Text style={styles.whiter} onPress={() => updateConfig(props.id, item == "Sync plz" ? null : item)}>{item}</Text>



                            }
                            ItemSeparatorComponent={() => <View style={{ paddingVertical: 10 }} />}
                        />

                    </View>
                </View>
            </Modal>


        }

    </View>



    );
}
const styles = StyleSheet.create({
    cont:
    {


        alignContent: "center",
        justifyContent: "center",
        width: "70%",
        height: "70%"

    },
    wraper:
    {
        flex: 1,
        backgroundColor: "#000000ca",
        justifyContent: "center",
        alignItems: "center",
    },
    flexRow:
    {

        flexDirection: "row",
        alignItems: "center",
        cursor: "pointer"
    },
    whiter:
    {
        color: "white",
        backgroundColor: "gray",
        textAlign: "center",
        padding: 10,
        borderRadius: 7

    }
})

export default ModalInput;