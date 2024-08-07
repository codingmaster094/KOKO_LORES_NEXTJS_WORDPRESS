import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function MainAboutsection({ initialContent }) {
    const content = initialContent;
  return (
    <section className="brunch-about py-10 md:py-16 lg:py-24 bg-olive tx-dark relative z-10 overflow-hidden">
            <div className="container">
                <div className="brunch-about-wrapper flex flex-col lg:flex-row gap-8 lg:gap-0 items-stretch ">
                    <div className="brunch-about-content w-full lg:w-1/2 flex gap-y-7 flex-col pr-3">
                        <h2>{content.service_about_us_section_main_title}</h2>
                        <div className="data-list" 
                        dangerouslySetInnerHTML={{ __html: content.service_about_us_section_content_value }}
                        >
                        </div>
                        <div className="about-btns sm:mb-16 mb-10  flex items-center gap-4">
                        { content.service_about_us_buttons &&
                            content.service_about_us_buttons.map((Btn , i)=>(
                                <>
                                <Link href={Btn.service_about_us_buttons_links.url} className="rounded-full b-btn" key={i}>{Btn.service_about_us_buttons_links.title}</Link>
                                </>
                            ))
                        }   
                        </div>
                        {
                            content.service_about_us_section_addition_event_logo &&
                            <div className="event-boxs flex flex-wrap gap-12 lg:gap-10 xl:gap-14">
                            {
                                content.service_about_us_section_addition_event_logo.map((eventBox , i) => (
                                    <div className="event-box flex flex-col gap-3 text-center" key={i}>
                                    <div className="event-img">
                                    <Image
                                        src={eventBox.service_about_us_section_addition_event_logos.url}
                                        alt={eventBox.service_about_us_section_addition_event_logos.alt}
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        style={{ width: '100%', height: 'auto' }}
                                        />
                                    </div>
                                    <div className="event-text">
                                        <p dangerouslySetInnerHTML={{ __html:eventBox.service_about_us_section_addition_event_logo_title }}></p>
                                    </div>
                                </div>
                                ))
                            }
                            </div>
                        }
                    </div>
                    <div className="brunch-about-img w-full lg:w-1/2 flex flex-wrap sm:gap-8 gap-4">
                    <Image
                       src={content.service_about_us_section_image.url}
                       alt={content.service_about_us_section_image.alt}
                        layout="responsive"
                       objectFit="cover"
                       width={500} height={300}
                        />
                        <div className="sub-about-img flex sm:gap-8 gap-4 w-full">
                        {
                            content.service_about_us_section_images.map((img, i)=> (
                            <Image src={img.url} alt={img.alt} width={500} height={300} layout="responsive" objectFit="cover" className="w-1/2" key={i}/>
                            ))
                        }
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default MainAboutsection