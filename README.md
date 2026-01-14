# Sportska-radnja — Full-Stack E-Commerce Web Application

**Sportska-radnja** je full-stack web aplikacija za **prodaju sportske odeće i obuće**.  
Omogućava korisnicima da pregledaju proizvode kroz moderan i responzivan korisnički interfejs, dok admini mogu dodavati i brisati proizvode.  

Projekat je razvijen sa fokusom na **čistu arhitekturu**, **modularnost** i **pripremljenost za buduće proširenje**.

---

## Tehnološki stack

- **Frontend:** React, JavaScript  
- **Backend:** Node.js, Express  
- **Baza podataka:** lokalna / JSON (kasnije se može zameniti sa SQL/NoSQL)  

---

## Funkcionalnosti

- Prikaz i pregled proizvoda  
- Login i registracija korisnika  
- Dodavanje i brisanje proizvoda za admin korisnike  
- Filteri po kategorijama i markama (trenutno samo struktura, unos teksta još nije podržan)  
- Modularna arhitektura frontend i backend slojeva  
- Kod organizovan za lako održavanje i buduće proširenje (npr. korpa i checkout)  

---

## Opis arhitekture

Aplikacija koristi **REST arhitekturu**, gde frontend komunicira sa backend API-jem radi upravljanja podacima.  

- **Frontend:** odgovoran za prikaz proizvoda i interakciju sa korisnicima  
- **Backend:** upravlja poslovnom logikom i podacima proizvoda, uključujući role-based pristup za admin korisnike  

Projekat je pripremljen za buduće funkcionalnosti poput:  
- Korpe i procesa checkout-a  
- Napredne pretrage i filtera po tekstu  
- Dodatne uloge korisnika i autorizacije  
