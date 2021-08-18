import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import AuthProvider from "./AuthProvider"
import Home from "./Home"
import Login from "./Login"
let App = () => {

  return (
    <>
      {/* logical componet are built this way */}
      <AuthProvider> 
        <Router>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
