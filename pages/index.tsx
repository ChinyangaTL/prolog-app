import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Routes } from "@config/routes";

const Header = styled.header`
  width: 100%;
  height: 80px;
  padding: 0 2rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContactButton = styled.button`
  position: absolute;
  bottom: 2.5rem;
  right: 2.5rem;
  padding: 1rem;
  background: #7f56d9;
  border-radius: 50%;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border: none;
  cursor: pointer;

  &:hover {
    background: #6941c6;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
  font-size: 1.2rem;
  color: #000;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Products",
    href: "/products",
  },
  {
    name: "Documentation",
    href: "/documentation",
  },
  {
    name: "Pricing",
    href: "/pricing",
  },
];

const ModalCard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 500px;
  background: #f00;
  border-radius: 5px;
  transform: translate(-50%, -50%);
`;

type CMSSection = {
  image: { src: string; width: number; height: number };
  sectionType: string;
  subtitle: string;
  theme: string;
  title: string;
};

type CMSData = {
  meta: {
    description: string;
    image: string;
    title: string;
  };
  sections: CMSSection[];
};

const IssuesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [heroSection, setHeroSection] = useState<CMSSection | null>(null);

  const modalOpenStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1040,
    width: "100vw",
    height: "100vh",
    backgroundColor: isModalOpen ? "rgba(0, 0, 0, 0.4)" : "transparent",
    backdropFilter: isModalOpen ? "blur(15px)" : "none",
  };

  const getHeroSection = (sections: CMSSection[]) =>
    sections.find((section) => section.sectionType === "hero");

  const fetchCMSData = async () => {
    setIsLoading(true);
    const res = await fetch("https://prolog-api.profy.dev/content-page/home");
    const data: CMSData = await res.json();
    console.log(data);
    const { sections } = data;

    const heroSection = getHeroSection(sections);
    heroSection && setHeroSection(heroSection);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCMSData();
  }, []);

  return (
    <div
      style={modalOpenStyles}
      onClick={() => isModalOpen && setIsModalOpen(false)}
    >
      <Header>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/logo-large.svg" alt="Prolog logo" />
        <Nav>
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.name}
            </a>
          ))}
        </Nav>

        <a
          style={{
            background: "#6941c6",
            padding: "1rem",
            color: "#fff",
            borderRadius: 5,
            textDecoration: "none",
          }}
          href={Routes.projects}
        >
          Open Dashboard
        </a>
      </Header>
      <ContactButton onClick={() => setIsModalOpen(true)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/message.svg" alt="Contact" />
      </ContactButton>
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "2rem",
          padding: "2rem",
        }}
      >
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          heroSection && (
            <section
              style={{
                background: `url(${heroSection.image.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
              }}
            >
              <div>
                <h1>{heroSection.title}</h1>
                <p>{heroSection.subtitle}</p>
              </div>
              <img
                src={heroSection.image.src}
                alt="Hero"
                width={heroSection.image.width}
                height={heroSection.image.height}
              />
            </section>
          )
        )}
      </main>

      {isModalOpen && (
        <ModalCard>
          <h1>Modal</h1>
          <div>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button
              onClick={() =>
                window.open(
                  "mailto:email@example.com?subject=Subject&body=Body%20goes%20here"
                )
              }
            >
              Open Email App
            </button>
          </div>
        </ModalCard>
      )}
    </div>
  );
};

export default IssuesPage;
