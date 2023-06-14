import React, { useState } from 'react';

function MessageForm({ createMessage }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    createMessage(firstName, lastName, message);
    setFirstName('');
    setLastName('');
    setMessage('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
      <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" />
      <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Message" />
      <button type="submit">Send</button>
    </form>
  );
}

export default MessageForm;
