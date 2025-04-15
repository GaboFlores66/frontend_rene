"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { login } from "@/api/peticiones";
import styles from "@/css/login.module.css"; // Importa el CSS Module

export default function Login() {
    const router = useRouter();
    const [mensaje, setMensaje] = useState("");
    const { register, handleSubmit, reset, setFocus } = useForm();

    const onSubmit = async (usuario) => {
        try {
            const respuesta = await login(usuario);
            if (respuesta.tipoUsuario === "usuario") {
                toast.success("Bienvenido");
                router.push("/usuario");
            } else if (respuesta.tipoUsuario === "admin") {
                toast.success("Bienvenido");
                router.push("/admin");
            } else {
                setMensaje("Datos incorrectos");
                toast.error("Usuario o contraseña incorrectos.");
                reset();
                setTimeout(() => setFocus("username"), 100);
            }
        } catch (error) {
            console.error("Error en el login:", error);
            toast.error("Error en el login");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <input
                    type="text"
                    placeholder="Usuario"
                    {...register("username")}
                    className={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>
                    Ingresar
                </button>
                {mensaje && <p className={styles.message}>{mensaje}</p>}
            </form>
        </div>
    );
}
