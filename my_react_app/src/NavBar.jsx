import './css_files/navigation.css'
import { Link } from 'react-router-dom'

function NavBar(){
    return(
        <>
            <div className='navbar-vertical-container'>
                <Link to="/">Home</Link>
                <Link to="/Search">Search</Link>
                <Link to="/submissions">Submissions</Link>
            </div>
        </>
    );
}

export default NavBar;