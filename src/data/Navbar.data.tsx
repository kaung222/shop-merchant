import IconChat from "@/assets/icons/IconChat";
import IconDelivery from "@/assets/icons/IconDelivery";
import IconHome from "@/assets/icons/IconHome";
import IconSetting from "@/assets/icons/IconSetting";
import IconShop from "@/assets/icons/IconShop";
import IconUsers from "@/assets/icons/IconUsers";

export const navbarLinks = [
  {
    name: "Dashboard",
    to: "/dashboard",
    id: 1,
    icon: <IconHome />,
  },
  {
    name: "Products",
    to: "/products?page=1&limit=10&category=all&sort=asc",
    id: 2,
    icon: <IconShop />,
  },
  {
    name: "Orders",
    to: "/orders?page=1&limit=10&status=all&sort=asc",
    id: 3,
    icon: <IconDelivery />,
  },

  {
    name: "Chats",
    to: "/chat",
    id: 6,
    icon: <IconChat />,
  },
  {
    name: "Customers",
    to: "/users?page=1&limit=10&status=active&sort=asc",
    id: 4,
    icon: <IconUsers />,
  },
  {
    name: "Setting",
    to: "/setting",
    id: 5,
    icon: <IconSetting />,
  },
];
