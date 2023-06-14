import React, { useEffect, useState } from 'react';
import { Web5 } from '@tbd54566975/web5';
import Form from './components/Form';
import ListMessages from './components/ListMessages';

function App() {
  const [web5, setWeb5] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function initialize() {
      const { web5 } = await Web5.connect();
      setWeb5(web5);
    }
    initialize();
}, []);


  useEffect(() => {
    if (!web5) return;

    async function fetchMessages() {
      const { records } = await web5.dwn.records.query({
        message: {
          filter: {
            schema: 'http://schema-registry.org/message'
          },
          dateSort: 'createdAscending'
        }
      });

      const mappedMessages = [];
      for (let record of records) {
        const data = await record.data.json();
        const message = { record, data, id: record.id };
        mappedMessages.push(message);
      }
      setMessages(mappedMessages);
    }
    fetchMessages();
  }, [web5]);

  async function createMessage(firstName, lastName, messageText) {
    const messageData = {
      firstName,
      lastName,
      message: messageText
    };

    const { record } = await web5.dwn.records.create({
      data: messageData,
      message: {
        schema: 'http://schema-registry.org/message',
        dataFormat: 'application/json'
      }
    });

    const data = await record.data.json();
    const message = { record, data, id: record.id };
    setMessages(prevMessages => [...prevMessages, message]);
  }

  async function deleteMessage(messageId) {
    const messageIndex = messages.findIndex(message => message.id === messageId);
    if (messageIndex === -1) return;

    await web5.dwn.records.delete({
      message: {
        recordId: messageId
      }
    });
    setMessages(prevMessages => prevMessages.filter(message => message.id !== messageId));
  }

  return (
    <div>
      <Form createMessage={createMessage} />
      <ListMessages messages={messages} deleteMessage={deleteMessage} />
    </div>
  );
}

export default App;
