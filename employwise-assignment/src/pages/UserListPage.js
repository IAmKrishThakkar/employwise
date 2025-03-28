import React, { useState, useEffect } from 'react';
import {
    Typography,
    Grid,
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    InputAdornment,
    Snackbar,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';
import userService from '../services/userService';
import UserCard from '../components/UserCard';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import { motion } from 'framer-motion';

// Custom hook for debouncing
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debouncedValue;
}

function UserListPage() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    // Debounce search query (300ms delay)
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    // Fetch users when page changes
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await userService.getUsers(page);
                setUsers(data.data);
                setTotalPages(data.total_pages);
            } catch (err) {
                setError('Failed to fetch users. Please try again.');
                console.error('Error fetching users:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [page]);

    // Handle delete with confirmation
    const handleDelete = async () => {
        if (!userToDelete) return;
        setLoading(true);
        setError(null);
        try {
            await userService.deleteUser(userToDelete.id);
            // Refetch users to ensure consistency
            const data = await userService.getUsers(page);
            setUsers(data.data);
            setTotalPages(data.total_pages);
        } catch (err) {
            setError('Failed to delete user. Please try again.');
            console.error('Error deleting user:', err);
        } finally {
            setLoading(false);
            setDeleteDialogOpen(false);
            setUserToDelete(null);
        }
    };

    const openDeleteDialog = (user) => {
        setUserToDelete(user);
        setDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setUserToDelete(null);
    };

    // Filter and sort users
    const filteredUsers = users
        .filter((user) =>
            `${user.first_name} ${user.last_name} ${user.email}`
                .toLowerCase()
                .includes(debouncedSearchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'first_name') return a.first_name.localeCompare(b.first_name);
            if (sortBy === 'last_name') return a.last_name.localeCompare(b.last_name);
            return 0;
        });

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
            <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    mb: 4,
                }}
            >
                User List
            </Typography>
            {/* Search and Sort Container */}
<motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    style={{ width: '100%', maxWidth: 1200 }}
>
    <Box
        mb={3}
        display="flex"
        gap={2}
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: '100%' }}
    >
        {/* Search Field */}
        <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            placeholder="Search by Name or Email"
            sx={{
                flex: 1,
                minWidth: 280,
                '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 1)',
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.1)',
                    },
                },
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'primary.main' }} />
                    </InputAdornment>
                ),
            }}
        />

        {/* Sort Dropdown */}
        <FormControl sx={{ minWidth: 200 }}>
            <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                displayEmpty
                sx={{
                    borderRadius: 3,
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(8px)',
                    '& .MuiSelect-select': {
                        py: 1.2,
                    },
                    '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 1)',
                    },
                }}
            >
                <MenuItem value="">
                    <Typography variant="body2">No Sorting</Typography>
                </MenuItem>
                <MenuItem value="first_name">
                    <Typography variant="body2">First Name</Typography>
                </MenuItem>
                <MenuItem value="last_name">
                    <Typography variant="body2">Last Name</Typography>
                </MenuItem>
            </Select>
        </FormControl>
    </Box>
</motion.div>

            {loading ? (
                <CircularProgress sx={{ color: 'white' }} />
            ) : filteredUsers.length === 0 ? (
                <Typography sx={{ color: 'white' }}>No users found.</Typography>
            ) : (
                <Grid container spacing={2} sx={{ width: '100%', maxWidth: 1200 }}>
                    {filteredUsers.map((user) => (
                        <Grid item xs={12} sm={6} md={4} key={user.id}>
                            <UserCard
                                user={user}
                                onDelete={() => openDeleteDialog(user)}
                                sx={{
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
                                    },
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
            <Box mt={4} display="flex" justifyContent="center">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    color="primary"
                    sx={{ '& .MuiPaginationItem-root': { color: 'white' } }}
                />
            </Box>

            {/* Error Snackbar */}
            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError(null)}
            >
                <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete {userToDelete?.first_name}{' '}
                        {userToDelete?.last_name}?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default UserListPage;