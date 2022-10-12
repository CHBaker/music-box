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

const Player = ({ songs, activeSong }) => {
    const [playing, setPlaying] = useState(true)
    const [index, setIndex] = useState(0)
    const [seek, setSeek] = useState(0.0)
    const [repeat, setRepeat] = useState(false)
    const [shuffle, setShuffle] = useState(false)
    const [duration, setDuration] = useState(0.0)

    const changePlayState = (value) => setPlaying(value)
    const changeRepeatState = () => setRepeat((state) => !state)
    const changeShuffleState = () => setShuffle((state) => !state)

    return (
        <Box>
            <Box>
                <ReactHowler playing={playing} src={activeSong?.url} />
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
                        <Text fontSize='xs'>1:21</Text>
                    </Box>

                    <Box width='80%'>
                        <RangeSlider
                            aria-label={['min', 'max']}
                            step={0.1}
                            min={0}
                            max={321}
                            id='player-range'>
                            <RangeSliderTrack bg='gray.800'>
                                <RangeSliderFilledTrack bg='gray.600' />
                            </RangeSliderTrack>
                            <RangeSliderThumb index={0} />
                        </RangeSlider>
                    </Box>

                    <Box width='10%' textAlign='right'>
                        <Text fontSize='xs'>321</Text>
                    </Box>
                </Flex>
            </Box>
        </Box>
    )
}

export default Player
