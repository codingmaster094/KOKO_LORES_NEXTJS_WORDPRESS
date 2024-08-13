"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { WORDPRESS_URL } from "../page";
import axios from "axios";
import Image from "next/image";

function Footer() {
  const [Footer_menu, setFooter_menu] = useState(null);
  const [Ueber_uns_Footer_Menu, setUeber_uns_Footer_Menu] = useState(null);
  const [Rechtliches_Footer_Menu, setRechtliches_Footer_Menu] = useState(null);
  const fetchFooter_menu = async () => {
    try {
      const result = await axios.get(`${WORDPRESS_URL}/wp-json/wp/v2/acf-options`);
      setFooter_menu(result.data);
    } catch (error) {
      console.error('Error fetching menu data', error);
    }
  };


  const fetchFloating_Footer_Menu = async () => {
    try {
      const result = await axios.get(`${WORDPRESS_URL}/wp-json/wp/v2/menus`);
      setUeber_uns_Footer_Menu(result.data[1].items);
      setRechtliches_Footer_Menu(result.data[2].items);
    } catch (error) {
      console.error('Error fetching menu data', error);
    }
  };

  useEffect(() => {
    fetchFooter_menu();
    fetchFloating_Footer_Menu();
  }, []);
  return (
    <footer className="bg-color py-10 md:py-16 lg:py-24">
      <div className="container">
        <div className="f-wrapper flex flex-wrap items-start lg:gap-0 gap-0 sm:gap-y-6 gap-y-10 lg:gap-y-0 ">
          <div className="f-wd w-full order-last lg:order-first lg:w-1/4">
            <div className="logo">
            <Link href="/" aria-label="Home"> 
            {
              Footer_menu && 
              <Image
                src={Footer_menu.footer_logo.url}
                alt={Footer_menu.footer_logo.alt}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
              />
            }
              </Link>
            </div>
            <p className="tx-dark pt-5">{Footer_menu && Footer_menu.footer_copyright_content}</p>
          </div>
          <div className="f-wd md:w-1/3 w-full lg:w-1/4">
            <div className="f-title">
              <p>{Footer_menu && Footer_menu.footer_kontakt_title}</p>
            </div>
            <div className="add flex items-start gap-3 pb-2">{
              Footer_menu && 
            <div dangerouslySetInnerHTML={{ __html: Footer_menu.address_text}} />
            }
            </div>
            <div className="add flex items-center gap-3 pb-2">
              <svg
                width="17"
                height="18"
                viewBox="0 0 17 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.9688 13.0938L15.2188 16.25C15.125 16.7188 14.75 17.0312 14.2812 17.0312C6.40625 17 0 10.5938 0 2.71875C0 2.25 0.28125 1.875 0.75 1.78125L3.90625 1.03125C4.34375 0.9375 4.8125 1.1875 5 1.59375L6.46875 5C6.625 5.40625 6.53125 5.875 6.1875 6.125L4.5 7.5C5.5625 9.65625 7.3125 11.4062 9.5 12.4688L10.875 10.7812C11.125 10.4688 11.5938 10.3438 12 10.5L15.4062 11.9688C15.8125 12.1875 16.0625 12.6562 15.9688 13.0938Z"
                  fill="#DCD4CA"
                />
              </svg>
              {
                Footer_menu && 
              <Link href={Footer_menu.phone_number.url}>{Footer_menu.phone_number.title}</Link>
              }
            </div>
            <div className="add flex items-center gap-3 ">
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5 0C15.3125 0 16 0.6875 16 1.5C16 2 15.75 2.4375 15.375 2.71875L8.59375 7.8125C8.21875 8.09375 7.75 8.09375 7.375 7.8125L0.59375 2.71875C0.21875 2.4375 0 2 0 1.5C0 0.6875 0.65625 0 1.5 0H14.5ZM6.78125 8.625C7.5 9.15625 8.46875 9.15625 9.1875 8.625L16 3.5V10C16 11.125 15.0938 12 14 12H2C0.875 12 0 11.125 0 10V3.5L6.78125 8.625Z"
                  fill="#DCD4CA"
                />
              </svg>
              {
                Footer_menu && 
              <Link href={`mailto:${Footer_menu.email_id}`}>
                {Footer_menu.email_id}
              </Link>
              }
            </div>
          </div>
          <div className="f-wd w-1/2 md:w-1/3 lg:w-1/4">
            <div className="f-title">
              <p>{Footer_menu && Footer_menu.footer_ueber_uns_title}</p>
            </div>
            <ul>
            {
              Ueber_uns_Footer_Menu && 
              Ueber_uns_Footer_Menu.map((items , i ) => (
              <li key={i}>
                <Link href={items.path  } >{items.title}</Link>
              </li>
              ))
            }
            </ul>
          </div>
          <div className="f-wd w-1/2 md:w-1/3 lg:w-1/4">
            <div className="f-title">
              <p>{Footer_menu && Footer_menu.footer_rechtliches_title}</p>
            </div>
            <ul>
             {
              Rechtliches_Footer_Menu && 
              Rechtliches_Footer_Menu.map((items , i) => (
              <li key={i}>
              <Link href={items.path}  >{items.title}</Link>
              </li>
              ))
            }
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
