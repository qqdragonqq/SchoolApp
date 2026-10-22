import * as SQLite from "expo-sqlite"

let db: SQLite.SQLiteDatabase | null=null

export async function initTimetableDb(){
    db=await SQLite.openDatabaseAsync("timetable.db")
    db.execAsync(`
        CREATE TABLE IF NOT EXIST timetable (
            id TEXT PRIMARY KEY NOT NULL
            lessonName TEXT NOT NULL
        )`) //day is monday==1, tuesday==2 etc...
            //if lesson 1 is on monday, tuesday, friday,
            //the day in data base will be "125"
}

function getDb(): SQLite.SQLiteDatabase{
    if (!db) throw new Error("Database not initialised. Call initDb() first")
    return db
}

export type lesson={ //the one in code
    id: string,
    name: string,
}

type lessonRow={    //the one in database
    id: string,
    name: string,
}

function toLesson(row: lessonRow): lesson{
    return{
        id: row.id,
        name: row.name,
    }
}

export async function getTimetable(): Promise<lesson[]>{
    const rows= await getDb().getAllAsync<lessonRow>(`SELECT * FROM timetable`)
    return rows.map(toLesson)
}

export async function addLesson(lesson: lesson){
    getDb().runAsync(`
        INSERT INTO timetable (id, name) VALUES (?, ?)
        `,
    [lesson.id, lesson.name])
}

export async function addMakeup(lesson: lesson) {
    getDb().runAsync(`
        INSERT INTO timetable (id, name) VALUES (?, ?)
        `,
    [lesson.id, lesson.name])
}