import {applyMiddleware, compose, createStore} from 'redux';
import Cookies from 'js-cookie';
import {createCookieMiddleware} from 'redux-cookie';
import thunk from 'redux-thunk';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';
import rootReducer from './reducers';
import {setUserDataFromCookie} from './actions/signActions';

export const history = createBrowserHistory();

/*
const logger = store => next => action => {
    // agrupamos lo que vamos a mostrar en
    // consola usando el tipo de la acción
    console.group(action.type);
    // mostramos el estado actual del store
    console.debug('current state', store.getState());
  
    // mostramos la acción despachada
    console.debug('action', action);
  
    // empezamos a contar cuanto se tarda en
    // aplicar la acción
    console.time('duration');
  
    // pasamos la acción al store
    next(action);
  
    // terminamos de contar
    console.timeEnd('duration');
  
    // mostramos el estado nuevo
    console.debug('new state', store.getState());
    // terminamos el grupo
    console.groupEnd();
};
*/

const checkLogin = store => next => action => {

    //Cookies("userData", {data: "myData"});

    const cookieStrUserData = Cookies.get("userData");
    const cookieUserData = cookieStrUserData ? JSON.parse(cookieStrUserData) : null;
    let flag = false;

    if(cookieUserData && cookieUserData.id) {
        
        const {userData} = store.getState().sign;

        if(!userData || !userData.id){
            flag = true;
            next(action);
            store.dispatch(setUserDataFromCookie(cookieUserData));
        }
    }

    const userData = store.getState().sign && store.getState().sign.userData;

    const {location} = store.getState().router;
    if(!flag)
        next(action);

    if(location && location.pathname !== "/sign" && (!userData || !userData.id))
        history.push("/sign");
    
};

const middleware = [thunk, checkLogin, /*logger, */createCookieMiddleware(Cookies), routerMiddleware(history)];

export default function configureStore(preloadedState, cookiesPath) {

    const store = createStore(
        rootReducer(history), 
        preloadedState, 
        compose(
            applyMiddleware(
                ...middleware
            ),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({trace:true})
        )
    );

    return store;
}