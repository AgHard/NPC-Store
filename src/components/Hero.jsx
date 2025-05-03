import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ImageSlider from './ImageSlider';
import { bannerImg } from './../utils/index';

const Hero = () => {

  useGSAP(() => {
    gsap.to('#hero', { opacity: 1, delay: 2 })
    gsap.to('#cta', { opacity: 1, y: 0, delay: 2 })
  }, [])

  return (
    <section className="relative w-full bg-black nav-height top-20 sm:top-20 md:top-28 lg:top-36 xl:top-44">
      <div className="flex flex-col items-center justify-center w-full gap-8 h-5/6">
        <img 
          src={bannerImg} 
          alt="Feature Character" 
          className="z-10 object-contain w-full h-full" 
        />

        {/* <ImageSlider /> */}
      </div>

      {/* CTA Section */}
      {/* <div id="cta" className="flex flex-col items-center translate-y-20 opacity-0">
        <Link to="/games" className="btn">Discover</Link>
        <p className="text-xl font-normal">Find Popular games</p>
      </div> */}
    </section>
  )
}

export default Hero;
