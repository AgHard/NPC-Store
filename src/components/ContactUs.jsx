import React, {useState, useRef} from 'react'
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { EarthCanvas } from "./canvas";
import { slideIn } from "../utils/motion";
import { StarsCanvas } from "./canvas";
import Swal from 'sweetalert2';

const ContactUs = () => {

  const formRef = useRef();
  const [form, setForm] = useState({name: "", email: "", message: ""});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
        "service_61hxvnm",
        "template_j7pt5iq",
        {
          from_name: form.name,
          from_email: form.email,
          to_name: "Mahmoud Yassen",
          to_email: "yassena778@gmail.com",
          subject: "New message from your website",
          message: form.message,
        },
        "wdifbzrCLwpshIXQ3"
      ).then (()=>{
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Your message was sent successfully.",
        });
        setForm({name: "", email: "", message: ""});
      }, (err) => {
        setLoading(false);
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to send the message. Please try again later.",
        });
      });
  };
  return (
    <div className='flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row'>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <form ref={formRef} onSubmit={handleSubmit} className='flex flex-col gap-8 mt-12'>
          <label className='flex flex-col'>
            <span className='mb-4 font-medium text-white'>Your Name</span>
            <input type="text" name='name' value={form.name} onChange={handleChange} 
             placeholder="What's your name?"
             className='px-6 py-4 font-medium text-white border-none rounded-lg outline-none bg-tertiary placeholder:text-secondary'/>
          </label>
          <label className='flex flex-col'>
            <span className='mb-4 font-medium text-white'>Your Email</span>
            <input type="email" name='email' value={form.email} onChange={handleChange} 
             placeholder="What's your email address?"
             className='px-6 py-4 font-medium text-white border-none rounded-lg outline-none bg-tertiary placeholder:text-secondary'/>
          </label>
          <label className='flex flex-col'>
            <span className='mb-4 font-medium text-white'>Your Message</span>
            <textarea rows="7" name='message' value={form.message} onChange={handleChange} 
             placeholder="What's your message?"
             className='px-6 py-4 font-medium text-white border-none rounded-lg outline-none bg-tertiary placeholder:text-secondary'/>
          </label>
          <button type='submit' className='px-8 py-3 font-bold text-white bg-yellow-500 shadow-md outline-none rounded-xl w-fit shadow-primary'>
            {loading? "Sending Message..." : "Send"}
          </button>
        </form>
      </motion.div>
      <motion.div variants={slideIn("right", "tween", 0.2, 1)} className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'>
        <EarthCanvas />
      </motion.div>
      <StarsCanvas/>
    </div>
  )
}

export default SectionWrapper(ContactUs, "contact");