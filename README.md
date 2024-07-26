# medicines-api

Medicine API
Overview
This project is a RESTful API for managing medicines, built with Node.js, Express, and Redis. It provides endpoints for creating, reading, updating, deleting, searching, filtering, and sorting medicines, with caching capabilities to improve performance.

Installation
Prerequisites
Node.js (v14.x or later)
npm (Node Package Manager)
Redis server
Setup
Clone the Repository

bash
Copy code
git clone https://github.com/your-username/medicine-api.git
cd medicine-api
Install Dependencies

bash
Copy code
npm install
Configure Environment Variables

Create a .env file in the root directory and add the following variables:

makefile
Copy code
PORT=3000
REDIS_HOST=localhost
REDIS_PORT=6379
MONGO_URI=your_mongo_database_uri
Start Redis Server

Ensure your Redis server is running. You can start Redis with:

bash
Copy code
redis-server
Run the Application

Start the Node.js application:

bash
Copy code
npm start
The application will be running at http://localhost:3000.

API Endpoints
Add Medicine
Method: POST

URL: /api/medicines

Description: Add a new medicine.

Request Body:

json
Copy code
{
  "name": "Medicine Name",
  "price": 100.0,
  "discountPrice": 80.0,
  "quantity": 50,
  "manufacturer": "Manufacturer Name",
  "imageUrl": "http://example.com/image.jpg"
}
Responses:

201 Created: Medicine successfully created.
400 Bad Request: Missing required fields.
500 Internal Server Error: Server error.
Get Medicine by ID
Method: GET

URL: /api/medicines/:id

Description: Retrieve a medicine by its ID.

URL Parameters:

id (string): The ID of the medicine.
Responses:

200 OK: Medicine details.
404 Not Found: Medicine not found.
500 Internal Server Error: Server error.
Get All Medicines
Method: GET

URL: /api/medicines

Description: Retrieve all medicines. Cached for 10 minutes using Redis.

Responses:

200 OK: List of all medicines.
500 Internal Server Error: Server error.
Update Medicine by ID
Method: PUT

URL: /api/medicines/:id

Description: Update a medicine by its ID.

URL Parameters:

id (string): The ID of the medicine.
Request Body:

json
Copy code
{
  "name": "Updated Medicine Name",
  "price": 120.0,
  "discountPrice": 100.0,
  "quantity": 60,
  "manufacturer": "Updated Manufacturer Name",
  "imageUrl": "http://example.com/new_image.jpg"
}
Responses:

200 OK: Medicine successfully updated.
404 Not Found: Medicine not found.
500 Internal Server Error: Server error.
Delete Medicine by ID
Method: DELETE

URL: /api/medicines/:id

Description: Delete a medicine by its ID.

URL Parameters:

id (string): The ID of the medicine.
Responses:

200 OK: Medicine successfully deleted.
404 Not Found: Medicine not found.
500 Internal Server Error: Server error.
Search Medicines
Method: GET

URL: /api/medicines/search?q=:query

Description: Search for medicines by name.

URL Parameters:

q (string): The search query.
Responses:

200 OK: List of medicines matching the query.
500 Internal Server Error: Server error.
Filter Medicines
Method: GET

URL: /api/medicines/filter

Description: Filter medicines based on query parameters.

URL Parameters:

Any valid field and value for filtering (e.g., manufacturer=Acme).
Responses:

200 OK: List of medicines matching the filter.
500 Internal Server Error: Server error.
Sort Medicines
Method: GET

URL: /api/medicines/sort?sortBy=:field&order=:order

Description: Sort medicines by a specific field.

URL Parameters:

sortBy (string): The field to sort by (e.g., price).
order (string): Sort order (asc for ascending, desc for descending).
Responses:

200 OK: List of sorted medicines.
500 Internal Server Error: Server error.
Get Cached Medicines
Method: GET

URL: /api/medicines/cache

Description: Retrieve medicines from the cache.

Responses:

200 OK: List of cached medicines.
500 Internal Server Error: Server error.
Contributing
Feel free to submit issues or pull requests to improve the project.

License
This project is licensed under the MIT License.
