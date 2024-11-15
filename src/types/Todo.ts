// 自動生成された型定義をインポート
import { ListTodosQuery } from '../API';

// Categoryの型定義
export type Category = 'Inbox' | 'WaitingFor' | 'Project' | 'NextAction' | 'Calendar';

// TodoItemの型
export type Todo = {
  id: string;
  content: string;
  done: boolean;
  category: Category;
  projectName?: string | null;
  waitingFor?: string | null;
  dueDate?: string | null;
  owner?: string | null;
};

// 新規作成時の部分的なTodo型
export type PartialTodo = {
  content: string;
  category?: Category;
  projectName?: string;
  waitingFor?: string;
  dueDate?: string;
  done?: boolean;  
};

// GraphQLのレスポンスからTodoの型に変換するヘルパー関数
export const convertGraphQLTodo = (item: NonNullable<ListTodosQuery['listTodos']>['items'][0]): Todo => {
  if (!item) throw new Error('Invalid todo item');
  
  return {
    id: item.id,
    content: item.content,
    done: item.done,
    category: item.category as Category,
    projectName: item.projectName || null,
    waitingFor: item.waitingFor || null,
    dueDate: item.dueDate || null,
    owner: item.owner || null
  };
};