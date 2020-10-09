# Guardian Angel

## A Socially Relevant Project for college semester

### Done by

- Mugilan E.S. - [Github](https://github.com/Mugilan-Codes)
- Nivethithaa M - [Github](https://github.com/Nivethithaa-M)
- Shalini N - [Github](https://github.com/Shalini-CEG)

#### How to Run the app

1. Git clone the project into your local computer

    ```git
    git clone https://github.com/Mugilan-Codes/guardian-angel
    ```

1. Move into the project directory

    ```zsh
    cd guardian-angel
    ```

1. Add config.js file to the root of the project(firbase connection)

    > config.js

    ```js
    export const firebaseConfig = {
        apiKey: <API_KEY>,
        authDomain: <AUTH_DOMAIN>,
        databaseURL: <DATABASE_URL>,
        projectId: <PROJECT_ID>,
        storageBucket: <STORAGE_BUCKET>,
        messagingSenderId: <MESSAGING_SENDER_ID>,
        appId: <APP_ID>,
        measurementId: <MEASUREMENT_ID>,
    };
    ```

1. Add google-services.json file also.

1. Install the App Dependencies

    ```zsh
    npm ci
    ```

1. Run the app

    ```zsh
    npm start
    ```

#### How to Contribute

1. Checkout the master branch (never directly push to master)

    ```git
    git checkout master
    ```

1. Fetch the latest commits

    ```git
    git fetch origin
    ```


> Project Link

[Guardian Angel Source Code](https://github.com/Mugilan-Codes/guardian-angel)

#### TODO

- Separate API
- Eject from Expo
- Clean the Codebase
- Refactor
- Better Database Solution / Implement Firebase to full extent
