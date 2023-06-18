import React, { useEffect, useState } from "react";
import { Web5 } from "@tbd54566975/web5";
import Form from "./components/Form";
import ListMessages from "./components/ListMessages";
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  VStack,
  CSSReset,
  extendTheme,
  Alert,
  AlertIcon,
  Flex,
} from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      500: "#1C1C1C",
    },
  },
});

function App() {
  const [web5, setWeb5] = useState(null);
  const [myDid, setMyDid] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function initialize() {
      const { web5, did } = await Web5.connect();
      setWeb5(web5);
      setMyDid(did);
    }
    initialize();
  }, []);

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
  
    // Old image
    if (!updatedMessageData.image && messages[messageIndex].data.image) {
      updatedMessageData.image = messages[messageIndex].data.image;
    }

    // Update the record in DWN
    await record.update({ data: updatedMessageData });
  
    const updatedData = await record.data.json();
    const updatedMessage = { record, data: updatedData, id: record.id };
  
    setMessages((prevMessages) => {
      return prevMessages.map((message) =>
        message.id === messageId ? updatedMessage : message
      );
    });
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

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box minHeight="100vh" bg="gray.100" padding="6" color="gray.800">
        <VStack spacing="8" align="center">
          <Heading as="h1" size="2xl">
            @Web5JS/Messaging
          </Heading>
          <Flex
            direction={{ base: "column", md: "row" }}
            width="100%"
            maxW="6xl"
          >
            <Box flex="1">
              <Form createMessage={createMessage} />
            </Box>
            <Box flex="1" marginLeft={{ md: "8" }}>
              <ListMessages
                messages={messages}
                deleteMessage={deleteMessage}
                updateMessage={updateMessage}
              />
            </Box>
          </Flex>
          {myDid && (
            <Alert
              status="info"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="200px"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <Text>Your DID: {myDid}</Text>
            </Alert>
          )}
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
