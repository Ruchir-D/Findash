# Installation Guide

This guide will walk you through setting up FinDash on your local machine.

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v20 or higher) - [Download](https://nodejs.org/)
- **npm** (v10 or higher, comes with Node.js) or **yarn**
- **MongoDB** - [Installation Guide](https://docs.mongodb.com/manual/installation/)
  - Local installation OR
  - MongoDB Atlas (cloud) account

## Step-by-Step Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Findash.git
cd Findash
```

### 2. Install Dependencies

#### Using npm workspaces (Recommended):
```bash
npm install
```

This will install dependencies for both client and server using workspace configuration.

#### Manual installation:
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 3. Configure Environment Variables

#### Server Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# MongoDB Connection
MONGO_URL=mongodb://localhost:27017/findash
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/findash

# Server Configuration
PORT=9000
NODE_ENV=development

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:5173
```

#### Client Configuration

Create a `.env` file in the `client` directory:

```bash
cd client
cp .env.example .env
```

Edit the `client/.env` file:

```env
VITE_BASE_URL=http://localhost:9000/
```

### 4. Set Up MongoDB

#### Option A: Local MongoDB

1. Start MongoDB service:
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   net start MongoDB
   ```

2. Verify MongoDB is running:
   ```bash
   mongosh
   ```

#### Option B: MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGO_URL` in `.env` with your connection string

### 5. Seed the Database (Optional)

Uncomment the seed data code in `server/index.js`:

```javascript
// Uncomment these lines:
await mongoose.connection.db.dropDatabase();
KPI.insertMany(kpis);
Product.insertMany(products);
Transaction.insertMany(transactions);
```

Run the server once to seed data, then comment out the lines again.

### 6. Start the Application

#### Development Mode

**Option 1: Run both client and server concurrently (Recommended)**
```bash
npm run dev
```

**Option 2: Run separately**

In terminal 1 (Server):
```bash
cd server
npm run dev
```

In terminal 2 (Client):
```bash
cd client
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:9000

### 7. Verify Installation

1. Open your browser to http://localhost:5173
2. You should see the dashboard with charts
3. Check the browser console for any errors
4. Navigate to http://localhost:5173/predictions to test routing

## Docker Installation (Alternative)

### Prerequisites
- Docker Desktop installed
- Docker Compose installed

### Steps

1. **Build and start containers:**
   ```bash
   docker-compose up -d
   ```

2. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:9000
   - MongoDB: localhost:27017

3. **Stop containers:**
   ```bash
   docker-compose down
   ```

4. **View logs:**
   ```bash
   docker-compose logs -f
   ```

## Troubleshooting

### Port Already in Use

If port 5173 or 9000 is already in use:

```bash
# Find process using port
lsof -i :5173
lsof -i :9000

# Kill the process
kill -9 <PID>
```

Or change the port in configuration files.

### MongoDB Connection Error

- Verify MongoDB is running
- Check connection string in `.env`
- Ensure network access if using MongoDB Atlas
- Check firewall settings

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules client/node_modules server/node_modules
npm install
```

### CORS Errors

- Verify `ALLOWED_ORIGINS` in server `.env`
- Verify `VITE_BASE_URL` in client `.env`
- Ensure both point to the correct URLs

### TypeScript Errors

```bash
# Run type check
npm run type-check --workspace=client

# Rebuild
npm run build --workspace=client
```

## Development Tools

### Recommended VS Code Extensions

- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- MongoDB for VS Code
- Docker

### Useful Commands

```bash
# Format code
npm run format

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Type check (client)
npm run type-check --workspace=client
```

## Next Steps

- Read [CONTRIBUTING.md](../CONTRIBUTING.md) for development guidelines
- Check [README.md](../README.md) for project overview
- Explore the codebase structure
- Start developing!

## Need Help?

- Check existing [GitHub Issues](https://github.com/yourusername/Findash/issues)
- Create a new issue if you encounter problems
- Review the documentation in the `/docs` folder
