import React from 'react';
import { Box, Text, Button, VStack, Heading } from '@chakra-ui/react';

function MessageList({ messages, deleteMessage }) {
  return (
    <VStack spacing="4" align="stretch" width="full" maxWidth="400px">
      <Heading as="h2" size="lg" textAlign="center">Messages</Heading>
      {messages.map(message => (
        <Box key={message.id} bg="white" padding="4" borderRadius="md" boxShadow="lg">
          <Text><strong>{message.data.firstName} {message.data.lastName}</strong>: {message.data.message}</Text>
          <Button onClick={() => deleteMessage(message.id)} colorScheme="red" size="sm">Delete</Button>
        </Box>
      ))}
    </VStack>
  );
}

export default MessageList;