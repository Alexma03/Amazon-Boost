import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore'; // Importar Timestamp

const AdminMessages = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true); // Añadir estado de carga

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
        const provider = new GoogleAuthProvider();
        try {
          await signInWithPopup(auth, provider);
        } catch (error) {
          console.error("Error during sign in:", error);
          setLoading(false); // Detener carga si falla el inicio de sesión
        }
      }
    });
    // Limpiar suscripción al desmontar
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p className="text-center mt-8 text-gray-600">Cargando mensajes...</p>;
  }

  if (!user) {
    return <p className="text-center mt-8 text-gray-600">Redirigiendo a la pantalla de inicio de sesión...</p>;
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
