# BIICODE

Web app mobile-first per registrare e verificare biciclette tramite BIICODE.

## Stato
- autenticazione Supabase (registrazione, login, reset password)
- registrazione e modifica bici
- fino a 5 fotografie per bici su Supabase Storage
- QR BIICODE e verifica pubblica tramite `?bike=...`
- scansione QR tramite `BarcodeDetector` quando disponibile
- segnalazione furto / recupero
- dashboard, elenco bici, attività e profilo
- fallback locale per mantenere una copia dei dati dell'utente in caso di errore di rete

## Deploy
Il repository è pensato per GitHub Pages. `index.html` è autosufficiente e usa CDN per Supabase JS e QRCode.js.

## Backend
L'app usa il progetto Supabase configurato direttamente nell'`index.html`. La tabella principale è `bikes` e il bucket foto è `bike-photos`.

Per la produzione, mantenere attive le policy RLS che permettono al proprietario di leggere/modificare solo le proprie bici e la lettura pubblica dei dati minimi necessari alla verifica BIICODE.
