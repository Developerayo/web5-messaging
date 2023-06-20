# @Web5 Messaging 

![Web5](https://cdn.loom.com/images/originals/16e4700809cc46909464c349450528d9.jpg?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9jZG4ubG9vbS5jb20vaW1hZ2VzL29yaWdpbmFscy8xNmU0NzAwODA5Y2M0NjkwOTQ2NGMzNDk0NTA1MjhkOS5qcGciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODY4MzY1NjB9fX1dfQ__&Key-Pair-Id=APKAJQIC5BGSW7XXK7FQ&Signature=LUXTGyPha1RL1CI9lRhpG%7EEnQY4u3Wq3An0iHryZuUS3U0BbB3aGCNN7XFQ5%7ENhiGH6XuhuQTMVSWm%7E6xx2iMhkuGKLE7pZVvvT44W1oTxPcFTTkwwxwHHYdxD520gWOpjWCUtu8haYRB8xRakInmodzmN2wTH4vYBNJXekCfllVisYReEVPci0ls%7EjZClatyVn9NKf9VVNb1-B70jkzvZYKzPOGyPAbLea4gFv8hL8D0JzCclwdqpXIUSs3JB3hG3PO3vYoLQ26oPIGgPxclrK2vC0%7EBz4ViHmVSv8oZO31KxJuiAGCpJr0C%7EdnJjkSBZuFx2hHZ9QcCJUZKOHGDw__)


## Introduction

Web5-Messaging is a demo app showing how to use React.js and the Web5 library to generate a DID (Decentralized Digital Identifier) and interact with a Decentralized Web Network (DWN) to create, read, update, and delete (CRUD operations) messages stored in a decentralized manner.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Developerayo/web5-messaging.git
   ```

2. Navigate to the project directory:
   ```
   cd web5-messaging
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

## Directory Structure

- `src/`: Contains the source code of the application.
  - `index.js`: Entry point of the application.
  - `App.js`: Main component of the application.
  - `components/`: Contains two reusable components `Form.js` & `ListMessages.js`.
  - `helpers/`: Contains custom hooks and utility functions `useWeb5.js` `useMessages.js`.

## Application Components

### App Component (`src/App.js`)

The `App` component renders the application layout and includes other components, designed using Chakra UI for styling and layout.

### Form Component (`src/components/Form`)

This component renders a form that allows users to create messages.

### ListMessages Component (`src/components/ListMessages`)

This component renders a list of messages. Enabling you to update or delete messages.

## Custom Web5 Hooks (`src/helpers/`)
### useWeb5

This custom hook manages the web5 connection as well as the user's DID (Decentralised Identifier). It returns an object that contains the web5 instance as well as the user's DID.

This is how it works:

1. Importing the required modules from the "react" library,
    - `useState` and `useEffect.`
    - `Web5` from `@tbd54566975/web5`

2. Two state variables are initialized by the `useWeb5` function:
    - `web5`: To save the Web5 instance.
    -`myDid`: To save the user's `DID` (Decentralized Identifier).

3. In the `useEffect` hook, we created an asynchronous method named `initialize` that calls `Web5.connect()` in an effort to connect to Web5. It is expected that this method will return an object containing the Web5 instance and the user's DID.

4. Next, the state's values for `web5` and `myDid` are set.

5. The hook returns an object that includes `myDid` and the `web5` instance.

### useMessages

This custom hook is used for message management. It returns an object that contains the messages as well as functions for creating, updating, and deleting messages.

This is how it works:

1. It imports the necessary modules:
    - `useState` and `useEffect` from the 'react' library.

2. The `useMessages` function initialises the state variable `messages` to keep the list of messages and accepts`'web5` as an argument.

3. The `useEffect` hook creates the asynchronous function `fetchMessages`, which retrieves messages from the Web5 network using the `web5.dwn.records.query` method.

4. To generate a new message, we are utilizing the `createMessage` method. `firstName`, `lastName`,`messageText`, and `imageFile` are the four arguments it requires. It uses the `web5.dwn.records.create` function to send a request to generate a new record after converting the image file to base64.

5. In the `updateMessage` function.`messageId` and `updatedMessageData` are the two parameters it requires and it uses the `web5.dwn.records.read` method to read the record from the Web5 network and the `record.update` method to update the state.

6. A message can be deleted by its ID using the `deleteMessage` method. The `web5.dwn.records.delete` method makes a request to delete the record.

7. The hook gives back an object with the `messages` array as well as the `createMessage`, `updateMessage`, and `deleteMessage` operations.

### All Web5.js APIs used:

1. `web5.dwn.records.query`: Used to search through Web5 network records (messages).

2. `web5.dwn.records.create`: Used to add a new record (message) to the Web5 network.

3. `web5.dwn.records.read`: This function is used to read a record (message) from the Web5 network based on its ID.

4.`record.update`: This Web5 network function is used to modify an existing record (message).

5.`web5.dwn.records.delete`: Used to remove a record (message) from the Web5 network based on its ID.