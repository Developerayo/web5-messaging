import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  VStack,
  Heading,
  Image,
  Spacer,
  Stack,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

function ListMessages({ messages, deleteMessage, updateMessage }) {
  const [editMode, setEditMode] = useState(null);
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [editedMessage, setEditedMessage] = useState("");
  const [editedImageFile, setEditedImageFile] = useState(null);

  const onSubmit = async (e, id) => {
    e.preventDefault();

    let base64Image = editedImageFile;
    if (editedImageFile && typeof editedImageFile !== "string") {
      const binaryImage = await editedImageFile.arrayBuffer();
      base64Image = btoa(
        new Uint8Array(binaryImage).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
    }

    updateMessage(id, {
      firstName: editedFirstName,
      lastName: editedLastName,
      message: editedMessage,
      image: base64Image,
    });
    setEditMode(null);
    resetForm();
  };

  const resetForm = () => {
    setEditedFirstName("");
    setEditedLastName("");
    setEditedMessage("");
    setEditedImageFile(null);
  };

  const startEditing = (message) => {
    setEditMode(message.id);
    setEditedFirstName(message.data?.firstName || "");
    setEditedLastName(message.data?.lastName || "");
    setEditedMessage(message.data?.message || "");
    setEditedImageFile(message.data?.image || null);
  };

  // Ensure messages is an array
  if (!Array.isArray(messages)) return null;

  return (
    <VStack spacing="4" align="stretch" width="full" maxWidth="400px">
      <Heading as="h2" size="lg" textAlign="center">
        Messages
      </Heading>
      {messages.map((message) => {
  if (!message || !message.data) {
    console.error("Incorrect message object", message);
    return null;
  }
        return (
          <Box
            key={message.id}
            bg="white"
            padding="4"
            borderRadius="md"
            boxShadow="lg"
          >
            {editMode === message.id ? (
              <form onSubmit={(e) => onSubmit(e, message.id)}>
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    value={editedFirstName}
                    onChange={(e) => setEditedFirstName(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    value={editedLastName}
                    onChange={(e) => setEditedLastName(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Message</FormLabel>
                  <Input
                    type="text"
                    value={editedMessage}
                    onChange={(e) => setEditedMessage(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Image</FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditedImageFile(e.target.files[0])}
                  />
                </FormControl>
                <Stack direction="row" justifyContent="flex-end">
                  <Button type="submit" colorScheme="blue" size="sm">
                    Save
                  </Button>
                  <Button
                    onClick={() => setEditMode(null)}
                    colorScheme="gray"
                    size="sm"
                  >
                    Cancel
                  </Button>
                </Stack>
              </form>
            ) : (
              <>
                <Text>
                  <strong>First Name:</strong> {message.data.firstName || ""}
                </Text>
                <Text>
                  <strong>Last Name:</strong>{" "}
                  {message.data.lastName || ""}
                </Text>
                <Text>
                  <strong>Message:</strong> {message.data.message || ""}
                </Text>

                {message.data.image &&
                typeof message.data.image === "string" ? (
                  <>
                    <Image
                      src={`data:image/png;base64,${message.data.image}`}
                      alt="uploaded"
                    />
                    <Spacer height="4" />
                  </>
                ) : null}

                <Stack direction="row" justifyContent="flex-end">
                  <Button
                    onClick={() => startEditing(message)}
                    colorScheme="teal"
                    size="sm"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteMessage(message.id)}
                    colorScheme="red"
                    size="sm"
                  >
                    Delete
                  </Button>
                </Stack>
              </>
            )}
          </Box>
        );
      })}
    </VStack>
  );
}

export default ListMessages;
