// Este hook carga el script de Google Identity Services y expone el objeto global google.accounts.id
import { useState, useEffect } from 'react';

export default function useGoogleIdentityScript() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    // Si ya existe el script o está cargándose, evitamos duplicar
    if (document.getElementById('google-identity-script')) {
      // Verificar si el script ya se ha cargado completamente
      if (window.google && window.google.accounts) {
        setScriptLoaded(true);
      }
      return;
    }
    
    // Crearmos el script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.id = 'google-identity-script';
    
    // Manejamos los eventos de carga y error
    script.onload = () => {
      console.log("Script de Google Identity cargado exitosamente");
      setScriptLoaded(true);
    };
    
    script.onerror = () => {
      console.error("Error al cargar el script de Google Identity");
      setScriptError(true);
    };
    
    // Añadimos el script al documento
    document.body.appendChild(script);
    
    // Limpieza en caso de desmontaje del componente
    return () => {
      // No eliminamos el script para evitar problemas con otros componentes que puedan usarlo
    };
  }, []);

  return { scriptLoaded, scriptError };
}
