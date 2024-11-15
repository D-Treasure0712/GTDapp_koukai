import React, { useState } from "react";
import { useTodo } from "../hooks/useTodo";
import { Todo, PartialTodo } from "../types/Todo";
import { TodoAdd } from "./TodoAdd";
import { TodoList } from "./TodoList";
import { TodoTitle } from "./TodoTitle";
import { GTDModal } from "./GTDModal";
import { LogOut, Plus, Menu } from 'lucide-react';
import { 
  withAuthenticator, 
  Button, 
  Heading,
  View,
  useTheme
} from '@aws-amplify/ui-react';
import type { HeadingProps, ButtonProps } from '@aws-amplify/ui-react';
import { AmplifyUser } from '@aws-amplify/ui';

type AppProps = {
  signOut?: () => void;
  user?: AmplifyUser;
  onSignOutSuccess?: () => void;
};

const App = ({ signOut, user, onSignOutSuccess }: AppProps) => {
  const { todoList, toggleTodoListItemStatus, addTodoListItem, deleteTodoListItem } = useTodo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [initialContent, setInitialContent] = useState('');
  const { tokens } = useTheme();

  const categoryLists = {
    inbox: todoList.filter((todo) => todo.category === 'Inbox' && !todo.done),
    waiting: todoList.filter((todo) => todo.category === 'WaitingFor' && !todo.done),
    project: todoList.filter((todo) => todo.category === 'Project' && !todo.done),
    nextAction: todoList.filter((todo) => todo.category === 'NextAction' && !todo.done),
    calendar: todoList.filter((todo) => todo.category === 'Calendar' && !todo.done),
    completed: todoList.filter((todo) => todo.done)
  };

  const handleReenterWorkflow = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  const handleOpenGTDModal = (content: string) => {
    setInitialContent(content);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
    setInitialContent('');
  };

  const handleModalSubmit = async (partialTodo: PartialTodo) => {
    try {
      const newTodo = {
        ...partialTodo,
        content: selectedTodo?.content || partialTodo.content
      };
  
      if (selectedTodo) {
        await Promise.all([
          addTodoListItem(newTodo),
          deleteTodoListItem(selectedTodo.id)
        ]);
      } else {
        await addTodoListItem(newTodo);
      }
  
      handleModalClose();
    } catch (error) {
      console.error('Error during workflow re-entry:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      if (signOut) {
        await signOut();
        if (onSignOutSuccess) {
          onSignOutSuccess();
        }
      }
    } catch (error) {
      console.error('Signout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* ヘッダー */}
      <header className="fixed top-0 w-full bg-gray-800 bg-opacity-90 backdrop-blur-lg shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-400 hover:text-white rounded-lg"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
                GTD Manager
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">
                {user?.username}
              </span>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                <LogOut size={18} />
                <span>サインアウト</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="pt-20 px-4">
        {/* Todo追加セクション */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
            <TodoAdd 
              handleAddTodoListItem={addTodoListItem}
              handleOpenGTDModal={handleOpenGTDModal}
            />
          </div>
        </div>

        {/* Todoリストセクション */}
        <div className="flex overflow-x-auto space-x-6 pb-6 px-4">
          <TodoList 
            todoList={categoryLists.inbox}
            toggleTodoListItemStatus={toggleTodoListItemStatus}
            deleteTodoListItem={deleteTodoListItem}
            title="インボックス"
            as="h2"
            reenterWorkflow={handleReenterWorkflow}
          />
          <TodoList 
            todoList={categoryLists.nextAction}
            toggleTodoListItemStatus={toggleTodoListItemStatus}
            deleteTodoListItem={deleteTodoListItem}
            title="次やること"
            as="h2"
          />

          <TodoList 
            todoList={categoryLists.project}
            toggleTodoListItemStatus={toggleTodoListItemStatus}
            deleteTodoListItem={deleteTodoListItem}
            title="プロジェクト"
            as="h2"
          />

          <TodoList 
            todoList={categoryLists.calendar}
            toggleTodoListItemStatus={toggleTodoListItemStatus}
            deleteTodoListItem={deleteTodoListItem}
            title="カレンダー"
            as="h2"
          />
          <TodoList 
            todoList={categoryLists.waiting}
            toggleTodoListItemStatus={toggleTodoListItemStatus}
            deleteTodoListItem={deleteTodoListItem}
            title="保留リスト"
            as="h2"
            reenterWorkflow={handleReenterWorkflow}
          />
          <TodoList 
            todoList={categoryLists.completed}
            toggleTodoListItemStatus={toggleTodoListItemStatus}
            deleteTodoListItem={deleteTodoListItem}
            title="完了済み"
            as="h2"
          />
        </div>
      </main>

      {/* GTDモーダル */}
      {isModalOpen && (
        <GTDModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          initialTodo={initialContent ? { 
            content: initialContent,
            category: 'Inbox' 
          } : selectedTodo ? {
            content: selectedTodo.content,
            category: selectedTodo.category
          } : undefined}
        />
      )}

      <style>{`
        /* カスタムスクロールバー */
        .overflow-x-auto {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
        }

        .overflow-x-auto::-webkit-scrollbar {
          height: 6px;
        }

        .overflow-x-auto::-webkit-scrollbar-track {
          background: transparent;
        }

        .overflow-x-auto::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
};

export default App;