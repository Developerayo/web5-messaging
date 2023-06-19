import { useState, useEffect } from 'react';

export function useMessages(web5) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!web5) return;

    async function fetchMessages() {
      const { records } = await web5.dwn.records.query({
        message: {
          filter: {
            schema: "http://schema-registry.org/message",
          },
          dateSort: "createdAscending",
        },
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

  async function createMessage(firstName, lastName, messageText, imageFile) {
    let base64Image = null;

    if (imageFile) {
      const binaryImage = await imageFile.arrayBuffer();
      base64Image = btoa(
        new Uint8Array(binaryImage).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
    }

    const messageData = {
      firstName,
      lastName,
      message: messageText,
      image: base64Image,
    };

    const { record } = await web5.dwn.records.create({
      data: messageData,
      message: {
        schema: "http://schema-registry.org/message",
        dataFormat: "application/json",
      },
    });

    const data = await record.data.json();
    const message = { record, data, id: record.id };
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function updateMessage(messageId, updatedMessageData) {
    const messageIndex = messages.findIndex(
      (message) => message.id === messageId
    );
    if (messageIndex === -1) return;

    // Get record from DWN
    const { record } = await web5.dwn.records.read({
      message: {
        recordId: messageId,
      },
    });

    // Update the record in DWN
    await record.update({ data: updatedMessageData });

    const updatedData = await record.data.json();
    const updatedMessage = { record, updatedData, id: record.id };

    setMessages((prevMessages) =>
      prevMessages.map((message, index) =>
        index === messageIndex
          ? { ...updatedMessage, data: updatedMessage.updatedData }
          : message
      )
    );
  }

  async function deleteMessage(messageId) {
    const messageIndex = messages.findIndex(
      (message) => message.id === messageId
    );
    if (messageIndex === -1) return;

    await web5.dwn.records.delete({
      message: {
        recordId: messageId,
      },
    });
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== messageId)
    );
  }

  return { messages, createMessage, updateMessage, deleteMessage };
}
