# EmployWise User Management Application

A React-based frontend application for user authentication and management, integrated with the Reqres API. Implements modern UI practices with Material-UI and Framer Motion animations.

*[Demo Demo](https://employwisekrish.netlify.app/) *
<iframe src="https://employwisekrish.netlify.app" width="100%" height="500px" style="border:none;"></iframe>

## Features

### Level 1: Authentication
- Secure login with email/password validation
- Token persistence using localStorage
- Error handling for invalid credentials
- Responsive design with gradient background

### Level 2: User Management
- Paginated user listing with cards
- Dynamic search by name/email
- Sorting by first/last name
- Responsive grid layout
- Loading states and error handling

### Level 3: CRUD Operations
- Edit user details with form validation
- Delete user with confirmation dialog
- Real-time data updates after mutations
- Animated transitions between pages
- Success/error feedback via snackbars

### Bonus Features
- 🔍 Client-side search and filtering
- 🧭 React Router navigation
- 🎨 Modern UI with Material-UI
- ✨ Framer Motion animations
- 📱 Fully responsive design

## Technologies Used

- **React** (v18+)
- **Material-UI** (v5) for UI components
- **React Router** (v6) for navigation
- **Axios** for API communication
- **Framer Motion** for animations
- **Reqres.in** mock API

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/employwise.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Integration

The application uses the [Reqres.in](https://reqres.in) mock API with the following endpoints:

| Endpoint          | Method | Description                 |
|-------------------|--------|-----------------------------|
| /api/login        | POST   | User authentication         |
| /api/users?page=1 | GET    | Paginated user list         |
| /api/users/{id}   | GET    | Get single user             |
| /api/users/{id}   | PUT    | Update user                 |
| /api/users/{id}   | DELETE | Delete user                 |

## Project Structure

```plaintext
src/
├── components/
│   ├── Navbar.js       # Navigation bar
│   └── UserCard.js     # User profile card
├── pages/
│   ├── LoginPage.js    # Authentication screen
│   ├── UserListPage.js # Main user listing
│   └── EditUserPage.js # Edit user form
├── services/
│   ├── authService.js  # Auth API calls
│   └── userService.js  # User CRUD operations
├── theme.js            # Material-UI theme
└── App.js              # Router configuration
```

## Usage Instructions

1. **Login**  
   Use default credentials:
   - 📧 Email: `eve.holt@reqres.in`
   - 🔑 Password: `cityslicka`

2. **User List**  
   - Browse users with pagination  
   - Search by name/email  
   - Sort by first/last name  
   - Click user card for actions  

3. **Edit User**  
   - Update first name, last name, and email  
   - Real-time validation  
   - Animated form transitions  

4. **Delete User**  
   - Confirmation dialog  
   - Automatic list refresh  
   - Error handling for failed operations  

## Error Handling

- Form validation for all inputs
- API error notifications
- Loading states during operations
- Automatic token verification

## Submission Guidelines

- Code should be clean, modular, and well-documented.
- Ensure proper use of React hooks and lifecycle methods.
- Follow best UI/UX practices for responsiveness.
- Provide a GitHub repository link with a README file.
- If hosted, include the live demo link.

## License

MIT License - Feel free to modify and use as needed.

**Note:** This project uses a mock API - data changes are not persisted permanently.

---

*Created as part of the EmployWise technical assessment*



