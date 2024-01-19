import io from "socket.io-client";
import * as sessionMgmt from './SessionHandler';

var chatSocket = null;
if (chatSocket === null)
        chatSocket = io('https://textful-server.onrender.com/');

export function joinChat() {
    chatSocket.emit('JOINING', sessionMgmt.getUserName())
}

export function registerForEvent(eventKey, callback) {

    chatSocket.on(eventKey, callback);
}

export function sendMessage(eventKey, data) {
    chatSocket.emit(eventKey, data)
}
