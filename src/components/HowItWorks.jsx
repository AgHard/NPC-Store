import React, {useRef} from 'react'
import {logoImg} from '../utils/';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { animateWithGsap } from '../utils/animations';
import FAQ from './FAQ';
const HowItWorks = () => {
    const videoRef = useRef();
    
    useGSAP (()=>{
        gsap.from('#chip',{
            scrollTrigger:{
                trigger:'#chip',
                start: '20% bottom',
            },
            opacity : 0,
            scale: 2,
            duration : 2,
            ease: 'power2.inOut'
        });
        
        animateWithGsap('.g_fadeIn', {
            opacity: 1,y: 0,duration: 1,ease: 'power2.inOut'
        })
    },[]);
    
  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <div id="chip" className="w-full my-20 flex-center">
          <img src={logoImg} alt="chip" width={200} height={200} />
        </div>

        <div className="flex flex-col items-center">
          <h2 className="hiw-title">
            <br /> Step Up Your Game 🤍
          </h2>
        </div>

        {/* <div className="mt-10 md:mt-20 mb-14">
          <div className="relative h-full flex-center">
            <div className="overflow-hidden">
              <img 
                src={frameImg}
                alt="frame"
                className="relative z-10 bg-transparent"
              />
            </div>
            <div className="hiw-video">
                <video className="pointer-events-none" playsInline preload="none" loop muted autoPlay ref={videoRef}>
                  <source src={frameVideo} type="video/mp4" />
                </video>
              </div>
          </div>
        </div>

        <div className="hiw-text-container">
                <div className="flex flex-col justify-center flex-1">
                  <p className="hiw-text g_fadeIn">
                  <span className="text-white">N</span>
                  <span className="text-yellow-400">P</span>
                  <span className="text-white">C</span> Store is your ultimate destination for {' '}
                    <span className="text-white">
                    buying in-game points securely and instantly.
                    </span>
                  </p>

                  <p className="hiw-text g_fadeIn">
                    <span className="text-white">
                    With fast transactions and trusted payment methods,
                    </span>{' '}
                    NPC Store ensures a seamless shopping experience for all gamers. Power up your gameplay today! 🚀🎮
                  </p>
                </div>
              

              <div className="flex flex-col justify-center flex-1 g_fadeIn">
                <p className="hiw-text">Go</p>
                <p className="hiw-bigtext">Pre-Order Buy</p>
                <p className="hiw-text">& Get Best Prices For You!</p>
              </div>
        </div> */}
        <FAQ />
      </div>
    </section>
  )
}

export default HowItWorks