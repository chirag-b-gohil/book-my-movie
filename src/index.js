import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import registerServiceWorker from './registerServiceWorker';
import Controller from './screens/Controller';
import { Provider } from "react-redux";
import { userStore } from "./store/user-store";

ReactDOM.render(
    <Provider store={userStore}>
        <Controller />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
