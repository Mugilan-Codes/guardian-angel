# Guardian Angel

## A Socially Relevant Project for college semester

### Done by

- Mugilan E.S. - [Github](https://github.com/Mugilan-Codes)
- Nivethithaa M - [Github](https://github.com/Nivethithaa-M)
- Shalini N - [Github](https://github.com/Shalini-CEG)

> Project Link

[Guardian Angel Source Code](https://github.com/Mugilan-Codes/guardian-angel)

#### How to Run the app

1. Git clone the project into your local computer

    ```git
    git clone https://github.com/Mugilan-Codes/guardian-angel
    ```

1. Move into the project directory

    ```zsh
    cd guardian-angel
    ```

1. Add config.js and google-services.json file to the root of the project(firbase connection)

    > config.js

    ```js
    export const firebaseConfig = {
        apiKey: "<API_KEY>",
        authDomain: "<AUTH_DOMAIN>",
        databaseURL: "<DATABASE_URL>",
        projectId: "<PROJECT_ID>",
        storageBucket: "<STORAGE_BUCKET>",
        messagingSenderId: "<MESSAGING_SENDER_ID>",
        appId: "<APP_ID>",
        measurementId: "<MEASUREMENT_ID>",
    };
    ```

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

1. Reset Local copy to match remote master

    ```git
    git reset --hard origin/master
    ```

1. Create and checkout a new feature branch (use this format).

    ```git
    git checkout -b <your-name>/<feature-name>
    ```

    eg. `git checkout -b mugilan/map-integration`

1. Make Changes and Commit those changes

    ```git
    git status
    git add <file-name>
    git commit -m "<some-meaningfull-commit-message>"
    ```

1. Push the changes to remote

    ```git
    git push -u origin <your-name>/<feature-name>
    ```

1. Go to Github to make a PR(Pull Request). Submit PR with Meaningfull comments. Wait for approval and merge.

1. Delete Local Branches Safely. (checkout master branch)

    ```git
    git branch -d <your-name>/<feature-name>
    ```

1. Sync with the remote branches by pruning deleted remote branches

    ```git
    git fetch -p
    ```

#### TODO

- Separate API
- Eject from Expo
- Clean the Codebase
- Refactor
- Better Database Solution / Implement Firebase to full extent
