import axios from "axios";
const API = process.env.NEXT_PUBLIC_API_URL;

//Petición para poder regstrar a un usuario 
export const peticionRegistro = async (usuario) => {
    console.log("estas en la funcion registro");
    console.log(usuario);
    return await axios.post(`${API}/registro`, usuario, { withCredentials: true });
};

//Peticion para verificar al usuario y poder iniciar sesión
export const login = async (usuario) => {
    try {
        const rutaLogin = `${API}/ingresar`;
        const respuesta = await axios.post(rutaLogin, { usuario }, { withCredentials: true });
        if (!respuesta.data) return { estado: false };
        return { estado: true, tipoUsuario: respuesta.data };
    } catch (error) {
        return { estado: false };
    }
};

//Petición para buscar un usuario por su id
export const buscarPorId = async (id) => {
    return await axios.get(`${API}/buscarPorId/${id}`);
};

//Petición para buscar todos los usuarios de la BD
export const buscarUsuario = async (id) => {
    return await axios.get(`${API}/buscarUsuarios`);
};

////Petición para eliminar un usuario por su id
export const eliminarUsuario = async (id) => {
    return await axios.delete(`${API}/eliminarUsuario/${id}`, { withCredentials: true });
};

//Petición para actualizar un usuario por su id y mandar los datos
export const actualizarUsuario = async (id, usuario) => {
    return await axios.put(`${API}/actualizarUsuario/${id}`, usuario, { withCredentials: true });
};

export const todos = async () => {
    return await axios.get(`${API}/todos`, { withCredentials: true });
};

//Petició para poder cerrar sesión
export const salir = async () => {
    return await axios.get(`${API}/salir`, { withCredentials: true });
};

// Petición para cambiar el tipo de usuario
export const cambiarTipoUsuario = async (id, nuevoTipo) => {
    return await axios.put(`${API}/cambiarTipo/${id}`, { nuevoTipo }, { withCredentials: true });
  };
  
  // Petición para cambiar la contraseña del usuario
  export const cambiarPassword = async (id, nuevoPassword) => {
    return await axios.put(`${API}/cambiarPassword/${id}`, { nuevoPassword }, { withCredentials: true });
  };