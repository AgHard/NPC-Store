import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqData = [
  {
    question: 'How do I purchase game credits?',
    answer: 'Browse your desired game, pick a package, and complete payment using our secure checkout. Credits are delivered instantly.'
  },
  {
    question: 'What payment methods are supported?',
    answer: 'We support Visa, Mastercard, PayPal, Vodafone Cash, and more for fast & easy transactions.'
  },
  {
    question: 'Is there a refund policy?',
    answer: 'Yes! If you haven’t redeemed your code, contact support within 24 hours for a full refund.'
  },
  {
    question: 'How fast will I receive my digital code?',
    answer: 'Instantly. After successful payment, your code will be shown and emailed to you within seconds.'
  },
  {
    question: 'Can I use the codes internationally?',
    answer: 'Please check the region before buying. Some codes are region-locked based on publisher restrictions.'
  }
];

const FAQItem = ({ faq, isOpen, onClick }) => {
  const goldColor = "#FFD700";
  const gray = "#BBBBBB";

  return (
    <div style={{ padding: "1rem 0", borderBottom: "1px solid #2c2c2c" }}>
      <button
        onClick={onClick}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          fontWeight: 600,
          textAlign: "left",
          fontFamily: "'Cairo', sans-serif",
          fontSize: "16px",
          color: goldColor,
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        {faq.question}
        {isOpen ? <FaChevronUp color={goldColor} /> : <FaChevronDown color={goldColor} />}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              marginTop: "0.5rem",
              overflow: "hidden",
              color: gray,
              fontFamily: "'Cairo', sans-serif",
              fontSize: "15px",
              lineHeight: 1.6
            }}
          >
            <p>{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section
      style={{
        backgroundColor: '#121212',
        padding: '5rem 2rem',
        color: 'white',
        maxWidth: '800px',
        margin: '5rem auto',
        borderRadius: '20px',
        boxShadow: '0 0 20px rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 215, 0, 0.1)',
        fontFamily: "'Cairo', sans-serif"
      }}
    >
      <h2
        style={{
          marginBottom: '2.5rem',
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#FFD700'
        }}
      >
        Frequently Asked Questions
      </h2>

      {faqData.map((faq, index) => (
        <FAQItem
          key={index}
          faq={faq}
          isOpen={index === openIndex}
          onClick={() => toggleFAQ(index)}
        />
      ))}
    </section>
  );
};

export default FAQ;
