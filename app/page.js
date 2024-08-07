"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Link from 'next/link';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Loader from "./components/Loader";
import Image from "next/image";


export const WORDPRESS_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [homeHero, setHomeHero] = useState(null);
  const [homeAboutUs, setHomeAboutUs] = useState(null);
  const [homeSlider, setHomeSlider] = useState(null);
  const [homeKontaktUs, setHomeKontaktUs] = useState(null);
  const [homeNewsletter, setHomeNewsletter] = useState(null);
  const [contactdetails, setcontactdetails] = useState(null);

  const fetchHomeHero = async () => {
    try {
      const result = await axios.get(
        `${WORDPRESS_URL}/wp-json/custom/v1/page-acf-data?slug=startseite`
      );
      const { home_pages_flexible_content } = result.data;

      const heroSection = home_pages_flexible_content.find(
        (section) => section.acf_fc_layout === "home_hero_section"
      );
      const aboutUsSection = home_pages_flexible_content.find(
        (section) => section.acf_fc_layout === "home_about_us_section"
      );
      const sliderSection = home_pages_flexible_content.find(
        (section) => section.acf_fc_layout === "home_slider"
      );
      const kontaktUsSection = home_pages_flexible_content.find(
        (section) => section.acf_fc_layout === "home_kontakt_us_section"
      );
      const newsletterSection = home_pages_flexible_content.find(
        (section) => section.acf_fc_layout === "home_newsletter"
      );

      setHomeHero(heroSection);
      setHomeAboutUs(aboutUsSection);
      setHomeSlider(sliderSection);
      setHomeKontaktUs(kontaktUsSection);
      setHomeNewsletter(newsletterSection);
    } catch (error) {
      console.error("Error fetching menu data", error);
    }
  };

  const conatctDetail = async () => {
    try {
      const result = await axios.get(`${WORDPRESS_URL}/wp-json/wp/v2/acf-options`);
      setcontactdetails(result.data)
    } catch (error) {
      console.error('Error fetching content data', error);
      return null;
    }
  }

  useEffect(() => {
    fetchHomeHero();
    conatctDetail()
  }, []);

  if (!homeHero && !homeAboutUs  && !homeSlider && !homeKontaktUs && !homeNewsletter) {
    return <Loader/>;
  }

  return (
    <>
    <Header/>
        {homeHero && (
          <section className="hero-banner bg-color">
            <div className="hero-banner-wrapper flex-col lg:flex-row">
              <div className="hero-banner-content lg:w-1/2 gap-5 pt-36 sm:pt-52 md:pt-56 xl:pt-60 2xl:pt-64 lg:pb-28 pb-10 md:pb-16 pr-3 flex xl:gap-6 2xl:gap-8 flex-col pl-3.5 2xl:pl-24">
                <h1 className="text-white">
                  {homeHero.home_hero_section_main_title}
                </h1>
                <p className="tx-dark" dangerouslySetInnerHTML={{ __html: homeHero.home_hero_section_content }} />
                <div className="hero-banner-btns flex items-center gap-4">
                  {homeHero.home_hero_section_buttons.map((button, index) =>{
                    return (
                    <a
                      href={button.home_hero_section_buttons_links.url}
                      className="rounded-full btn"
                      key={index}
                    >
                      {button.home_hero_section_buttons_links.title}
                    </a>
                  )
                  } )}
                </div>
              </div>
              <div className="hero-banner-slide lg:w-1/2 relative lg:block">
                <div className="hero-banner-fix absolute z-10 rounded-full flex items-center justify-center ">
                  <div
                    className="text-white"
                    dangerouslySetInnerHTML={{
                      __html: homeHero.home_hero_section_sticky_note,
                    }}
                  />
                </div>
                {homeHero.home_hero_section_images.map((image, index) => {
                  return (
                    <div
                      className="banner-slide-box relative w-full"
                      key={index}
                    >
                     <Image
                       src={image.home_hero_section_image.url}
                      alt={image.home_hero_section_image.alt}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: '100%', height: 'auto' }}
                    />
                      <p>{image.home_hero_section_images_title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {homeAboutUs && (
          <section className="about-map md:py-16 lg:py-24 py-10">
            <div className="container">
              <div className="about-wrapper flex flex-col lg:flex-row gap-8 items-center">
                <div className="about-text lg:w-1/2">
                  <h2 className="tx-dark pb-4 sm:pb-5 lg:pb-6">
                    {homeAboutUs.about_us_main_title}
                  </h2>
                  <p
                    className="tx-dark pb-3 sm:pb-4"
                    dangerouslySetInnerHTML={{
                      __html: homeAboutUs.about_us_content,
                    }}
                  ></p>
                  <div className="about-btns pt-7 sm:pt-5 lg:pt-6 flex items-center gap-4">
                    {homeAboutUs.about_us_buttons.map((button, index) => (
                      <a
                        href={button.home_about_us_buttons_links.url}
                        className="rounded-full b-btn"
                        key={index}
                      >
                        {button.home_about_us_buttons_links.title}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="about-text-map lg:w-1/2 mx-auto lg:mx-0">
                <Image
                  src={homeAboutUs.about_us_image.url}
                  alt={homeAboutUs.about_us_image.alt}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                    />
                </div>
              </div>
            </div>
          </section>
        )}

        {homeSlider && (
          <section className="slider-image">
            <div className="owl-carousel">
              <Swiper
                navigation
                pagination={{ type: "fraction" }}
                autoplay={{ delay: 2000 }} // Auto-swiping every 2 seconds
                modules={[Navigation, Pagination, Autoplay]}
                onSwiper={(swiper) => swiper}
                className=""
              >
                {homeSlider?.home_slider_images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="item">
                      <div className="slide-box relative">
                        {
                          <>
                          <Image 
                            src={image.home_silder_image.url} 
                            alt={image.home_silder_image.alt} 
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '100%', height: 'auto' }}
                          />
                            <p className="">{image.home_slider_title}</p>
                          </>
                        }
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
        )}

        {homeKontaktUs && (
          <section className="contact-detail bg-dark">
          <div className="contact-wrapper flex flex-col lg:flex-row items-stretch gap-4">
            <div className="contect-detail-text pt-10 pb-8 md:pt-16 md:pb-10 lg:py-24 lg:w-1/2 pr-3.5 lg:pr-0 pl-3.5 2xl:pl-24">
              <h2 className="pb-4 sm:pb-5 lg:pb-6 tx-black">
                {homeKontaktUs.home_kontakt_us_main_title}
              </h2>
              <div className=" pb-3 sm:pb-4 tx-black" dangerouslySetInnerHTML={{ __html: homeKontaktUs.home_kontakt_us_content }}></div>
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
                  <div dangerouslySetInnerHTML={{ __html: contactdetails?.address_text}} />
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
                  <Link href={`tel:${contactdetails?.phone_number.title}`}>{contactdetails?.phone_number.title}</Link>
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
                  <Link href={`mailto:${contactdetails?.email_id}`}>
                    {contactdetails?.email_id}
                  </Link>
                </div>
              </div>
              <div className="contact-btns lg:pt-6 sm:pt-5 pt-7 flex items-center gap-4">
              {
                homeKontaktUs.home_kontakt_us_buttons.map((Btn , i ) => (
                  <Link href={Btn.home_kontakt_us_buttons_links.url} className="rounded-full b-btn" key={i}>
                  {Btn.home_kontakt_us_buttons_links.title}
                </Link>
                ))
              }
              </div>
            </div>
            <div className="contact-map lg:w-1/2">
              <Link
                target="_blank"
                href={homeKontaktUs.home_kontakt_us_map_link}
              >
               <Image
                  src={homeKontaktUs.home_kontakt_us_image.url}
                  alt={homeKontaktUs.home_kontakt_us_image.alt}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                  />
              </Link>
            </div>
          </div>
        </section>
        )}

        {homeNewsletter && (
          <section className="news-letter py-10 md:py-16 lg:py-24 bg-green">
          <div className="container">
            <div className="news-wrapper text-center text-white">
              <h2>{homeNewsletter.home_newsletter_main_title}</h2>
              <div className="tx-dark" dangerouslySetInnerHTML={{ __html: homeNewsletter.home_newsletter_content }}/>
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
                contactdetails && 
                <>
                <Link
                  href={contactdetails.facebook_link.url}
                  target={contactdetails.facebook_link.alt}
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
                  href={contactdetails.instagram_link.url}
                  target={contactdetails.instagram_link.alt}
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
        )}
        <Footer/>
    </>
  );
}
