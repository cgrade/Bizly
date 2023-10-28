# Bizly App API Documentation

## Introduction

Welcome to the Bizly API documentation. This API allows you to manage and retrieve financial data for your businesses. You can record income, expenses, and generate financial reports within specific time intervals.

## Base URL

The base URL for all API endpoints is `https://api.bizlyapp.com`.

## Authentication

To access these endpoints, you need to be authenticated. Use your token obtained during login as the `Authorization` header.
Authorization: Bearer your-access-token


## Error Handling

In case of errors, the API will respond with appropriate status codes and error messages.

- `200 OK`: Successful request.
- `201 Created`: Resource successfully created.
- `400 Bad Request`: Invalid request or missing parameters.
- `401 Unauthorized`: Authentication failure.
- `404 Not Found`: Resource not found.
- `500 Internal Server Error`: Server error.


## Endpoints

### 1. Business

#### Create a Business

- `POST /api/business/create`

**Request:**

```json
{
  "name": "My Business",
  "typeOfBusiness": "Fashion"
}
```

**Response:**

```json
{
  "_id": "653735cf05ca20dc15627603",
  "name": "My Business",
  "typeOfBusiness": "Fashion",
  "incomePercentage": 25,
  "expenses": [],
  "income": [],
  "date_created": "2023-10-24T03:03:31.597Z",
  "__v": 6
}
```

#### List All Businesses for a User

- `GET /api/business/businesses`

**Request:**

```json
{

}
```

**Response:**

```json
[
{
  "_id": "653735cf05ca20dc15627603",
  "name": "My Business",
  "typeOfBusiness": "Fashion",
  "incomePercentage": 25,
  "expenses": [],
  "income": [],
  "date_created": "2023-10-24T03:03:31.597Z",
  "__v": 6
},
{
  "_id": "653735cf05ca20dc15627603",
  "name": "My Business",
  "typeOfBusiness": "Fashion",
  "incomePercentage": 25,
  "expenses": [],
  "income": [],
  "date_created": "2023-10-24T03:03:31.597Z",
  "__v": 6
}
]
```

### 2. Income

#### Record an Income for a particular business

- `POST /api/income/:businessId/record`

**Request:**

```json
{
  "amount": 30000,
  "source": "Business Sales"
}
```

**Response:**

```json
{
  "amount": 30000,
  "date_created": "2023-10-24T03:03:31.603Z",
  "businessId": "653735cf05ca20dc15627603",
  "source": "Business Sales",
  "__v": 0
}
```

#### List All income for a Business

- `GET /api/income/:businessId/incomes`

**Request:**

```json
{

}
```

**Response:**

```json
[
{
  "amount": 30000,
  "date_created": "2023-10-24T03:03:31.603Z",
  "businessId": "653735cf05ca20dc15627603",
  "source": "Business Sales",
  "__v": 0
},
{
  "amount": 40000,
  "date_created": "2023-10-24T03:03:31.603Z",
  "businessId": "653735cf05ca20dc15627603",
  "source": "MakeUp",
  "__v": 0
}
]
```

### 3. Expenses

#### Record an Expense for a particular business

- `POST /api/expense/:businessId/record`

**Request:**

```json
{
  "amount": 30000,
  "typeOfExpense": "Rent"
}
```

**Response:**

```json
{
  "amount": 30000,
  "date_created": "2023-10-24T03:03:31.603Z",
  "businessId": "653735cf05ca20dc15627603",
  "typeOfExpense": "Rent",
  "__v": 0
}
```

#### List All income for a Business

- `GET /api/expense/:businessId/expenses`

**Request:**

```json
{

}
```

**Response:**

```json
[
{
  "amount": 30000,
  "date_created": "2023-10-24T03:03:31.603Z",
  "businessId": "653735cf05ca20dc15627603",
  "typeOfExpense": "Rent",
  "__v": 0
},
{
  "amount": 40000,
  "date_created": "2023-10-24T03:03:31.603Z",
  "businessId": "653735cf05ca20dc15627603",
  "typeOfExpense": "Overhead and Electricity",
  "__v": 0
}
]
```