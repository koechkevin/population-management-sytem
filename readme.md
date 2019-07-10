[![Test Coverage](https://api.codeclimate.com/v1/badges/f5e7dc8d62f80c4dd489/test_coverage)](https://codeclimate.com/github/koechkevin/population-management-sytem/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/f5e7dc8d62f80c4dd489/maintainability)](https://codeclimate.com/github/koechkevin/population-management-sytem/maintainability)
[![Build Status](https://travis-ci.org/koechkevin/population-management-sytem.svg?branch=master)](https://travis-ci.org/koechkevin/population-management-sytem)
[![Coverage Status](https://coveralls.io/repos/github/koechkevin/population-management-sytem/badge.svg?branch=master)](https://coveralls.io/github/koechkevin/population-management-sytem?branch=master)
#### sms-management-api

The documentation for this api can be accessed [here](https://population-system-api.herokuapp.com/docs/)

## Setup
 - Libraries, tools and Frameworks
    - Node js - Javascript runtime environment
    - Express js - A Javascript web applications framework.
    - Babel 7 - A Javascript transpiler that transforms the latest versions to browser compatible versions.
- Clone the repository - `$ git clone https://github.com/koechkevin/sms-management-api.git` 
- Change into the project directory - `$ cd sms-management-api`
- Install the dependencies - `$ yarn install`
    - Please provide the following environment variables
    
    ```
        DATABASE_HOST - your database host name
        DATABASE_NAME - The name of your database
        DATABASE_PASSWORD - password
        DATABASE_USER - your username on the database
        TEST_DATABASE - This a database name you will run the tests against
        PORT - the port number your application will run on. This defaults to 3000 if its not provided
    ```
    
  #### Production
    - Transpile the code and bundle by running `$ yarn build`
    - Run the server `$ yarn start`

  #### Development
     - Start the api with `$ yarn start:dev`. This uses the default port you provided on environment variables
     - Run any available migrations - `$ yarn migrate`
     
  #### Testing
    - Run the tests using `$ yarn test`
