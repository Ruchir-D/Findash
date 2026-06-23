# FinDash - Financial Dashboard Application

A full-stack financial analytics dashboard built with the MERN stack, featuring real-time data visualization, predictive analytics using machine learning, and an intuitive Material-UI interface.

## 🚀 Features

- **Interactive Dashboard**: Real-time financial metrics visualization with responsive charts
- **Predictive Analytics**: Machine learning-powered revenue predictions using linear regression
- **Data Visualization**: Multiple chart types including line, bar, area, scatter, and pie charts
- **Modern UI/UX**: Clean, professional interface built with Material-UI and custom theming
- **Type-Safe**: Built with TypeScript for enhanced code quality and developer experience
- **State Management**: Efficient data handling using Redux Toolkit and RTK Query
- **Responsive Design**: Optimized for desktop and mobile viewing

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next-generation frontend tooling
- **Material-UI (MUI v5)** - Component library
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching and caching
- **Recharts** - Declarative chart library
- **React Router v6** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this project, ensure you have the following installed:
- Node.js (v20 or higher)
- npm (v10 or higher) or yarn
- MongoDB (local or cloud instance)

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd Findash
```

### 2. Install server dependencies
```bash
cd server
npm install
```

### 3. Install client dependencies
```bash
cd ../client
npm install
```

### 4. Configure environment variables

Create `.env` files based on the `.env.example` templates:

**Server `.env`:**
```env
MONGO_URL=your_mongodb_connection_string
PORT=9000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173
```

**Client `.env`:**
```env
VITE_BASE_URL=http://localhost:9000/
```

## 🚀 Running the Application

### Development Mode

**Start the backend server:**
```bash
cd server
npm run dev
```

**Start the frontend client:**
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:9000

### Production Build

**Build the client:**
```bash
cd client
npm run build
```

## 📁 Project Structure

```
Findash/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── scenes/        # Page components (Dashboard, Predictions)
│   │   ├── state/         # Redux store and RTK Query API
│   │   ├── theme.ts       # MUI theme configuration
│   │   └── App.tsx        # Main application component
│   ├── public/
│   └── package.json
│
├── server/                # Node.js backend
│   ├── models/           # Mongoose schemas (KPI, Product, Transaction)
│   ├── routes/           # Express route handlers
│   ├── data/             # Seed data
│   ├── index.js          # Server entry point
│   └── package.json
│
├── .env.example          # Environment variables template
└── README.md
```

## 🎯 API Endpoints

### KPIs
- `GET /kpi/kpis` - Fetch all key performance indicators

### Products
- `GET /product/products` - Fetch all products

### Transactions
- `GET /transaction/transactions` - Fetch all transactions

## 🔐 Security Features

- Helmet.js for secure HTTP headers
- CORS configuration for cross-origin requests
- Environment variable protection for sensitive data
- MongoDB connection string encryption

## 📊 Data Models

### KPI Schema
- Monthly and daily revenue/expenses data
- Operational and non-operational expenses tracking
- Monthly data aggregation

### Product Schema
- Product pricing and expense information
- Transaction history references
- Supply tracking

### Transaction Schema
- Individual transaction records
- Buyer information
- Product references with pricing

## 🧪 Future Enhancements

- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] User authentication and authorization
- [ ] Real-time data updates with WebSockets
- [ ] Export functionality (CSV, PDF)
- [ ] Advanced filtering and search
- [ ] Multi-currency support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

Built with ❤️ by Ruchir Dandge

## 🙏 Acknowledgments

- Material-UI for the excellent component library
- Recharts for beautiful data visualizations
- MongoDB for flexible data storage
