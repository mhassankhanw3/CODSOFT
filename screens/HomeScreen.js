import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  StatusBar,
  Modal,
  StyleSheet,
  Pressable,
  Image,
  Button,
} from 'react-native';
import IconLink from 'react-native-vector-icons/Ionicons';
import IconFea from 'react-native-vector-icons/Feather';
import LottieView from 'lottie-react-native';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {removeItem} from '../utils/asyncStorage';

const transparent = 'rgba(0,0,0,0.5)';
export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  const navigation = useNavigation();

  const toggleAddingTask = () => {
    setIsAddingTask(!isAddingTask);
  };

  const editTask = index => {
    setEditedTask(tasks[index]);
    setNewTaskTitle(tasks[index].title);
    setNewTaskDesc(tasks[index].description);
    setDate(new Date(tasks[index].date));
    setModalVisible(true);
  };

  const addTask = () => {
    if (newTaskTitle) {
      const newTask = {
        title: newTaskTitle,
        description: newTaskDesc,
        isCompleted: false,
        date: date.toDateString(),
      };

      if (editedTask) {
        // If in edit mode, find the task and replace it
        setTasks(tasks.map(task => (task === editedTask ? newTask : task))); // Close map() properly
      } else {
        // If not in edit mode, add a new task
        setTasks([...tasks, newTask]);
      }

      setEditedTask(null); // Reset edit mode
      setModalVisible(false);
      setNewTaskTitle('');
      setNewTaskDesc('');
      toggleAddingTask();

      // Save the updated tasks to AsyncStorage
      saveTasks([...tasks, newTask]);
    }
  };

  const removeTask = index => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);

    // Save the updated tasks to AsyncStorage
    saveTasks(updatedTasks);
  };

  const saveTasks = async tasks => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      console.log('Tasks saved successfully.');
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks !== null) {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    console.log(tasks, 'tasks');
  }, [tasks]);

  const toggleComplete = index => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
    setTasks(updatedTasks);
  };
  const handleReset = async () => {
    await removeItem('onboarded');
    navigation.navigate('OnBoarding');
  };
  return (
    <View className={`flex-1 bg-orange-100 p-4`}>
      <StatusBar
        backgroundColor={`${modalVisible ? transparent : '#ffedd5'}`}
        barStyle="dark-content"
      />
      <Text className="text-orange-500 text-3xl mt-4 ml-2 font-extrabold">
        DailyDocket
      </Text>
      <Text className="text-gray-700 text-2xl ml-4 mt-2 font-bold mb-4">
        Welcome, 👋
      </Text>
      {/* <TouchableOpacity onPress={handleReset}>
        <Text>Reset</Text>
      </TouchableOpacity> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        backdropStyle={styles.backdrop}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View className="max-w-full w-full absolute bottom-0 h-[80%] mx-auto bg-orange-300 py-6 px-4 rounded-t-[30px] shadow-2xl shadow-gray-800 backdrop-blur-xl">
            <View className="flex flex-row items-center justify-between max-w-full">
              <Text className="text-white text-[18px] font-medium">
                Add your Daily Tasks 📝
              </Text>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <IconLink name={'close'} size={30} color="white" />
              </Pressable>
            </View>
            <View className="mb-4 mt-10">
              <TextInput
                value={newTaskTitle}
                onChangeText={text => setNewTaskTitle(text)}
                placeholder="Add a task title"
                placeholderTextColor="#9ca3af"
                className="w-full py-3 px-4 bg-orange-50 rounded-xl mb-2 text-[16px] "
              />
              <View className="bg-orange-50 rounded-xl px-2 mb-2 h-28 w-full ">
                <TextInput
                  value={newTaskDesc}
                  onChangeText={text => setNewTaskDesc(text)}
                  placeholder="Add a task description (optional)"
                  placeholderTextColor="#9ca3af"
                  multiline={true}
                  className="w-full bg-orange-50 rounded-xl text-[16px]"
                />
              </View>
              <View className="mx-auto w-full rounded-2xl p-1">
                <Button
                  color={'#fb923c'}
                  title="Pick your due date"
                  onPress={() => setOpen(true)}
                />
              </View>
              <DatePicker
                minimumDate={new Date()}
                modal
                mode={'date'}
                open={open}
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
              {/* <DatePicker date={date} onDateChange={setDate} /> */}
              <TouchableOpacity
                onPress={addTask}
                className="bg-[#f97316] px-2 py-3 mt-2 rounded-xl shadow-xl shadow-gray-600 items-center">
                <Text className="text-white text-lg">
                  {editedTask ? 'Save Task' : 'Add Task'}
                </Text>
              </TouchableOpacity>
            </View>
            <View className="w-full mx-auto h-[62%] flex items-center justify-center">
              <TouchableOpacity
                //   onPress={toggleAddingTask}
                onPress={() => setModalVisible(false)}
                className="bg-[#f97316] rotate-45 shadow-2xl shadow-gray-700 mx-auto w-14 h-14 flex justify-center p-2 rounded-full items-center">
                <IconFea name="plus" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <FlatList
        className="mt-10"
        data={tasks}
        ListEmptyComponent={
          <View>
            <Image
              className="h-52 w-52 mx-auto mt-10"
              source={require('../assets/images/todolisthome.png')}
            />
            <Text className="text-center text-[16px] leading-6 w-[60%] mx-auto">
              You haven't added any Tasks yet!{' '}
              <Text className="text-black">📝</Text>
            </Text>
          </View>
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View className="mb-2">
            <TouchableOpacity
              onPress={() => toggleComplete(index)}
              activeOpacity={0.7}
              className={`${
                item.isCompleted ? 'bg-orange-200' : 'bg-orange-300'
              } rounded-xl px-4 pt-2 pb-4 `}>
              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-start w-[80%]">
                  {item.isCompleted && (
                    <TouchableOpacity
                      className={` ${'bg-orange-500'} rounded-full p-[2px] mt-1`}>
                      <IconLink
                        name={'checkmark'}
                        size={14}
                        color={`${item.isCompleted ? 'white' : 'white'}`}
                      />
                    </TouchableOpacity>
                  )}
                  {/* ${
                        item.isCompleted ? 'line-through' : ''
                      } */}
                  <View className="flex-1 ml-2">
                    <Text
                      className={`text-white text-xl font-medium ${
                        item.isCompleted ? 'line-through' : ''
                      } `}>
                      {item.title}
                    </Text>
                    {item.description && (
                      <Text
                        className={`text-gray-50 text-sm ${
                          item.isCompleted ? 'line-through' : ''
                        }`}>
                        {item.description}
                      </Text>
                    )}
                  </View>
                </View>
                <View className="flex flex-row items-center gap-1">
                  <TouchableOpacity onPress={() => editTask(index)}>
                    <IconLink name="create-outline" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeTask(index)}>
                    <IconLink name="trash" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
            <View
              className={`flex flex-row mx-2 items-center ${
                item.isCompleted ? 'justify-center' : 'justify-between'
              } `}>
              {item.isCompleted ? (
                <View className="flex flex-row pt-1 items-center justify-start mx-auto w-full gap-1">
                  <View className="w-6 rounded-xl h-[2px] bg-gray-400"></View>
                  <View className={` ${'bg-green-700'} rounded-full p-[2px]`}>
                    <IconLink
                      name={'checkmark'}
                      size={14}
                      color={`${item.isCompleted ? 'white' : 'white'}`}
                    />
                  </View>
                  <Text className="text-green-700 font-medium text-[16px]">
                    Task Completed!
                  </Text>
                </View>
              ) : (
                <View className="flex flex-row items-center justify-between w-full">
                  <Text
                    className={`${
                      item.isCompleted ? 'line-through text-orange-300' : ''
                    }`}>
                    Due date:
                  </Text>
                  <Text
                    className={`text-orange-500 font-medium text-[14px] ${
                      item.isCompleted ? 'line-through text-orange-300' : ''
                    }`}>
                    {item?.date}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
      />
      <View className="w-full mx-auto flex items-center justify-center">
        <TouchableOpacity
          //   onPress={toggleAddingTask}
          onPress={() => setModalVisible(true)}
          className="bg-[#f97316] shadow-2xl shadow-gray-700 mx-auto w-14 h-14 flex justify-center p-2 rounded-full items-center">
          <IconFea name="plus" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: transparent,
  },
  buttonContainer: {
    padding: 10, // Customize padding here
    borderRadius: 4, // Customize border radius here
    backgroundColor: 'black', // Customize the container background color here
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  textArea: {
    height: 150,
    justifyContent: 'flex-start',
  },
  buttonTwo: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

{
  /* {isAddingTask && (
        <View className="mb-4">
          <TextInput
            value={newTaskTitle}
            onChangeText={text => setNewTaskTitle(text)}
            placeholder="Add a task title"
            placeholderTextColor="gray"
            className="w-full py-2 px-4 bg-orange-50 rounded-lg mb-2 text-[16px] "
          />
          <TextInput
            value={newTaskDesc}
            onChangeText={text => setNewTaskDesc(text)}
            placeholder="Add a task description (optional)"
            placeholderTextColor="gray"
            className="w-full py-2 px-4 bg-orange-50 rounded-lg mb-2 text-[16px]"
          />
          <TouchableOpacity
            onPress={addTask}
            className="bg-[#f97316] px-2 py-3 mt-2 rounded-xl shadow-xl shadow-gray-600 items-center">
            <Text className="text-white text-lg">Add Task</Text>
          </TouchableOpacity>
        </View>
      )} */
}
