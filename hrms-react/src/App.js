import './App.css';
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';
import Navi from './layouts/Navi';
import Dashboard from './layouts/Dashboard';
import Footer from './layouts/Footer';


function App() {

  return (
    <div className="App">
      <Navi />
      <Dashboard />
      <Footer />
    </div>
  );
}
export default App;
