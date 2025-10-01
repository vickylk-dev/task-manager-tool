import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, MenuItem, Paper, Typography, Stack, Box, Chip, Divider } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTasks } from '../context/TaskContext.jsx';

export default function TaskForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { tasks, addTask, updateTask } = useTasks();

  const editingTask = useMemo(() => tasks.find((t) => t.id === id), [tasks, id]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [category, setCategory] = useState('Work');
  
  const [errors, setErrors] = useState({
    title: '',
    description: '',
  });
  const [touched, setTouched] = useState({
    title: false,
    description: false,
  });

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
      setCategory(editingTask.category);
    }
  }, [editingTask]);

  const validateTitle = (value) => {
    if (!value || value.trim() === '') {
      return 'Task title is required';
    }
    if (value.trim().length < 3) {
      return 'Title must be at least 3 characters long';
    }
    if (value.length > 100) {
      return 'Title must not exceed 100 characters';
    }
    return '';
  };

  const validateDescription = (value) => {
    if (value && value.length > 500) {
      return 'Description must not exceed 500 characters';
    }
    return '';
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    if (touched.title) {
      setErrors((prev) => ({ ...prev, title: validateTitle(value) }));
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    if (touched.description) {
      setErrors((prev) => ({ ...prev, description: validateDescription(value) }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    
    if (field === 'title') {
      setErrors((prev) => ({ ...prev, title: validateTitle(title) }));
    } else if (field === 'description') {
      setErrors((prev) => ({ ...prev, description: validateDescription(description) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setTouched({
      title: true,
      description: true,
    });

    const titleError = validateTitle(title);
    const descriptionError = validateDescription(description);

    setErrors({
      title: titleError,
      description: descriptionError,
    });

    if (titleError || descriptionError) {
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      status,
      category,
    };

    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
    navigate('/');
  };

  return (
    <Box className="mx-auto max-w-4xl">
      <Stack spacing={1} className="mb-4">
        <Stack direction="row" alignItems="center">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ color: 'text.secondary' }}
          >
            Back
          </Button>
        </Stack>
        <Typography variant="h5" className="font-bold" align="center">
          {editingTask ? 'Edit Task' : 'Create New Task'}
        </Typography>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ background: 'white', m: 0.3, borderRadius: 2.7, p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="overline" className="text-gray-500 font-semibold text-xs">Task Details</Typography>
                <Divider sx={{ mt: 1, mb: 3 }} />
                <TextField
                  fullWidth
                  label="Task Title"
                  placeholder="Enter a descriptive title..."
                  value={title}
                  onChange={handleTitleChange}
                  onBlur={() => handleBlur('title')}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  required
                  variant="outlined"
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': { borderColor: errors.title && touched.title ? '#d32f2f' : '#667eea' },
                      '&.Mui-focused fieldset': { 
                        borderColor: errors.title && touched.title ? '#d32f2f' : '#667eea', 
                        borderWidth: 2 
                      },
                    },
                  }}
                />
              </Box>

              <TextField
                fullWidth
                label="Description (Optional)"
                placeholder="Add more details about this task..."
                value={description}
                onChange={handleDescriptionChange}
                onBlur={() => handleBlur('description')}
                error={touched.description && Boolean(errors.description)}
                helperText={
                  touched.description && errors.description 
                    ? errors.description 
                    : `${description.length}/500 characters`
                }
                multiline
                rows={3}
                variant="outlined"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': { borderColor: errors.description && touched.description ? '#d32f2f' : '#667eea' },
                    '&.Mui-focused fieldset': { 
                      borderColor: errors.description && touched.description ? '#d32f2f' : '#667eea', 
                      borderWidth: 2 
                    },
                  },
                }}
              />

              <Box>
                <Typography variant="overline" className="text-gray-500 font-semibold text-xs">Task Configuration</Typography>
                <Divider sx={{ mt: 1, mb: 3 }} />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    select
                    fullWidth
                    label="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: '#667eea' },
                        '&.Mui-focused fieldset': { borderColor: '#667eea', borderWidth: 2 },
                      },
                    }}
                  >
                    <MenuItem value="pending">🕒 Pending</MenuItem>
                    <MenuItem value="completed">✅ Completed</MenuItem>
                  </TextField>
                  <TextField
                    select
                    fullWidth
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: '#667eea' },
                        '&.Mui-focused fieldset': { borderColor: '#667eea', borderWidth: 2 },
                      },
                    }}
                  >
                    <MenuItem value="Work">💼 Work</MenuItem>
                    <MenuItem value="Personal">🏠 Personal</MenuItem>
                    <MenuItem value="Urgent">🔥 Urgent</MenuItem>
                  </TextField>
                </Stack>
              </Box>

              <Stack direction="row" spacing={2} className="pt-2">
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  disabled={!title.trim() || (touched.title && Boolean(errors.title)) || (touched.description && Boolean(errors.description))}
                  startIcon={<CheckCircleOutlineIcon fontSize="small" />}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    px: 3,
                    py: 1,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: '0 4px 14px rgba(102, 126, 234, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                      transform: 'translateY(-2px)',
                    },
                    '&.Mui-disabled': {
                      background: '#e0e0e0',
                      color: '#9e9e9e',
                      boxShadow: 'none',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {editingTask ? 'Update Task' : 'Create Task'}
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate(-1)}
                  sx={{
                    px: 3,
                    py: 1,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderColor: '#d1d5db',
                    color: '#6b7280',
                    '&:hover': {
                      borderColor: '#9ca3af',
                      backgroundColor: '#f9fafb',
                    },
                  }}
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Paper>

      {editingTask && (
        <Box className="mt-4 text-center">
          <Chip label="Editing Mode" color="primary" size="small" />
        </Box>
      )}
    </Box>
  );
}

