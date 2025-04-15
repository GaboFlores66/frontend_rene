"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { buscarPorId, actualizarUsuario, eliminarUsuario } from "@/api/peticiones";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import styles from "@/css/editarPerfil.module.css"; // Importa el CSS Module

export default function EditarPerfil() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    // Obtenemos el usuario autenticado (asegúrate de que useAuth retorne un objeto con la propiedad "id")
    const user = useAuth(["usuario", "admin"]);
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        if (user && user.id) {
            buscarPorId(user.id)
                .then((res) => {
                    const u = res.data.mensajeOriginal;
                    // Asignamos los valores iniciales en el formulario
                    setValue("username", u.username);
                    setValue("email", u.email);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error al cargar el perfil:", err);
                    setLoading(false);
                });
        }
    }, [user, setValue]);

    const onSubmit = async (data) => {
        try {
            const res = await actualizarUsuario(user.id, data);
            // Verificamos que la respuesta tenga status 200
            if (res.data.status === 200) {
                toast.success("Perfil actualizado correctamente");
                router.push("/usuario");
            } else {
                toast.error("Error al actualizar perfil: " + res.data.mensajeUsuario);
            }
        } catch (error) {
            console.error("Error al actualizar perfil:", error);
            toast.error("Error al actualizar perfil");
        }
    };

    const handleDelete = async () => {
        if (confirm("¿Estás seguro de eliminar tu perfil? Esta acción no se puede deshacer.")) {
            try {
                const res = await eliminarUsuario(user.id);
                if (res.data.status === 200) {
                    toast.success("Perfil eliminado correctamente");
                    // Redirigimos al usuario al login después de eliminar su perfil
                    router.push("/login");
                } else {
                    toast.error("Error al eliminar el perfil: " + res.data.mensajeUsuario);
                }
            } catch (error) {
                console.error("Error al eliminar el perfil:", error);
                toast.error("Error al eliminar el perfil");
            }
        }
    };

    if (loading) {
        return <p>Cargando perfil...</p>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Editar Perfil</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.formGroup}>
                    <label>Usuario:</label>
                    <input
                        type="text"
                        {...register("username", { required: true })}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Correo:</label>
                    <input
                        type="email"
                        {...register("email", { required: true })}
                    />
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
            <hr className={styles.hr} />
            <button onClick={handleDelete} className={styles.buttonDelete}>
                Eliminar mi perfil
            </button>
        </div>
    );
}
