import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const AdminMessages = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const q = query(collection(db, 'email_submissions'), orderBy('created_at', 'desc'));
        const snapshot = await getDocs(q);
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } else {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
      }
    });
  }, []);

  if (!user) {
    return <p>Redirigiendo a la pantalla de inicio de sesión...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mensajes de Contacto</h1>
      <ul className="space-y-4">
        {messages.map(msg => (
          <li key={msg.id} className="border rounded-lg p-4 shadow">
            <p><strong>Nombre:</strong> {msg.name}</p>
            <p><strong>Email:</strong> {msg.email}</p>
            {msg.phone && <p><strong>Teléfono:</strong> {msg.phone}</p>}
            {msg.company && <p><strong>Empresa:</strong> {msg.company}</p>}
            <p><strong>Asunto:</strong> {msg.subject}</p>
            <p><strong>Mensaje:</strong> {msg.message}</p>
            <p className="text-sm text-gray-500"><strong>Fecha:</strong> {msg.created_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminMessages;
