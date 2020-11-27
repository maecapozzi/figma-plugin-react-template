import * as React from 'react';
import axios from 'axios';
import '../styles/ui.css';

const App = ({}) => {
    const syncVersion = React.useCallback(() => {
        const endpoint = 'http://localhost:3000/';

        axios({
            method: 'post',
            url: endpoint,
        })
            .then((response) => {
                if (response.status === 200) {
                    parent.postMessage({pluginMessage: {type: 'semantic-version', data: response.data}}, '*');
                }
            })
            .catch((error) => console.log(error));
    }, []);

    const onCancel = React.useCallback(() => {
        parent.postMessage({pluginMessage: {type: 'cancel'}}, '*');
    }, []);

    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const {type, message} = event.data.pluginMessage;
            if (type === 'semantic-version') {
                console.log(`Figma Says: ${message}`);
            }
        };
    }, []);

    return (
        <div>
            <button
                id="create"
                onClick={() => {
                    syncVersion();
                }}
            >
                Sync version
            </button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default App;
