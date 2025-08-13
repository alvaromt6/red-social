import { useThemeStore } from "../../../../store/ThemeStore";

export const BtnToggleTheme = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <button
      onClick={setTheme}
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-primary/20 transition-all justify-center sm:justify-start cursor-pointer">
      <span>{theme === "light" ? "🌑" : "🌞"}</span>
      <span className=" hidden sm:block ">{theme === "light" ? "Modo Oscuro" : "Modo Claro"}</span>
    </button>
  );
};