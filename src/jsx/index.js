import React, { useState, useEffect } from 'react';
/// React router dom
import {Switch, Route } from 'react-router-dom'
/// Css
import './index.css'
import './chart.css'
import './step.css'

import { connect, useSelector, useDispatch } from "react-redux";
import { store } from "../store/store";
/// Layout
import Nav from './layouts/nav'
import Footer from './layouts/Footer'

/// Dashboard
import Home from "./pages/Home";

/// App
import AppProfile from './components/AppsMenu/AppProfile/AppProfile'
import ContactUs from './components/AppsMenu/ContactUs/ContactUs'

/// Pages
import Registration from './pages/Registration'
import Login from './pages/Login'
import LockScreen from './pages/Locks/LockScreen'
import Error400 from './pages/Errors/Error400'
import Error403 from './pages/Errors/Error403'
import Error404 from './pages/Errors/Error404'
import Error500 from './pages/Errors/Error500'
import Error503 from './pages/Errors/Error503'

//Scroll To Top
import ScrollToTop from './layouts/ScrollToTop';
import { getCitationsAction } from '../store/actions/CitationActions';
import { deleteMessages } from '../store/actions/MessageActions';

const Markup = (props) => {
  const stateRedux = useSelector((state) => state);
  const dispatch = useDispatch();

  const dataUser = store.getState().auth.auth;

  const { citations } = stateRedux.citations;

  useEffect(() => {
    //dispatch(getHotelsImpalaAction(props.history));
    dispatch(getCitationsAction(props.history));
    dispatch(deleteMessages());
  }, [dispatch, props.history]);

  let path = window.location.pathname
  path = path.split('/')
  path = path[path.length - 1]
  let pagePath = !path.split('-').includes('app')
  const [activeEvent, setActiveEvent] = useState(!path)

  const routes = [
    /// Dashboard
    { url: "", component: (props) => <Home {...props} citations={citations} />},
    /// Profile
    { url: 'app-profile', component: (props) => <AppProfile {...props} /> },
    { url: 'contact-us', component: (props) => <ContactUs {...props} userDetails={dataUser.userDetails} token={dataUser.authToken} /> },
  

    /// pages
    //{ url: 'page-register', component: (props) => <Registration {...props} /> },
    { url: '*', component: (props) => <Error404 {...props} /> },
    //{ url: 'page-login', component: (props) => <Login {...props} /> },
    //{ url: 'page-error-400', component: (props) => <Error400 {...props} /> },
    //{ url: 'page-error-403', component: (props) => <Error403 {...props} /> },
    //{ url: 'page-error-404', component: (props) => <Error404 {...props} /> },
    //{ url: 'page-error-500', component: (props) => <Error500 {...props} /> },
    //{ url: 'page-error-503', component: (props) => <Error503 {...props} /> },
  ]

  let routesList = routes.filter((a) => a.url !== '*')
  routesList = routesList.map((a) => a.url)
  pagePath = !routesList.includes(path)

  return (
       <> 
          <div
            id={`${!pagePath ? 'main-wrapper' : ''}`}
            className={`${!pagePath ? 'show' : 'hide'}`}
          >
            {!pagePath && (
              <Nav
                onClick={() => setActiveEvent(!activeEvent)}
                activeEvent={activeEvent}
                onClick2={() => setActiveEvent(false)}
                onClick3={() => setActiveEvent(true)}
              />
            )}
            <div
              className={` ${!path && activeEvent ? 'rightside-event' : ''} ${
                !pagePath ? 'content-body' : ''
              }`}
            >
              <div
                className={`${!pagePath ? 'container-fluid' : ''}`}
                style={{ minHeight: window.screen.height - 60 }}
              >
                <Switch>
                  {routes.map((data, i) => (
                    <Route
                      key={i}
                      exact
                      path={`/${data.url}`}
                      render={data.component}
                    />
                  ))}
                </Switch>
              </div>
            </div>
            {!pagePath && <Footer />}
          </div>
         <ScrollToTop />
       </>
  )
}

export default Markup
