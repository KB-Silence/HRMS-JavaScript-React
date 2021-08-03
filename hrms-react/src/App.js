import './App.css';
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';
import Navi from './layouts/Navi';
import Footer from './layouts/Footer';
import Dashboard from './layouts/Dashboard';
import { Grid } from 'semantic-ui-react';


function App() {

  return (
    <div className="App">
      <Grid stackable textAlign="center" padded relaxed>
        <Grid.Row>
          <Navi />
        </Grid.Row>

        <Grid.Row centered textAlign="center">
          <Grid.Column textAlign="center" mobile="16" tablet="14" computer="12">
            <Dashboard />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row style={{margin:"0px", padding:"0px"}}>
          <Grid.Column style={{padding:"0px"}}>
            <Footer />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
export default App;
