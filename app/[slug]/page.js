'use client';
import React, { useEffect, useState } from 'react';
import MainHerosection from '../components/MainHerosection';
import MainSliderSection from '../components/MainSliderSection';
import MainContactSection from '../components/MainContactSection';
import NewsletterSection from '../components/NewsletterSection';
import MainAboutsection from '../components/MainAboutsection';
import Main_service_Post from '../components/Main_service_Post';
import { AllData, conatctDetail } from '../serverComponent/AllData';
import PageContent from '../components/PageContent';
import Loader from '../components/Loader';
import Layout from '../components/Layout';


const Page = ({ params }) => {
  const [data, setData] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [pageContent, setPageContent] = useState(null);

  useEffect(() => {
    document.title = `${params.slug.charAt(0).toUpperCase() + params.slug.slice(1)} - koko & lores`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", `${params.slug}`);
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = `${params.slug}`;
      document.head.appendChild(meta);
    }
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
    <Layout>
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
      </Layout>
  );
};

export default Page;

// 'use client';
// import React, { useEffect, useState } from 'react';
// import MainHerosection from '../components/MainHerosection';
// import MainSliderSection from '../components/MainSliderSection';
// import MainContactSection from '../components/MainContactSection';
// import NewsletterSection from '../components/NewsletterSection';
// import MainAboutsection from '../components/MainAboutsection';
// import Main_service_Post from '../components/Main_service_Post';
// import { AllData, conatctDetail } from '../serverComponent/AllData';
// import PageContent from '../components/PageContent';
// import Loader from '../components/Loader';
// import Layout from '../components/Layout';

// const components = {
//   service_hero_section: MainHerosection,
//   service_about_us_section: MainAboutsection,
//   home_slider: MainSliderSection,
//   home_kontakt_us_section: MainContactSection,
//   service_post_lists: Main_service_Post,
//   home_newsletter: NewsletterSection,
// };

// const Page = ({ params }) => {
//   const [data, setData] = useState(null);
//   const [contactData, setContactData] = useState(null);
//   const [pageContent, setPageContent] = useState(null);

//   useEffect(() => {
//     document.title = `${params.slug.charAt(0).toUpperCase() + params.slug.slice(1)} - koko & lores`;
//   }, [params.slug]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const initialContent = await AllData(params.slug);
//         const contactData = await conatctDetail();
//         if (initialContent && initialContent.home_pages_flexible_content !== undefined) {
//           setData(initialContent.home_pages_flexible_content);
//           setPageContent(null);
//         } else {
//           setPageContent(initialContent);
//           setData(null);
//         }

//         setContactData(contactData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [params.slug]);

//   if (!data && !pageContent) {
//     return <Loader />;
//   }

//   const sections = data?.map((item) => {
//     const Component = components[item.acf_fc_layout];
//     if (!Component) {
//       return null;
//     }

//     return <Component key={item.id} initialContent={item} contactdata={contactData} />;
//   });

//   return (
//     <Layout>
//       {data ? (
//         <>{sections}</>
//       ) : (
//         <PageContent initialContent={pageContent} />
//       )}
//     </Layout>
//   );
// };

// export default Page;