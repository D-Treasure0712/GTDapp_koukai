import React from "react";
import { TodoTitle } from "./TodoTitle";
import { TodoItem } from "./TodoItem";
import { Todo } from "../types/Todo";
import { Inbox, Clock, Folder, ArrowRight, Calendar, CheckCircle } from 'lucide-react';

type TodoListProps = {
  todoList: Todo[];
  toggleTodoListItemStatus: (id: string, status: boolean) => void;
  deleteTodoListItem: (id: string) => void;
  title: string;
  as: keyof JSX.IntrinsicElements;
  reenterWorkflow?: (todo: Todo) => void;
};

const getCategoryIcon = (title: string) => {
  switch (title) {
    case "インボックス":
      return <Inbox className="w-5 h-5 text-blue-400" />;
    case "保留リスト":
      return <Clock className="w-5 h-5 text-yellow-400" />;
    case "プロジェクト":
      return <Folder className="w-5 h-5 text-purple-400" />;
    case "次やること":
      return <ArrowRight className="w-5 h-5 text-green-400" />;
    case "カレンダー":
      return <Calendar className="w-5 h-5 text-red-400" />;
    case "完了済み":
      return <CheckCircle className="w-5 h-5 text-gray-400" />;
    default:
      return null;
  }
};

export const TodoList: React.FC<TodoListProps> = ({
  todoList,
  toggleTodoListItemStatus,
  deleteTodoListItem,
  title,
  as,
  reenterWorkflow,
}) => {
  return (
    <div className="flex-shrink-0 w-96 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          {getCategoryIcon(title)}
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <span className="ml-auto bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-sm">
            {todoList.length}
          </span>
        </div>
      </div>
      
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-4">
        {todoList.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">タスクがありません</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {todoList.map((todo) => (
              <li key={todo.id}>
                <TodoItem
                  todo={todo}
                  toggleTodoListItemStatus={toggleTodoListItemStatus}
                  deleteTodoListItem={deleteTodoListItem}
                  reenterWorkflow={reenterWorkflow}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <style>{`
        /* カスタムスクロールバー */
        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
        }

        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
};