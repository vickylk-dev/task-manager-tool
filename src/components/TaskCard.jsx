import React from 'react';
import { Card, CardContent, CardActions, Typography, Chip, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

export default function TaskCard({ task, onToggleStatus, onDelete }) {
  const isCompleted = task.status === 'completed';
  return (
    <Card className="h-full">
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" className="mb-3">
          <Typography variant="h6" className={isCompleted ? 'line-through text-gray-500' : ''}>{task.title}</Typography>
          <Chip label={task.category} color={task.category === 'Urgent' ? 'error' : task.category === 'Work' ? 'primary' : 'success'} size="small" />
        </Stack>
        <Typography variant="body2" className="text-gray-700" sx={{ mb: 2 }}>{task.description}</Typography>
        <Stack spacing={0.5} className="text-gray-500">
          <Typography variant="caption">Created: {new Date(task.createdAt).toLocaleString()}</Typography>
          <Typography variant="caption">Updated: {new Date(task.updatedAt).toLocaleString()}</Typography>
        </Stack>
      </CardContent>
      <CardActions className="flex justify-between">
        <Stack direction="row" spacing={1}>
          <Button size="small" sx={{textTransform: 'none'}} onClick={() => onToggleStatus(task)} > 
            {isCompleted ? 'Mark Pending' : 'Mark Completed'}
          </Button>
          <Button size="small" sx={{textTransform: 'none'}} component={Link} to={`/edit/${task.id}`}>Edit</Button>
        </Stack>
        <Button size="small" color="error" sx={{textTransform: 'none'}} onClick={() => onDelete(task.id)}>Delete</Button>
      </CardActions>
    </Card>
  );
}

