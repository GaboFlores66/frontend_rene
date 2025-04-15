import Menu from "@/components/Menu";
import ToastProvider from "@/components/toastProvider";
import './globals.css';

export const metadata = {
    title: 'Mi Proyecto',
    description: 'Descripción de mi proyecto'
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body>
                <ToastProvider />
                <Menu />
                <main style={{ margin: 0, padding: 0 }}>{children}</main>
                
            </body>
        </html>
    );
}
