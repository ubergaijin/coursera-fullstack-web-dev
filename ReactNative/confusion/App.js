import * as React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigureStore } from './redux/configureStore';
import { Loading } from './components/LoadingComponent';

const { persistor, store } = ConfigureStore();

export default class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <Main />
          </PersistGate>
        </Provider>
    );
  }
}
