import React from 'react';

function MessageList({ messages, deleteMessage }) {
  return (
    <div>
      {messages.map(message => (
        <div key={message.id}>
          <p><strong>{message.data.firstName} {message.data.lastName}</strong>: {message.data.message}</p>
          <button onClick={() => deleteMessage(message.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
