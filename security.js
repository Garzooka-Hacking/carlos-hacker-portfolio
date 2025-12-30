/**
 * PROTOCOLO DE SEGURIDAD GARZOOKA
 * Previene acceso básico a herramientas de desarrollo y visualización de código.
 */

// Deshabilitar Click Derecho
document.addEventListener('contextmenu', event => {
    event.preventDefault();
    // alert('⚠️ ACCESO DENEGADO: Protocolo de Seguridad Activo');
});

// Deshabilitar Teclas de Atajo (F12, Ctrl+U, Ctrl+Shift+I, etc.)
document.addEventListener('keydown', event => {
    // F12
    if (event.key === 'F12') {
        event.preventDefault();
        return false;
    }
    
    // Ctrl + Shift + I (Inspect)
    if (event.ctrlKey && event.shiftKey && event.key === 'I') {
        event.preventDefault();
        return false;
    }

    // Ctrl + Shift + C (Inspect Element)
    if (event.ctrlKey && event.shiftKey && event.key === 'C') {
        event.preventDefault();
        return false;
    }

    // Ctrl + Shift + J (Console)
    if (event.ctrlKey && event.shiftKey && event.key === 'J') {
        event.preventDefault();
        return false;
    }

    // Ctrl + U (View Source)
    if (event.ctrlKey && event.key === 'U') {
        event.preventDefault();
        return false;
    }
});

// Mensaje disuasorio en consola por si logran abrirla
const styles = [
    'background: red',
    'color: white',
    'font-size: 24px',
    'font-weight: bold',
    'padding: 10px',
    'border: 2px solid white'
].join(';');

console.clear();
console.log('%c⚠️ ¡ALERTA DE SEGURIDAD! ⚠️', styles);
console.log('%cESTA ZONA ESTÁ MONITOREADA. CUALQUIER INTENTO DE INGENIERÍA INVERSA SERÁ REGISTRADO.', 'color: red; font-size: 14px; font-weight: bold;');
console.log('%cTu dirección IP y huella digital han sido capturadas por el sistema de defensa de Garzooka.', 'color: #00ff41; font-family: monospace;');
