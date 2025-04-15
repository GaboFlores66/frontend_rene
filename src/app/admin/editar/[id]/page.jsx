"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { buscarPorId, actualizarUsuario } from "@/api/peticiones";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styles from "@/css/editarUsuario.module.css";

export default function EditarUsuario() {
    const { id } = useParams();
    const router = useRouter();
    const { register, handleSubmit, setValue } = useForm();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            buscarPorId(id)
                .then((res) => {
                    const user = res.data.mensajeOriginal;
                    // Asignamos valores a los campos del formulario
                    setValue("username", user.username);
                    setValue("email", user.email);
                    setValue("tipoUsuario", user.tipoUsuario);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error al cargar el usuario:", err);
                    setLoading(false);
                });
        }
    }, [id, setValue]);

    const onSubmit = async (data) => {
        try {
            const res = await actualizarUsuario(id, data);
            // Suponemos que la respuesta tiene "estado" true si todo sale bien.
            if (res.data.estado) {
                toast.success("Usuario actualizado correctamente");
                router.push("/admin");
            } else {
                toast.error("Error al actualizar usuario");
            }
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            toast.error("Error al actualizar usuario");
        }
    };

    if (loading) {
        return <p>Cargando datos del usuario para editar...</p>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Editar Usuario</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.formGroup}>
                    <label>Usuario:</label>
                    <input type="text" {...register("username", { required: true })} />
                </div>
                <div className={styles.formGroup}>
                    <label>Correo:</label>
                    <input type="email" {...register("email", { required: true })} />
                </div>
                <div className={styles.formGroup}>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        placeholder="Nueva contraseña (opcional)"
                        {...register("password")}
                    />
                </div>
                <button type="submit" className={styles.button}>
                    Guardar cambios
                </button>
            </form>
        </div>
    );
}
