import { Icon } from "@iconify/react";

export const BtnClose = ({funcion}) => {
  return (
    <div 
      onClick={funcion}
      className="absolute top-3 right-3 cursor-pointer p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
        <Icon icon="material-symbols:close" width={20} height={20} />
    </div>
  );
}; 