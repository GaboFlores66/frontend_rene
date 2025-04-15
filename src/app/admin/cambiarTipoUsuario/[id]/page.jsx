"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { buscarPorId, actualizarUsuario } from "@/api/peticiones";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styles from "@/css/editarUsuario.module.css";

export default function EditarUsuario() {
    const { id } = useParams(); // Obtenemos el ID del usuario desde la URL
    const router = useRouter(); // Usamos el enrutador de Next.js para redirigir después de la actualización
    const { register, handleSubmit, setValue } = useForm(); // Usamos react-hook-form para el manejo de formularios
    const [loading, setLoading] = useState(true); // Estado para mostrar el "Cargando..." mientras se obtienen los datos del usuario

    useEffect(() => {
        if (id) {
            // Cuando obtenemos el ID del usuario, hacemos una solicitud para cargar los datos del usuario
            buscarPorId(id)
                .then((res) => {
                    const user = res.data.mensajeOriginal;
                    // Asignamos los valores a los campos del formulario
                    setValue("username", user.username);
                    setValue("tipoUsuario", user.tipoUsuario); // Asignamos el tipo de usuario al formulario
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
            // Realizamos la actualización del usuario con los datos del formulario
            const res = await actualizarUsuario(id, data);
            if (res.data.estado) {
                toast.success("Usuario actualizado correctamente");
                router.push("/admin"); // Redirigimos al administrador después de la actualización
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
                    <label>Tipo de Usuario:</label>
                    <select {...register("tipoUsuario", { required: true })}>
                        <option value="usuario">Usuario</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className={styles.button}>
                    Guardar cambios
                </button>
            </form>
        </div>
    );
}
