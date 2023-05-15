import React, { useRef, useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Button,
  SafeAreaView,
  Animated,
  Pressable,
  Alert,
  ListRenderItemInfo,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTodo } from "../Todo.context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../navigation/MainStackScreen";
import { Swipeable } from "react-native-gesture-handler";
import { Todo } from "../types";

function TodoListScreen() {
  const { todos, removeTodo, markAsDone } = useTodo();
  const pageSize = 10;
  const swipeableRefs: { [key: string]: Swipeable } = {};
  const [end, setEnd] = useState(pageSize);
  const [search, setSearch] = useState("");

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  function onAddTodoPress() {
    navigation.navigate("AddTodo");
  }

  function onRemovePress(id: number) {
    Alert.alert("Remove Todo", "Are you sure you want to remove this todo?", [
      {
        text: "Cancel",
        onPress: () => {
          swipeableRefs[id].close();
        },
      },
      { text: "Remove", onPress: () => removeTodo(id) },
    ]);
  }

  function renderRightActions(
    progress: ReturnType<Animated.Value["interpolate"]>,
    id: number
  ) {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [32, 0],
    });
    return (
      <Animated.View
        style={{
          transform: [{ translateX: trans }],
          backgroundColor: "red",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable
          style={{
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => onRemovePress(id)}
        >
          <Text style={{ color: "#FFFFFF" }}>Remove</Text>
        </Pressable>
      </Animated.View>
    );
  }

  function onEditPress(id: number) {
    navigation.navigate("EditTodo", { id });
  }

  function onEndReached() {
    if (end < todos.length) {
      setEnd(end + pageSize);
    }
  }

  function renderItem({ item }: ListRenderItemInfo<Todo>) {
    return (
      <Swipeable
        ref={(ref) => (swipeableRefs[item.id] = ref)}
        friction={2}
        renderRightActions={(progress) => renderRightActions(progress, item.id)}
        rightThreshold={40}
        overshootRight={false}
      >
        <Pressable
          style={styles.itemContainer}
          onPress={() => onEditPress(item.id)}
        >
          <View>
            <Text
              style={[styles.title, item.done ? styles.strikeThrough : null]}
            >
              {item.title}
            </Text>
            <Text style={item.done ? styles.strikeThrough : null}>
              {item.description}
            </Text>
          </View>
          <Button title="Mark as done" onPress={() => markAsDone(item.id)} />
        </Pressable>
      </Swipeable>
    );
  }

  const filteredTodos = search
    ? todos
        .slice(0, end)
        .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    : todos.slice(0, end);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Search"
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredTodos}
        keyExtractor={(i) => i.id.toString()}
        renderItem={renderItem}
        onEndReached={onEndReached}
      />
      <Button title="Add Todo" onPress={onAddTodoPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  searchInput: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    margin: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  strikeThrough: {
    textDecorationLine: "line-through",
  },
});

export default TodoListScreen;
