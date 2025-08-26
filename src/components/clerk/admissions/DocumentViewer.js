import { useState } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Chip,
  Divider,
  Paper,
} from "@mui/material";
import dynamic from "next/dynamic";

// Dynamically import PDF viewer with no SSR
const PDFViewer = dynamic(() => import("./PDFViewer"), { ssr: false });

const DocumentViewer = ({ documents, applicationId }) => {
  const [open, setOpen] = useState(false);
  const [currentDoc, setCurrentDoc] = useState(null);

  const handleOpen = (doc) => {
    setCurrentDoc(doc);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentDoc(null);
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Submitted Documents
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <List>
        {documents.map((doc, index) => (
          <ListItem
            key={index}
            button
            onClick={() => handleOpen(doc)}
            secondaryAction={
              <Chip
                label={doc.verified ? "Verified" : "Pending"}
                color={doc.verified ? "success" : "warning"}
                size="small"
              />
            }
          >
            <ListItemText
              primary={doc.type
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              secondary={`Uploaded: ${new Date(
                doc.uploadedAt
              ).toLocaleDateString()}`}
            />
          </ListItem>
        ))}
      </List>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        fullScreen={currentDoc?.type === "studentPhoto"}
      >
        <DialogTitle>
          {currentDoc?.type
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
        </DialogTitle>
        <DialogContent dividers>
          {currentDoc && (
            <div
              style={{
                height: "70vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {currentDoc.documentUrl?.endsWith(".pdf") ? (
                <PDFViewer
                  url={currentDoc.documentUrl} // Use the direct S3 URL
                />
              ) : (
                <img
                  src={currentDoc.documentUrl} // Use the direct S3 URL
                  alt={currentDoc.type}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              )}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default DocumentViewer;
