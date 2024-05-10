
const express = require('express');
const bodyParser = require('body-parser');


// Assuming you have a database connection
const db = require('./your_database_module');

app.use(bodyParser.json());

// Endpoint to import reduced carbon emission of the day for a user
app.post('/import-reduced-emission', (req, res) => {
    const { userId, date, reducedEmission } = req.body;

    // Check if the user exists in the database
    db.getUserById(userId)
        .then(user => {
            if (user) {
                // User exists, update the existing row
                return db.updateReducedEmissionForUser(userId, date, reducedEmission);
            } else {
                // User does not exist, insert a new row
                return db.insertReducedEmissionForNewUser(userId, date, reducedEmission);
            }
        })
        .then(() => res.send('Reduced emission imported successfully'))
        .catch(error => res.status(500).send('Error importing reduced emission: ' + error));
});



