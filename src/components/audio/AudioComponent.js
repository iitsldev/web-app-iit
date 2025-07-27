import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import useTranslation from 'next-translate/useTranslation';

function AudioComponent() {
    const { t } = useTranslation('audio');
    const [isPlaying, setIsPlaying] = useState(false);
    const [playLabel, setPlayLable] = useState("Play")

    const handlePlaying = () => {
         if(isPlaying) {
            setIsPlaying(false);
            setPlayLable("Play");
         } else{
            setIsPlaying(true);
            setPlayLable("Stop");
         } 
    }

    return (
        <div>
            <div className='player-wrapper'>
                <ReactPlayer
                className='react-player'
                url="https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3"
                playing={isPlaying}
                width={0}
                height={0}
                />
            </div>
            <button onClick={handlePlaying}>{t(playLabel.toLowerCase())}</button>
        </div>
    );
}

export default AudioComponent;
