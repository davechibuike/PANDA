# HOW TO GET APP RUNNING

This project is a simple backend node.js api server application.
Below are steps required to reproduce and run the application in development.

---

# Prerequisites

- Node.js (version 14 or later recommended) and npm package manager installed.
- database (MongoDB) set up and running.

# Set up environment variables:

- Create a .env file at the root of your project and add the necessary environment variables for database connection and other configurations.
- config.env for DB keys
- server for mongoDB connection

- #### Steps to run nodejs server api in **development**

  - Clone repo : https://github.com/davechibuike/PANDA.git

  - npm install
  - npm run start

- #### Interacting with the API

      - API Endpoints
      - The API provides the following endpoints:
        $ http://localhost:3000/api/v1/individual
        $ http://localhost:3000/api/v1/appointment
        $ http://localhost:3000/api/v1/missed-appointments

      - With Query Params
        $ http://localhost:3000/api/v1/individual/:nhs_number
        $ http://localhost:3000/api/v1/appointment/:patient

      - Individual Endpoints
      - Create an Individual:

  - Post Request http://localhost:3000/api/v1/individual
  - Request body:

    {
    "nhs_number": "string",
    "name": "string",
    "date_of_birth": "string",
    "postcode": "string",
    }

Endpoint HTTP Method Description

- /individual   POST  Create a new individual record.
- /individual   GET Retrieve a list of all individual records.
- /individual/:nhs_number GET Get an individual by their NHS number.
- /individual/:nhs_number PUT Update an existing individual record.
- /individual/:nhs_number DELETE Delete an individual record.
- /appointment POST Create a new appointment record.
- /appointment GET Retrieve a list of all appointment records.
- /appointment/:patientID GET Get an appointment by its ID.
- /appointment/:patientID PUT Update an existing appointment record.
- /appointment/:patientID DELETE Delete an appointment record.
- /missed-appointments GET Retrieve a list of all missed appointments.

# Additional Details:
- NHS number: The API uses NHS numbers for individual identification. Ensure valid NHS number formats when creating or retrieving individual records.
- Authentication and Authorization: These are typically implemented for production environments.
- Error Handling: The API returns standard HTTP status codes and JSON error responses for various error conditions.
