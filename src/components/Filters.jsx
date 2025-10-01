import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material';

export default function Filters({ status, category, onChange }) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} className="mb-4">
      <FormControl fullWidth size="small">
        <InputLabel id="status-label">Status</InputLabel>
        <Select labelId="status-label" label="Status" value={status} onChange={(e) => onChange({ status: e.target.value })} size="small">
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel id="category-label">Category</InputLabel>
        <Select labelId="category-label" label="Category" value={category} onChange={(e) => onChange({ category: e.target.value })} size="small">
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Work">Work</MenuItem>
          <MenuItem value="Personal">Personal</MenuItem>
          <MenuItem value="Urgent">Urgent</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}

