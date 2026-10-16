import { Tabs } from "expo-router";

export default function DashLayout(){
    return(
        <Tabs>
            <Tabs.Screen 
            name="index"
            options={{title: "To Do List"}}
            />
            <Tabs.Screen 
            name="timetable"
            options={{title: "Timetable"}}
            />
        </Tabs>
    )
}