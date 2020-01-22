import React from 'react';
import Navigator from './routes/mainStack';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer);

const App = () => {
    return (
        <Provider store={store}>
            <Navigator />
        </Provider>
    );
};

export default App;
