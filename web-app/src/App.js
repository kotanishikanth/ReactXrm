import './App.css';

import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { Row, Col, Nav, Navbar } from 'react-bootstrap'
import DatabaseContextProvider from './contexts/database-context';

import { Index as HomePage } from './components/home/Index'
import { Index as SettingsPage } from './components/settings/Index'


function App() {
  return (
    <div className="App">
      <DatabaseContextProvider>
        <Router>
          <Row>
            <Col>
              <Navbar bg="light" expand="lg">
                <Navbar.Brand to="/home">React-Xrm</Navbar.Brand>
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
              </Navbar>
            </Col>
          </Row>

          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/settings">
            <SettingsPage />
          </Route>
        </Router>
      </DatabaseContextProvider>
    </div>
  );
}

export default App;
