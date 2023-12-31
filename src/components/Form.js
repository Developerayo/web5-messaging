import React, { useState } from "react";
import {
  Input,
  Button,
  Textarea,
  VStack,
  Heading,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

function MessageForm({ createMessage }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    createMessage(firstName, lastName, message, image);
    setFirstName("");
    setLastName("");
    setMessage("");
    setImage(null);
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit}
      spacing="4"
      backgroundColor="white"
      padding="6"
      borderRadius="md"
      boxShadow="lg"
      width="full"
      maxWidth="400px"
    >
      <Heading as="h2" size="lg" textAlign="center">
        Store New Message
      </Heading>
      <Input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        required
      />
      <Input
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        required
      />
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        required
      />
      <FormControl>
        <FormLabel>Upload an image</FormLabel>
        <Input
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={handleImageChange}
        />
      </FormControl>
      <Button type="submit" colorScheme="brand">
        Send
      </Button>
    </VStack>
  );
}

export default MessageForm;
