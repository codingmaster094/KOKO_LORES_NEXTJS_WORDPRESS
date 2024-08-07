
import React from "react";
import Link from "next/link"; 
import Image from "next/image";

const MainHerosection = ({ initialContent }) => {
  const content = initialContent;
  return (
    <section className={` sub-banner ${content.service_hero_section_background_color_selection}`}>
      <div className="sub-banner-wrapper flex flex-col lg:flex-row items-stretch">
          <div className="sub-banner-content lg:w-1/2 gap-5 pt-36 sm:pt-52 md:pt-56 xl:pt-60 2xl:pt-64 lg:pb-28 pb-10 md:pb-16 pr-3 flex xl:gap-6 2xl:gap-8 flex-col pl-3.5 2xl:pl-24">
          <h1 className={
            content.service_hero_section_background_color_selection == 'beige-light' || content.service_hero_section_background_color_selection == 'beige-red' ?  "tx-black" : "tx-dark"}>{content.service_hero_section_main_title}</h1>
          <div 
          className={
            content.service_hero_section_background_color_selection == 'beige-light' || content.service_hero_section_background_color_selection == 'beige-red' ?  "tx-black" : "tx-dark"
            }
          dangerouslySetInnerHTML={{ __html: content.service_hero_section_content }}/>
          <div className="sub-banner-btns flex items-center gap-4">
            { content.service_hero_section_buttons && 
              content.service_hero_section_buttons?.map((btn, index) => (
              <Link key={index} href={btn.home_hero_section_buttons_links.url} className="rounded-full btn">
                {btn.home_hero_section_buttons_links.title}
              </Link>
            ))
            }
          </div>
        </div>

        <div className="sub-banner-slide lg:w-1/2 relative lg:block">
          <div className="hero-banner-fix absolute z-10 rounded-full flex items-center justify-center">
            <p className="text-white" dangerouslySetInnerHTML={{ __html: content.service_hero_section_sticky_note }}/>
          </div>
          <div className="sub-banner banner-slide-box h-full relative">
          <Image
            src={content.service_hero_section_image.url}
            alt="hero-banner"
            layout="fill"
            objectFit="cover"
          />
            <p>{content.service_hero_section_images_title}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainHerosection;
