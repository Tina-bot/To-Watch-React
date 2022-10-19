import './App.css';
import logo from './assets/img/logo-net.png'
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      <img src={logo} alt='logo' />
      <TodoList/>
    </div>
  );
}

export default App;
