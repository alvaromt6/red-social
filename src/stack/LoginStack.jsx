import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "../store/authStore";

export const useCrearUsuarioYSesionMutate = () => {
    const { credenciales, creaUserYLogin } = useAuthStore();

    return useMutation({
        mutationKey: ["iniciar con email tester"],
        mutationFn: async () => {
            await creaUserYLogin({
                email: credenciales.email,
                password: credenciales.password,
            });
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
        onSuccess: () => {
            toast.success("Usuario creado y sesión iniciada");
        },
    });
};
