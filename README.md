# Esercizio Candidature Alten - Angular Application

## Implementazione

Questa applicazione Angular mostra una lista di post e dettagli dei post, implementando tutte le specifiche richieste e diversi miglioramenti opzionali.

## Dipendenze Installate

L'applicazione utilizza le seguenti librerie principali:
- **Tailwind CSS**: Framework CSS utility-first per la creazione di design personalizzati
- **daisyUI**: Libreria di componenti basata su Tailwind CSS
- **NgRx**: Libreria per la gestione dello stato dell'applicazione basata sul pattern Redux

## Struttura del Progetto

L'applicazione è strutturata in moduli e componenti standalone per una migliore organizzazione del codice:

```
src/
├── app/
│   ├── core/
│   │   ├── components/
│   │   │   ├── navbar/
│   │   │   ├── post-list/
│   │   │   └── user-list/
│   │   ├── services/
│   │   │   └── api.service.ts  # Servizio per le chiamate API
│   │   └── store/
│   │       ├── post.store.ts   # Store per la gestione dei fltri 
│   │       └── user.store.ts   # Store per la gestione degli utenti
│   ├── model/
│   │   ├── post.interface.ts   # Interfaccia Post
│   │   └── user.interface.ts   # Interfaccia User
│   └── shared/
│       └── post-item/          # Componente standalone per singolo post
```
