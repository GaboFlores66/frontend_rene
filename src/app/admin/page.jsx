"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { buscarUsuario, eliminarUsuario } from "@/api/peticiones";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import styles from "@/css/admin.module.css";

export default function Admin() {
    const autorizado = useAuth(["admin"]);
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (autorizado) {
            buscarUsuario()
                .then((res) => {
                    // Se espera que la respuesta venga en "mensajeOriginal"
                    setUsuarios(res.data.mensajeOriginal);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error al buscar usuarios:", err);
                    setLoading(false);
                });
        }
    }, [autorizado]);

    const handleDelete = async (id) => {
        if (confirm("¿Seguro que deseas eliminar este usuario?")) {
            try {
                const res = await eliminarUsuario(id);
                // Aquí se verifica con status (o puedes usar el campo "estado" si lo configuraste)
                if (res.data.status === 200) {
                    toast.success("Usuario eliminado exitosamente");
                    setUsuarios(usuarios.filter((user) => user._id !== id));
                } else {
                    toast.error("Error al eliminar usuario");
                }
            } catch (error) {
                console.error("Error al eliminar usuario:", error);
                toast.error("Error al eliminar usuario");
            }
        }
    };

    if (autorizado === null) {
        return <p>Verificando autorización...</p>;
    }

    if (loading) {
        return <p>Cargando usuarios...</p>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Datos del administrador</h1>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Correo</th>
                            <th>Tipo de Usuario</th>
                            <th>Editar/Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario._id}>
                                <td>{usuario._id}</td>
                                <td>{usuario.username}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.tipoUsuario}</td>
                                <td className={styles.buttonGroup}>
                                    <button
                                        className={styles.buttonEdit}
                                        onClick={() => router.push(`/admin/editar/${usuario._id}`)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className={styles.buttonEdit}
                                        onClick={() => router.push(`/admin/cambiarTipoUsuario/${usuario._id}`)}
                                    >
                                        Cambiar tipo de usuario
                                    </button>
                                    <button
                                        className={styles.buttonDelete}
                                        onClick={() => handleDelete(usuario._id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
