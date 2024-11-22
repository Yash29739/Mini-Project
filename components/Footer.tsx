import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import React, { memo } from 'react';

const Footer = () => {
  return (
    <footer className="flexCenter my-2">
      <div className="padding-container max-container flex w-full flex-col gap-14">
        <div className="flex flex-col items-start justify-center gap-[10%] md:flex-row">
          {/* Logo */}
          <Link href="/" className="mb-10">
            <Image src="/logo.png" alt="logo" width={120} height={29} priority />
          </Link>

          <div className="flex flex-wrap gap-10 sm:justify-between md:flex-1">
            {/* Footer Links */}

            {/* Contact Information */}
            <FooterColumn title={FOOTER_CONTACT_INFO.title}>
              {FOOTER_CONTACT_INFO.links.map((link, index) => (
                <Link
                  href="/"
                  key={`contact-${index}`}
                  className="flex gap-2 md:flex-col lg:flex-row"
                >
                  <p className="whitespace-nowrap font-serif">{link.label}:</p>
                  <p className="medium-14 whitespace-nowrap hover:underline hover:text-gray-50 text-gray-30">
                    {link.value}
                  </p>
                </Link>
              ))}
            </FooterColumn>

            {/* Social Links */}
            <FooterColumn title={SOCIALS.title}>
              <ul className="regular-14 flex gap-4 text-gray-30">
                {SOCIALS.links.map((link, index) => (
                  <li key={`social-${index}`}>
                    <Link href="/" className="hover:opacity-75">
                      <Image src={link} alt="social icon" width={24} height={24} priority />
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          </div>
        </div>

        {/* Footer Bottom Text */}
        <p className="regular-14 w-full mb-10 text-center text-gray-30">
          2024 Digital-Detoxer | All rights reserved
        </p>
      </div>
    </footer>
  );
};

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
};

// Memoized FooterColumn for performance optimization
const FooterColumn = memo(({ title, children }: FooterColumnProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="bold-18 whitespace-nowrap">{title}</h4>
      {children}
    </div>
  );
});

FooterColumn.displayName = 'FooterColumn'; // Helpful for debugging with React DevTools

export default Footer;