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
  onChangeText: (task: string) => void
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
          <TextInput
          onChangeText={task => setInputTask(task)}
          onSubmitEditing={() => submitTask()}
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
      />
    </View>
  );
}