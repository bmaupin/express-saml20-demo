### Setup

1. Install dependencies
    ```shell
    npm install
    ```

2. Set environment variables
    - Required environment variables
        - `SAML_IDP_PUBLIC_KEY`: SAML IdP public key certificate, to be used to validate SAML response signatures
    - Optional environment variables
        - `PORT`: Port the app will listen on
            - Defaults to `3000`

### Usage

1. Start the app
    ```shell
    npm start
    ```

2. Send a POST request with the SAML response

    ```shell
    curl -v -X POST -d "SAMLResponse=..." http://localhost:3000/validatesaml
    ```
