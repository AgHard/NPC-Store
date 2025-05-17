import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { EarthCanvas } from "./canvas";
import { slideIn } from "../utils/motion";
import { StarsCanvas } from "./canvas";
import Swal from "sweetalert2";

const ContactUs = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
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
      )
      .then(
        () => {
          setLoading(false);
          Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "Your message was sent successfully.",
            background: "#1c1c1c",
            color: "#fff",
            confirmButtonColor: "#FFD700",
          });
          setForm({ name: "", email: "", message: "" });
        },
        (err) => {
          setLoading(false);
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to send the message. Please try again later.",
            background: "#1c1c1c",
            color: "#fff",
            confirmButtonColor: "#FFD700",
          });
        }
      );
  };

  const fontFamily = "'Cairo', sans-serif";
  const gold = "#FFD700";

  return (
    <div
      className="flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row"
      style={{ fontFamily }}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-[#1a1a1a] p-8 rounded-2xl shadow-lg border border-white/10"
      >
        <p className="text-sm text-gray-400">Get in touch</p>
        <h3 className="mb-6 text-3xl font-bold" style={{ color: gold }}>
          Contact Us
        </h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          <label className="flex flex-col">
            <span className="mb-2 font-medium text-white">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="px-5 py-3 text-white rounded-lg bg-[#2a2a2a] placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-2 font-medium text-white">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className="px-5 py-3 text-white rounded-lg bg-[#2a2a2a] placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-2 font-medium text-white">Your Message</span>
            <textarea
              rows="6"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What's your message?"
              className="px-5 py-3 text-white rounded-lg bg-[#2a2a2a] placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </label>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="px-8 py-3 mt-2 font-semibold text-black bg-yellow-400 shadow rounded-xl hover:bg-yellow-300 disabled:opacity-60 w-fit"
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>

      <StarsCanvas />
    </div>
  );
};

export default SectionWrapper(ContactUs, "contact");
