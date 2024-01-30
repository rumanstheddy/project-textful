# Textful

Textful is a real-time chat application built with React, Express, Node, and MongoDB. It utilizes the power of Socket.IO for seamless communication through websockets. This project was my first React application, developed during my Master's degree.

## Features

- **Real-Time Chat**: Engage in conversations with other users in real time.
- **User Authentication**: Securely register and log in to participate in the chat.
- **Message History**: Access a chat history to review past conversations.
- **Joke Integration**: Enjoy a touch of humour with jokes sent through the [Joke API](https://sv443.net/jokeapi/v2/).

## Tech Stack

- **Frontend**: [React](https://reactjs.org/)
- **Backend**: [Express](https://expressjs.com/), [Node.js](https://nodejs.org/), [MongoDB](https://www.mongodb.com/)
- **Websockets**: [Socket.IO](https://socket.io/)

## External API

Textful integrates with the [Joke API](https://sv443.net/jokeapi/v2/) to send jokes in the conversation.

## Deployment

Textful is deployed and accessible online. You can visit the live application at [https://textful.netlify.app/](https://textful.netlify.app/).

## Usage

To run Textful locally, follow these simple steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/project-textful.git
    ```

2. Navigate to the project directory:

    ```bash
    cd project-textful/ui
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm start
    ```

5. Open your browser and visit [http://localhost:3000](http://localhost:3000).

That's it! You can now start chatting with Textful.

## Acknowledgements

This project was developed as part of the Web Development course during my Master's degree.

## Contributing

Contributions are welcome! If you have ideas for improvements, new features, or bug fixes, please create an issue or submit a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).
