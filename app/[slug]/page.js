'use client';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainHerosection from '../components/MainHerosection';
import MainSliderSection from '../components/MainSliderSection';
import MainContactSection from '../components/MainContactSection';
import NewsletterSection from '../components/NewsletterSection';
import MainAboutsection from '../components/MainAboutsection';
import Main_service_Post from '../components/Main_service_Post';
import { AllData, conatctDetail, generateMetadata } from '../serverComponent/AllData';
import PageContent from '../components/PageContent';
import Loader from '../components/Loader';


const Page = ({ params }) => {
  const [data, setData] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [pageContent, setPageContent] = useState(null);


  useEffect(() => {
    document.title = `${params.slug.charAt(0).toUpperCase() + params.slug.slice(1)} - koko & lores`;
  }, [params.slug]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialContent = await AllData(params.slug);
        const contactData = await conatctDetail();
        if (initialContent && initialContent.home_pages_flexible_content !== undefined) {
          setData(initialContent.home_pages_flexible_content);
          setPageContent(null);
        } else {
          setPageContent(initialContent);
          setData(null);
        }
        
        setContactData(contactData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [params.slug]);

  // Render error message if there's an error

  if (!data && !pageContent) {
    return <Loader/>;
  }

  // Extract relevant sections
  const heroSectionData = data?.find(item => item.acf_fc_layout === 'service_hero_section');
  const aboutSectionData = data?.find(item => item.acf_fc_layout === 'service_about_us_section');
  const sliderSectionData = data?.find(item => item.acf_fc_layout === 'home_slider');
  const contactSectionData = data?.find(item => item.acf_fc_layout === 'home_kontakt_us_section');
  const servicePostLists = data?.find(item => item.acf_fc_layout === 'service_post_lists');
  const newsletterSectionData = data?.find(item => item.acf_fc_layout === 'home_newsletter');

  return (
    <>
    <Header/>
      {data ? (
        <>
          {heroSectionData && <MainHerosection initialContent={heroSectionData} />}
          {aboutSectionData && <MainAboutsection initialContent={aboutSectionData} />}
          {sliderSectionData && <MainSliderSection initialContent={sliderSectionData} />}
          {contactSectionData && <MainContactSection initialContent={contactSectionData} contactdata={contactData} />}
          {servicePostLists && <Main_service_Post initialContent={servicePostLists} />}
          {newsletterSectionData && <NewsletterSection initialContent={newsletterSectionData} />}
        </>
      ) : (
        <PageContent initialContent={pageContent} />
      )}
      <Footer/>
      </>
  );
};

export default Page;

