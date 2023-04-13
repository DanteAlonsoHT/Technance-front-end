import { applyMiddleware, combineReducers, compose } from 'redux';
import { legacy_createStore as createStore} from 'redux';
import PostsReducer from './reducers/PostsReducer';
import thunk from 'redux-thunk';
import { AuthReducer } from './reducers/AuthReducer';
import CitationsReducer from './reducers/CitationsReducer';
import MessageReducer from './reducers/MessagesReducer';

const middleware = applyMiddleware(thunk);

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    posts: PostsReducer,
    auth: AuthReducer,
    citations: CitationsReducer,
    messages: MessageReducer,
});

export const store = createStore(reducers,  composeEnhancers(middleware));
