import React, { useState } from 'react';
import { Box, Input, Button, Textarea, VStack, Heading } from '@chakra-ui/react';

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
    <VStack as="form" onSubmit={handleSubmit} spacing="4" backgroundColor="white" padding="6" borderRadius="md" boxShadow="lg" width="full" maxWidth="400px">
      <Heading as="h2" size="lg" textAlign="center">Store New Message</Heading>
      <Input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
      <Input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" />
      <Textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Message" />
      <Button type="submit" colorScheme="brand">Send</Button>
    </VStack>
  );
}




export default MessageForm;