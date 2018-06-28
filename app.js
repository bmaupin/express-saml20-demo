// body-parser is required to parse the request body (req.body)
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const saml = require('saml20');

const port = process.env.PORT || 3000;

// Change this to the attribute name to use for memberId
const memberIdSamlAttributeUrn = 'urn:oid:0.9.2342.19200300.100.1.3'

const app = express();

app.use(helmet());

// Parse application/x-www-form-urlencoded requests
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json requests
app.use(bodyParser.json());

app.post('/validatesaml', (req, res, next) => {
  let samlResponse = req.body.SAMLResponse;
  let decodedSamlResponse = Buffer.from(samlResponse, 'base64').toString('utf8');

  let options = {
    // TODO: This bypasses SAML response expiration validation, remove this in production
    bypassExpiration: true,
    publicKey: process.env.SAML_IDP_PUBLIC_KEY,
  };

  saml.validate(decodedSamlResponse, options, (err, profile) => {
    if (err) {
      // Let Express handle any errors
      next(err);
    } else {
      let memberId = profile.claims[memberIdSamlAttributeUrn];
      // TODO: Create a real confirm code
      let confirmCode = 'confirmcode12345678';

      res.append('memberid', memberId);
      res.append('Confirmcode', confirmCode);
      res.send();
    }
  });
});

app.listen(port, '0.0.0.0');
