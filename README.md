# Toko Kelontong Monorepo Project

## Prerequisites

Make sure you have installed the following versions before running the project:

- **Node.js**: v20.17
- **Yarn**: latest version

## Technologies Used

- **Backend**: NestJS, PostgreSQL
- **Frontend**: Vue 3
- **Package Manager**: Yarn

## Installation

1. Clone this repository:

   ```sh
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```sh
   yarn install
   ```

## Running the Application

Before running the application, make sure to execute the seed script first.

1. Run the seed script:

   ```sh
   psql -U postgres seed.sql
   ```

2. Start the application in development mode:
   ```sh
   yarn run dev:all
   ```

## Notes

- Ensure all dependencies are installed correctly before running the application.
- If you encounter any issues, check the Node.js and Yarn versions you are using.

Happy coding!
