"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { WORDPRESS_URL } from '../page';
import Link from 'next/link';

function NewsletterSection({initialContent}) {
  const content = initialContent;
  const [icons, seticons] = useState(null);
  const fetchicons = async () => {
    try {
      const result = await axios.get(`${WORDPRESS_URL}/wp-json/wp/v2/acf-options`);
      seticons(result.data);
    } catch (error) {
      console.error('Error fetching menu data', error);
    }
  };

  
  useEffect(() => {
    fetchicons();
  }, []);


  return (
    <section className="news-letter py-10 md:py-16 lg:py-24 bg-green">
          <div className="container">
            <div className="news-wrapper text-center text-white">
              <h2>
              {content?.home_newsletter_main_title || 'Default Title'}
              </h2>
              <div className="tx-dark" dangerouslySetInnerHTML={{ __html: content?.home_newsletter_content }}/>
              <form
                action="#"
                className="news-form flex items-stretch justify-center my-10 flex-col sm:flex-row sm:gap-0 gap-3"
              >
                <input
                  type="email"
                  className="news-input sm:rounded-tl-3xl sm:rounded-bl-3xl sm:rounded-tr-none sm:rounded-br-none rounded-full"
                  placeholder="Deine E-Mail Adresse"
                  aria-label="Deine E-Mail Adresse"
                />
                <button
                  type="submit"
                  className="news-btn sm:rounded-tr-3xl sm:rounded-br-3xl sm:rounded-tl-none sm:rounded-bl-none rounded-full"
                >
                  Abonnieren
                </button>
              </form>
              <div className="news-social flex items-center gap-6 justify-center">
              {
                icons && 
                <>
                <Link
                  href={icons.facebook_link.url}
                  target={icons.facebook_link.alt}
                >
                  <svg
                    width="32"
                    height="33"
                    viewBox="0 0 32 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M32 2.50781V30.4922C32 30.9844 31.7891 31.4062 31.5078 31.7578C31.1562 32.1094 30.7344 32.25 30.2422 32.25H22.2266V20.0156H26.3047L26.9375 15.3047H22.2266V12.2812C22.2266 11.5078 22.3672 10.9453 22.6484 10.5938C23 10.1719 23.6328 9.96094 24.5469 9.96094H27.0781V5.67188C26.0938 5.60156 24.8281 5.53125 23.4219 5.53125C21.5938 5.53125 20.1172 6.09375 18.9922 7.14844C17.8672 8.27344 17.3047 9.82031 17.3047 11.7891V15.3047H13.2266V20.0156H17.3047V32.25H2.25781C1.69531 32.25 1.27344 32.1094 0.992188 31.7578C0.640625 31.4062 0.5 30.9844 0.5 30.4922V2.50781C0.5 2.01562 0.640625 1.59375 0.992188 1.24219C1.27344 0.960938 1.69531 0.75 2.25781 0.75H30.2422C30.6641 0.75 31.0859 0.960938 31.4375 1.24219C31.7891 1.59375 32 2.01562 32 2.50781Z"
                      fill="#DCD4CA"
                    />
                  </svg>
                </Link>
                <Link
                  href={icons.instagram_link.url}
                  target={icons.instagram_link.alt}
                >
                  <svg
                    width="32"
                    height="33"
                    viewBox="0 0 32 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.25 8.41406C17.6562 8.41406 18.9922 8.83594 20.2578 9.53906C21.5234 10.2422 22.5078 11.2266 23.2109 12.4922C23.9141 13.7578 24.3359 15.0938 24.3359 16.5C24.3359 17.9766 23.9141 19.3125 23.2109 20.5781C22.5078 21.8438 21.5234 22.8281 20.2578 23.5312C18.9922 24.2344 17.6562 24.5859 16.25 24.5859C14.7734 24.5859 13.4375 24.2344 12.1719 23.5312C10.9062 22.8281 9.92188 21.8438 9.21875 20.5781C8.51562 19.3125 8.16406 17.9766 8.16406 16.5C8.16406 15.0938 8.51562 13.7578 9.21875 12.4922C9.92188 11.2266 10.9062 10.2422 12.1719 9.53906C13.4375 8.83594 14.7734 8.41406 16.25 8.41406ZM16.25 21.7734C17.6562 21.7734 18.9219 21.2812 19.9766 20.2266C20.9609 19.2422 21.5234 17.9766 21.5234 16.5C21.5234 15.0938 20.9609 13.8281 19.9766 12.7734C18.9219 11.7891 17.6562 11.2266 16.25 11.2266C14.7734 11.2266 13.5078 11.7891 12.5234 12.7734C11.4688 13.8281 10.9766 15.0938 10.9766 16.5C10.9766 17.9766 11.4688 19.2422 12.5234 20.2266C13.5078 21.2812 14.7734 21.7734 16.25 21.7734ZM26.5859 8.0625C26.5859 7.57031 26.375 7.14844 26.0234 6.72656C25.6016 6.375 25.1797 6.16406 24.6875 6.16406C24.125 6.16406 23.7031 6.375 23.3516 6.72656C22.9297 7.14844 22.7891 7.57031 22.7891 8.0625C22.7891 8.625 22.9297 9.04688 23.3516 9.39844C23.7031 9.82031 24.125 9.96094 24.6875 9.96094C25.1797 9.96094 25.6016 9.82031 25.9531 9.39844C26.3047 9.04688 26.5156 8.625 26.5859 8.0625ZM31.9297 9.96094C31.9297 11.2969 32 13.4766 32 16.5C32 19.5938 31.9297 21.7734 31.8594 23.1094C31.7891 24.4453 31.5781 25.5703 31.2969 26.5547C30.875 27.75 30.1719 28.8047 29.3281 29.6484C28.4844 30.4922 27.4297 31.125 26.3047 31.5469C25.3203 31.8984 24.125 32.1094 22.7891 32.1797C21.4531 32.25 19.2734 32.25 16.25 32.25C13.1562 32.25 10.9766 32.25 9.64062 32.1797C8.30469 32.1094 7.17969 31.8984 6.19531 31.4766C5 31.125 3.94531 30.4922 3.10156 29.6484C2.25781 28.8047 1.625 27.75 1.20312 26.5547C0.851562 25.5703 0.640625 24.4453 0.570312 23.1094C0.5 21.7734 0.5 19.5938 0.5 16.5C0.5 13.4766 0.5 11.2969 0.570312 9.96094C0.640625 8.625 0.851562 7.42969 1.20312 6.44531C1.625 5.32031 2.25781 4.26562 3.10156 3.42188C3.94531 2.57812 5 1.875 6.19531 1.45312C7.17969 1.17188 8.30469 0.960938 9.64062 0.890625C10.9766 0.820312 13.1562 0.75 16.25 0.75C19.2734 0.75 21.4531 0.820312 22.7891 0.890625C24.125 0.960938 25.3203 1.17188 26.3047 1.45312C27.4297 1.875 28.4844 2.57812 29.3281 3.42188C30.1719 4.26562 30.875 5.32031 31.2969 6.44531C31.5781 7.42969 31.7891 8.625 31.9297 9.96094ZM28.5547 25.7812C28.8359 25.0078 28.9766 23.7422 29.1172 21.9844C29.1172 21 29.1875 19.5234 29.1875 17.625V15.375C29.1875 13.4766 29.1172 12 29.1172 11.0156C28.9766 9.25781 28.8359 7.99219 28.5547 7.21875C27.9922 5.8125 26.9375 4.75781 25.5312 4.19531C24.7578 3.91406 23.4922 3.77344 21.7344 3.63281C20.6797 3.63281 19.2031 3.5625 17.375 3.5625H15.125C13.2266 3.5625 11.75 3.63281 10.7656 3.63281C9.00781 3.77344 7.74219 3.91406 6.96875 4.19531C5.49219 4.75781 4.50781 5.8125 3.94531 7.21875C3.66406 7.99219 3.45312 9.25781 3.38281 11.0156C3.3125 12.0703 3.3125 13.5469 3.3125 15.375V17.625C3.3125 19.5234 3.3125 21 3.38281 21.9844C3.45312 23.7422 3.66406 25.0078 3.94531 25.7812C4.50781 27.2578 5.5625 28.2422 6.96875 28.8047C7.74219 29.0859 9.00781 29.2969 10.7656 29.3672C11.75 29.4375 13.2266 29.4375 15.125 29.4375H17.375C19.2734 29.4375 20.75 29.4375 21.7344 29.3672C23.4922 29.2969 24.7578 29.0859 25.5312 28.8047C26.9375 28.2422 27.9922 27.1875 28.5547 25.7812Z"
                      fill="#DCD4CA"
                    />
                  </svg>
                </Link>
                </>
              }
              </div>
            </div>
          </div>
        </section>
  )
}

export default NewsletterSection