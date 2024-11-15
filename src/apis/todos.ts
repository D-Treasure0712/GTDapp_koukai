import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLQuery, GraphQLSubscription } from '@aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';
import { Todo, PartialTodo } from '../types/Todo';
import { 
  CreateTodoMutation, 
  DeleteTodoMutation, 
  ListTodosQuery, 
  OnCreateTodoSubscription, 
  UpdateTodoMutation 
} from '../API';

// 全TODOリスト取得
export const getAllTodosData = async (): Promise<Todo[]> => {
  try {
    const response = await API.graphql<GraphQLQuery<ListTodosQuery>>(
      graphqlOperation(queries.listTodos)
    );
    return (response.data?.listTodos?.items.filter(item => item !== null) as Todo[]) || [];
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
};

// 1件のTODOを追加
export const addTodoData = async (todo: PartialTodo): Promise<Todo> => {
  try {
    const response = await API.graphql<GraphQLQuery<CreateTodoMutation>>(
      graphqlOperation(mutations.createTodo, { 
        input: {
          content: todo.content,
          category: todo.category || 'Inbox',
          done: false,
          projectName: todo.projectName,
          waitingFor: todo.waitingFor,
          dueDate: todo.dueDate
        } 
      })
    );
    if (!response.data?.createTodo) {
      throw new Error('Failed to create todo');
    }
    return response.data.createTodo as Todo;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

// 1件のTODOを削除
export const deleteTodoData = async (id: string): Promise<string> => {
  try {
    await API.graphql<GraphQLQuery<DeleteTodoMutation>>(
      graphqlOperation(mutations.deleteTodo, { input: { id } })
    );
    return id;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};

// 1件のTODOを更新
export const updateTodoData = async (id: string, todo: Partial<Todo>): Promise<Todo> => {
  try {
    const response = await API.graphql<GraphQLQuery<UpdateTodoMutation>>(
      graphqlOperation(mutations.updateTodo, { 
        input: {
          id,
          content: todo.content,
          done: todo.done,
          category: todo.category,
          projectName: todo.projectName,
          waitingFor: todo.waitingFor,
          dueDate: todo.dueDate
        }
      })
    );
    if (!response.data?.updateTodo) {
      throw new Error('Failed to update todo');
    }
    return response.data.updateTodo as Todo;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

// リアルタイム更新のサブスクリプション
export const subscribeToTodoUpdates = (callback: (todo: Todo) => void) => {
  return API.graphql<GraphQLSubscription<OnCreateTodoSubscription>>(
    graphqlOperation(subscriptions.onCreateTodo)
  ).subscribe({
    next: ({ value }) => {
      if (value.data?.onCreateTodo) {
        callback(value.data.onCreateTodo as Todo);
      }
    },
    error: (error) => console.error('Subscription error:', error),
  });
};