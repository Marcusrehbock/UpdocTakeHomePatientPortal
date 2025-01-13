// src/components/Requests/RequestList.tsx
import React from 'react';
import { List, ListItem, ListItemText, Chip } from '@mui/material';
import { Request } from '../../types.ts';

interface Props {
  requests: Request[];
  onSelect: (request: Request) => void;
}

const RequestList: React.FC<Props> = ({ requests, onSelect }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'success';
      case 'denied':
        return 'error';
      case 'pending':
      default:
        return 'warning';
    }
  };

  return (
    <List>
      {requests.map((request) => (
        <ListItem button key={request.id} onClick={() => onSelect(request)}>
          <ListItemText
            primary={`Request ID: ${request.id}`}
            secondary={`Date: ${new Date(request.createdAt).toLocaleDateString()}`}
          />
          <Chip label={request.status} color={getStatusColor(request.status)} size="small" />
        </ListItem>
      ))}
    </List>
  );
};

export default RequestList;
