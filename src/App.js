import React, { useState, useEffect } from 'react';
import { getCurrentUser, signOut as amplifySignOut } from '@aws-amplify/auth';
import CustomAuth from './CustomAuth';
import ChatRoom from './ChatRoom';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await amplifySignOut();
      setUser(null);
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  if (loading) {
    return (
      <>
        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
        <div className="cloud cloud3"></div>
        <div className="cloud cloud4"></div>
        <div className="App">
          <div style={{ textAlign: 'center', color: 'white', fontSize: '24px' }}>
            Loading...
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="cloud cloud3"></div>
      <div className="cloud cloud4"></div>

      <div className="App">
        {!user ? (
          <CustomAuth onSuccess={setUser} />
        ) : (
          <ChatRoom user={user} signOut={handleSignOut} />
        )}
      </div>
    </>
  );
}

export default App;
