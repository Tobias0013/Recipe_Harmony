# Recipe Harmony

## Description
Recipe Harmony is a project that aims to provide a platform for sharing and discovering recipes. It allows users to create, view, and search for recipes based on various criteria such as ingredients, cuisine, and dietary restrictions.

This project was made as a part of the course DA219B (Full Stack Development) at Kristiansand University

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)
- [Contact](#contact)

## Installation
To install and set up Recipe Harmony, follow these steps:
1. Clone the repository: `git clone https://github.com/your-username/recipe-harmony.git`
2. Install the required dependencies: `npm install`
3. Create a new MongoDB database.
4. Configure the environment variables: 
    - Create a new file named `.env` in the root directory of the project.
    - Open the `.env` file and add the following environment variables:
      ```
      PORT=your-preferred-port
      URI=your-mongodb-uri
      SECRET=your-jwt-secret
      ADMIN=your-admin-email
      ```

## Deploy
To use Recipe Harmony, follow these steps:
1. Follow the [installation](#installation) guide.
1. Run the script `npm run build`
1. Start the server: `npm start`
1. Open your web browser and navigate to `http://localhost:port-enterd-in-.env`

## Development

### Scripts
The following scripts are available for development and deployment:

- `npm start`: This script starts both the client and server concurrently using the `concurrently` package. It runs the `client` and `server` scripts simultaneously.
- `npm run client`: This script starts the webpack development server for the client-side code. It uses `npx` to run the `webpack-dev-server` command with the specified options.
- `npm run server`: This script starts the server using `nodemon` to automatically restart the server when changes are made to the `server.ts` file.
- `npm run build`: This script builds both the client and server code for production deployment. It runs the `build-client` and `build-server` scripts simultaneously.
- `npm run build-client`: This script uses `npx` to run the `webpack` command with the `--mode production` option to build the client-side code for production.
- `npm run build-server`: This script uses `npx` to run the TypeScript compiler (`tsc`) to transpile the server-side TypeScript code into JavaScript.
- `npm run start-build`: This script starts the built server and opens the client in the default web browser.
- `npm run clean`: This script removes the `dist` and `dist-server` directories, which contain the built client and server code respectively.
- `npm run clean-node`: This script removes the `node_modules` directory, which contains the installed dependencies.
- `npm run clean-all`: This script runs the `clean` and `clean-node` scripts simultaneously to remove both the built code and the installed dependencies.

## Credits
- [antonbryhagen](https://github.com/antonbryhagen)
- [Tobias0013](https://github.com/Tobias0013)
- [KristofferLarsson5](https://github.com/KristofferLarsson5)
- [Allenalle1](https://github.com/Allenalle1)
- [FilleDanielsson](https://github.com/FilleDanielsson)
