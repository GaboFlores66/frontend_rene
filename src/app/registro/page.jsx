"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { peticionRegistro } from "@/api/peticiones";
import { toast } from "react-toastify";
import styles from "@/css/registro.module.css"; // Importa el CSS Module

export default function Registro() {
    const router = useRouter();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (usuario) => {
        try {
            const res = await peticionRegistro(usuario);
            if (res.data.status === 200) {
                toast.success("Registro exitoso");
                router.push("/login");
            } else {
                toast.error("Error: " + res.data.mensajeUsuario);
            }
        } catch (error) {
            console.error("Error en el registro:", error);
            toast.error("Error en el registro");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Regístrate</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <input
                    type="text"
                    placeholder="Usuario"
                    {...register("username")}
                    className={styles.input}
                />
                <input
                    type="email"
                    placeholder="Correo"
                    {...register("email")}
                    className={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>
                    Registrar usuario
                </button>
            </form>
        </div>
    );
}
