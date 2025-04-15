"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { salir } from "@/api/peticiones";
import styles from "@/css/menu.module.css"; // Importa el CSS Module

export default function Menu() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const res = await salir();
            toast.success("Sesión cerrada correctamente");
            router.push("/login");
        } catch (error) {
            toast.error("Error al cerrar sesión");
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <nav className={styles.nav}>
            <div className={styles.leftGroup}>
                <Link href="/" className={styles.link}>Inicio</Link>
                <Link href="/todos" className={styles.link}>Todos</Link>
                <Link href="/usuario" className={styles.link}>Perfil</Link>
                <Link href="/admin" className={styles.link}>Admin</Link>
                <Link href="/registro" className={styles.link}>Registro</Link>
                <Link href="/login" className={styles.link}>Login</Link>
            <button onClick={handleLogout} className={styles.button}>
                Cerrar sesión
            </button>
            </div>
        </nav>
    );
}
