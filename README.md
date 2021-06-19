# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/engine/install/).

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Building docker images and running application

```
docker compose up --build
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run all tests without authorization from running docker container

```
docker exec CONTAINER npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```
To run only one of all test suites (users, boards or tasks) from running docker container

```
docker exec CONTAINER npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```
To run all test with authorization from running docker container

```
docker exec CONTAINER npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```
To run only specific test suite with authorization (users, boards or tasks) from running docker container

```
docker exec CONTAINER npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```
### Auto-fix and format in running docker container

```
docker exec CONTAINER npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
