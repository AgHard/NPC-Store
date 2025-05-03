import React from 'react'
import {VerticalTimeline, VerticalTimelineElement} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { aboutus } from "../constants";
import {logoImg} from '../utils/';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SectionWrapper } from "../hoc";

const AboutUsCard = ({about}) => (
  <VerticalTimelineElement contentStyle={{background: "#1d1836",color: "#fff"}} contentArrowStyle={{borderRight: "7px solid  #232631"}}
    iconStyle={{background: about.iconBg}}
    icon = {
    <div className='flex items-center justify-center w-full h-full'>
      <img src= {about.icon} alt="experience.company_name" className='w-[60%] h-[60%] object-containn' />
    </div>}
  >
    <div>
      <h3 className='text-white text-[24px] font-bold'>{about.title}</h3>
    </div>
    <ul className='mt-1 ml-5 space-y-2 list-disc'>
      {about.points.map((point, index)=>(
        <li key={`experience-point-${index}`} className='text-white-100 text-[14px] pl-1 tracking-wider'>
          {point}
        </li>
      ))}
    </ul>
  </VerticalTimelineElement>
)
const About = () => {
  
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
  },[]);
  return (
    <>
      <div id="chip" className="w-full flex-center">
        <img src={logoImg} alt="chip" width={200} height={200} />
      </div>
      <div className='flex flex-col mt-20'>
        <VerticalTimeline>
          {aboutus.map((about, index)=>(
            <AboutUsCard key = {index} about = {about} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  )
}

export default SectionWrapper(About, "aboutus");