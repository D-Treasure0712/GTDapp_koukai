# GTDタスク管理アプリケーション

## 📝 概要
GTD（Getting Things Done）メソッドをベースにした、モダンなタスク管理アプリケーションです。React + TypeScriptで構築され、AWSのサーバーレスアーキテクチャを活用しています。

## 🌟 主な機能
- GTDワークフローに基づくタスクの自動振り分け
- リアルタイムな更新（WebSocket使用）
- AWS Cognitoによる認証

## 🛠 技術スタック
### フロントエンド
- React 18
- TypeScript 4.9
- TailwindCSS
- AWS Amplify UI Components

### バックエンド（サーバーレス）
- AWS AppSync (GraphQL)
- AWS Cognito
- DynamoDB
- AWS Lambda

### 開発ツール
- ESLint
- Prettier
- Husky (Git hooks)
- Jest
- AWS CDK
