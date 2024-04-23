## Birthday Wisher Email Service

### Description

This project sends simulated birthday wishes to customers on their birthday automatically. It has a cron job scheduled to run at 5 minutes past midnight everyday to fetch the details of the customers having birthday on that day and send the birthday wish through email. It also implements a set of API endpoints for handling CRUD (Create, Read, Update, Delete) operations of customers. The API processes customer details including customer ID, name, email, and Date Of Birth.

### Features

- Sends Simulated Birthday Wishes to customers on their birthday through email automatically
- Implements CRUD operations for customers
- Validates incoming data
- Handles exceptions
- Supports various HTTP methods (GET, POST, PATCH, DELETE)

### Live Link

[Live APP](https://birthday-wisher-email-service.onrender.com/bwesapi/hello)

### Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/AIM3r4j/birthday-wisher-email-service.git
   ```

2. Navigate to the project directory:

   ```bash
   cd birthday-wisher-email-service
   ```

3. Install dependencies:

   ```bash
   npm ci
   ```

4. Set up environment variables:

   - Create a .env file based on the provided .env.example file.

   - Update the variables with appropriate values.

5. Run application:

   ```bash
   npm run start:dev
   ```

### Running with Docker

1. Build the Docker image:

   ```bash
   docker build -t <image_name> .
   ```

2. Run the Docker container:

   ```bash
   docker run -p <host_port>:<container_port> -d <image_name>
   ```

3. Replace <host_port> with the port on your host machine where you want to access the application, and <container_port> with the port specified in the .env file or the default port if not specified. <image_name> is the name you gave to your Docker image in step 1.

### Documentation:

1.  Locate the "Birthday Wisher Email Service.postman_collection.json" file inside the base folder

2.  Import the file into Postman

3.  Use the postman collection as the documentation for the app

4.  Update the baseURL variable's port if needed

### API Endpoints

- GET /customer: Retrieve all customers
- GET /customer/:id: Retrieve a specific customer by ID
- POST /customer/register: Register a new customer
- PATCH /customer/:id: Update an existing customer
- DELETE /customer/:id: Delete an existing customer
