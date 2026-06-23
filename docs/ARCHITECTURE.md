# Architecture Documentation

## Overview

FinDash is a full-stack financial dashboard application following the MERN (MongoDB, Express, React, Node.js) architecture pattern with TypeScript for type safety.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  React 18 + TypeScript + Vite                        │   │
│  │  ┌────────────┐  ┌─────────────┐  ┌──────────────┐  │   │
│  │  │   Pages    │  │  Components │  │  State Mgmt  │  │   │
│  │  │ Dashboard  │  │   MUI       │  │  Redux TK    │  │   │
│  │  │ Predictions│  │   Charts    │  │  RTK Query   │  │   │
│  │  └────────────┘  └─────────────┘  └──────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTP/REST
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                         Server Layer                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Node.js + Express                                   │   │
│  │  ┌────────────┐  ┌─────────────┐  ┌──────────────┐  │   │
│  │  │   Routes   │  │ Middleware  │  │    Models    │  │   │
│  │  │  /kpi      │  │  Security   │  │  Mongoose    │  │   │
│  │  │  /product  │  │  Error      │  │  Schemas     │  │   │
│  │  │  /trans    │  │  CORS       │  │              │  │   │
│  │  └────────────┘  └─────────────┘  └──────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                            │ Mongoose ODM
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                      Database Layer                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  MongoDB                                             │   │
│  │  ┌─────────┐  ┌──────────┐  ┌─────────────────┐    │   │
│  │  │  KPIs   │  │ Products │  │  Transactions   │    │   │
│  │  │Collection│  │Collection│  │   Collection    │    │   │
│  │  └─────────┘  └──────────┘  └─────────────────┘    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend

#### Core
- **React 18**: Component-based UI library with hooks
- **TypeScript**: Static type checking
- **Vite**: Fast build tool and dev server

#### UI Framework
- **Material-UI (MUI) v5**: Component library
  - Provides consistent design system
  - Theme customization
  - Responsive grid system

#### State Management
- **Redux Toolkit**: Simplified Redux patterns
- **RTK Query**: Data fetching and caching
  - Automatic request deduplication
  - Cache invalidation
  - Optimistic updates

#### Visualization
- **Recharts**: Declarative charting library
  - Line charts
  - Bar charts
  - Area charts
  - Scatter plots
  - Pie charts

#### Routing
- **React Router v6**: Client-side routing

### Backend

#### Runtime & Framework
- **Node.js**: JavaScript runtime
- **Express**: Web application framework
  - RESTful API design
  - Middleware architecture

#### Database
- **MongoDB**: NoSQL document database
- **Mongoose**: ODM (Object Data Modeling)
  - Schema validation
  - Relationship management
  - Middleware hooks

#### Security & Middleware
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **express-rate-limit**: Rate limiting
- **Morgan**: HTTP request logging

## Project Structure

```
Findash/
├── client/                     # Frontend application
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── BoxHeader.tsx
│   │   │   ├── DashboardBox.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── ErrorDisplay.tsx
│   │   │   ├── FlexBetween.tsx
│   │   │   └── LoadingSkeleton.tsx
│   │   ├── scenes/            # Page components
│   │   │   ├── dashboard/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── Row1.tsx
│   │   │   │   ├── Row2.tsx
│   │   │   │   └── Row3.tsx
│   │   │   ├── navbar/
│   │   │   │   └── index.tsx
│   │   │   └── predictions/
│   │   │       └── index.tsx
│   │   ├── state/             # Redux store
│   │   │   ├── api.ts        # RTK Query API
│   │   │   └── types.ts      # TypeScript types
│   │   ├── App.tsx            # Root component
│   │   ├── main.tsx           # Entry point
│   │   ├── theme.ts           # MUI theme
│   │   └── expanded-theme.ts  # Theme extensions
│   ├── public/
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── server/                     # Backend application
│   ├── models/                # Mongoose models
│   │   ├── KPI.js
│   │   ├── Product.js
│   │   └── Transaction.js
│   ├── routes/                # API routes
│   │   ├── kpi.js
│   │   ├── product.js
│   │   └── transactionRoutes.js
│   ├── middleware/            # Custom middleware
│   │   ├── errorHandler.js
│   │   └── security.js
│   ├── data/                  # Seed data
│   │   └── data.js
│   ├── index.js               # Server entry point
│   ├── .env.example
│   └── package.json
│
├── docs/                      # Documentation
│   ├── API.md
│   ├── ARCHITECTURE.md
│   └── INSTALLATION.md
│
├── .github/
│   └── workflows/
│       └── ci.yml             # CI/CD pipeline
│
├── docker-compose.yml         # Docker orchestration
├── Dockerfile                 # Production build
├── Dockerfile.dev             # Development build
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── LICENSE
└── package.json              # Workspace config
```

