import {
    ButtonGroup,
    Box,
    IconButton,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderTrack,
    RangeSliderThumb,
    Center,
    Flex,
    Text,
} from '@chakra-ui/react'
import ReactHowler from 'react-howler'
import { useEffect, useRef, useState } from 'react'
import {
    MdShuffle,
    MdSkipPrevious,
    MdSkipNext,
    MdOutlinePlayCircleFilled,
    MdOutlineRepeat,
    MdPauseCircleFilled,
} from 'react-icons/md'
import { useStoreActions } from 'easy-peasy'
import { formatTime } from '../lib/formatters'

const Player = ({ songs, activeSong }) => {
    const [playing, setPlaying] = useState(true)
    const [index, setIndex] = useState(0)
    const [isSeeking, setIsSeeking] = useState(false)
    const [seek, setSeek] = useState(0.0)
    const [repeat, setRepeat] = useState(false)
    const [shuffle, setShuffle] = useState(false)
    const [duration, setDuration] = useState(0.0)

    useEffect(() => {
        let timerId

        if (playing && !isSeeking) {
            const f = () => {
                setSeek(soundRef.current.seek())
                timerId = requestAnimationFrame(f)
            }

            timerId = requestAnimationFrame(f)
            return () => cancelAnimationFrame(timerId)
        }

        cancelAnimationFrame(timerId)
    }, [playing, isSeeking])

    const soundRef = useRef(null)

    const changePlayState = (value) => setPlaying(value)
    const changeRepeatState = () => setRepeat((state) => !state)
    const changeShuffleState = () => setShuffle((state) => !state)

    const prevSong = () =>
        setIndex((state) => (state ? state - 1 : songs.length - 1))

    const nextSong = () =>
        setIndex((state) => {
            if (shuffle) {
                const next = Math.floor(Math.random() * songs.length)

                return next === state ? nextSong() : next
            }
            return state === songs.length - 1 ? 0 : state + 1
        })

    const onEnd = () =>
        repeat ? (setSeek(0), soundRef.current.seek(0)) : nextSong()

    const onLoad = () => setDuration(soundRef.current.duration())

    const onSeek = (e) => {
        setSeek(parseFloat(e[0]))
        soundRef.current.seek(e[0])
    }

    return (
        <Box>
            <Box>
                <ReactHowler
                    playing={playing}
                    src={activeSong?.url}
                    ref={soundRef}
                    onLoad={onLoad}
                    onEnd={onEnd}
                />
            </Box>
            <Center color='gray.600'>
                <ButtonGroup>
                    <IconButton
                        outline='none'
                        variant='link'
                        aria-label='shuffle'
                        fontSize='24px'
                        icon={<MdShuffle />}
                        color={shuffle ? 'white' : 'gray.600'}
                        onClick={changeShuffleState}
                    />
                    <IconButton
                        outline='none'
                        variant='link'
                        aria-label='skip previous'
                        fontSize='24px'
                        icon={<MdSkipPrevious />}
                        onClick={prevSong}
                    />

                    {playing ? (
                        <IconButton
                            outline='none'
                            variant='link'
                            aria-label='pause'
                            fontSize='40px'
                            color='white'
                            icon={<MdPauseCircleFilled />}
                            onClick={() => changePlayState(false)}
                        />
                    ) : (
                        <IconButton
                            outline='none'
                            variant='link'
                            aria-label='play'
                            fontSize='40px'
                            color='white'
                            icon={<MdOutlinePlayCircleFilled />}
                            onClick={() => changePlayState(true)}
                        />
                    )}

                    <IconButton
                        outline='none'
                        variant='link'
                        aria-label='skip next'
                        fontSize='24px'
                        icon={<MdSkipNext />}
                        onClick={nextSong}
                    />
                    <IconButton
                        outline='none'
                        variant='link'
                        aria-label='repeat'
                        fontSize='24px'
                        icon={<MdOutlineRepeat />}
                        onClick={changeRepeatState}
                        color={repeat ? 'white' : 'gray.600'}
                    />
                </ButtonGroup>
            </Center>

            <Box color='gray.600'>
                <Flex justify='center' align='center'>
                    <Box width='10%'>
                        <Text fontSize='xs'>{formatTime(seek)}</Text>
                    </Box>

                    <Box width='80%'>
                        <RangeSlider
                            aria-label={['min', 'max']}
                            step={0.1}
                            min={0}
                            max={duration ? duration.toFixed(2) : 0}
                            onChange={onSeek}
                            value={[seek]}
                            onChangeStart={() => setIsSeeking(true)}
                            onChangeEnd={() => setIsSeeking(false)}
                            id='player-range'>
                            <RangeSliderTrack bg='gray.800'>
                                <RangeSliderFilledTrack bg='gray.600' />
                            </RangeSliderTrack>
                            <RangeSliderThumb index={0} />
                        </RangeSlider>
                    </Box>

                    <Box width='10%' textAlign='right'>
                        <Text fontSize='xs'>{formatTime(duration)}</Text>
                    </Box>
                </Flex>
            </Box>
        </Box>
    )
}

export default Player
