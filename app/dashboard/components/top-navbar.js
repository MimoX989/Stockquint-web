"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Link,
  Avatar,
} from "@nextui-org/react";
import Image from "next/image";
// import { useUser } from "@auth0/nextjs-auth0/client";
import MenuItems from "./menu-items";
import Clock from "react-live-clock";
import { color } from "framer-motion";
import { usePathname } from "next/navigation";

export default function TopNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const { user, error, isLoading } = useUser();

  const topNavData = [
    {
      name: "Dashboard",
      url: "/dashboard",
    },
    {
      name: "F&O Data",
      url: "/dashboard/fno-panel",
    },
    {
      name: "OI Analysis",
      url: "/dashboard/analysis-panel",
    },
    {
      name: "Trend Meter",
      url: "/dashboard/meter-panel",
    },
    {
      name: "Algotrade",
      url: "/dashboard/algo-panel",
    },
  ];

  return (
    <Navbar maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className=""
        />
        <NavbarBrand>
          <Image
            className="invert mx-4 h-6 w-24 "
            alt="logo"
            src="/vercel.svg"
            height={24}
            width={100}
          />
          {/* <p className="font-bold text-inherit">ACME</p> */}
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {topNavData.map((item, index) => (
          <NavbarItem
            isActive={usePathname() === item.url ? "true" : "false"}
            key={index}
          >
            <Link
              color={usePathname() === item.url ? "success" : "foreground"}
              href={item.url}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <div className="flex flex-col mx-4 items-center">
            <p className="text-warning-500">
              <Clock
                format={"HH:mm:ss"}
                noSsr={true}
                ticking={true}
                timezone={"Asia/Calcutta"}
              />
            </p>
            <p className="text-small">
              <Clock
                format={"ddd DD-MMM-YYYY"}
                noSsr={true}
                timezone={"Asia/Calcutta"}
              />
            </p>
          </div>
        </NavbarItem>
        <NavbarItem className=" lg:flex">
          {/* <Avatar isBordered color="primary" src={user ? user.picture : null} /> */}
        </NavbarItem>
      </NavbarContent>
      <MenuItems />
    </Navbar>
  );
}
