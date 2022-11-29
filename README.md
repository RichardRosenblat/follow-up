# Follow-up

![LICENCE](https://img.shields.io/github/license/RichardRosenblat/follow-up?style=for-the-badge)
![repo size](https://img.shields.io/github/repo-size/RichardRosenblat/follow-up?style=for-the-badge)
![code size](https://img.shields.io/github/languages/code-size/RichardRosenblat/follow-up?style=for-the-badge)
![total lines](https://img.shields.io/tokei/lines/github/RichardRosenblat/follow-up?style=for-the-badge)
[![Follow up Node.js CI](https://github.com/RichardRosenblat/follow-up/actions/workflows/node.js.yml/badge.svg)](https://github.com/RichardRosenblat/follow-up/actions/workflows/node.js.yml)
> Production project: <https://follow-up.onrender.com>  

​
First project created during Alura level-up program for the company Lina Open X.  
Project developed during weeks 1 and 5 of the bootcamp.​  

- [Follow-up](#follow-up)
  - [Prerequisites](#prerequisites)
  - [Installing and starting the project](#installing-and-starting-the-project)
  - [Endpoints](#endpoints)
    - [Users](#users)
      - [List all users](#list-all-users)
      - [Find user by id](#find-user-by-id)
      - [Create user](#create-user)
      - [Update user](#update-user)
      - [Delete user](#delete-user)
  - [Health-Checks](#health-checks)
  - [Running tests and checking coverage](#running-tests-and-checking-coverage)
  - [Stack](#stack)
  - [Developers](#developers)

## Prerequisites

1. Node v14.18.1 or higher.
2. Npm v6.14.15 or higher.
3. MongoDb v6.0.2 or higher.

## Installing and starting the project

1. Clone the repository using git bash:

    ```bash
    git clone https://github.com/RichardRosenblat/follow-up.git
    ```

2. Access the application folder:

    ```bash
    cd follow-up
    ```

3. Install the depedencies:

    ```bash
    npm install
    ```

4. Create a `.env` file and insert the specific configurations for the application to run on your device:

    ```.env
    # The port in which the aplciation will listen to
    PORT = 3000

    # The connection string for your MongoDb server
    CONNECTIONSTRING = "mongodb://localhost:27017"

    # The database in your MongoDb server in which the application will operate
    DATABASENAME = "follow-up"
    ```

5. Start the project using the npm commands:

    ```bash
    npm start
    ```

    ou

    ```bash
    npm run start:dev
    ```

## Endpoints

### Users

#### List all users

- GET /users  
- Responses:
  - Status: `200 OK`
    - Body:

      ```json
      [
          {
              "id": "6374e42c0429fc93f850f468",
              "name": "Richard Rosenblat",
              "email": "imadethis@code.com",
              "password": "$2b$10$ullU5sGQ/gRLcac5MeB7aOxCknUCh6.rjW1.mhbXeTKCVR2cXbkCe", 
              "creationDate": "2022-11-16"
          }
      ]
      ```

#### Find user by id

- GET /users/:id  
- Responses:
  - Status: `200 OK`
    - Body:

      ```json
          {
              "id": "6374e42c0429fc93f850f468",
              "name": "Richard Rosenblat",
              "email": "imadethis@code.com",
              "password": "$2b$10$ullU5sGQ/gRLcac5MeB7aOxCknUCh6.rjW1.mhbXeTKCVR2cXbkCe", 
              "creationDate": "2022-11-16"
          }    
      ```

  - Status: `404 NOT FOUND`
    - Body:

      ```json
        [
            {
                // Field in which this error is related to.
                "field": "id", 
                // A especification of the error.
                "message": "Id must exist in database" 
            }
        ]  
      ```

#### Create user

- POST /users  
  - Request Body:

    ```json
            {
                "name":"Richard Rosenblat",
                "email": "imadethis@code.com",
                "password": "1234567890" 
            }    
      ```

- Responses:
  - Status: `201 CREATED`
    - Body:

      ```json
          {
              "id": "6374e42c0429fc93f850f468",
              "name": "Richard Rosenblat",
              "email": "imadethis@code.com",
              // This field is encripted automatically.
              "password": "$2b$10$ullU5sGQ/gRLcac5MeB7aOxCknUCh6.rjW1.mhbXeTKCVR2cXbkCe", 
              "creationDate": "2022-11-16"
          }    
      ```

  - Status: `400 BAD REQUEST`
    - Body:

      ```json
        [
            {
                // Field in which this error is related to.
                "field": "name",
                // A especification of the error.
                "message": "Name cannot be empty"
            },
            {
                // Field in which this error is related to.
                "field": "id", 
                // A especification of the error.
                "message": "Id must exist in database" 
            }
            {
                "field": "email",
                "message": "Email must be unique"
            }

        ]  
      ```

#### Update user

- PUT /users/:id  
  - Request Body:

    ```json
            {
                "password":"1234567890"
            }    
      ```

- Responses:
  - Status: `201 CREATED`
    - Body:

      ```json
          {
              "id": "6374e42c0429fc93f850f468",
              "name": "Richard Rosenblat",
              "email": "imadethis@code.com",
              // This field is encripted automatically
              "password": "$2b$10$ullU5sGQ/gRLcac5MeB7aOxCknUCh6.rjW1.mhbXeTKCVR2cXbkCe", 
              "creationDate": "2022-11-16"
          }    
      ```

  - Status: `400 BAD REQUEST`
    - Body:

      ```json
        [
            {
                // Field in which this error is related to.
                "field": "id", 
                // A especification of the error.
                "message": "Id must exist in database" 
            },
            {
                "field": "password",
                "message": "Password must be minimum 8 caracters"
            }

        ]  
      ```

#### Delete user

- Delete /users/:id  

- Responses:
  - Status: `204 NO CONTENT`
  - Status: `404 NOT FOUND`
    - Body:

      ```json
        [
            {
                // Field in which this error is related to.
                "field": "id", 
                // A especification of the error.
                "message": "Id must exist in database" 
            }
        ]  
      ```

## Health-Checks

- GET /
- Responses:
  - Status: `200 OK`
    - Body:

      ```json
        {
            "Server": "ok",
            "Database": "Connected"
        } 
      ```

## Running tests and checking coverage

To test the application you can run the following commands

- Run all test suites

  ```bash
  npm run test
  ```
  
- Run all test suites in watch mode

  ```bash
  npm run test:watch
  ```
  
- Generate coverage reports

  ```bash
  npm run test:cov
  ```

## Stack

- NodeJs
- MongoDB
- NPM
  - MongoDB's NodeJs driver
  - Bcrypt
  - Dotenv
  - Express
  - Validator
  - Nodemon
  - Jest

## Developers

1. [Richard Rosenblat](https://github.com/RichardRosenblat)
2. [Wanderson Macêdo](https://github.com/wandersonmaceds)
