// src/components/TodoAdd.tsx
import React, { useState, KeyboardEvent } from "react";
import { PartialTodo } from "../types/Todo";
import { Plus } from 'lucide-react';

type TodoAddProps = {
  handleAddTodoListItem: (todo: PartialTodo) => void;
  handleOpenGTDModal?: (content: string) => void;
};

export const TodoAdd: React.FC<TodoAddProps> = ({ 
  handleAddTodoListItem,
  handleOpenGTDModal 
}) => {
  const [taskContent, setTaskContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskContent.trim() === '') return;

    // インボックスに追加
    handleAddTodoListItem({
      content: taskContent,
      category: 'Inbox',
      done: false
    });
    
    setTaskContent('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // デフォルトの改行を防ぐ
      handleSubmit(e as any);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (taskContent.trim() === '') return;

    // ボタンクリック時はGTDモーダルを開く
    if (handleOpenGTDModal) {
      handleOpenGTDModal(taskContent);
      setTaskContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-bold text-white">新しいタスクを追加</h2>
        
        <div className="relative">
          <textarea
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="頭の中にある気がかりなことを入力してください... (Enterでインボックスに追加、ボタンクリックでGTDワークフロー開始)"
            className="w-full min-h-[100px] px-4 py-3 bg-white bg-opacity-5 text-gray-200 
                     placeholder-gray-500 rounded-lg border border-gray-700 
                     focus:border-teal-500 focus:ring-1 focus:ring-teal-500
                     transition-all duration-200 resize-none"
          />
          
          <button
            onClick={handleButtonClick}
            disabled={taskContent.trim() === ''}
            className="absolute bottom-4 right-4 inline-flex items-center px-4 py-2 
                     bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg 
                     transition-all duration-200 hover:from-teal-600 hover:to-teal-700 
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5 mr-1" />
            GTDワークフロー
          </button>
        </div>
      </div>
    </form>
  );
};