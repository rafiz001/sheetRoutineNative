
import { router, Slot, usePathname, useRouter } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Button, useColorScheme, StatusBar } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import readExcelFromUrl from '../lib/fetchFromSheet';
import { RefreshControl } from 'react-native-web-refresh-control'
export default function App() {
    const pathname = usePathname();
    const getButtonStyle = (path) => {
        return pathname === path ? "cyan" : "white";
    };
    const [refreshing, setRefreshing] = useState(false);
    const routerr = useRouter();
    async function setSheet() {

        setRefreshing(true);
        let sheetData = await readExcelFromUrl();
        try {
            await AsyncStorage.setItem('sheetData', JSON.stringify(sheetData));

            Toast.show({ type: 'success', text1: 'Sync Done', visibilityTime: 1000 });
        } catch (error) {
            console.log('Error saving data:', error);
        }
        setRefreshing(false);
        routerr.replace(pathname);
    }

    return (<  >
        <StatusBar barStyle="darkContent" backgroundColor={"#000000"} />
        {/* <View style={{ height: Constants.statusBarHeight }} ></View> */}
        <View style={styles.bg} >
            <ScrollView

                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={setSheet}
                        colors={['#00ffff']} // Android-specific colors
                        tintColor="#00ffff" // iOS-specific color
                        progressBackgroundColor="#444456"
                    />
                }
            >

                <Slot />
            </ScrollView>
        </View>

        <View style={styles.cont} >
            <View style={styles.nav}>
                <TouchableOpacity onPress={() => router.replace('/')}>
                    <View style={styles.iconCont}>
                        <Ionicons name="home-outline" size={24} color={getButtonStyle('/')} />
                        <Text style={{ color: getButtonStyle('/') }}>Home</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSheet()}>
                    <View style={styles.iconCont}>
                        <Ionicons name="refresh" size={24} color={getButtonStyle('/full')} />
                        <Text style={{ color: getButtonStyle('/full') }}>Sync</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.replace('/config')}>
                    <View style={styles.iconCont}>
                        <Ionicons name="cog-outline" size={24} color={getButtonStyle('/config')} />
                        <Text style={{ color: getButtonStyle('/config') }}>Config</Text>
                    </View>
                </TouchableOpacity>


            </View>
        </View>
        <Toast />
    </>);
}

const styles = StyleSheet.create({
    bg: {
        height: "100%",
        backgroundColor: "#000000",

    },
    cont: {
        width: "100%",
        position: "absolute",
        bottom: 20,
        left: 0,
        flexDirection: "row",
        justifyContent: "center",

    },
    iconCont: {
        justifyContent: "center",
        alignItems: "center",
    },
    nav: {
        width: "70%",
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#444456",
        borderRadius: 15,
        padding: 5,


    }
});
