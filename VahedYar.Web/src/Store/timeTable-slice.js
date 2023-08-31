import { createSlice } from "@reduxjs/toolkit";
import { dayToPersian, generateTimeString } from '../feratures/helper/helper';

let presentations = JSON.parse(localStorage.getItem('presentations'));
let timeTables = JSON.parse(localStorage.getItem('timeTables'));

const initialState = {
    presentations,
    timeTables,
}
const timeTableSlice = createSlice({
    name: 'timeTable',
    initialState,
    reducers: {
        initiateTimeTables(state, action) {
            let timeTableModels = action.payload;
            let convertedTimetable = [];
            for (let timneTable of timeTableModels) {
                let newTimeTable = [];
                for (let presentation of timneTable) {
                    let ConvertDayTime = []
                    presentation.dayTimes.map(day => ConvertDayTime.push(
                        {
                            dayOfWeek: day.dayOfWeek,
                            startTime: generateTimeString(day.startTime),
                            endTime: generateTimeString(day.endTime)
                        }
                    ));
                    let dayIds = [];
                    presentation.dayTimes.map(day => dayIds.push(day.dayOfWeek));
                    newTimeTable.push(
                        {
                            ...presentation,
                            ConvertDayTime,
                            dayIds
                        }
                    );
                }
                convertedTimetable.push(newTimeTable);
            }
            state.timeTables = convertedTimetable;
            localStorage.setItem('timeTables', JSON.stringify(state.timeTables));
        },
        clearTimeTablse(state, action) {
            state.timeTables = [];
            localStorage.setItem('timeTables', JSON.stringify(state.timeTables));
        },
        likeHandler(state, action) {

        },
    }
});

export const timeTableActions = timeTableSlice.actions;
export default timeTableSlice;