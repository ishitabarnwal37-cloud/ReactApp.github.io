import NavBar from './NavBar.jsx'
import Content from './Content.jsx'
import Settings from './Submissions.jsx'
import Search from './Search.jsx'
import Details from './Details.jsx'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import './css_files/App.css'

function App(){
  return (
  <>
    <div className='website-layout' style={{margin:0 ,padding:0}}>
      <Router>
        <aside className='navbar'><NavBar/></aside>
        <main className='content'>
          <Routes>
            <Route path="/" element={<Content/>}/>
            <Route path="/details/:type/:id" element={<Details/>}/>
            <Route path="/Search" element={<Search/>}/>
            <Route path="/submissions" element={<Settings/>}/>
          </Routes>
        </main>
      </Router>
    </div>
  </>
    
  );
}

export default App;