// 必要なReactのフックと型、ユーティリティをインポート
import { useState, useEffect, useRef } from "react";
// ulidは時間順でソートされた一意のIDを生成するためのライブラリ
import { ulid } from "ulid";
// Todo関連のAPI操作をまとめたモジュールをインポート
import * as todoData from "../apis/todos";
// Todoの型定義をインポート
import { Todo, PartialTodo } from "../types/Todo";

// useTodoカスタムフックを定義
export const useTodo = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const recentlyAddedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    // 初期データの読み込み
    const fetchTodos = async () => {
      const todos = await todoData.getAllTodosData();
      setTodoList(todos.reverse());
    };

    fetchTodos();

    // リアルタイム更新のサブスクリプション設定
    const subscription = todoData.subscribeToTodoUpdates((newTodo) => {
      // 最近追加されたTodoの場合はスキップ
      if (recentlyAddedRef.current.has(newTodo.id)) {
        recentlyAddedRef.current.delete(newTodo.id);
        return;
      }
      setTodoList(prevList => [newTodo, ...prevList]);
    });

    // クリーンアップ
    return () => {
      subscription.unsubscribe();
      recentlyAddedRef.current.clear();
    };
  }, []);

  // タスクの更新
  const toggleTodoListItemStatus = async (id: string, done: boolean) => {
    try {
      const updatedTodo = await todoData.updateTodoData(id, { done: !done });
      setTodoList(prevList => 
        prevList.map(item => item.id === updatedTodo.id ? updatedTodo : item)
      );
    } catch (error) {
      console.error('Error toggling todo status:', error);
    }
  };

  // タスクの追加
  const addTodoListItem = async (partialTodo: PartialTodo) => {
    try {
      const newTodo = {
        id: ulid(),
        content: partialTodo.content,
        done: false,
        category: partialTodo.category || 'Inbox',
        projectName: partialTodo.projectName,
        waitingFor: partialTodo.waitingFor,
        dueDate: partialTodo.dueDate,
      };
  
      const addedTodo = await todoData.addTodoData(newTodo);
      recentlyAddedRef.current.add(addedTodo.id);
      setTodoList(prevList => [addedTodo, ...prevList]);
      // 一定時間後にIDを削除（クリーンアップ）
      setTimeout(() => {
        recentlyAddedRef.current.delete(addedTodo.id);
      }, 5000); // 5秒後に削除
      
      return addedTodo;
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  };

  const deleteTodoListItem = async (id: string) => {
    try {
      await todoData.deleteTodoData(id);
      setTodoList(prevList => prevList.filter(item => item.id !== id));
      return id;
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  };

  return { todoList, toggleTodoListItemStatus, addTodoListItem, deleteTodoListItem };
};