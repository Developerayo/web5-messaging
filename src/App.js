import React from "react";
import Form from "./components/Form";
import ListMessages from "./components/ListMessages";
import { useWeb5 } from './helpers/useWeb5';
import { useMessages } from './helpers/useMessages';
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
  const { web5, myDid } = useWeb5();
  const { messages, createMessage, updateMessage, deleteMessage } = useMessages(web5);

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
