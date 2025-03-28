import { useState, useEffect } from 'react';
import { Box, Paper, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { Link, useNavigate, useParams } from 'react-router-dom';
import userService from '../services/userService';

function EditUserPage() {
  const { id } = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const data = await userService.getUser(id);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
      } catch (err) {
        setFetchError('Failed to fetch user data');
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) {
      setError('All fields are required');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setUpdating(true);
    try {
      await userService.updateUser(id, {
        first_name: firstName,
        last_name: lastName,
        email,
      });
      navigate('/users');
    } catch (err) {
      setError('Failed to update user');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  if (fetchError) {
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        {fetchError}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        p: 3,
        background: 'linear-gradient(to right, #6a11cb, #2575fc)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1200,
          display: 'flex',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: 'white',
            fontWeight: 700,
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          Edit User
        </Typography>
        <Button
          component={Link}
          to="/users"
          variant="contained"
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            color: 'primary.main',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 1)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          Back to List
        </Button>
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ width: '100%', maxWidth: 500 }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            borderRadius: 3,
          }}
        >
          <form onSubmit={handleUpdate}>
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setError('');
              }}
              fullWidth
              margin="normal"
              sx={{ mb: 2 }}
              InputProps={{
                sx: { borderRadius: 2 }
              }}
            />
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setError('');
              }}
              fullWidth
              margin="normal"
              sx={{ mb: 2 }}
              InputProps={{
                sx: { borderRadius: 2 }
              }}
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              fullWidth
              margin="normal"
              sx={{ mb: 3 }}
              InputProps={{
                sx: { borderRadius: 2 }
              }}
            />
            
            {error && (
              <Typography
                color="error"
                variant="body2"
                sx={{ mb: 2, fontWeight: 500 }}
              >
                {error}
              </Typography>
            )}

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={updating}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: '1rem',
                  boxShadow: 'none',
                }}
              >
                {updating ? (
                  <CircularProgress size={24} sx={{ color: 'white' }} />
                ) : (
                  'Update User'
                )}
              </Button>
            </motion.div>
          </form>
        </Paper>
      </motion.div>
    </Box>
  );
}

export default EditUserPage;