import React from 'react'
import Navbar from "./Navbar";

const Faq = () => {
  return (
    
    <section>
      <Navbar />
    <div class="px-8 py-24 mx-auto md:px-12 lg:px-32 max-w-7xl">
      <div class="text-center">
        <div>
          <p class="text-4xl font-semibold tracking-tighter text-gray-900">
            Frequent questions and answers
          </p>
          <p class="w-1/2 mx-auto mt-4 text-base font-medium text-gray-500 text-balance">
            Answers to commonly asked questions about our platform
          </p>
        </div>
      </div>
      <div class="p-2 mt-12 border bg-gray-50 rounded-3xl">
        <div class="flex flex-col gap-6 p-10 text-base text-gray-400 bg-white border shadow-lg md:p-20 rounded-3xl lg:col-span-2">
          <details>
            <summary class="text-lg font-medium text-black cursor-pointer">
              What does Job Junction do?
            </summary>
            <p class="pt-4 text-base font-medium text-gray-500 text-balance">
              JAMstack is an innovative approach to web development that stands
              for JavaScript, APIs, and Markdown. It's all about creating faster
              websites with improved SEO rankings and a better overall user
              experience.
            </p>
          </details>
          <details>
            <summary class="text-lg font-medium text-black cursor-pointer">
              What is its purpos ?
            </summary>
            <p class="pt-4 text-base font-medium text-gray-500 text-balance">
              We utilize a range of modern technologies and languages to create
              your websites, including HTML, CSS, JavaScript, and various
              frameworks like React or Vue.js. Additionally, we work with headless
              Content Management Systems (CMS) and APIs to manage content
              efficiently.
            </p>
          </details>
          <details>
            <summary class="text-lg font-medium text-black cursor-pointer">
              How can I upload my CV ?
            </summary>
            <p class="pt-4 text-base font-medium text-gray-500 text-balance">
              The speed of delivery depends on the complexity of your project and
              your specific requirements. We aim to provide swift delivery, and
              we'll discuss the timeline during our initial consultation. Rest
              assured, we're committed to delivering your website as efficiently
              as possible.
            </p>
          </details>
          <details>
            <summary class="text-lg font-medium text-black cursor-pointer">
              How to check places i have applied to?
            </summary>
            <p class="pt-4 text-base font-medium text-gray-500 text-balance">
              We'll set up a convenient communication channel, such as email or a
              project management platform, to keep you updated on the progress of
              your website. You can communicate with us, ask questions, and
              provide feedback through this channel to ensure a smooth
              collaboration.
            </p>
          </details>
          <details>
            <summary class="text-lg font-medium text-black cursor-pointer">
              How can I post request for a job ?
            </summary>
            <p class="pt-4 text-base font-medium text-gray-500 text-balance">
              The way we structure and charge for your blog pages can vary
              depending on your specific needs. Generally, individual blog posts
              can be counted as separate pages, but this can be discussed and
              tailored to your preferences during our project discussions. We aim
              to be flexible and accommodating to meet your requirements.
            </p>
          </details>
        </div>
      </div>
    </div>
  </section>

  );
};

export default Faq;
