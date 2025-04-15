"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { buscarPorId, eliminarUsuario } from "@/api/peticiones";
import { toast } from "react-toastify";
import styles from "@/css/usuario.module.css"; // Importa el CSS Module

export default function Usuario() {
    const router = useRouter();
    const user = useAuth(["usuario", "admin"]);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.id) {
            buscarPorId(user.id)
                .then((res) => {
                    if (res.data.status === 200) {
                        setUserData(res.data.mensajeOriginal);
                    } else {
                        toast.error("Error: " + res.data.mensajeUsuario);
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error al buscar usuario por ID:", err);
                    toast.error("Error al cargar datos del usuario");
                    setLoading(false);
                });
        }
    }, [user]);

    const handleDelete = async () => {
        if (confirm("¿Estás seguro de eliminar tu perfil? Esta acción no se puede deshacer.")) {
            try {
                const res = await eliminarUsuario(user.id);
                if (res.data.status === 200) {
                    toast.success("Perfil eliminado correctamente");
                    router.push("/login");
                } else {
                    toast.error("Error al eliminar perfil: " + res.data.mensajeUsuario);
                }
            } catch (error) {
                console.error("Error al eliminar perfil:", error);
                toast.error("Error al eliminar perfil");
            }
        }
    };

    if (user === null) {
        return <p>Verificando autorización...</p>;
    }

    if (loading) {
        return <p>Cargando datos del usuario...</p>;
    }

    if (!userData) {
        return <p>No se encontró información del usuario.</p>;
    }

    return (
        <div >
            <h1 className={styles.title}>Datos del usuario</h1>
            <p className={styles.data}>
                <strong>Usuario:</strong> {userData.username}
            </p>
            <p className={styles.data}>
                <strong>Correo:</strong> {userData.email}
            </p>
            <p className={styles.data}>
                <strong>Rol:</strong> {userData.tipoUsuario}
            </p>
            <div className={styles.buttons}>
                {/* Botón para editar perfil */}
                <Link href="/usuario/editar">
                    <button className={styles.buttonEdit}>Editar Perfil</button>
                </Link>
                <Link href="/usuario/cambiarPassword">
                    <button className={styles.buttonEdit}>Editar Contraseña</button>
                </Link>
                {/* Botón para eliminar perfil */}
                <button onClick={handleDelete} className={styles.buttonDelete}>
                    Eliminar Perfil
                </button>
            </div>
        </div>
    );
}
