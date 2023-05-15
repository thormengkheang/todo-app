import React from "react";
import { useTodo } from "../Todo.context";
import { useNavigation } from "@react-navigation/native";
import Form from "../components/Form";
import { Todo } from "../types";

function AddTodoScreen() {
  const navigation = useNavigation();
  const { addTodo } = useTodo();

  function onSubmit(newTodo: Todo) {
    addTodo(newTodo);
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return <Form submitLabel="Add Todo" onSubmit={onSubmit} />;
}

export default AddTodoScreen;
