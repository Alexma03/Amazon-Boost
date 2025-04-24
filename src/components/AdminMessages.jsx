import React, { useState, useEffect, useMemo } from 'react'; // Añadir useMemo
import useGoogleIdentityScript from './useGoogleIdentityScript';
import { GoogleAuthProvider, signInWithCredential, getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../lib/firebase';
// Importar doc y updateDoc para actualizar el estado
import { collection, getDocs, query, orderBy, Timestamp, doc, updateDoc, where } from 'firebase/firestore';

const AdminMessages = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // Estado para el filtro: 'all', 'read', 'unread'
  const { scriptLoaded, scriptError } = useGoogleIdentityScript();

  // Función para obtener mensajes
  const fetchMessages = async () => {
    setLoading(true);
    try {
      // Construir la consulta base
      let q = query(collection(db, 'email_submissions'), orderBy('created_at', 'desc'));

      // Añadir filtro de estado si no es 'all'
      if (filter !== 'all') {
        q = query(collection(db, 'email_submissions'), where('status', '==', filter), orderBy('created_at', 'desc'));
      }

      const snapshot = await getDocs(q);
      const fetchedMessages = snapshot.docs.map(doc => {
        const data = doc.data();
        const createdAt = data.created_at instanceof Timestamp
          ? data.created_at.toDate()
          : new Date(data.created_at);
        return {
          id: doc.id,
          ...data,
          status: data.status || 'unread', // Asumir 'unread' si no existe
          created_at: createdAt,
        };
      });
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]); // Limpiar mensajes en caso de error
    } finally {
      setLoading(false);
    }
  };

  // Control de autenticación y carga inicial de mensajes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchMessages(); // Cargar mensajes cuando el usuario está autenticado
      } else {
        setUser(null);
        setMessages([]); // Limpiar mensajes al cerrar sesión
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []); // Dependencia vacía para que se ejecute solo al montar

  // Recargar mensajes cuando cambia el filtro
  useEffect(() => {
    if (user) { // Solo recargar si el usuario está logueado
      fetchMessages();
    }
  }, [filter, user]); // Dependencias: filter y user

  // Logs de depuración para el script de Google
  useEffect(() => {
    console.log("Estado de carga del script:", scriptLoaded ? "Cargado" : "No cargado");
    console.log("¿Hay error en el script?", scriptError ? "Sí" : "No");

    if (scriptLoaded) {
      console.log("Objeto window.google disponible:", !!window.google);
      console.log("Objeto window.google.accounts disponible:", !!(window.google && window.google.accounts));
      console.log("Objeto window.google.accounts.id disponible:", !!(window.google && window.google.accounts && window.google.accounts.id));
    }
  }, [scriptLoaded, scriptError]);

  // Inicialización de Google Identity Services
  useEffect(() => {
    // Solo inicializar si el script está cargado, el usuario no está logado y tenemos acceso a la API
    if (!user && scriptLoaded && window.google && window.google.accounts && window.google.accounts.id) {
      console.log("Inicializando Google Identity Services");

      try {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.PUBLIC_GOOGLE_IDENTITY_CLIENT_ID,
          callback: async (response) => {
            try {
              console.log("Respuesta de autenticación recibida", response);
              const credential = GoogleAuthProvider.credential(response.credential);
              const auth = getAuth();
              await signInWithCredential(auth, credential);
              // No es necesario llamar a fetchMessages aquí, el onAuthStateChanged lo hará
            } catch (e) {
              console.error("Error de autenticación:", e);
              alert('Error al iniciar sesión con Google: ' + e.message);
            }
          },
          ux_mode: 'popup',
          auto_select: true, // Habilitar FedCM auto sign-in
          cancel_on_tap_outside: false,
          use_fedcm_for_prompt: true,
          use_fedcm_for_button: true
        });

        // Renderizar el botón después de inicializar
        setTimeout(() => {
          const btnContainer = document.getElementById('google-signin-btn');
          if (btnContainer) {
            console.log("Renderizando botón de Google");
            window.google.accounts.id.renderButton(
              btnContainer,
              {
                theme: 'outline',
                size: 'large',
                type: 'standard',
                text: 'signin_with',
                shape: 'rectangular',
                logo_alignment: 'center',
                width: 250,
              }
            );

            // Mostrar prompt de One Tap
            console.log("Mostrando prompt de One Tap");
            window.google.accounts.id.prompt((notification) => {
              console.log("Notificación de prompt:", notification);
            });
          } else {
            console.error("Elemento google-signin-btn no encontrado en el DOM");
          }
        }, 100); // Pequeño retraso para asegurar que el DOM está listo
      } catch (e) {
        console.error("Error al inicializar Google Identity Services:", e);
      }
    }
  }, [user, scriptLoaded]);

  // Función para cambiar el estado de un mensaje
  const toggleReadStatus = async (messageId, currentStatus) => {
    const newStatus = currentStatus === 'read' ? 'unread' : 'read';
    const messageRef = doc(db, 'email_submissions', messageId);
    try {
      await updateDoc(messageRef, { status: newStatus });
      // Actualizar el estado localmente para reflejar el cambio inmediatamente
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === messageId ? { ...msg, status: newStatus } : msg
        )
      );
      // Opcional: si el filtro está activo, podríamos necesitar refiltrar o recargar
      // fetchMessages(); // Podría ser necesario si el cambio afecta al filtro actual
    } catch (error) {
      console.error("Error updating message status:", error);
      alert("Error al actualizar el estado del mensaje.");
    }
  };

  // Mensajes filtrados (ya no es necesario con la carga filtrada)
  // const filteredMessages = useMemo(() => {
  //   if (filter === 'all') return messages;
  //   return messages.filter(msg => msg.status === filter);
  // }, [messages, filter]);

  if (loading && !user) { // Mostrar carga solo si no hay usuario y el script aún no decide
      return <p className="text-center mt-8 text-gray-600">Cargando autenticación...</p>;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-8 max-w-lg">
          <h1 className="text-3xl font-bold mb-4 text-amazon-blue">Panel de Administración</h1>
          <p className="mb-6 text-gray-600">
            Acceso restringido. Por favor, inicia sesión con tu cuenta de Google para ver los mensajes.
          </p>
          {scriptError ? (
            <p className="text-red-500 mb-4">Error al cargar servicio de autenticación.</p>
          ) : !scriptLoaded ? (
            <p className="mb-4">Cargando servicio de autenticación...</p>
          ) : (
            <div className="flex justify-center">
              {/* Solo renderizar un contenedor para el botón de Google */}
              <div id="google-signin-btn" className="rounded-lg overflow-hidden shadow" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Si el usuario está logueado pero aún cargando mensajes
  if (loading) {
      return <p className="text-center mt-8 text-gray-600">Cargando mensajes...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-amazon-blue">Mensajes de Contacto</h1>

      {/* Controles de Filtro - Dropdown */}
      <div className="mb-6 flex justify-center">
        <label htmlFor="filter-select" className="mr-2 self-center text-gray-700">Filtrar por:</label>
        <select
          id="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-amazon-blue"
        >
          <option value="all">Todos</option>
          <option value="unread">No Leídos</option>
          <option value="read">Leídos</option>
        </select>
      </div>

      {messages.length === 0 ? (
        <p className="text-center text-gray-500">No hay mensajes {filter !== 'all' ? `que coincidan con el filtro '${filter}'` : ''}.</p>
      ) : (
        <div className="space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`bg-white rounded-lg shadow-sm border-l-4 ${msg.status === 'unread' ? 'border-amazon-orange' : 'border-green-600'} overflow-hidden`}>
              <a href={`/admin/mensajes/${msg.id}`} className="block p-4 hover:bg-gray-50 transition duration-150 ease-in-out">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-semibold text-amazon-blue truncate">{msg.subject}</p>
                    <p className="text-xs text-gray-600">De: {msg.name} ({msg.email})</p>
                  </div>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${msg.status === 'read' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {msg.status === 'read' ? 'Leído' : 'No Leído'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-3">
                  Recibido: {msg.created_at instanceof Date ? msg.created_at.toLocaleString() : 'Fecha inválida'}
                </p>
                {/* Preview del mensaje si existe */}
                {msg.message && (
                    <p className="text-sm text-gray-700 line-clamp-2">
                        {msg.message}
                    </p>
                )}
              </a>
              {/* Botón para cambiar estado fuera del enlace */}
              <div className="px-4 pb-3 pt-1 flex justify-end bg-gray-50 border-t border-gray-100">
                 <button
                   onClick={() => toggleReadStatus(msg.id, msg.status)}
                   className={`px-3 py-1 text-xs rounded ${msg.status === 'read' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white transition-colors`}
                 >
                   {msg.status === 'read' ? 'Marcar No Leído' : 'Marcar Leído'}
                 </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
