import './App.css';
import Create from './components/create';
import Read from './components/read';
import Update from './components/update';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Dav from './components/dav';
import NodeView from './components/NodeView';

function App() {
  return (
    <Router>
      <div className="main">
        <h2 className="main-header"></h2>
        <div>
          <Route exact path='/create' component={Create} />
        </div>
        <div style={{ marginTop: 20 }}>
          <Route exact path='/read' component={Read}  className="readTable"/>
        </div>

        <Route path='/update' component={Update} />
        <Route exact path='/d' component={Dav} />
        <Route exact path='/n' component={NodeView} />
      </div>
    </Router>
  );
}

export default App;
