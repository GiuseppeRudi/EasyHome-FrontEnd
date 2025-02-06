EasyHome - Guida alla Configurazione
Benvenuto in EasyHome, la piattaforma di immobili. Segui questa guida per configurare e avviare il progetto in locale.

In questa guida e nei file scaricabili non sono presenti le API KEY
---

Configurazione Backend
Scarica il Backend da https://github.com/GiuseppeRudi/EasyHome-BackEnd

Imposta le variabili d'ambiente
Aggiungi le seguenti variabili d'ambiente per l'utente corrente:

POSTGRES_PASSWORD: La tua password per il database Postgres
POSTGRES_USER: Il tuo nome utente per il database Postgres

Nota: Dopo aver configurato le variabili d'ambiente, riavvia il computer per applicare le modifiche.

Ripristina il database
Apri DBEaver e connettiti al database Postgres.
Se è presente una copia del database EasyHome, eliminala.
Crea un nuovo database chiamato EasyHome.
Ripristina il database:
Clicca con il tasto destro sul nuovo database e seleziona Strumenti > Ripristina.
Seleziona il formato pain, spunta le opzioni clean (drop) e crea database.
Scegli il file di backup .sql dalla cartella dump del Backend
Avvia il ripristino.

Avvia il Backend
Ora il Backend è pronto per essere avviato.

---

Configurazione Frontend
Installa le dipendenze
All'interno della cartella del Frontend, esegui il comando:

npm install


Configura l'ambiente
Scarica il Frontend da https://github.com/GiuseppeRudi/EasyHome-FrontEnd
Estrai il contenuto.

Avvia il Frontend.
Ora puoi avviare il Frontend.

---

(Facoltativo) Presentazione del Progetto
Per una panoramica rapida del progetto, consulta la seguente presentazione:
[Introduzione a EasyHome](power point di simone)

---

Supporto
Se riscontri problemi, non esitare a contattarci.
