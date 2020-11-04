import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import Cookies from 'js-cookie';
import rootReducer from './reducers';
import { setUserDataFromStorage } from './actions/signActions';

export const history = createBrowserHistory();

const checkLogin = store => next => action => {

    const storedStrUserData = Cookies.get("userData");
    const storedUserData = storedStrUserData ? JSON.parse(storedStrUserData) : null;
    let flag = false;

    if (storedUserData && storedUserData.token) {

        const { userData } = store.getState().sign;

        if (!userData || !userData.token) {
            flag = true;
            next(action);
            store.dispatch(setUserDataFromStorage(storedUserData));
        }
    }

    const userData = store.getState().sign && store.getState().sign.userData;

    const { location } = store.getState().router;
    if (!flag)
        next(action);

    if (!userData || !userData.token) {
        if ([
            "/signin",
            "/signup",
            "/success-signin",
            "/confirm-account",
            "/reset-password",
            "/reset-password-form"
        ].indexOf(location.pathname) < 0)
            history.push("/signin");
    }

};

const middleware = [thunk, checkLogin, routerMiddleware(history)];

export default function configureStore(preloadedState) {

    const store = createStore(
        rootReducer(history),
        preloadedState,
        window.__REDUX_DEVTOOLS_EXTENSION__
            ? compose(
                applyMiddleware(...middleware),
                window.__REDUX_DEVTOOLS_EXTENSION__ &&
                window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
            )
            : compose(applyMiddleware(...middleware))
    );

    return store;
}