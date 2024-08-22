import React, { useState, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaStepForward, FaStepBackward, FaRedo, FaCog, FaList } from 'react-icons/fa';

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: ${props => props.isHovered ? '350px' : '60px'};
  height: ${props => props.isHovered ? 'auto' : '60px'};
  background: rgba(17, 17, 17, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 14px;
  padding: ${props => props.isHovered ? '16px' : '0'};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: all 0.3s ease;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlayerContent = styled.div`
  display: ${props => props.isHovered ? 'flex' : 'none'};
  flex-direction: column;
  opacity: ${props => props.isHovered ? 1 : 0};
  transition: opacity 0.3s ease;
  width: 100%;
`;

const SongInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const AlbumArt = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  margin-right: 12px;
`;

const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const SongTitle = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: #fff;
`;

const ArtistName = styled.span`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  margin-bottom: 8px;
  overflow: hidden;
  cursor: pointer;
`;

const Progress = styled.div`
  width: ${props => props.value}%;
  height: 100%;
  background: #0072F5;
  transition: width 0.2s ease;
`;

const TimeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  margin-bottom: 12px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const VolumeControl = styled.input`
  width: 80px;
  margin: 0 10px;
`;

const CompactIcon = styled.div`
  color: #fff;
  font-size: 24px;
  display: ${props => props.isHovered ? 'none' : 'flex'};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const LyricsContainer = styled.div`
  max-height: 200px;
  overflow-y: auto;
  margin-top: 10px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  color: #fff;
  scroll-behavior: smooth;
`;

const LyricLine = styled.p`
  color: ${props => props.active ? '#fff' : 'rgba(255, 255, 255, 0.6)'};
  font-size: ${props => props.active ? '16px' : '14px'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  transition: all 0.3s ease;
  margin: 5px 0;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`;


const BackgroundMusic = () => {
    const lyricsContainerRef = useRef(null);
    const lyricLineRefs = useRef([]);
  const activeLyricRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [lyrics, setLyrics] = useState([]);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);
  const [showLyrics, setShowLyrics] = useState(false);
  const playerRef = useRef(null);
  const intervalRef = useRef(null);

  const playlist = [
    { 
        id: 'DX4BE9GmpH4', 
        title: 'SUPERPOWER', 
        artist: 'VALORANT',
        albumArt: 'https://images.genius.com/c7e2cdac169c3f8b973825f920815d87.1000x1000x1.png',  // 실제 앨범 아트 URL로 교체하세요
      lrcFile: '/lyrics/superpower.lrc'
    },
    { 
        id: 'R_RAWjqdgTs', 
        title: 'SUPERDOPA', 
        artist: '아야츠노 유니 ',
        albumArt: 'https://i.namu.wiki/i/-fk4Rrtdxg2rSOq5Fqbl9C7I4EuqNw1j5N9VTSi4v5kwmauMYZD-UvBETpmrX5qnkVaAlk6GOTlnlr3gECLSxQ.webp',  // 실제 앨범 아트 URL로 교체하세요
      lrcFile: '/path/to/lyrics2.lrc'
    },
    // Add more songs to the playlist
  ];

  const onReady = (event) => {
    playerRef.current = event.target;
    setDuration(playerRef.current.getDuration());
  };

  const togglePlay = () => {
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (isMuted) {
      playerRef.current.unMute();
      playerRef.current.setVolume(volume);
    } else {
      playerRef.current.mute();
    }
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    playerRef.current.setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
      playerRef.current.unMute();
    }
  };

  const handleProgressChange = (e) => {
    const clickedValue = e.nativeEvent.offsetX / e.target.offsetWidth;
    const newTime = clickedValue * duration;
    playerRef.current.seekTo(newTime);
    setProgress(clickedValue * 100);
    setCurrentTime(newTime);
  };

  const toggleRepeat = () => {
    setIsRepeating(!isRepeating);
  };

  const changePlaybackRate = () => {
    const rates = [0.5, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    const newRate = rates[nextIndex];
    setPlaybackRate(newRate);
    playerRef.current.setPlaybackRate(newRate);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const previousTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
  };

  const parseLRC = (lrcContent) => {
    const lines = lrcContent.split('\n');
    const parsedLyrics = [];
    
    lines.forEach(line => {
      const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\](.*)/);
      if (match) {
        const minutes = parseInt(match[1]);
        const seconds = parseInt(match[2]);
        const centiseconds = parseInt(match[3]);
        const text = match[4].trim();
        const time = minutes * 60 + seconds + centiseconds / 100;
        parsedLyrics.push({ time, text });
      }
    });
    
    return parsedLyrics;
  };

  const loadLyrics = async () => {
    try {
      const response = await fetch(playlist[currentTrackIndex].lrcFile);
      const lrcContent = await response.text();
      console.log('Loaded LRC content:', lrcContent);
      const parsedLyrics = parseLRC(lrcContent);
      console.log('Parsed lyrics:', parsedLyrics);
      setLyrics(parsedLyrics);
    } catch (error) {
      console.error('Failed to load lyrics:', error);
      setLyrics([]);
    }
  };

  const handleLyricClick = (time) => {
    playerRef.current.seekTo(time);
    setCurrentTime(time);
    setProgress((time / duration) * 100);
  };

  const scrollToActiveLyric = (index) => {
    if (lyricsContainerRef.current) {
      const container = lyricsContainerRef.current;
      const lyricElements = container.children;
      if (lyricElements[index]) {
        lyricElements[index].scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  };

  useEffect(() => {
    loadLyrics();
  }, [currentTrackIndex]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        const currentTime = playerRef.current.getCurrentTime();
        setCurrentTime(currentTime);
        setProgress((currentTime / duration) * 100);

        const newLyricIndex = lyrics.findIndex((lyric, index) => 
          currentTime >= lyric.time && (index === lyrics.length - 1 || currentTime < lyrics[index + 1].time)
        );
        
        if (newLyricIndex !== -1 && newLyricIndex !== currentLyricIndex) {
          setCurrentLyricIndex(newLyricIndex);
          scrollToActiveLyric(newLyricIndex);
        }
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, duration, lyrics, currentLyricIndex]);

  const toggleLyrics = () => {
    setShowLyrics(!showLyrics);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      loop: isRepeating ? 1 : 0,
      modestbranding: 1,
      playlist: playlist[currentTrackIndex].id,
    },
  };

  return (
    <>
      <YouTube
        videoId={playlist[currentTrackIndex].id}
        opts={opts}
        onReady={onReady}
        onEnd={isRepeating ? null : nextTrack}
        style={{ display: 'none' }}
      />
      <PlayerContainer
        isHovered={isHovered}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CompactIcon isHovered={isHovered} onClick={togglePlay}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </CompactIcon>
        <PlayerContent isHovered={isHovered}>
          <SongInfo>
            <AlbumArt 
              src={playlist[currentTrackIndex].albumArt} 
              alt={playlist[currentTrackIndex].title} 
            />
            <TextInfo>
              <SongTitle>{playlist[currentTrackIndex].title}</SongTitle>
              <ArtistName>{playlist[currentTrackIndex].artist}</ArtistName>
            </TextInfo>
          </SongInfo>
          <ProgressBar onClick={handleProgressChange}>
            <Progress value={progress} />
          </ProgressBar>
          <TimeInfo>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </TimeInfo>
          <Controls>
            <Button onClick={previousTrack} aria-label="Previous track">
              <FaStepBackward />
            </Button>
            <Button onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </Button>
            <Button onClick={nextTrack} aria-label="Next track">
              <FaStepForward />
            </Button>
            <Button onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </Button>
            <VolumeControl 
              type="range" 
              min="0" 
              max="100" 
              value={volume} 
              onChange={handleVolumeChange} 
              aria-label="Volume"
            />
            <Button onClick={toggleRepeat} aria-label={isRepeating ? "Turn off repeat" : "Turn on repeat"}>
              <FaRedo color={isRepeating ? "#0072F5" : "#fff"} />
            </Button>
            <Button onClick={toggleLyrics} aria-label="Toggle lyrics">
              <FaList color={showLyrics ? "#0072F5" : "#fff"} />
            </Button>
          </Controls>
          {showLyrics && (
        <LyricsContainer ref={lyricsContainerRef}>
          {lyrics.length > 0 ? (
            lyrics.map((line, index) => (
              <LyricLine 
                key={index} 
                active={index === currentLyricIndex}
                onClick={() => handleLyricClick(line.time)}
                ref={el => lyricLineRefs.current[index] = el}
              >
                {line.text}
              </LyricLine>
            ))
          ) : (
            <p>No lyrics available</p>
          )}
        </LyricsContainer>
          )}
        </PlayerContent>
      </PlayerContainer>
    </>
  );
};

export default BackgroundMusic;