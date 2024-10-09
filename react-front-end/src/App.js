import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Patient_login from './Patient_Login';
import {Routes, Link} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Routes exact path="/" component={Home} />
      <Routes exact path="/patientLogin" component={Patient_login} />


      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
