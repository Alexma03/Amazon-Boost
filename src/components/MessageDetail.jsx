import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import useGoogleIdentityScript from './useGoogleIdentityScript';

const MessageDetail = ({ messageId }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { scriptLoaded } = useGoogleIdentityScript();
  const [replyText, setReplyText] = useState('');

  // Obtener el mensaje específico cuando el usuario está autenticado
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser && messageId) {
        await fetchMessage(messageId);
      } else if (!currentUser) {
        setLoading(false);
      }
    });
    
    return () => unsubscribe();
  }, [messageId]);

  // Función para obtener el mensaje
  const fetchMessage = async (id) => {
    try {
      setLoading(true);
      const messageRef = doc(db, 'email_submissions', id);
      const messageSnap = await getDoc(messageRef);
      
      if (messageSnap.exists()) {
        const data = messageSnap.data();
        // Convertir Timestamp a Date si es necesario
        const createdAt = data.created_at ? 
          (data.created_at.toDate ? data.created_at.toDate() : new Date(data.created_at)) : 
          new Date();
          
        setMessage({
          id: messageSnap.id,
          ...data,
          status: data.status || 'unread',
          created_at: createdAt
        });
        
        // Si el mensaje está sin leer, marcarlo como leído automáticamente
        if (data.status !== 'read') {
          await updateDoc(messageRef, { status: 'read' });
          setMessage(prev => ({ ...prev, status: 'read' }));
        }
      } else {
        setError('No se encontró el mensaje solicitado.');
      }
    } catch (err) {
      console.error("Error al obtener el mensaje:", err);
      setError(`Error al obtener el mensaje: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Función para cambiar el estado de lectura del mensaje
  const toggleReadStatus = async () => {
    if (!message) return;
    
    const newStatus = message.status === 'read' ? 'unread' : 'read';
    const messageRef = doc(db, 'email_submissions', messageId);
    
    try {
      await updateDoc(messageRef, { status: newStatus });
      setMessage(prev => ({ ...prev, status: newStatus }));
    } catch (err) {
      console.error("Error al actualizar el estado del mensaje:", err);
      alert("Error al actualizar el estado del mensaje.");
    }
  };

  // Función para simular el envío de una respuesta
  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !message) return;
    
    setSendingReply(true);
    try {
      // Aquí se implementaría la lógica real de envío de emails usando Firebase Functions, EmailJS o similar
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay de red
      
      // Si se quiere implementar el envío real, se puede usar EmailJS o Firebase Functions
      console.log(`Enviando respuesta a ${message.email}: ${replyText}`);
      
      // Actualizar el registro en Firestore para mantener un historial (opcional)
      const messageRef = doc(db, 'email_submissions', messageId);
      await updateDoc(messageRef, { 
        last_reply: {
          text: replyText,
          date: new Date(),
          by: user.email || user.displayName
        },
        has_been_replied: true
      });
      
      // Mostrar mensaje de éxito
      setReplySuccess(true);
      setTimeout(() => {
        setShowReplyModal(false);
        setReplySuccess(false);
      }, 2000);
      
      // Limpiar el formulario
      setReplyText('');
    } catch (err) {
      console.error("Error al enviar la respuesta:", err);
      alert("Error al enviar la respuesta. Por favor, intenta de nuevo.");
    } finally {
      setSendingReply(false);
    }
  };

  // Pantalla de autenticación
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-8 max-w-lg">
          <h1 className="text-3xl font-bold mb-4 text-amazon-blue">Panel de Administración</h1>
          <p className="mb-6 text-gray-600">
            Acceso restringido. Por favor, inicia sesión para ver el mensaje.
          </p>
          {!scriptLoaded ? (
            <p className="mb-4">Cargando servicio de autenticación...</p>
          ) : (
            <div className="flex justify-center">
              <div id="google-signin-btn" className="rounded-lg overflow-hidden shadow" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Pantalla de carga
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amazon-blue mb-4"></div>
          <p className="text-center text-gray-600">Cargando mensaje...</p>
        </div>
      </div>
    );
  }

  // Pantalla de error
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
          <h1 className="text-2xl font-bold mb-4 text-amazon-blue">Error</h1>
          <p className="text-red-600 mb-4">{error}</p>
          <a 
            href="/admin/mensajes" 
            className="inline-block px-4 py-2 bg-amazon-blue text-white rounded hover:bg-amazon-blue-dark transition-colors"
          >
            Volver a mensajes
          </a>
        </div>
      </div>
    );
  }

  // Pantalla de mensaje no encontrado
  if (!message) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
          <h1 className="text-2xl font-bold mb-4 text-amazon-blue">Mensaje no encontrado</h1>
          <p className="text-gray-700 mb-4">El mensaje solicitado no existe o ha sido eliminado.</p>
          <a 
            href="/admin/mensajes" 
            className="inline-block px-4 py-2 bg-amazon-blue text-white rounded hover:bg-amazon-blue-dark transition-colors"
          >
            Volver a mensajes
          </a>
        </div>
      </div>
    );
  }

  // Pantalla con el mensaje
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto"> {/* Aumentado de 3xl a 5xl para hacerlo más ancho */}
        {/* Barra superior con navegación y acciones */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <a 
            href="/admin/mensajes" 
            className="inline-flex items-center text-amazon-blue hover:underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a mensajes
          </a>
          
          <div className="flex gap-2">
            <button
              onClick={toggleReadStatus}
              className={`px-4 py-2 rounded text-sm font-medium ${
                message.status === 'read' 
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              } transition-colors shadow-sm hover:shadow`}
            >
              {message.status === 'read' ? 'Marcar como no leído' : 'Marcar como leído'}
            </button>
          </div>
        </div>
        
        {/* Tarjeta del mensaje */}
        <div className={`bg-white rounded-lg shadow-md border-l-4 ${
          message.status === 'unread' ? 'border-amazon-orange' : 'border-green-600'
        } p-8 mb-6 transition-all duration-300 hover:shadow-lg`}> {/* Padding aumentado de p-6 a p-8 */}
          {/* Cabecera del mensaje */}
          <div className="border-b pb-6 mb-6"> {/* Padding aumentado */}
            <h1 className="text-3xl font-bold text-amazon-blue mb-4">{message.subject}</h1> {/* Tamaño aumentado */}
            
            <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
              <div className="bg-gray-50 p-4 rounded-lg w-full md:w-auto"> {/* Añadido fondo y padding */}
                <p className="text-gray-700 mb-2"><span className="font-semibold">De:</span> {message.name}</p>
                <p className="text-gray-700 mb-2"><span className="font-semibold">Email:</span> {message.email}</p>
                {message.phone && (
                  <p className="text-gray-700 mb-2"><span className="font-semibold">Teléfono:</span> {message.phone}</p>
                )}
                {/* Historial de respuestas (si existe) */}
                {message.has_been_replied && message.last_reply && (
                  <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-100">
                    <p className="text-xs text-blue-700">
                      <span className="font-semibold">Última respuesta:</span> {new Date(message.last_reply.date.seconds * 1000).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="text-right bg-gray-50 p-4 rounded-lg w-full md:w-auto"> {/* Añadido fondo y padding */}
                <p className="text-gray-600 text-sm mb-2">
                  Recibido: <span className="font-medium">{message.created_at.toLocaleString()}</span>
                </p>
                <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                  message.status === 'read' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {message.status === 'read' ? 'Leído' : 'No Leído'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Contenido del mensaje */}
          <div className="mb-6 text-gray-800 whitespace-pre-wrap bg-gray-50 p-6 rounded-lg border border-gray-100 text-lg"> {/* Añadido estilo y tamaño */}
            {message.message}
          </div>
        </div>
        
        {/* Opciones adicionales */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <a 
            href="/admin/mensajes" 
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-300 text-gray-700 font-medium rounded hover:bg-gray-400 transition-colors shadow-sm hover:shadow"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            Volver a mensajes
          </a>
          
          <div className="flex flex-wrap gap-2 justify-end">
            <a 
              href={`mailto:${message.email}?subject=RE: ${message.subject}`} 
              className="inline-flex items-center px-6 py-3 bg-amazon-blue text-white font-medium rounded hover:bg-amazon-blue-dark transition-colors shadow-sm hover:shadow"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
              </svg>
              Abrir en cliente de email
            </a>
            
            {message.phone && (
              <a 
                href={`tel:${message.phone}`} 
                className="inline-flex items-center px-6 py-3 bg-amazon-orange text-white font-medium rounded hover:bg-amazon-orange-dark transition-colors shadow-sm hover:shadow"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Llamar
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageDetail;
