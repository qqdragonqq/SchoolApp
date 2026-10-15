import * as SQLite from "expo-sqlite"

export type Task={
    id: string,
    title: string,
    details: string | null,
    dueDate: string | null,
    done: boolean
}

type TaskRow={  //this is the one that is going to be stored in database
    id: string,
    title: string,
    details: string,
    dueDate: string,
    done: number
}

let db: SQLite.SQLiteDatabase | null=null

export async function initDb(): Promise<void> {
  db = await SQLite.openDatabaseAsync('todos.db');
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      details TEXT,
      done INTEGER NOT NULL DEFAULT 0,
      dueDate TEXT
    );
  `);
}

export async function delDb(): Promise<void> {
    db=await SQLite.openDatabaseAsync("todos.db")
    await db.execAsync(`
        DROP TABLE IF EXISTS tasks
        `)
}

function getDb(): SQLite.SQLiteDatabase{
    if (!db) throw new Error("Database not initialised. Call initDb() first")
    return db
}

// Convert a raw database row into a clean Task object
function toTask(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    done: row.done === 1,
    details: row.details,
    dueDate: row.dueDate,
  };
}

export async function addTask(title: string, details: string | null=null, dueDate: string | null=null){
    const id=Date.now().toString()
    await getDb().runAsync(
        `INSERT INTO tasks (id, title, details, done, dueDate) VALUES (?, ?, ?, 0, ?)`,
        [id, title, details, dueDate]
    )
    return id
}

export async function getAllTasks(): Promise<Task[]>{
    const rows=await getDb().getAllAsync<TaskRow>(
        "SELECT * FROM tasks"
    )
    return rows.map(toTask)
}

export async function getSpecTask(id: string): Promise<Task | null>{
    const row=await getDb().getFirstAsync<TaskRow>(
        "SELECT * FROM tasks WHERE id = ?",
        [id]
    )
    return row ? toTask(row) : null
}

export async function editTask(task: Task): Promise<void> {
    await getDb().runAsync(`
        UPDATE tasks SET title = ?, details = ?, dueDate = ? WHERE id = ?`,
    [task.title, task.details, task.dueDate, task.id])
}