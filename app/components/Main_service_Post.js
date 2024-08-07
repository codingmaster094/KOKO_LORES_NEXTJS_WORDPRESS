import Image from "next/image";
import Link from "next/link";
import React from "react";

function Main_service_Post({ initialContent }) {
  const content = initialContent;
  return (
    <section className="brunch-post event-post">
      {content?.service_post_lists_repeater?.length > 0 &&
        content.service_post_lists_repeater.map((items, index) => {
          const BGColorClass =  items.services_post_lists_background_color_radio ===  "beige-light" || items.services_post_lists_background_color_radio === "beige-red"
          ? "tx-black"
          : "tx-dark";
     
          const TextColorClass = items.services_post_lists_background_color_radio ===  "beige-light" || items.services_post_lists_background_color_radio === "beige-red"
          ? 'dark-btn' 
          : 'red-btn'

              // Determine position classes
        const isEven = index % 2 === 0;
        const imgPositionClass = isEven ? "order-1 lg:order-1" : "order-2";
        const contentPositionClass = isEven ? "order-2 lg:order-2" : "order-1";

          return (
            <div
            className={`${items.services_post_lists_background_color_radio} 
              ${BGColorClass} brunch-post-wrapper flex flex-wrap items-stretch`}
            key={items.id} // Assuming each item has a unique id
          >
             <div className={`brunch-post-img w-full lg:w-1/2 ${imgPositionClass}`}>
                <div className="sub-banner banner-slide-box h-full relative">
                <Image
                  src={items.services_post_lists_image.url}
                  alt={items.services_post_lists_image.alt}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
              />
                  <p>{items.services_post_lists_image_label}</p>
                </div>
              </div>
              <div className={`brunch-post-content w-full lg:w-1/2 px-3.5 py-8 sm:px-14 xl:px-28 lg:py-8 sm:py-14 2xl:px-40 flex flex-col justify-center gap-4 sm:gap-6 ${contentPositionClass}`}>
              <h2>{items.services_post_lists_main_title}</h2>
              <div dangerouslySetInnerHTML={{ __html: items.services_post_lists_content }} />
              <Link
                href={items.services_post_lists_button_link.url}
                target={items.services_post_lists_button_link.target}
                className={`btn b-btn ${TextColorClass} rounded-full mt-7 sm:mt-0`}
              >
                {items.services_post_lists_button_link.title}
              </Link>
            </div>
            </div>
          );
        })}
    </section>
  );
}

export default Main_service_Post;
