import { useState } from 'react';
import './css_files/content.css'
import { Link } from 'react-router-dom';
import MusicData from './MusicData.json';
/*
    const albums = [
    {
        id:1,
        name:'',
        artist:'',
        img:''
    },
];
const tracks = [
    {
        id:1,
        title:'',
        artist:'',
        img:''
    },
];
 */

function Content(){

    const [name, setName] = useState('')
    const { albums, tracks, podcasts } = MusicData

    return(
        <div className="content-page">
            <h1 style={{fontWeight: "900",
                        fontSize: "2.4rem",
                        letterSpacing: "-0.1rem",
                        fontFamily: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"
                        }}>Welcome User!</h1>

            <h1 className='headings'>Albums</h1>
            <div className='album-card-container'>
                {albums.map(album => (
                    <Link to={`/details/album/${album.id}`} key={album.id} className="card-link">
                        <div className='album-card'>
                            <img src={album.img} alt={album.name}/>
                            <div className='info'>
                                <div className="title">{album.name}</div>
                                <div className="artist">{album.artist}</div>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>

            <h1 className='headings'>Tracks</h1>
            <div className='track-card-container'> 
                {tracks.map(track=>(
                    <Link to={`/details/tracks/${track.id}`} key={track.id} className="card-link">
                        <div className='track-card'>
                            <img src={track.img} alt={track.title} />
                            <div className='info'>
                                <div className="title">{track.title}</div>
                                <div className="artist">{track.artist}</div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            
            <h1 className='headings'>Podcasts</h1>
            <div className='podcast-card-container'>
                {podcasts.map(podcast=>(
                        <div className='podcast-card'>
                            <img src={podcast.img} alt={podcast.title} />
                            <div className='info'>
                                <div className="title">{podcast.title}</div>
                                <div className="artist">{podcast.host}</div>
                            </div>
                        </div>
                ))}
            </div>
        </div>
    );
}

export default Content;