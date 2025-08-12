import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

export const Sidebar = () => {
    const links = [
        {
            label: "Inicio",
            icon: "ic:baseline-home",
            to: "/",
        },
        {
            label: "Notificaciones",
            icon: "ic:baseline-notifications",
            to: "/notificaciones",
        },
        {
            label: "Mensajes",
            icon: "ic:baseline-message",
            to: "/mensajes",
        },
        {
            label: "Colecciones",
            icon: "material-symbols:folder-rounded",
            to: "/colecciones",
        },
        {
            label: "Subscripciones",
            icon: "ic:baseline-star",
            to: "/subscripciones",
        },
        {
            label: "Añadir tarjeta",
            icon: "ic:baseline-credit-card",
            to: "/tarjeta",
        },
        {
            label: "Mi perfil",
            icon: "ic:baseline-account-circle",
            to: "/perfil",
        },
    ];

    return (
        <div className="h-screen p-2 bg-white dark:bg-bg-dark text-black dark:text-white transition-all duration-300 flex flex-col">
            {/* logo */}
            <div className="flex justify-center items-center h-8 w-8 rounded-full bg-blue-100 text-primary font-bold text-xs m-2">
                OD
            </div>
            {/* NAV */}
            <nav className="flex-1 flex flex-col gap-2 items-center">
                {links.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-2 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-primary/10 dark:hover:text-primary transition-all w-full justify-center sm:justify-start ${
                                isActive
                                    ? "bg-gray-200 dark:bg-primary/20 text-primary"
                                    : "text-gray-600 dark:text-gray-400"
                            }`
                        }
                    >
                        <Icon icon={item.icon} width={24} height={24} />
                        <span className="hidden sm:block">{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};