# GTDタスク管理アプリケーション

## 📝 概要
GTD（Getting Things Done）メソッドをベースにした、モダンなタスク管理アプリケーションです。React + TypeScriptで構築され、AWSのサーバーレスアーキテクチャを活用しています。

## 🌟 主な機能
- GTDワークフローに基づくタスクの自動振り分け
- リアルタイムな更新（WebSocket使用）
- レスポンシブデザイン
- ダークモード対応
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

## 💡 技術的なポイント
1. **最新のReactパターン**
   - Custom Hooks による状態管理の分離
   - React 18の新機能（Concurrent Mode等）の活用
   - TypeScriptの厳格な型チェック

2. **GraphQL API設計**
   - N+1問題の解決
   - スキーマ駆動開発
   - カスタムディレクティブの実装

3. **パフォーマンス最適化**
   - React.memo による不要な再レンダリングの防止
   - GraphQLクエリの最適化
   - レスポンシブな画像処理

4. **セキュリティ対策**
   - AWS Cognitoによる認証・認可
   - XSS対策
   - CSRF対策
   - APIリクエストの制限

## 🚀 ローカル開発環境のセットアップ

### 必要条件
- Node.js 16.x以上
- AWS CLI
- Amplify CLI
- Git

