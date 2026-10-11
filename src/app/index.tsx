import { globalStyle } from "@/style/globalStyle";
import { useEffect, useState } from "react";
import { Button, FlatList, Modal, Pressable, Text, TextInput, View } from "react-native";

type taskBoxProps={
  input: task,
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



type task={
  title: string,
  details: string,
  dueDate: string
}
type overlayProps={
  visible: boolean, 
  setVisibility: () => void,
  currentTask: task,
  onSubmit: (task: task) => void
}
function Overlay(props: overlayProps){

  const [currentTask, changeCurrentTask]=useState(props.currentTask)

  useEffect(() => {
    if (props.visible) {
      changeCurrentTask(props.currentTask)
    }
  }, [props.visible, props.currentTask])

  function submitTask(task: task){
    props.setVisibility()
    props.onSubmit(task)
  }

  return(
    <Modal
    visible={props.visible}
    transparent
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
          value={currentTask.details}
          ></TextInput>
          <Button title="Ok" onPress={() => submitTask(currentTask)}></Button>
        </View>
      </View>
    </Modal>
  )
}




export default function Main() {

  const emptyTaskDetails={
    id: "",
    title: "",
    details: "",
    dueDate: ""
  }

  const [visible, setVisibility]=useState(false)
  const [taskSelected, setTaskSelec]=useState(emptyTaskDetails)
  const [data, setData]=useState([
    { id: '1', title: 'Apples', details: "Buy it", dueDate:"" },
    { id: '2', title: 'Bananas', details: "Buy it", dueDate:"" },
    { id: '3', title: 'Cherries', details: "Buy it", dueDate: "" },
  ])

  return (
    <View style={globalStyle.Background}>
      <Overlay 
        visible={visible} 
        setVisibility={() => setVisibility(false)}
        currentTask={taskSelected}
        onSubmit={(input) => {
          if (taskSelected.id===""){
            setData(prev => [...prev, {id: Date.now().toString(), title: input.title, details: input.details, dueDate: input.dueDate}])
          }
          else{
            setData(prev => prev.map(data => data.id===taskSelected.id ? {...data, title: input.title, details: input.details} :data))
          }
        }}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (        
          <TaskBox 
            input={item.item}
            onPress={() => {
              setVisibility(true)
              setTaskSelec(prev => (
                {
                  ...prev,
                  id: item.item.id,
                  title: item.item.title,
                  details: item.item.details
                }
              ))
            }}
            />
        )
        }>
      </FlatList>
      <AddButton onPress={() => {
        setVisibility(true)
        setTaskSelec(emptyTaskDetails)
        }}/>
    </View>
  );
}