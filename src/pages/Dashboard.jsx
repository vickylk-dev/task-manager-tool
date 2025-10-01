import React, { useMemo, useState } from 'react';
import { Grid, Typography, Box, Paper, TextField, InputAdornment, Chip, Stack, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTasks } from '../context/TaskContext.jsx';
import TaskCard from '../components/TaskCard.jsx';
import ProgressBar from '../components/ProgressBar.jsx';

export default function Dashboard() {
  const { tasks, updateTask, deleteTask } = useTasks();
  const [filters, setFilters] = useState({ status: 'all', category: 'all' });
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = tasks.filter((t) => {
      const statusMatch = filters.status === 'all' || t.status === filters.status;
      const categoryMatch = filters.category === 'all' || t.category === filters.category;
      const queryMatch = !q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
      return statusMatch && categoryMatch && queryMatch;
    });
    const sorted = [...list].sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.updatedAt) - new Date(a.updatedAt);
      if (sortBy === 'oldest') return new Date(a.updatedAt) - new Date(b.updatedAt);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });
    return sorted;
  }, [tasks, filters, query, sortBy]);

  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const completedPercent = tasks.length ? (completedCount / tasks.length) * 100 : 0;

  const handleToggleStatus = (task) => {
    updateTask(task.id, { status: task.status === 'completed' ? 'pending' : 'completed' });
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>Dashboard</Typography>

      <Grid container spacing={2} className="mb-5">
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            fullWidth
            placeholder="Search tasks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
            size="small"
          />
        </Grid>
        <Grid item xs={6} md={2} lg={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="sort-by-label">Sort by</InputLabel>
            <Select labelId="sort-by-label" label="Sort by" value={sortBy} onChange={(e) => setSortBy(e.target.value)} size="small">
              <MenuItem value="recent">Recent</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
              <MenuItem value="title">Title (A→Z)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={2} lg={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="status-label">Status</InputLabel>
            <Select labelId="status-label" label="Status" value={filters.status} onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value }))} size="small">
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={2} lg={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="category-label">Category</InputLabel>
            <Select labelId="category-label" label="Category" value={filters.category} onChange={(e) => setFilters((p) => ({ ...p, category: e.target.value }))} size="small">
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="Work">Work</MenuItem>
              <MenuItem value="Personal">Personal</MenuItem>
              <MenuItem value="Urgent">Urgent</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Paper className="mb-5 p-4">
        <Typography variant="subtitle2" className="text-gray-600">Overall Progress</Typography>
        <ProgressBar completedPercent={completedPercent} />
        <Stack direction="row" spacing={2} sx={{mt: 3}}>
          <Chip label={`Total: ${tasks.length}`} size="small" />
          <Chip label={`Completed: ${completedCount}`} color="success" size="small" />
          <Chip label={`Pending: ${tasks.length - completedCount}`} color="warning" size="small" />
        </Stack>
      </Paper>

      {filtered.length === 0 ? (
        <Paper className="p-10 text-center">
          <Typography variant="h6" className="mb-2">No tasks found</Typography>
          <Typography variant="body2" className="text-gray-600">Try adjusting filters or create a new task.</Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {filtered.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <TaskCard task={task} onToggleStatus={handleToggleStatus} onDelete={deleteTask} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