## Data Flow

### 1. Client Request Flow

```
User Action
    ↓
React Component
    ↓
RTK Query Hook (useGetKpisQuery)
    ↓
API Slice (Redux)
    ↓
HTTP Request to Backend
```

### 2. Server Processing Flow

```
Express Route Handler
    ↓
Middleware (Security, Sanitization)
    ↓
Route Controller
    ↓
Mongoose Model Query
    ↓
MongoDB Database
    ↓
Response with Data
```

### 3. State Management Flow

```
API Response
    ↓
RTK Query Cache Update
    ↓
Redux Store Update
    ↓
Component Re-render
    ↓
UI Update
```

## Component Architecture

### Dashboard Page Structure

```
Dashboard (index.tsx)
├── Row1 Component
│   ├── Chart A (Revenue & Expenses)
│   ├── Chart B (Profit & Revenue)
│   └── Chart C (Revenue by Month)
├── Row2 Component
│   ├── Chart D (Operational vs Non-Op)
│   ├── Chart E (Campaigns & Targets)
│   └── Chart F (Product Prices)
└── Row3 Component
    ├── Chart G (Product List)
    ├── Chart H (Recent Transactions)
    └── Chart I (Expense Breakdown)
```

### Predictions Page

```
Predictions (index.tsx)
├── Historical Data Chart
└── ML Prediction Visualization
    └── Linear Regression Model
```

## API Design

### RESTful Endpoints

```
GET  /health                    # Health check
GET  /kpi/kpis                 # Fetch all KPIs
GET  /product/products         # Fetch all products
GET  /transaction/transactions # Fetch transactions (paginated)
```

### Response Format

Success:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 150,
    "pages": 3
  }
}
```

Error:
```json
{
  "success": false,
  "error": {
    "message": "Error description"
  }
}
```

## Database Schema

### KPI Collection
```javascript
{
  totalProfit: Number,
  totalRevenue: Number,
  totalExpenses: Number,
  expensesByCategory: {
    salaries: Number,
    supplies: Number,
    services: Number
  },
  monthlyData: [MonthSchema],
  dailyData: [DaySchema]
}
```

### Product Collection
```javascript
{
  price: Number,
  expense: Number,
  transactions: [ObjectId ref Transaction]
}
```

### Transaction Collection
```javascript
{
  buyer: String,
  amount: Number,
  productIds: [ObjectId ref Product]
}
```

## Security Features

### Backend Security
- **Helmet**: HTTP security headers
- **CORS**: Restricted origins
- **Rate Limiting**: 100 req/15min per IP
- **Input Sanitization**: NoSQL injection prevention
- **Request Size Limits**: 10MB max

### Data Validation
- **Mongoose Schemas**: Type validation
- **Custom Validators**: Business logic validation
- **Error Handling**: Consistent error responses

## Performance Optimizations

### Frontend
- **Code Splitting**: Vendor, MUI, Charts bundles
- **Lazy Loading**: Route-based code splitting
- **Memoization**: useMemo for expensive calculations
- **RTK Query Cache**: Automatic caching and deduplication

### Backend
- **Database Indexing**: Optimized queries
- **Query Limits**: Pagination for large datasets
- **Connection Pooling**: MongoDB connection reuse

## Deployment Architecture

### Development
```
Docker Compose
├── MongoDB Container
├── Server Container (with hot reload)
└── Client Container (with HMR)
```

### Production
```
Multi-stage Docker Build
├── Build Stage (Client)
├── Server Stage
└── Production Image
    ├── Compiled Client Assets
    └── Node.js Server
```

## Error Handling Strategy

### Frontend
- **Error Boundaries**: Catch React errors
- **Loading States**: Skeleton loaders
- **Error Display**: User-friendly messages
- **Retry Mechanisms**: Manual retry buttons

### Backend
- **Global Error Handler**: Centralized error processing
- **Custom Error Classes**: Typed errors
- **Async Error Wrapper**: Catch async errors
- **Logging**: Development error details

## Future Architecture Considerations

### Scalability
- Microservices architecture
- Message queue (RabbitMQ/Redis)
- Load balancing
- Horizontal scaling

### Features
- WebSocket for real-time updates
- Server-side rendering (SSR)
- Progressive Web App (PWA)
- Multi-tenancy support

### DevOps
- Kubernetes orchestration
- CI/CD automation
- Monitoring (Prometheus/Grafana)
- Log aggregation (ELK Stack)
