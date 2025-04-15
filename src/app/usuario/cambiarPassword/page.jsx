"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { cambiarPassword } from "@/api/peticiones"; // Función que ya se definió en peticiones
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import styles from "@/css/editarPerfil.module.css"; // Importa el CSS Module

export default function CambiarContraseña() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    // Obtenemos el usuario autenticado
    const user = useAuth(["usuario", "admin"]);
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        setLoading(false);
    }, []);

    const onSubmit = async (data) => {
        try {
            const res = await cambiarPassword(user.id, data.password);
            // Verificamos que la respuesta tenga status 200
            if (res.data.status === 200) {
                toast.success("Contraseña actualizada correctamente");
                router.push("/usuario");
            } else {
                toast.error("Error al actualizar la contraseña: " + res.data.mensajeUsuario);
            }
        } catch (error) {
            console.error("Error al actualizar la contraseña:", error);
            toast.error("Error al actualizar la contraseña");
        }
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Cambiar Contraseña</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.formGroup}>
                    <label>Nueva Contraseña:</label>
                    <input
                        type="password"
                        placeholder="Introduce tu nueva contraseña"
                        {...register("password", { required: true })}
                    />
                </div>
                <button type="submit" className={styles.button}>
                    Cambiar Contraseña
                </button>
            </form>
        </div>
    );
}
