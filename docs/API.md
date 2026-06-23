# API Documentation

FinDash REST API documentation for backend endpoints.

## Base URL

```
http://localhost:9000
```

## Endpoints

### Health Check

#### GET /health

Check if the server is running.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-06-23T10:30:00.000Z"
}
```

---

### KPIs

#### GET /kpi/kpis

Fetch all Key Performance Indicators.

**Response:**
```json
[
  {
    "_id": "64abc123def456789",
    "totalProfit": 150000,
    "totalRevenue": 500000,
    "totalExpenses": 350000,
    "expensesByCategory": {
      "salaries": 200000,
      "supplies": 100000,
      "services": 50000
    },
    "monthlyData": [
      {
        "id": "month1",
        "month": "January",
        "revenue": "42000",
        "expenses": "29000",
        "operationalExpenses": 25000,
        "nonOperationalExpenses": 4000
      }
    ],
    "dailyData": [
      {
        "id": "day1",
        "date": "2024-01-01",
        "revenue": 1500,
        "expenses": 1000
      }
    ]
  }
]
```

**Status Codes:**
- `200 OK` - Success
- `500 Internal Server Error` - Server error

---

### Products

#### GET /product/products

Fetch all products with pricing and transaction data.

**Response:**
```json
[
  {
    "_id": "64abc789def123456",
    "price": 29.99,
    "expense": 15.50,
    "transactions": [
      "64abc111def222333",
      "64abc444def555666"
    ],
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
]
```

**Status Codes:**
- `200 OK` - Success
- `500 Internal Server Error` - Server error

---

### Transactions

#### GET /transaction/transactions

Fetch transaction history with pagination.

**Query Parameters:**
- `limit` (optional) - Number of transactions per page (default: 50, max: 100)
- `page` (optional) - Page number (default: 1)

**Example Request:**
```
GET /transaction/transactions?limit=20&page=2
```

**Response:**
```json
{
  "data": [
    {
      "_id": "64abc111def222333",
      "buyer": "John Doe",
      "amount": 129.99,
      "productIds": [
        "64abc789def123456"
      ],
      "createdAt": "2024-02-10T14:30:00.000Z",
      "updatedAt": "2024-02-10T14:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

**Status Codes:**
- `200 OK` - Success
- `400 Bad Request` - Invalid parameters
- `500 Internal Server Error` - Server error

---

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "stack": "Stack trace (development only)"
  }
}
```

### Common Error Status Codes

- `400 Bad Request` - Invalid request parameters
- `404 Not Found` - Resource not found
- `409 Conflict` - Duplicate resource
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

---

## Rate Limiting

API endpoints are rate-limited to prevent abuse:

- **Standard endpoints**: 100 requests per 15 minutes per IP
- **Authentication endpoints**: 5 requests per 15 minutes per IP

When rate limit is exceeded:
```json
{
  "error": "Too many requests from this IP, please try again later."
}
```

---

## Security

### CORS

CORS is configured to allow requests from:
- Development: `http://localhost:5173`
- Production: Configure via `ALLOWED_ORIGINS` environment variable

### Headers

Required headers:
```
Content-Type: application/json
```

### Input Sanitization

All inputs are automatically sanitized to prevent NoSQL injection attacks.

---

## Data Models

### KPI Schema

```typescript
{
  totalProfit: Number,
  totalRevenue: Number,
  totalExpenses: Number,
  expensesByCategory: {
    salaries: Number,
    supplies: Number,
    services: Number
  },
  monthlyData: [{
    month: String,
    revenue: String,
    expenses: String,
    operationalExpenses: Number,
    nonOperationalExpenses: Number
  }],
  dailyData: [{
    date: String,
    revenue: Number,
    expenses: Number
  }]
}
```

### Product Schema

```typescript
{
  price: Number,
  expense: Number,
  transactions: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### Transaction Schema

```typescript
{
  buyer: String,
  amount: Number,
  productIds: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

---

## Examples

### Fetch KPIs with cURL

```bash
curl http://localhost:9000/kpi/kpis
```

### Fetch Paginated Transactions

```bash
curl "http://localhost:9000/transaction/transactions?limit=10&page=1"
```

### JavaScript/Fetch Example

```javascript
const fetchKPIs = async () => {
  try {
    const response = await fetch('http://localhost:9000/kpi/kpis');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching KPIs:', error);
  }
};
```

### Axios Example

```javascript
import axios from 'axios';

const fetchTransactions = async (page = 1, limit = 50) => {
  try {
    const { data } = await axios.get(
      'http://localhost:9000/transaction/transactions',
      { params: { page, limit } }
    );
    return data;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
};
```

---

## Testing

Use tools like:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [Thunder Client](https://www.thunderclient.com/) (VS Code extension)
- cURL command line

---

## Future Endpoints (Planned)

- `POST /kpi` - Create new KPI record
- `PUT /kpi/:id` - Update KPI record
- `DELETE /kpi/:id` - Delete KPI record
- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration
- `GET /analytics/summary` - Analytics summary
