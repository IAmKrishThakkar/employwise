import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, IconButton, Box, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function UserCard({ user, onDelete }) {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
            <Card
                sx={{
                    position: 'relative',
                    overflow: 'visible',
                    borderRadius: 5,
                    background: 'linear-gradient(135deg, #f3e5f5,rgb(182, 189, 254))',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 15px 25px rgba(0, 0, 0, 0.2)',
                    },
                }}
            >
                <CardMedia
                    component="img"
                    height="160"
                    image={user.avatar}
                    sx={{
                        objectFit: 'cover',
                        maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                        borderRadius: '8px 8px 0 0',
                    }}
                />
                <CardContent sx={{ position: 'relative', zIndex: 1, pt: 6, textAlign: 'center' }}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: -40,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            border: '3px solid #fff',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden',
                            bgcolor: 'background.paper',
                        }}
                    >
                        <img
                            src={user.avatar}
                            alt={`${user.first_name} ${user.last_name}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </Box>

                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {user.first_name} {user.last_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        {user.email}
                    </Typography>

                    <Box display="flex" justifyContent="center" gap={1} mt={2}>
                        <Tooltip title="Edit User" arrow>
                            <IconButton
                                onClick={() => navigate(`/users/${user.id}/edit`)}
                                sx={{
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    '&:hover': { bgcolor: 'primary.dark' },
                                }}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete User" arrow>
                            <IconButton
                                onClick={onDelete}
                                sx={{
                                    bgcolor: 'error.main',
                                    color: 'white',
                                    '&:hover': { bgcolor: 'error.dark' },
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default UserCard;
