import React, { useState, useEffect, useRef } from 'react';

function ChatRoom({ user, signOut }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);
  const messagesEndRef = useRef(null);

  const WEBSOCKET_URL = 'wss://q8kfwwf6q9.execute-api.us-east-1.amazonaws.com/prod/';
  const displayName = user?.signInDetails?.loginId || user?.username || 'User';

  useEffect(() => {
    console.log('🔄 Attempting to connect to WebSocket:', WEBSOCKET_URL);
    
    ws.current = new WebSocket(WEBSOCKET_URL);

    ws.current.onopen = () => {
      console.log('✅ WebSocket Connected Successfully!');
      setIsConnected(true);
    };

    ws.current.onmessage = (event) => {
      console.log('📩 Message received:', event.data);
      try {
        const response = JSON.parse(event.data);
        // Extract the data field from response
        if (response.data) {
          setMessages((prev) => [...prev, response.data]);
        }
      } catch (err) {
        console.error('Error parsing message:', err);
      }
    };

    ws.current.onerror = (error) => {
      console.error('❌ WebSocket Error:', error);
      setIsConnected(false);
    };

    ws.current.onclose = (event) => {
      console.log('🔴 WebSocket Disconnected. Code:', event.code);
      setIsConnected(false);
    };

    return () => {
      if (ws.current) {
        console.log('🛑 Closing WebSocket connection');
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;

    const messagePayload = {
      action: 'sendMessage',
      data: { 
        user: displayName,
        text: input, 
        roomId: 'default',
        timestamp: Date.now()
      }
    };

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(messagePayload));
      setInput('');
    } else {
      alert('Not connected to server!');
    }
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <span className="cloud-icon">☁️</span>
          <span>SkyChat</span>
        </div>

        <div className="user-info">
          <div className="username">{displayName}</div>
          <div className="status">
            <span className="status-dot"></span>
            <span>{isConnected ? 'Connected via AWS' : 'Disconnected'}</span>
          </div>
          <button className="logout-btn" onClick={signOut}>Logout</button>
        </div>

        <div className="rooms-header">ABOUT</div>
        <div className="room-list">
          <div className="room-item active">
            <span className="room-icon">💬</span>
            <span>Public Chat</span>
          </div>
          <div className="room-item" style={{cursor: 'default', opacity: 0.6}}>
            <span className="room-icon">👥</span>
            <span>Online Users: All</span>
          </div>
          <div className="room-item" style={{cursor: 'default', opacity: 0.6}}>
            <span className="room-icon">🌐</span>
            <span>Global Room</span>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="chat-area">
        <div className="chat-header">
          <div>
            <div className="chat-title">☁️ SkyChat - Public Room</div>
            <div className="chat-subtitle">Share your thoughts with everyone</div>
          </div>
          <div className={`connection-status ${isConnected ? '' : 'disconnected'}`}>
            {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
          </div>
        </div>

        <div className="messages-area">
          {messages.length === 0 && (
            <div className="message">
              <div className="message-content">
                <div className="message-user">System</div>
                <div className="message-text">Welcome to SkyChat! Start chatting with everyone!</div>
                <div className="message-time">Just now</div>
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`message ${m.user === displayName ? 'own' : ''}`}>
              <div className="message-content">
                <div className="message-user">{m.user}</div>
                <div className="message-text">{m.text}</div>
                <div className="message-time">
                  {m.timestamp 
                    ? new Date(m.timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
                    : 'Just now'
                  }
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <input 
            type="text"
            className="message-input"
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyPress={(e) => e.key === 'Enter' && send()}
            placeholder="Type your message..."
            disabled={!isConnected}
          />
          <button 
            className="send-btn"
            onClick={send} 
            disabled={!isConnected}
          >
            Send 📤
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
