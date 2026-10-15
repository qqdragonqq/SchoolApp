import { addTask, delDb, editTask, getAllTasks, getSpecTask, initDb, Task } from "@/database/database";
import { globalStyle } from "@/style/globalStyle";
import { useEffect, useState } from "react";
import { Button, FlatList, Modal, Pressable, Text, TextInput, View } from "react-native";

type taskBoxProps={
  input: Task,
  onPress: () => void
}
function TaskBox(props: taskBoxProps){
  return(
    <Pressable style={globalStyle.TaskBox}
    onPress={props.onPress}>
      <Text style={globalStyle.TaskBoxTitle}>{props.input.title}</Text>
      <Text style={globalStyle.TaskBoxDetails}>{props.input.details}</Text>
    </Pressable>
  )
}


function AddButton(props: {onPress: () => void}){
  return(
    <Pressable style = {globalStyle.AddButton} 
    onPress={() => props.onPress()}>
      <Text style = {globalStyle.AddbuttonText}>+</Text>
    </Pressable>
  )
}



type overlayProps={
  visible: boolean, 
  setVisibility: () => void,
  currentTask: Task,
  onSubmit: (task: Task) => void
}
function Overlay(props: overlayProps){

  const [currentTask, changeCurrentTask]=useState(props.currentTask)

  useEffect(() => {//when visibility change, if visible, changeCurrentTask to the one ur in
    if (props.visible) {
      changeCurrentTask(props.currentTask)//wo this currentTask is stuck in previous one u entered cause its not re-rendered
    }
  }, [props.visible, props.currentTask])

  function submitTask(task: Task){
    props.setVisibility()
    props.onSubmit(task)
  }

  return(
    <Modal
    visible={props.visible}
    transparent
    onRequestClose={() => props.setVisibility()}
    >
      <View style={globalStyle.overlayDarkBg}>
        <View style={globalStyle.overlay}>
          <Pressable style={globalStyle.xBtn}
          onPress={() => props.setVisibility()}>
            <Text style={globalStyle.xText}>X</Text>
          </Pressable>
          <TextInput style={globalStyle.overlayTitleInput}
          onChangeText={title => changeCurrentTask(prev => ({...prev, title: title}))}
          value={currentTask.title}
          autoFocus
          placeholder="Title"
          ></TextInput>
          <TextInput style={globalStyle.overlayDetailInput}
          placeholder="Details"
          onChangeText={details => changeCurrentTask(prev => ({...prev, details: details}))}
          value={currentTask.details ? currentTask.details : ""}
          ></TextInput>
          <Button title="Ok" onPress={() => submitTask(currentTask)}></Button>
        </View>
      </View>
    </Modal>
  )
}




export default function Main() {


  const refresh=async () => await selectAllTasks(await getAllTasks())
  const emptyTask={
    id: "",
    title: "",
    details: "",
    dueDate: "",
    done: false,
  }

  const [visible, setVisibility]=useState(false)
  const [taskSelected, setTaskSelec]=useState<Task>(emptyTask)
  const [allTasks, selectAllTasks]=useState<Task[]>([])


  useEffect(() => {
    async function setup() {
      await initDb()
      await refresh()
    }
    setup()
  }, [])

  return (
    <View style={globalStyle.Background}>
      <Button
      title="del db"
      onPress={async () => {
        await delDb()
        await initDb()
        await refresh()
      }}></Button>
      <Overlay 
        visible={visible} 
        setVisibility={() => setVisibility(false)}
        currentTask={taskSelected}
        onSubmit={async (input) => {
          if (taskSelected.id===""){
            await addTask(input.title, input.details)
            await refresh()
          }
          else{
            await editTask(input)
            await refresh()
          }
        }}
      />
      <FlatList
        data={allTasks}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (        
          <TaskBox 
            input={item.item}
            onPress={async () => {
              setVisibility(true)
              const task=await getSpecTask(item.item.id)
              if (!task){
                throw new Error("Task not found")
              }
              setTaskSelec(task)
            }}
            />
        )
        }>
      </FlatList>
      <AddButton onPress={() => {
        setVisibility(true)
        setTaskSelec(emptyTask)
        }}/>
    </View>
  );
}