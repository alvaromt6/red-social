import logo from "../assets/react.svg";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useGenerarCodigosAleatorios } from "../hooks/useGenerarCodigosAleatorios";
import { useAuthStore } from "../store/authStore";
import { useCrearUsuarioYSesionMutate } from "../stack/LoginStack";
import { Toaster } from "sonner";
import { useForm } from "react-hook-form";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const { setCredenciales } = useAuthStore();
  const { handleSubmit } = useForm();
  const { isPeding, mutate } = useCrearUsuarioYSesionMutate();

  useEffect(() => {
    const respuesta = useGenerarCodigosAleatorios();
    const correoCompleto = respuesta + "@gmail.com";
    setCredenciales({ email: correoCompleto, password: respuesta });
    setEmail(correoCompleto);
    setPassword(respuesta);
  }, []);

  return (
    <main className="h-screen flex w-full">
      <Toaster />
      {/* Lado Izquierdo (Oculto en Móvil) */}
      <section className="hidden md:flex md:w-1/2 bg-[#00b0f0] flex-col justify-center items-center overflow-hidden">
        <div className="px-8 text-white text-center flex flex-col gap-2">
          <div className="flex items-center gap-3 justify-center">
            <img src={logo} alt="" className="h-10 w-10" />
            <span className="text-4xl font-bold text-[#CCEFFC]">Red Social</span>
          </div>
          <span className="text-3cl font-semibold mb-2">
            Inicia sesión para continuar
          </span>
        </div>
      </section>
      {/* Lado Derecho */}
      <section className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-16 py-8">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-medium text-center mb-6">
            Inicia sesión <span className="text-[#0091EA]">(modo invitado)</span>
          </h1>
          {/* Formulario */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(mutate)}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Email"
                value={email}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0091EA]"
              />
            </div>
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0091EA]"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                tabIndex={-1}
              >
                <Icon icon={showPassword ? "mdi:eye-off" : "mdi:eye"} />
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-[#00AFF0] text-white font-medium py-3 rounded-full transition-colors duration-200 cursor-pointer hover:bg-[#0091EA]"
              disabled={isPeding}
            >
              Iniciar sesión
            </button>
          </form>
          <div className="mt-4 text-xs text-gray-500 text-center">
            Al iniciar sesión y usar esta red social, aceptas nuestros{" "}
            <a href="#" className="text-[#0091EA] hover:underline">
              términos y condiciones
            </a>{" "}
            y la{" "}
            <a href="#" className="text-[#0091EA] hover:underline">
              política de privacidad
            </a>
          </div>
          <div className="mt-6 text-center">
            <div className="mt-2">
              <a href="#" className="text-xs text-[#0091EA] hover:underline">
                ¿Has olvidado la contraseña?
              </a>
            </div>
            <span className="text-xs text-gray-500">
              ¿No tienes una cuenta?{" "}
              <a href="#" className="text-[#0091EA] hover:underline">
                Regístrate
              </a>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};
