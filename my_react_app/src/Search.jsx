import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import MusicData from './MusicData.json'



function Search(){
    const [query,setQuery] = useState('')
    const {albums,tracks,podcasts} = MusicData

    const filteredAlbums = albums.filter(album=> album.name.toLowerCase().includes(query.toLowerCase())
                                              || album.artist.toLowerCase().includes(query.toLowerCase())
                                            )
    
    const filteredTracks = tracks.filter(track=> track.title.toLowerCase().includes(query.toLowerCase())
                                              || track.artist.toLowerCase().includes(query.toLowerCase())
                                            )
    
    const filteredPodcasts = podcasts.filter(podcast=> podcast.title.toLowerCase().includes(query.toLowerCase())
                                              || podcast.host.toLowerCase().includes(query.toLowerCase())
                                            )

    return(
        <div className='search-page'>
            <h1>Search</h1>
            <div className='search-input'>
                <input type="text" placeholder="What do you want to listen to ?" value={query} onChange={(e)=>setQuery(e.target.value)}/>
            </div>

            <div className="search-results-container">
                <h2>Albums Found:</h2>
                { filteredAlbums.length > 0 ? (
                        <div className='album-card-container'>
                            {filteredAlbums.map(album=>(
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
                        </div>):
                                (<p className="no-results">No albums found matching "{query}"</p>
                    )}

                <h2>Tracks Found:</h2>
                { filteredTracks.length > 0 ? (
                        <div className='track-card-container'>
                            {filteredTracks.map(track=>(
                                <Link to={`/details/track/${track.id}`} key={track.id} className="card-link">
                                    <div className='track-card'>
                                        <img src={track.img} alt={track.name}/>
                                            <div className='info'>
                                                <div className="title">{track.name}</div>
                                                <div className="artist">{track.artist}</div>
                                            </div>
                                    </div>
                                </Link>
                            ))}
                        </div>):
                                (<p className="no-results">No tracks found matching "{query}"</p>
                    )}

                <h2>Podcasts Found:</h2>
                { filteredPodcasts.length > 0 ? (
                        <div className='podcast-card-container'>
                            {filteredPodcasts.map(podcast=>(
                                <Link to={`/details/podcast/${podcast.id}`} key={podcast.id} className="card-link">
                                    <div className='podcast-card'>
                                        <img src={podcast.img} alt={podcast.name}/>
                                            <div className='info'>
                                                <div className="title">{podcast.title}</div>
                                                <div className="artist">{podcast.host}</div>
                                            </div>
                                    </div>
                                </Link>
                            ))}
                        </div>):
                                (<p className="no-results">No podcasts found matching "{query}"</p>
                    )}

            </div>
        </div>
    )
}

export default Search;