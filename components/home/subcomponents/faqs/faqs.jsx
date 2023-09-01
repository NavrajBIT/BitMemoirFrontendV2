"use client"

import { useState } from 'react';
import Accordian from "@/components/subcomponents/accordian/accordian";
import { faqsData } from "./faqsData";
import styles from "./faqs.module.css";

const FAQ = () => {
  const [accordionStates, setAccordionStates] = useState(
    Array(faqsData.length).fill(false)
  );

  const toggleAccordion = (index) => {
    const newAccordionStates = Array(faqsData.length).fill(false);
    newAccordionStates[index] = !accordionStates[index];
    setAccordionStates(newAccordionStates);
  };

  return (
    <section className={styles.faqs}>
      <div className={styles.faqsHeading}>
        FAQ's
      </div>
      <div>
        {faqsData.map((faq, index) => {
          return (
            <Accordian
              key={index}
              heading={faq.question}
              text={faq.answer}
              isOpen={accordionStates[index]}
              onToggle={() => toggleAccordion(index)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
