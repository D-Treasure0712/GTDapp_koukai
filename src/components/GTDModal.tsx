import React, { useState } from 'react';
import { PartialTodo } from '../types/Todo';
import { Timer } from './Timer';
import { AlertCircle, Calendar, CheckCircle2, Clock, HelpCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';

type GTDModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (todo: PartialTodo) => void;
  initialTodo?: PartialTodo;
};

type StepContent = {
  question: string;
  description?: string;
  yesLabel?: string;
  noLabel?: string;
  icon?: React.ReactNode;
  isDateSelection?: boolean;
};

export const GTDModal: React.FC<GTDModalProps> = ({ isOpen, onClose, onSubmit, initialTodo }) => {
  const [step, setStep] = useState(1);
  const [todo, setTodo] = useState<PartialTodo>(initialTodo || { content: '' });
  const [showTimer, setShowTimer] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  if (!isOpen) return null;

  const handleDateSubmit = () => {
    if (selectedDate) {
      // 選択された日付をYYYY-MM-DD形式で分割
      const [year, month, day] = selectedDate.split('-').map(Number);
      
      // 日付オブジェクトを作成（ローカルタイム）
      const date = new Date(year, month - 1, day);  // monthは0-11なので-1する
      
      // その日の23:59:59に設定（ローカルタイム）
      date.setHours(23, 59, 59, 999);
      
      onSubmit({ 
        ...todo, 
        category: 'Calendar', 
        dueDate: date.toISOString()  // ISOString形式に変換
      });
      handleFinalClose();
    }
  };

  const handleYes = () => {
    switch (step) {
      case 1:
        setStep(2);
        break;
      case 2:
        setStep(3);
        break;
      case 3:
        setStep(4);
        setShowTimer(true);
        break;
      case 4:
        setStep(5);
        break;
      default:
        break;
    }
  };

  const handleNo = () => {
    switch (step) {
      case 1:
        onSubmit({ ...todo, category: 'WaitingFor' });
        handleFinalClose();
        break;
      case 2:
        onSubmit({ ...todo, category: 'Project' });
        handleFinalClose();
        break;
      case 3:
        setStep(4);
        break;
      case 4:
        onSubmit({ ...todo, category: 'NextAction' });
        handleFinalClose();
        break;
      default:
        break;
    }
  };

  const handleTimerComplete = () => {
    onSubmit({ ...todo, category: 'Inbox', done: true });
    handleFinalClose();
  };

  const handleTimerCancel = () => {
    setShowTimer(false);
    setStep(4);
  };

  const handleFinalClose = () => {
    setStep(1);
    setTodo({ content: '' });
    setShowTimer(false);
    onClose();
  };

  // カレンダー関連の関数
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    const firstDayOfWeek = firstDay.getDay() || 7;  // 日曜日を7とする
    
    // 前月の日付を追加
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate,
        isCurrentMonth: false
      });
    }
    
    // 当月の日付を追加
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(year, month, i);
      days.push({
        date: currentDate,
        isCurrentMonth: true
      });
    }
    
    // 次月の日付を追加（42日分になるまで）
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({
        date: nextDate,
        isCurrentMonth: false
      });
    }
    
    return days;
  };

  const getStepContent = (): StepContent => {
    switch (step) {
      case 1:
        return {
          question: "行動を起こす必要がありますか？",
          description: "このタスクはやる必要がありますか？",
          yesLabel: "はい、アクションが必要です",
          noLabel: "いいえ、保留にします",
          icon: <HelpCircle className="w-12 h-12 text-blue-400" />
        };
      case 2:
        return {
          question: "シンプルなタスクですか？",
          description: "このタスクは単一のアクションで完了できますか？",
          yesLabel: "はい、シンプルなタスクです",
          noLabel: "いいえ、プロジェクトです",
          icon: <AlertCircle className="w-12 h-12 text-purple-400" />
        };
      case 3:
        return {
          question: "3分以内でできますか？",
          description: "すぐに実行できる短時間のタスクですか？",
          yesLabel: "はい、今すぐやります",
          noLabel: "いいえ、時間がかかります",
          icon: <Clock className="w-12 h-12 text-green-400" />
        };
      case 4:
        return {
          question: "特定の日付がありますか？",
          description: "このタスクには期限や実行する日付が決まっていますか？",
          yesLabel: "はい、日付を設定します",
          noLabel: "いいえ、次のアクションへ",
          icon: <Calendar className="w-12 h-12 text-yellow-400" />
        };
      case 5:
        return {
          question: "実行する日付を選択してください",
          description: "カレンダーに登録する日付を選んでください",
          isDateSelection: true,
          icon: <Calendar className="w-12 h-12 text-blue-400" />
        };
      default:
        return {
          question: "",
          icon: <HelpCircle className="w-12 h-12 text-gray-400" />
        };
    }
  };

  const { question, description, yesLabel, noLabel, icon, isDateSelection = false } = getStepContent();

  const renderCalendar = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-400" />
        </button>
        <h3 className="text-lg font-semibold text-white">
          {currentMonth.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' })}
        </h3>
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500 mb-2">
        {['月', '火', '水', '木', '金', '土', '日'].map(day => (
          <div key={day} className="py-2">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {getDaysInMonth(currentMonth).map(({ date, isCurrentMonth }, index) => {
          // YYYY-MM-DD形式の文字列を作成
          const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
          
          // 今日の日付を取得（ローカルタイム）
          const today = new Date();
          const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
          
          const isToday = todayString === dateString;
          const isSelected = selectedDate === dateString;

          return (
            <button
              key={index}
              onClick={() => setSelectedDate(dateString)}
              className={`
                py-2 rounded-lg transition-all
                ${isCurrentMonth ? 'text-white' : 'text-gray-600'}
                ${isSelected ? 'bg-blue-500 text-white' : ''}
                ${isToday && !isSelected ? 'border border-blue-500' : ''}
                ${isCurrentMonth && !isSelected ? 'hover:bg-gray-700' : ''}
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex justify-end space-x-3">
        <button
          onClick={() => setStep(4)}
          className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
        >
          戻る
        </button>
        <button
          onClick={handleDateSubmit}
          disabled={!selectedDate}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600
                   transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          日付を確定
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="relative bg-gray-900 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all">
            {/* ヘッダー */}
            <div className="absolute top-0 right-0 pt-4 pr-4">
              <button
                onClick={handleFinalClose}
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* コンテンツ */}
            <div className="p-6">
              {showTimer ? (
                <Timer 
                  initialSeconds={180}
                  onComplete={handleTimerComplete}
                  onCancel={handleTimerCancel}
                  taskContent={todo.content || ''}
                />
              ) : (
                <div className="space-y-6">
                  {/* アイコンとタイトル */}
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 bg-gray-800 rounded-full">
                      {icon}
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      {question}
                    </h2>
                    {description && (
                      <p className="text-gray-400">
                        {description}
                      </p>
                    )}
                  </div>

                  {/* タスク内容の表示 */}
                  <div className="bg-gray-800 rounded-lg p-4">
                    <p className="text-white break-words">
                      {todo.content}
                    </p>
                  </div>

                  {/* 日付選択 or ボタン */}
                  {isDateSelection ? (
                    renderCalendar()
                  ) : (
                    <div className="grid grid-cols-1 gap-3">
                      <button
                        onClick={handleYes}
                        className="flex items-center justify-center px-4 py-3 bg-teal-500 text-white
                                 rounded-lg hover:bg-teal-600 transition-colors"
                      >
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        {yesLabel}
                      </button>
                      <button
                        onClick={handleNo}
                        className="flex items-center justify-center px-4 py-3 bg-gray-700 text-gray-300
                                 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <X className="w-5 h-5 mr-2" />
                        {noLabel}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* プログレスバー */}
            <div className="h-1 bg-gray-800">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};