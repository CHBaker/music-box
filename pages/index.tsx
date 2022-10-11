import Head from 'next/head'
import Image from 'next/image'
import GradientLayout from '../components/gradientLayout'
import styles from '../styles/Home.module.css'

const Home = () => (
    <GradientLayout
        color='green'
        subtitle='profile'
        title='Hudson Baker'
        description='15 public playlists'
        image='/cheams.jpg'
        roundImage>
        <div>home</div>
    </GradientLayout>
)

export default Home
