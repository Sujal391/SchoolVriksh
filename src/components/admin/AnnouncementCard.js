import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Stack,
  Divider
} from '@mui/material';
import {
  PriorityHigh,
  AttachFile,
  Download,
  Group,
  School,
  People,
  AccessTime
} from '@mui/icons-material';

const AnnouncementCard = ({ announcement, compact = false }) => {
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getPriorityIcon = (priority) => {
    if (priority?.toLowerCase() === 'high') {
      return <PriorityHigh fontSize="small" />;
    }
    return null;
  };

  const getTargetGroupIcon = (group) => {
    switch (group?.toLowerCase()) {
      case 'teachers':
        return <School fontSize="small" />;
      case 'students':
        return <People fontSize="small" />;
      case 'parents':
        return <Group fontSize="small" />;
      default:
        return <Group fontSize="small" />;
    }
  };

  const getTargetGroupColor = (group) => {
    switch (group?.toLowerCase()) {
      case 'teachers':
        return 'primary';
      case 'students':
        return 'secondary';
      case 'parents':
        return 'info';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return 'Today';
    } else if (diffDays === 2) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      return `${diffDays - 1} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleDownloadAttachment = (attachment) => {
    if (attachment.fileUrl) {
      window.open(attachment.fileUrl, '_blank');
    }
  };

  if (compact) {
    return (
      <Card 
        sx={{ 
          mb: 1, 
          border: '1px solid',
          borderColor: 'divider',
          '&:hover': {
            borderColor: 'primary.main',
            boxShadow: 1
          }
        }}
      >
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    fontWeight: 600,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flexGrow: 1
                  }}
                >
                  {announcement.title}
                </Typography>
                <Chip
                  label={announcement.priority}
                  size="small"
                  color={getPriorityColor(announcement.priority)}
                  icon={getPriorityIcon(announcement.priority)}
                  sx={{ minWidth: 'auto' }}
                />
              </Box>
              
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  mb: 1
                }}
              >
                {announcement.content}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                {announcement.targetGroups?.map((group, index) => (
                  <Chip
                    key={index}
                    label={group}
                    size="small"
                    variant="outlined"
                    color={getTargetGroupColor(group)}
                    icon={getTargetGroupIcon(group)}
                    sx={{ fontSize: '0.7rem', height: 20 }}
                  />
                ))}
                
                {announcement.attachments?.length > 0 && (
                  <Chip
                    label={`${announcement.attachments.length} file${announcement.attachments.length > 1 ? 's' : ''}`}
                    size="small"
                    variant="outlined"
                    icon={<AttachFile fontSize="small" />}
                    sx={{ fontSize: '0.7rem', height: 20 }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      sx={{ 
        mb: 2,
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: 2
        }
      }}
    >
      <CardContent>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              {announcement.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                {announcement.createdBy?.name?.charAt(0)?.toUpperCase() || 'A'}
              </Avatar>
              <Typography variant="body2" color="text.secondary">
                {announcement.createdBy?.name || 'Admin'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                •
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AccessTime fontSize="small" color="disabled" />
                <Typography variant="body2" color="text.secondary">
                  {formatDate(announcement.createdAt)}
                </Typography>
              </Box>
            </Box>
          </Box>
          
          <Chip
            label={announcement.priority}
            color={getPriorityColor(announcement.priority)}
            icon={getPriorityIcon(announcement.priority)}
            size="small"
          />
        </Box>

        {/* Content */}
        <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
          {announcement.content}
        </Typography>

        {/* Target Groups */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Target Groups:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {announcement.targetGroups?.map((group, index) => (
              <Chip
                key={index}
                label={group}
                size="small"
                color={getTargetGroupColor(group)}
                icon={getTargetGroupIcon(group)}
              />
            ))}
          </Stack>
        </Box>

        {/* Attachments */}
        {announcement.attachments?.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Attachments ({announcement.attachments.length}):
              </Typography>
              <Stack spacing={1}>
                {announcement.attachments.map((attachment, index) => (
                  <Box 
                    key={index}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      p: 1,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      '&:hover': {
                        backgroundColor: 'action.hover'
                      }
                    }}
                  >
                    <AttachFile fontSize="small" color="action" />
                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                      {attachment.fileName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {attachment.fileType}
                    </Typography>
                    <Tooltip title="Download">
                      <IconButton 
                        size="small" 
                        onClick={() => handleDownloadAttachment(attachment)}
                      >
                        <Download fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                ))}
              </Stack>
            </Box>
          </>
        )}

        {/* Validity Period */}
        {(announcement.validFrom || announcement.validUntil) && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Valid: {announcement.validFrom ? new Date(announcement.validFrom).toLocaleDateString() : 'Now'} 
                {' - '}
                {announcement.validUntil ? new Date(announcement.validUntil).toLocaleDateString() : 'Indefinite'}
              </Typography>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard;
