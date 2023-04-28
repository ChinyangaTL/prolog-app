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

const IssuesPage = () => {
  return (
    <div>
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
      <ContactButton
        onClick={() =>
          alert(
            "Implement this in Challenge 2 - Modal:\n\nhttps://profy.dev/rjs-challenge-modal"
          )
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/message.svg" alt="Contact" />
      </ContactButton>
    </div>
  );
};

export default IssuesPage;
