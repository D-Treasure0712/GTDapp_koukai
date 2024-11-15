import React from "react";
import { Todo } from "../types/Todo";
import { CheckCircle, Trash2, RefreshCw, Calendar } from 'lucide-react';

type TodoItemProps = {
  todo: Todo;
  toggleTodoListItemStatus: (id: string, done: boolean) => void;
  deleteTodoListItem: (id: string) => void;
  reenterWorkflow?: (todo: Todo) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleTodoListItemStatus,
  deleteTodoListItem,
  reenterWorkflow,
}) => {
  const handleToggle = () => toggleTodoListItemStatus(todo.id, todo.done);
  const handleDelete = () => deleteTodoListItem(todo.id);
  const handleReenterWorkflow = () => reenterWorkflow && reenterWorkflow(todo);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    });
  };

  return (
    <div className="group bg-white bg-opacity-5 hover:bg-opacity-10 rounded-lg p-4 transition-all duration-200">
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggle}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-colors 
            ${todo.done 
              ? 'bg-green-500 border-green-500' 
              : 'border-gray-400 hover:border-green-400'}`}
        >
          {todo.done && <CheckCircle className="w-5 h-5 text-white" />}
        </button>
        
        <div className="flex-grow min-w-0">
          <p className={`text-gray-200 break-words ${todo.done ? 'line-through text-gray-500' : ''}`}>
            {todo.content}
          </p>
          
          <div className="mt-2 flex flex-wrap gap-2">
            {todo.dueDate && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-500 bg-opacity-20 text-blue-300">
                <Calendar className="w-3 h-3 mr-1" />
                {formatDate(todo.dueDate)}
              </span>
            )}
            {todo.projectName && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-500 bg-opacity-20 text-purple-300">
                {todo.projectName}
              </span>
            )}
            {todo.waitingFor && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-500 bg-opacity-20 text-yellow-300">
                待ち: {todo.waitingFor}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-3 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {(todo.category === 'Inbox' || todo.category === 'WaitingFor') && reenterWorkflow && (
          <button
            onClick={handleReenterWorkflow}
            className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-teal-500 bg-opacity-20 text-teal-300 hover:bg-opacity-30 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            ワークフロー
          </button>
        )}
        
        <button
          onClick={handleDelete}
          className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-red-500 bg-opacity-20 text-red-300 hover:bg-opacity-30 transition-colors"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          削除
        </button>
      </div>
    </div>
  );
};