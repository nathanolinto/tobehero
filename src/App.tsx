import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthContextProvider } from './contexts/AuthContext';

import { QueryClient, QueryClientProvider } from 'react-query';

import { GlobalStyle } from "./globalStyles";
import Login from "./pages/Login";
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';
import Home from './pages/Home';
import Details from './pages/Details';

import { ToastContainer } from 'react-toastify';


const queryClient = new QueryClient();

function App() {
    return (
        <>
            <GlobalStyle />
            <ToastContainer />
            <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                
                        <AuthContextProvider>
                            <Switch>
                                <Route path="/login" exact component={Login} />
                                <Route path="/register" exact component={Register} />

                                <Route path="/profile" exact component={Profile} />
                                <Route path="/incidents/new" exact component={NewIncident} />

                                <Route path="/" exact component={Home} />
                                <Route path="/:id" component={Details} />
                            </Switch>
                        </AuthContextProvider>
                
                
            </BrowserRouter>
            </QueryClientProvider>
        </>
    );
}

export default App;
