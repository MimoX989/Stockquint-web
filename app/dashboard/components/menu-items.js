import { Button, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const MenuItems = (props) => {
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];
  const menuData = [
    {
      name: "Profile",
      url: "/profile",
      colour: "primary",
    },
    {
      name: "Dashboard",
      url: "/dashboard",
      colour: "primary",
    },
    {
      name: "Activity",
      url: "/activity",
      colour: "primary",
    },
    {
      name: "Analytics",
      url: "/analytics",
      colour: "primary",
    },
    {
      name: "Deployment",
      url: "/deployment",
      colour: "primary",
    },
    {
      name: "Help & Feedback",
      url: "/help",
      colour: "primary",
    },
  ];
  return (
    <NavbarMenu>
      {menuData.map((item, index) => (
        <NavbarMenuItem key={`${item}-${index}`}>
          <Link className="w-full" href="#" size="lg">
            {item.name}
          </Link>
        </NavbarMenuItem>
      ))}
      <NavbarMenuItem className="flex justify-center">
        {props.value.isAuth ? (
          <Button
            className="w-full my-16 md:w-2/5 text-warning-500"
            onClick={props.value.handleLogout}
            size="lg"
          >
            Logout
          </Button>
        ) : (
          <Button
            as={Link}
            className="w-full my-16 md:w-2/5 text-warning-500"
            href="/login"
            size="lg"
          >
            Log In
          </Button>
        )}
      </NavbarMenuItem>
    </NavbarMenu>
  );
};

export default MenuItems;
