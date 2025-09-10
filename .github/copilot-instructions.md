<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# EasyPed Epilepsy Patient Info App

This is a monorepo containing an epilepsy patient information management system with QR code generation for emergency access.

## Project Structure

- `frontend/`: Next.js app with Firebase authentication and TypeScript
- `backend/`: Node.js API with Express, TypeScript, and MongoDB

## Technologies

### Frontend

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Firebase Authentication
- React Hook Form with Yup validation
- Axios for API calls
- react-qr-code for QR code display

### Backend

- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT authentication
- QR code generation
- CORS enabled for frontend communication

## Key Features

1. **User Authentication**: Firebase-based authentication for doctors and parents
2. **Patient Management**: CRUD operations for patient information
3. **QR Code Generation**: Unique QR codes for each patient linking to emergency info
4. **Emergency Access**: Public endpoint for accessing patient info via QR code
5. **Role-based Access**: Different permissions for doctors vs parents

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/patients` - Get user's patients
- `POST /api/patients` - Create new patient
- `GET /api/patients/:id` - Get specific patient (owner only)
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Soft delete patient
- `GET /api/patients/qr/:qrCode` - Public endpoint for QR code access

## Environment Variables

### Backend (.env)

- `NODE_ENV`: development/production
- `PORT`: Server port (default: 3001)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT tokens
- `FRONTEND_URL`: Frontend URL for CORS and QR codes

### Frontend (.env.local)

- `NEXT_PUBLIC_API_URL`: Backend API URL
- Firebase configuration variables

## Development

- Backend runs on port 3001
- Frontend runs on port 3000
- MongoDB should be running locally or use cloud instance
- Use `npm run dev` in both directories for development
