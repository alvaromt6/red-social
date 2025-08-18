import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuthStore } from "../../../../store/AuthStore";

export const BtnLogout = () => {
  const { cerrarSesion } = useAuthStore();
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-primary/20 transition-all justify-center sm:justify-start cursor-pointer " onClick={cerrarSesion}>
        <Icon icon= {"solar:logout-2-bold"} width={24} height={24} />
      <span className=" hidden sm:block ">Cerrar sesión</span>
    </div>
  );
};