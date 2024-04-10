"use client";

import Link from "next/link";
import React from "react";
import { FaBug } from "react-icons/fa";
import { useParams, usePathname } from "next/navigation";

const navLinks = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "Issues",
    href: "/issues",
  },
];

const NavBar = () => {
  const currentPath = usePathname();

  return (
    <nav className="flex justify-between items-center h-14 border-b-[1px] px-8 mb-6">
      <Link href="/">
        <FaBug className="text-2xl" />
      </Link>
      <ul className="flex justify-between gap-5">
        {navLinks.map((val, index) => (
          <li key={index}>
            <Link
              href={val.href}
              className={`${
                val.href === currentPath ? " text-gray-400" : " text-gray-800"
              }  hover:text-gray-400`}
            >
              {val.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
