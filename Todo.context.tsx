import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Todo } from "./types";

export const LOCAL_STORAGE_KEY = "todo";

interface State {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  removeTodo: (id: number) => void;
  markAsDone: (id: number) => void;
}

const initialState = {
  todos: [],
  addTodo: () => {},
  updateTodo: () => {},
  removeTodo: () => {},
  markAsDone: () => {},
};

const TodoContext = createContext<State>(initialState);

export function TodoProvider({ children }: PropsWithChildren<{}>) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getTodo() {
      const localTodos = await AsyncStorage.getItem(LOCAL_STORAGE_KEY);
      setTodos(JSON.parse(localTodos) || []);
    }
    getTodo();
  }, []);

  function addTodo(todo: Todo) {
    const updatedTodos = [...todos, todo];
    AsyncStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos)).then(
      () => {
        setTodos(updatedTodos);
      }
    );
  }

  function removeTodo(id: number) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    AsyncStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos)).then(
      () => {
        setTodos(updatedTodos);
      }
    );
  }

  function updateTodo(todo: Todo) {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...todo };
      }
      return t;
    });
    AsyncStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos)).then(
      () => {
        setTodos(updatedTodos);
      }
    );
  }

  function markAsDone(id: number) {
    const updatedTodos = todos.map((t) => {
      if (t.id === id) {
        return { ...t, done: true };
      }
      return t;
    });
    AsyncStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos)).then(
      () => {
        setTodos(updatedTodos);
      }
    );
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        updateTodo,
        removeTodo,
        markAsDone,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export const useTodo = () => useContext(TodoContext);
