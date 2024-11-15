import React, { useEffect, useState } from 'react';
import { Play, Pause, X, Clock, CheckCircle } from 'lucide-react';

type TimerProps = {
  initialSeconds: number;
  onComplete: () => void;
  onCancel: () => void;
  taskContent: string;
};

export const Timer: React.FC<TimerProps> = ({ 
  initialSeconds, 
  onComplete, 
  onCancel,
  taskContent 
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onComplete]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progress = (seconds / initialSeconds) * 100;

  return (
    <div className="flex flex-col items-center space-y-6 py-8">
      {/* タイマーアイコン */}
      <div className="p-3 bg-gray-800 rounded-full">
        <Clock className="w-12 h-12 text-blue-400" />
      </div>

      {/* タイトルと説明 */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">3分タイマー</h2>
        <p className="text-gray-400">以下のタスクを実行してください</p>
      </div>

      {/* タスク表示 */}
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="mt-1 flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-white break-words">
            {taskContent}
          </p>
        </div>
      </div>

      {/* タイマー表示 */}
      <div className="relative w-48 h-48">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            className="stroke-current text-gray-700"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            className="stroke-current text-blue-500"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={553}
            strokeDashoffset={553 - (553 * progress) / 100}
            style={{
              transition: 'stroke-dashoffset 0.5s ease'
            }}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-4xl font-bold text-white">
            {formatTime(seconds)}
          </div>
        </div>
      </div>

      {/* コントロールボタン */}
      <div className="flex space-x-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg
                   hover:bg-blue-600 transition-colors"
        >
          {isRunning ? (
            <>
              <Pause className="w-5 h-5 mr-2" />
              一時停止
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              再開
            </>
          )}
        </button>
        <button
          onClick={onCancel}
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg
                   hover:bg-red-600 transition-colors"
        >
          <X className="w-5 h-5 mr-2" />
          キャンセル
        </button>
      </div>
    </div>
  );
};