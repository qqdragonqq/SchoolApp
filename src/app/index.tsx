import { globalStyle } from "@/style/globalStyle";
import { useState } from "react";
import { Button, Modal, Pressable, Text, TextInput, View } from "react-native";

type taskBoxProps={
  task: string,
  onPress: () => void
}
function TaskBox(props: taskBoxProps){
  return(
    <Pressable style={globalStyle.TaskBox}
    onPress={props.onPress}>
      <Text>{props.task}</Text>
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
  onChangeText: (task: string) => void,
  currentTask: string
}
function Overlay(props: overlayProps){

  const [inputTask, setInputTask]=useState("")

  function submitTask(){
    props.setVisibility()
    props.onChangeText(inputTask)
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
          <TextInput style={globalStyle.overlayInput}
          onChangeText={task => setInputTask(task)}
          onSubmitEditing={() => submitTask()}
          defaultValue={props.currentTask}
          multiline
          autoFocus
          ></TextInput>
          <Button title="Ok" onPress={() => submitTask()}></Button>
        </View>
      </View>
    </Modal>
  )
}


export default function Main() {

  const [visible, setVisibility]=useState(false)
  const [task, changeTask]=useState('')

  return (
    <View style={globalStyle.Background}>
      <TaskBox 
      task={task}
      onPress={() => setVisibility(true)}
      />
      <AddButton onPress={() => setVisibility(true)}/>
      <Overlay 
      visible={visible} 
      setVisibility={() => setVisibility(false)}
      onChangeText={changeTask}
      currentTask={task}
      />
    </View>
  );
}