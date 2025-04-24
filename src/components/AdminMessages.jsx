import React, { useState, useEffect } from 'react';
import useGoogleIdentityScript from './useGoogleIdentityScript';
import { GoogleAuthProvider, signInWithCredential, getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore'; // Importar Timestamp

const AdminMessages = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true); // Añadir estado de carga
  const { scriptLoaded, scriptError } = useGoogleIdentityScript();

  // Control de autenticación
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const q = query(collection(db, 'email_submissions'), orderBy('created_at', 'desc'));
          const snapshot = await getDocs(q);
          const fetchedMessages = snapshot.docs.map(doc => {
            const data = doc.data();
            // Convertir Timestamp de Firestore a objeto Date de JavaScript
            const createdAt = data.created_at instanceof Timestamp
              ? data.created_at.toDate()
              : new Date(data.created_at); // Fallback por si no es Timestamp
            return {
              id: doc.id,
              ...data,
              created_at: createdAt, // Guardar como objeto Date
            };
          });
          setMessages(fetchedMessages);
        } catch (error) {
          console.error("Error fetching messages:", error);
        } finally {
          setLoading(false); // Finalizar carga
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

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
                size: 'medium',  // Tamaño más pequeño para la esquina superior
                type: 'standard', 
                text: 'signin_with',
                shape: 'rectangular',
                logo_alignment: 'center',
                width: 200  // Ancho reducido para no ocupar tanto espacio
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

  if (loading) {
    return <p className="text-center mt-8 text-gray-600">Cargando mensajes...</p>;
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

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-amazon-blue">Mensajes de Contacto</h1>
      {messages.length === 0 ? (
        <p className="text-center text-gray-500">No hay mensajes.</p>
      ) : (
        <div className="space-y-6">
          {messages.map(msg => (
            <div key={msg.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-4">
                <div><strong className="text-amazon-blue">Nombre:</strong> {msg.name}</div>
                <div><strong className="text-amazon-blue">Email:</strong> <a href={`mailto:${msg.email}`} className="text-blue-600 hover:underline">{msg.email}</a></div>
                {msg.phone && <div><strong className="text-amazon-blue">Teléfono:</strong> {msg.phone}</div>}
                {msg.company && <div><strong className="text-amazon-blue">Empresa:</strong> {msg.company}</div>}
              </div>
              <div className="mb-4">
                <strong className="text-amazon-blue">Asunto:</strong> {msg.subject}
              </div>
              <div className="bg-gray-50 p-4 rounded border border-gray-200 mb-4">
                <strong className="text-amazon-blue block mb-2">Mensaje:</strong>
                <p className="text-gray-700 whitespace-pre-wrap">{msg.message}</p>
              </div>
              <p className="text-sm text-gray-500 text-right">
                <strong>Fecha:</strong> {msg.created_at instanceof Date ? msg.created_at.toLocaleString() : 'Fecha inválida'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
