import { Button, TextField, Typography, Card, CardContent } from '@mui/material';

const NotificationSender = ({ recipient, onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(recipient, message);
      setMessage('');
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Send Notification</Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          To: {recipient.name} ({recipient.email})
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          variant="outlined"
          margin="normal"
        />
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleSend}
          disabled={!message.trim()}
        >
          Send Notification
        </Button>
      </CardContent>
    </Card>
  );
};

export default NotificationSender;