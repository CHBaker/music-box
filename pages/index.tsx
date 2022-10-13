import Head from 'next/head'
import GradientLayout from '../components/gradientLayout'
import styles from '../styles/Home.module.css'
import prisma from '../lib/prisma'
import { Image } from '@chakra-ui/react'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { useMe } from '../lib/hooks'

const Home = ({ artists }) => {
    const { user } = useMe()

    return (
        <GradientLayout
            color='purple'
            subtitle='profile'
            title={`${user?.firstName} ${user?.lastName}`}
            description={`${user?.playlistsCount} public playlists`}
            image='/cheams.jpg'
            roundImage>
            <Box color='white' paddingX='40px'>
                <Box marginBottom='40px'>
                    <Text fontSize='2xl' fontWeight='bold'>
                        Top artist this month
                    </Text>
                    <Text fontSize='sm'>only visible to you</Text>
                </Box>
                <Flex>
                    {artists.map((artist) => (
                        <Box paddingX='10px' width='20%' key={artist.id}>
                            <Box
                                bg='gray.900'
                                borderRadius='4px'
                                padding='15px'
                                width='100%'>
                                <Image
                                    src='https://www.placecage.com/gif/500/500'
                                    borderRadius='100%'
                                />
                                <Box marginTop='20px'>
                                    <Text fontSize='x-large'>
                                        {artist.name}
                                    </Text>
                                    <Text>Artist</Text>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Flex>
            </Box>
        </GradientLayout>
    )
}

export const getServerSideProps = async () => {
    const artists = await prisma.artist.findMany({})

    return {
        props: { artists },
    }
}

export default Home
