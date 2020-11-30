import React from 'react';
import conversationView from './conversationView';
import conversationList from './conversationList';

export default class chatWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render = () => {
        return (
            <div>
                <conversationList></conversationList>
                <conversationView></conversationView>
            </div>
        )
    }
}