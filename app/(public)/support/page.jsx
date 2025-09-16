'use client'
import { useState } from "react";
import { faqData } from "@/app/constants/constant";
import { SupportPage } from "../_components/SupportComponent";

const Support = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');



  const filteredFaqs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
      <SupportPage
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredFaqs={filteredFaqs}
          openFaq={openFaq}
          toggleFaq={ toggleFaq }
      />
  );
};

export default Support;