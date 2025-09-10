# EasyPed Epilepsy Patient Info App

A comprehensive web application that allows doctors and parents to input patient information and generate QR codes for emergency access to treatment information during epilepsy episodes.

## Features

- **User Management**: Firebase authentication for doctors and parents
- **Patient Information**: Comprehensive patient profiles including medical history, medications, and emergency contacts
- **QR Code Generation**: Unique QR codes for each patient that link to emergency treatment information
- **Emergency Access**: Public access to patient information via QR code for first responders
- **Role-based Access**: Different permissions for medical professionals and family members
- **Mobile Responsive**: Optimized for mobile devices for emergency situations

## Tech Stack

### Frontend

- **Next.js 15** with App Router and TypeScript
- **Firebase Authentication** for user management
- **Tailwind CSS** for styling
- **React Hook Form** with Yup validation
- **react-qr-code** for QR code display

### Backend

- **Node.js** with Express and TypeScript
- **MongoDB** with Mongoose ODM
- **JWT** for API authentication
- **QR Code generation** with automatic URL linking

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or cloud)
- Firebase project (for authentication)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd easyped-epilepsy
   ```

2. **Install dependencies**

   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Environment Setup**

   **Backend (.env)**

   ```env
   NODE_ENV=development
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/easyped-epilepsy
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   FRONTEND_URL=http://localhost:3000
   ```

   **Frontend (.env.local)**

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   # Add other Firebase config variables
   ```

4. **Start the development servers**

   **Backend** (Terminal 1)

   ```bash
   cd backend
   npm run dev
   ```

   **Frontend** (Terminal 2)

   ```bash
   cd frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register new user (doctor/parent)
- `POST /api/auth/login` - User login

### Patient Management

- `GET /api/patients` - Get authenticated user's patients
- `POST /api/patients` - Create new patient
- `GET /api/patients/:id` - Get specific patient (owner only)
- `PUT /api/patients/:id` - Update patient information
- `DELETE /api/patients/:id` - Soft delete patient

### Emergency Access

- `GET /api/patients/qr/:qrCode` - Public endpoint for QR code access (no auth required)

## Project Structure

```
easyped-epilepsy/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # Reusable components
│   │   ├── lib/            # Utilities and configurations
│   │   └── types/          # TypeScript type definitions
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Node.js backend API
│   ├── src/
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── index.ts        # Main server file
│   └── package.json
├── .github/
│   └── copilot-instructions.md
└── README.md
```

## Usage Scenarios

### For Medical Professionals

1. Register as a "doctor"
2. Add patient information including medical history, medications, and emergency protocols
3. Generate and print QR codes for patients
4. Update patient information as needed

### For Parents/Caregivers

1. Register as a "parent"
2. Add child's epilepsy information and emergency contacts
3. Generate QR code for school, daycare, or emergency situations
4. Keep information updated

### For Emergency Responders

1. Scan QR code with any smartphone
2. Instantly access critical patient information
3. View emergency instructions, medications, and contact information
4. No app installation required - works with any QR code scanner

## Security & Privacy

- All patient data is encrypted and securely stored
- QR codes contain unique identifiers, not direct patient information
- Role-based access ensures users only see their own patients
- Emergency access provides only essential medical information
- Full audit trail of data access and modifications

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or support, please open an issue in the GitHub repository.

---

**Emergency Use**: This application is designed to assist in emergency situations but should not replace professional medical care. Always call emergency services when needed.
