import { globalStyle } from "@/style/globalStyle";
import { useState } from "react";
import { Button, FlatList, Modal, Pressable, Text, TextInput, View } from "react-native";

type taskBoxProps={
  input: string,
  onPress: () => void
}
function TaskBox(props: taskBoxProps){
  return(
    <Pressable style={globalStyle.TaskBox}
    onPress={props.onPress}>
      <Text>{props.input}</Text>
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
  currentTask: string,
  onSubmit: (task: string) => void
}
function Overlay(props: overlayProps){

  const [inputTask, setInputTask]=useState("")

  function submitTask(task: string){
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
          <TextInput style={globalStyle.overlayInput}
          onChangeText={task => setInputTask(task)}
          defaultValue={props.currentTask}
          autoFocus
          ></TextInput>
          <Button title="Ok" onPress={() => submitTask(inputTask)}></Button>
        </View>
      </View>
    </Modal>
  )
}




export default function Main() {

  const [visible, setVisibility]=useState(false)
  const [taskSelected, setTaskSelec]=useState('')
  const [data, setData]=useState([
    { id: '1', title: 'Apples' },
    { id: '2', title: 'Bananas' },
    { id: '3', title: 'Cherries' },
  ])

  return (
    <View style={globalStyle.Background}>
      <Overlay 
        visible={visible} 
        setVisibility={() => setVisibility(false)}
        currentTask={taskSelected}
        onSubmit={(input) => {
          if (taskSelected===""){
            setData(prev => [...prev, {id: Date.now().toString(), title: input}])
          }
          else{
            setData(prev => prev.map(data => data.title===taskSelected ? {...data, title: input} :data))
          }
        }}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (        
          <TaskBox 
            input={item.item.title}
            onPress={() => {
              setVisibility(true)
              setTaskSelec(item.item.title)
            }}
            />
        )
        }>
      </FlatList>
      <AddButton onPress={() => {
        setVisibility(true)
        setTaskSelec("")
        }}/>
    </View>
  );
}