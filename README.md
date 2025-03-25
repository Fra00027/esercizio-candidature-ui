# Esercizio Candidature Alten - Angular Application

## Implementazione

Questa applicazione Angular mostra una lista di post e dettagli dei post, implementando tutte le specifiche richieste e diversi miglioramenti opzionali. Di seguito è descritto cosa è stato implementato e dove.

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

## Funzionalità Implementate

### Requisiti Base

