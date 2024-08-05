// MainContactSection.js
import React from 'react';
import Link from 'next/link'; // Assuming you're using Next.js

const MainContactSection = ({ initialContent, contactdata }) => {
  // Set default values for content and contactdetails
  const content = initialContent || {};
  const contactdetails = contactdata || {};

  return (
    <section className="contact-detail bg-dark">
      <div className="contact-wrapper flex flex-col lg:flex-row items-stretch gap-4">
        <div className="contect-detail-text pt-10 pb-8 md:pt-16 md:pb-10 lg:py-24 lg:w-1/2 pr-3.5 lg:pr-0 pl-3.5 2xl:pl-24">
          <h2 className="pb-4 sm:pb-5 lg:pb-6 tx-black">
            {content.home_kontakt_us_main_title || 'Default Title'}
          </h2>
          <div className="pb-3 sm:pb-4 tx-black" dangerouslySetInnerHTML={{ __html: content.home_kontakt_us_content || 'Default Content' }}></div>
          <div className="contact-adds pt-5 sm:pt-6">
            <div className="contact-add flex items-start gap-3 pb-4 sm:pb-5">
              <svg
                className="mt-2"
                width="18"
                height="25"
                viewBox="0 0 18 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.875 23.4375C5.4375 20.3906 0 13.125 0 9C0 4.03125 3.98438 0 9 0C13.9688 0 18 4.03125 18 9C18 13.125 12.5156 20.3906 10.0781 23.4375C9.51562 24.1406 8.4375 24.1406 7.875 23.4375ZM9 12C10.6406 12 12 10.6875 12 9C12 7.35938 10.6406 6 9 6C7.3125 6 6 7.35938 6 9C6 10.6875 7.3125 12 9 12Z"
                  fill="#393D47"
                />
              </svg>
              <div dangerouslySetInnerHTML={{ __html: contactdetails.address_text || 'Default Address' }} />
            </div>
            <div className="contact-add flex items-center gap-3 pb-4 sm:pb-5">
              <svg
                width="25"
                height="26"
                viewBox="0 0 25 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.9531 19.1406L22.8281 23.875C22.6875 24.5781 22.125 25.0469 21.4219 25.0469C9.60938 25 0 15.3906 0 3.57812C0 2.875 0.421875 2.3125 1.125 2.17188L5.85938 1.04688C6.51562 0.90625 7.21875 1.28125 7.5 1.89062L9.70312 7C9.9375 7.60938 9.79688 8.3125 9.28125 8.6875L6.75 10.75C8.34375 13.9844 10.9688 16.6094 14.25 18.2031L16.3125 15.6719C16.6875 15.2031 17.3906 15.0156 18 15.25L23.1094 17.4531C23.7188 17.7812 24.0938 18.4844 23.9531 19.1406Z"
                  fill="#393D47"
                />
              </svg>
              <Link href={`tel:${contactdetails?.phone_number?.title || 'Default Phone'}`}>{contactdetails?.phone_number?.title || 'Default Phone'}</Link>
            </div>
            <div className="contact-add flex items-center gap-3 pb-4 sm:pb-5">
              <svg
                width="24"
                height="18"
                viewBox="0 0 24 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.75 0C22.9688 0 24 1.03125 24 2.25C24 3 23.625 3.65625 23.0625 4.07812L12.8906 11.7188C12.3281 12.1406 11.625 12.1406 11.0625 11.7188L0.890625 4.07812C0.328125 3.65625 0 3 0 2.25C0 1.03125 0.984375 0 2.25 0H21.75ZM10.1719 12.9375C11.25 13.7344 12.7031 13.7344 13.7812 12.9375L24 5.25V15C24 16.6875 22.6406 18 21 18H3C1.3125 18 0 16.6875 0 15V5.25L10.1719 12.9375Z"
                  fill="#393D47"
                />
              </svg>
              <Link href={`mailto:${contactdetails?.email_id || 'default@example.com'}`}>
                {contactdetails?.email_id || 'default@example.com'}
              </Link>
            </div>
          </div>
          <div className="contact-btns lg:pt-6 sm:pt-5 pt-7 flex items-center gap-4">
            {content.home_kontakt_us_buttons?.map((Btn, i) => (
              <Link href={Btn.home_kontakt_us_buttons_links.url} className="rounded-full b-btn" key={i}>
                {Btn.home_kontakt_us_buttons_links.title || 'Default Button'}
              </Link>
            ))}
          </div>
        </div>
        <div className="contact-map lg:w-1/2">
          <Link
            target="_blank"
            href={content.home_kontakt_us_image?.link || '#'}
          >
            <img src={content.home_kontakt_us_image?.url || '/default-image.jpg'} alt={content.home_kontakt_us_image?.alt || 'Default Alt'} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainContactSection;
