# Proiect TMW

Bună ziua,
Proiectul a fost realizat de Lupu Andy Constantin, Orzan Teodora Diana și Pop Alexandru.
Am realizat o aplicație simplă de tip expense-tracker care permite categorizarea cheltuielilor.
Este o aplicație RESTful construită cu Node.js, Express și Sequelize ca ORM, iar baza de date folosită este Firestore.
Interfața este construită cu Vue.

Pentru a rula aplicația local trebuie:

1. Să stabiliți conexiunea la baza de date Firestore prin modificarea URl-ului din /backend/config/db.config.js.
2. Să rulați în folderul backend comenzile "npm install" și "node server js".
3. Să rulați în folderul frontend comennzile "npm install" și "npm run serve".
4. Backend-ul va rula pe portul 8080, în timp ce frontend-ul trebuie să ruleze pe portul 3000. Dacă frontend-ul nu rulează pe acest port, vor apărea probleme CORS și aplicația nu va funcționa.
5. Aplicația permite logarea cu un user default (username: admin, password: admin). Baza de date este ștearsă la fiecare rulare a server-ului și sunt introduse date generate aleator prin librăria FakerJS.
