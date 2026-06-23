import { Link, useParams } from 'react-router-dom'
import {useState,useEffect} from 'react'
import './css_files/details.css'
import musicData from './MusicData.json'

function Details(){
    const {type,id} = useParams()
    const [albumData,setAlbumData] = useState(null)
    const [trackData,setTrackData] = useState(null)
    const [podcastData,setPodcastData] = useState(null)
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        setLoading(true)
        setAlbumData(null)
        setTrackData(null)
        setPodcastData(null)

        if(type == "album"){
            fetch(`https://musicbrainz.org/ws/2/release/${id}?inc=recordings+artist-credits&fmt=json`,{
                headers:{
                    'User-Agent': 'MyApp/1.0.0 (name@email.com)'
                }
            }).then(res => res.json()).then(data => {setAlbumData(data)
                                                   setLoading(false)
            }).catch(e=>console.error("can't access the api. :(",e))
        }
        else if (type === "tracks") {
            const foundTrack = musicData.tracks.find(t => String(t.id) === String(id))
            setTrackData(foundTrack)
            setLoading(false)
        } 
        else if (type === "podcasts") {
            const foundPodcast = musicData.podcasts.find(p => String(p.id) === String(id))
            setPodcastData(foundPodcast)
            setLoading(false)
        }
    },[id,type])

    if(loading) return <div>Loading the page</div>

    const formatTime = (lengthMs) => {
        if (!lengthMs) return "0:00";
        const min = Math.floor(lengthMs / 60000);
        const sec = (Math.floor(lengthMs / 1000) % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    };

    return(
        <>
          <div className="details-container">
            {type === "album" && albumData && (
                <>
                    <h1>{albumData.title}</h1>
                    <h2>
                        By: {albumData['artist-credit']?.map(ac => ac.name).join(', ')}
                    </h2>
                    <div className="track-list">
                        {(albumData.media?.[0]?.tracks || []).map((track) => (
                            <div key={track.id} className="track-item" >
                                <span>{track.title}</span>
                                <span>
                                    ({formatTime(track.length)})
                                </span>
                            </div>
                        ))}
                    </div>
                </>
            )}
            {type === "tracks" && trackData && (
                <>
                    <h1>{trackData.title}</h1>
                    <h2>
                        Artist : {trackData.artist}
                    </h2>
                    <p className="meta-tag"><strong>Genre:</strong> {trackData.genre}</p>
                    <p className="meta-tag"><strong>Duration:</strong> {trackData.duration}</p>
                </>
            )}
            {type === "podcasts" && podcastData && (
                <>
                    <h1>{podcastData.title}</h1>
                    <h2>
                        Hosted by : {podcastData.host}
                    </h2>
                    <p className="meta-tag"><strong>No of Episodes :</strong> {podcastData.episodes}</p>
                    <p className="meta-tag"><strong>Category :</strong> {podcastData.category}</p>
                    <p className="meta-tag"><strong>Description :</strong> {podcastData.description}</p>
                </>
            )}
            {((type === "track" && !trackData) || (type === "podcast" && !podcastData)) && (
                <div className="error-view">
                    <h1>Item Not Found</h1>
                </div>
            )}
        </div>
        </>
    )

}

export default Details