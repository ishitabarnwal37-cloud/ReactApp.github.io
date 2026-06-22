import { Link, useParams } from 'react-router-dom'
import {useState,useEffect} from 'react'
import './css_files/details.css'

function Details(){
    const {type,id} = useParams()
    const [albumData,setAlbumData] = useState(null)
    const [trackData,setTrackData] = useState(null)
    const [PodcastData,setPodcastData] = useState(null)
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        setLoading(true)

        if(type == "album"){
            fetch(`https://musicbrainz.org/ws/2/release/${id}?inc=recordings+artist-credits&fmt=json`,{
                headers:{
                    'User-Agent': 'MyApp/1.0.0 (name@email.com)'
                }
            }).then(res => res.json()).then(data => {setAlbumData(data)
                                                   setLoading(false)
            }).catch(e=>console.error("can't access the api. :(",e))
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
                                <span >
                                    ({formatTime(track.length)})
                                </span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
        </>
    )

}

export default Details