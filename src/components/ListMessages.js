import React from "react";
import {
  Box,
  Text,
  Button,
  VStack,
  Heading,
  Image,
  Spacer,
  Stack,
} from "@chakra-ui/react";

function MessageList({ messages, deleteMessage }) {
  return (
    <VStack spacing="4" align="stretch" width="full" maxWidth="400px">
      <Heading as="h2" size="lg" textAlign="center">
        Messages
      </Heading>
      {messages.map((message) => (
        <Box
          key={message.id}
          bg="white"
          padding="4"
          borderRadius="md"
          boxShadow="lg"
        >
          <Text>
            <strong>First Name:</strong> {message.data.firstName}
          </Text>
          <Text>
            <strong>Last Name:</strong> {message.data.lastName}
          </Text>
          <Text>
            <strong>Message:</strong> {message.data.message}
          </Text>
          {message.data.image && (
            <>
              <Image
                src={`data:image/png;base64,${message.data.image}`}
                alt="uploaded"
              />
              <Spacer height="4" />
            </>
          )}
          <Stack direction="row" justifyContent="flex-end">
            <Button
              onClick={() => deleteMessage(message.id)}
              colorScheme="red"
              size="sm"
            >
              Delete
            </Button>
          </Stack>
        </Box>
      ))}
    </VStack>
  );
}

export default MessageList;
