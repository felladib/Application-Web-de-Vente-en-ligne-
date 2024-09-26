
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {HomeAdmin , Lists, Single , New , Login} from './admin';
// ui materiel icon
function App() {
  return (
    <div className="App">
      {/* admin route */}
      <Router>
        <Routes>

            <Route path="/" >
                <Route index element={<HomeAdmin/>} ></Route>
                <Route path='login' element={<Login/>} ></Route>
            
                <Route path="/Users">
                  <Route index element={<Lists/>} />
                  {/* path user/1253 => user page information  */}
                  <Route path=":userId"  element={<Single/>} />
                  {/* path user/new => user page information  */}
                  <Route path="New" element={<New/>} />
                </Route> 
                <Route path="/Product">
                  <Route index element={<Lists/>} />
                  {/* path user/1253 => user page information  */}
                  <Route path="ProdId"  element={<Single/>} />
                  {/* path user/new => user page information  */}
                  <Route path="New" element={<New/>} />
                </Route> 
            </Route> 
            

          </Routes>
      </Router>
    </div>
  );
}

export default App;
