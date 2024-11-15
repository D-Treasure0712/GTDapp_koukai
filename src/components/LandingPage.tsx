// LandingPage.tsx
import React, { useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { ArrowRight, CheckCircle, Clock, Inbox, LayoutList } from 'lucide-react';

type LandingPageProps = {
  onAuthSuccess?: () => void;
};

const LandingPage: React.FC<LandingPageProps> = ({ onAuthSuccess }) => {
  const [showAuth, setShowAuth] = useState(false);

  const handleShowAuth = () => {
    setShowAuth(true);
  };

  if (showAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <Authenticator>
          {({ signOut, user }) => {
            if (onAuthSuccess) {
              onAuthSuccess();
            }
            return <></>;
          }}
        </Authenticator>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* ヘッダー */}
      <header className="fixed w-full top-0 bg-transparent backdrop-filter backdrop-blur-lg z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <LayoutList className="w-8 h-8 text-teal-400 animate-pulse" />
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
              GTD Manager
            </h1>
          </div>
          <button 
            onClick={handleShowAuth}
            className="px-6 py-2 bg-teal-500 text-gray-900 rounded-lg hover:bg-teal-600 transition duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            ログイン
            <ArrowRight className="w-5 h-5 animate-bounce" />
          </button>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="flex flex-col justify-center items-center pt-32 pb-40 relative">
        {/* 背景エフェクト */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute left-0 right-0 h-[800px] animate-wave"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1440 320' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23212A3E' fill-opacity='0.5' d='M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.7,
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent animate-text">
            タスク管理を、
            <br />
            シンプルに。
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            GTD (Getting Things Done) メソッドで
            <br className="hidden md:inline" />
            あなたの生産性を最大限に引き出します
          </p>
          <button 
            onClick={handleShowAuth}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-400 to-purple-500 text-gray-900 text-lg rounded-full hover:from-teal-500 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            無料で始める
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      {/* 特徴プレビュー */}
      <section className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Inbox className="w-8 h-8 text-teal-400" />,
                title: "スマートな整理",
                description: "タスクを効率的に分類し、見やすく管理します。",
              },
              {
                icon: <Clock className="w-8 h-8 text-purple-400" />,
                title: "効率的な実行",
                description: "時間管理を最適化し、生産性を向上させます。",
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-pink-400" />,
                title: "確実な完了",
                description: "タスクの完了率を高め、目標達成をサポートします。",
              }
            ].map(({ icon, title, description }) => (
              <div key={title} className="bg-gray-700 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
                <div className="mb-4">
                  {icon}
                </div>
                <h4 className="text-2xl font-semibold mb-2">{title}</h4>
                <p className="text-gray-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
            GTDメソッドで
            <br className="md:hidden" />
            <span className="block">生産性を最大化</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 左側: 特徴リスト */}
            <div className="space-y-8">
              {[
                {
                  title: "インボックスで整理",
                  description: "頭の中のタスクをすべて書き出し、心理的負担を軽減",
                  icon: <Inbox className="w-6 h-6 text-teal-400" />
                },
                {
                  title: "3分ルールで即実行",
                  description: "すぐにできるタスクは、その場で処理",
                  icon: <Clock className="w-6 h-6 text-purple-400" />
                },
                {
                  title: "プロジェクト管理",
                  description: "複雑なタスクを整理し、確実に完了",
                  icon: <LayoutList className="w-6 h-6 text-pink-400" />
                }
              ].map(({ title, description, icon }) => (
                <div key={title} className="flex gap-4 items-start bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-colors">
                  <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center text-teal-400">
                    {icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">{title}</h4>
                    <p className="text-gray-400">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 右側: アプリプレビュー */}
            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl">
              <div className="bg-gray-700 rounded-xl p-6 shadow-inner">
                <h4 className="text-lg font-semibold mb-4 text-teal-400">インボックス</h4>
                {[
                  "プレゼン資料の作成",
                  "チームミーティングの準備",
                  "週報の提出"
                ].map((task) => (
                  <div key={task} className="flex items-center gap-3 py-3 border-b border-gray-600">
                    <div className="w-5 h-5 rounded-full bg-teal-400 flex-shrink-0" />
                    <span className="text-gray-200">{task}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GTDフロー */}
      <section className="py-24 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
            シンプルな
            <br className="md:hidden" />
            <span className="block">5ステップのワークフロー</span>
          </h3>

          <div className="flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0">
            {[
              "収集", "整理", "分類", "見直し", "実行"
            ].map((step, index) => (
              <div key={step} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-2xl mb-4 shadow-lg">
                  {index + 1}
                </div>
                <h4 className="text-xl font-semibold">{step}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-teal-400 to-purple-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold mb-6 text-gray-900">
            はじめてみませんか？
          </h3>
          <p className="text-xl text-gray-800 mb-12">
            無料で始められます。
            <br />
            今日から、あなたの生産性が変わります。
          </p>
          <button 
            onClick={handleShowAuth}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-teal-400 text-lg rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            アカウントを作成
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-gray-900 py-12 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
          <div className="flex items-center justify-center gap-2 mb-6">
            <LayoutList className="w-6 h-6 text-teal-400" />
            <span className="font-semibold text-teal-400">GTD Manager</span>
          </div>
          {/* <p className="text-sm">
            © 2024 GTD Manager. All rights reserved.
          </p> */}
        </div>
      </footer>

      {/* アニメーションスタイル */}
      <style>{`
        @keyframes wave {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(20px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-wave {
          animation: wave 15s ease-in-out infinite;
        }

        @keyframes textGradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-text {
          background-size: 200% 200%;
          animation: textGradient 5s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;