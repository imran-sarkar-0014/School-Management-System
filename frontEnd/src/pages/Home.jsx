import React from 'react'


//import swiper libraries 
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css";
import "swiper/css/navigation"

import SwiperCore, { Navigation, Autoplay } from 'swiper'
import Hero from '../components/Hero';
import CommonHeader from '../components/CommonHeader';
import HomeDecoration from '../components/HomeDecoration'
import CommonFooter from '../components/CommonFooter'
SwiperCore.use([Navigation, Autoplay])

const Home = () => {


    return (
        <div className='relative h-full'>

            <CommonHeader absolute={true} transparent={true} />

            {/* Hero Section  */}
            <Swiper navigation={false} loop={true} autoplay={{
                delay: 3500,
                disableOnInteraction: false
            }} className='h-full md:h-[80%] shadow-lg shadow-rose-100'>
                <SwiperSlide>
                    <Hero image='/images/background-04.jpg'>
                        <h4 className=' text-slate-600 text-xl md:text-6xl font-bold text-center'>Education is the backbon of a nation.</h4>
                        <p className='text-center mx-auto mt-12 text-gray-800 font-meduim text-sm md:text-lg'>Education means a form of learning in which knowledge, skills and habits are transferred from one generation to the next generation. The education of the person starts when he is born. As there are three levels of education primary, secondary and tertiary, each level equally plays a vital role in the development of the society. Education gives people the skills they need to help themselves out of poverty or in other words into prosperity. It teaches us how one can live his life better, relationships and manner of living in a society then in country and in world at global level.</p>
                    </Hero>
                </SwiperSlide>
                <SwiperSlide>
                    <Hero image='/images/background-02.jpg'>
                        <h4 className='text-slate-600 text-xl md:text-6xl font-bold text-center'>knowledge is Power</h4>
                        <p className='text-center mx-auto mt-12 text-gray-800 font-meduim text-sm md:text-lg'>

                            <p className='mb-1 md:mb-4'>Knowledge isn’t something you acquire overnight, and you have to keep reading and learning new things to increase your knowledge. It’s one of the most things that will keep the increase as you grow up.</p>
                            <p>Knowledge is something that you can always depend on for your whole life. It’s one of the most important and powerful things in the world. You can reach high places for your career with the help of knowledge.</p>
                        </p>
                    </Hero>
                </SwiperSlide>
                <SwiperSlide>
                    <Hero image='/images/background-03.jpg'>
                        <h4 className='text-slate-600 text-xl md:text-6xl font-bold text-center'>Information is Wealth</h4>

                        <p className='text-center mx-auto mt-12 text-gray-800 font-meduim text-sm md:text-lgv'>

                            <p>Information is wealth as you can overcome many impediments and hazards of life with the help of your true knowledge.</p>
                            <p className='my-1'>Information is wealth because this can help you learn the biggest lessons of life.</p>
                            <p>Gain as much Information as you can as it’s better to invest time in something which is constructive and beneficial for human welfare. Knowledge gives you power to survive the worst. So knowledge is not only wealth but also power.</p>

                        </p>
                    </Hero>
                </SwiperSlide>
            </Swiper>


            <div data-aos="fade-down" className='w-full mt-2'>
                <div className='w-[2px] h-32 bg-gray-500 mx-auto'></div>
                <div className='w-[80%] h-[2px] bg-gray-500 mx-auto my-1'></div>
            </div>

            {/* Some Info */}
            <div className='max-w-[80%] mx-auto grid mt-8 md:grid-cols-2 md:space-x-2 overflow-x-hidden'>

                <HomeDecoration dataAos="fade-right" image='/images/campus.jpg' header='Nice and Beautiful Campus' text=' College campuses are known to be beautiful because of academic buildings and classrooms, but there is more than physical beauty.' />
                <HomeDecoration dataAos="fade-left" image='/images/commonRoom.jpg' header='Beautifully Organized Common Room for Student' text='Regular features include couches, televisions, coffee tables, and other generic lounge furniture for socializing.[2] Depending on its location and purpose of use.' />
                <HomeDecoration dataAos="fade-down" image='/images/commonRoom.jpg' header='Nice Playground' text='We have very strong teams of players; they practice different games in the playground. Various matches are held on this playground. The P.T. instructor of our school gives us training in the playground.' />
                <HomeDecoration dataAos="fade-down" image='/images/canteen.jpg' header='Our canteen provide headthy and delicious Food' text='Healthy food refers to foods that contain beneficial nutrients. These nutrients commonly include carbohydrates, protein, fat, minerals, vitamins, and water. Healthy food produces energy for our body and runs all the functions of the body smoothly. It also keeps our immune system healthy.' />

            </div>

            <CommonFooter />

        </div>
    )
}

export default Home