import * as XLSX from 'xlsx';
import AsyncStorage from '@react-native-async-storage/async-storage';

import gsheet from "./gsheet"
import Toast from 'react-native-toast-message';

export default async function readExcelFromUrl() {

    let config;
    let configg = await AsyncStorage.getItem("config");
    if (!configg) config = JSON.parse(gsheet())
    else config = (JSON.parse(configg)).gsheet;

    const timeRow = config.timeRow;
    const timeColumn = config.timeColumn;
    const sectionColumn = config.sectionColumn;
    const semesterColumn = config.semesterColumn;
    var urlTemp = config.url;
    var urlID = null;
    urlTemp = urlTemp.split("/");
    for (var i = 0; i < urlTemp.length; i++) {
        if (urlTemp[i] == "d") { urlID = urlTemp[i + 1]; break; }
    }

    if (!urlID) { alert("Invalid URL provided"); }
    let times = [];
    let data = [];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
    try {
        // Fetch the file from the URL
        const response = await fetch("https://docs.google.com/spreadsheets/u/0/d/" + urlID + "/export?format=xlsx");

        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }

        // Read the file as an ArrayBuffer
        const arrayBuffer = await response.arrayBuffer();

        Toast.show({ type: 'success', text1: 'Downloaded, Now processing the data...!', visibilityTime: 1500 });
        // Parse the ArrayBuffer into a workbook object
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });


        // console.log(workbook.SheetNames);
        days.forEach((day) => {
            const worksheet = workbook.Sheets[day];

            // Check for merged cells
            const merges = worksheet['!merges'];
            let merged = {};
            merges.forEach((v, k) => {
                if (v.s.c != v.e.c) {
                    if (!(v.s.r in merged)) merged[v.s.r] = {};
                    merged[v.s.r][v.s.c] = Math.abs(v.s.c - v.e.c) + 1;
                }
            })
            // console.log(merged);

            // Process the sheet data 
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: null, header: 1 });
            //console.log('Sheet Data:', jsonData);
            // getting timespans
            if (times.length == 0) {
                jsonData[timeRow].forEach((data, key) => { if (key >= timeColumn) times.push(data); });
            }

            let sems = {};
            let lastSemester = null;

            // traversing into rows
            jsonData.some((row, rk) => {
                //traversing into cols
                if (rk > timeRow) {
                    if (row[sectionColumn] == null) return true;
                    let newSemesterSarting = true;
                    let sec = {};
                    let sub = [];
                    row.forEach((col, ck) => {
                        if (ck == semesterColumn && col == null) newSemesterSarting = false;
                        if (ck >= timeColumn) {
                            let temp = [col];
                            temp.push((merged[rk] && (ck in merged[rk])) ? merged[rk][ck] : 1);
                            sub.push(temp);
                        }
                    })
                    sec[row[sectionColumn]] = sub;
                    if (newSemesterSarting) {
                        lastSemester = row[semesterColumn];
                        sems[lastSemester] = sec;
                    }
                    else {
                        sems[lastSemester] = { ...sems[lastSemester], ...sec }
                    }

                }
            })
            data.push(sems);
        })
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets["Information"], { defval: null, header: 1 });
        //console.log(jsonData);
        let teacherStarted = false;
        let teachers = {};
        jsonData.every(r => {
            if (teacherStarted) {
                if (r[0] == null) return false;
                teachers = { ...teachers, [r[0].trim()]: r[1].trim() }
            }
            if (r[0] == "Teacher's Initial") teacherStarted = true;
            return true;
        })

        const output = { data, times, days, teachers, "updated": (new Date()).getTime() };
        return output;

    } catch (error) {
        console.error('Error reading Excel file:', error);
    }
}
/*
data is like:

[
    { //sunday start
        "1st": 
        {
            "A": [[null,1], ["abc",1], [null,1], ["cde",2]],
            "B": [[null,1], ["abc",1], [null,1], ["cde",2]]
        },
        
        "2nd": 
        {
            "A": [[null,1], ["abc",1], [null,1], ["cde",2]]
        }
        
        
    },
    { //monday start
        "1st": 
        {
            "A": [[null,1], ["abc",1], [null,1], ["cde",2]],
            "B": [[null,1], ["abc",1], [null,1], ["cde",2]]
        },
        
        "2nd": 
        {
            "A": [[null,1], ["abc",1], [null,1], ["cde",2]]
        }
        
        
    },
]


*/