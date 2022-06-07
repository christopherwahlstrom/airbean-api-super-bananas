/**
 * Kunna hämta kaffe-meny (se menu.json nedanför som ni ska använda och skicka tillbaka som svar till frontend)
 * Kunna lägga till beställningar (dessa beställningar ska kunna koppla mot ett konto se nedan men det ska även gå att lägga beställning utan ett konto som en gäst)
 * Ska kunna lägga till konton (användarnamn och lösenord) och koppla ett konto till de beställningar som görs (för att kunna se orderhistorik)
 * Se orderhistorik
 * Allt ska sparas i en NeDB-databas
 */

/**
 * ENDOINTS
 * 
 * GET /api/menu                - Hämta kaffe-meny
 * POST /api/order              - Ska kunna spara Kaffe beställning returnera ETA,Ordernr (kan slumpas), Ev anv namn kan kopplas till best
 * GET /api/order/:id           - Returnera orderhistorik för en specifik användare
 * POST /api/account/signup     - Ska kunna skapa ett användar konto
 * POST /api/account/login      - Ska kunna logga in
 */




 const express = require('express');
 const app = express();
 const PORT = 8000;

 app.use(express.json());
 
 const orderRouter = require('./routes/order');
 const accountsRouter = require('./routes/accounts');
 const menuRouter = require('./routes/menu');
 
 app.use('/api/menu', menuRouter);
 app.use('/api/account', accountsRouter);
 app.use('/api/order', orderRouter);
 
 
 
 app.listen(PORT, () => {
     console.log(`Listening on port ${PORT}`);
 });