import { Button, Typography } from '@mui/material';

const DocumentUpload = ({ label, onUpload, accept = '.pdf,.jpg,.png', multiple = false }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (files.length > 0) {
      onUpload(files);
    }
  };

  return (
    <div className="space-y-2">
      <Typography variant="subtitle1">{label}</Typography>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          multiple={multiple}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        {files.length > 0 && (
          <Button type="submit" variant="contained" color="primary" size="small">
            Upload {files.length} file(s)
          </Button>
        )}
      </form>
    </div>
  );
};

export default DocumentUpload;