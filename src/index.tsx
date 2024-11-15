// index.tsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import LandingPage from "./components/LandingPage";
import "./index.css";
import { Amplify, Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import { AmplifyProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';
import { HelmetProvider } from 'react-helmet-async';

Amplify.configure(awsconfig);

// ルートコンポーネントを作成
const Root = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    }
  };

  // ローディング中の表示
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  // 認証状態に応じてコンポーネントを切り替え
  return (
    <Authenticator.Provider>
      {isAuthenticated ? (
        <Authenticator>
          {({ signOut, user }) => (
            <App signOut={signOut} user={user} onSignOutSuccess={() => setIsAuthenticated(false)} />
          )}
        </Authenticator>
      ) : (
        <LandingPage onAuthSuccess={() => setIsAuthenticated(true)} />
      )}
    </Authenticator.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <AmplifyProvider>
        <Root />
      </AmplifyProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);