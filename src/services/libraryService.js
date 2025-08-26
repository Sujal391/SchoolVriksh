import api from './api';

const libraryService = {
  // Book Operations
  getAllBooks: async (schoolId, filters = {}) => {
    try {
      const response = await api.get('/library/all-books', {
        params: { ...filters, schoolId }
      });
      return response.data.books;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch books');
    }
  },

  searchBooks: async (schoolId, query, filters = {}) => {
    try {
      const response = await api.get('/library/search', {
        params: { query, schoolId, ...filters }
      });
      return response.data.books;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Search failed');
    }
  },

  // getBookById: async (bookId) => {
  //   try {
  //     const response = await api.get(`/library/books/${bookId}`);
  //     return response.data.book;
  //   } catch (error) {
  //     throw new Error(error.response?.data?.error || 'Failed to fetch book');
  //   }
  // },

  getBookById: async (bookId) => {
  try {
    const response = await api.get(`/library/books/${bookId}`);
    // Fix: Handle direct book object response (not wrapped in { book: ... })
    return response.data;
  } catch (error) {
    // Improve error handling to check status codes properly
    if (error.response?.status === 404) {
      throw new Error('Book not found');
    }
    if (error.response?.status === 403) {
      throw new Error('Unauthorized: No permission to view this book');
    }
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to fetch book');
  }
},

  addBook: async (bookData) => {
    try {
      const response = await api.post('/library/books', bookData);
      return response.data.book;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to add book');
    }
  },  

  getClasses: async (schoolId) => {
  try {
    const response = await api.get('/library/classes', {
      params: { schoolId }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch classes');
  }
},


  // updateBook: async (bookId, bookData) => {
  //   try {
  //     const response = await api.put(`/library/books/${bookId}`, bookData);
  //     return response.data.book;
  //   } catch (error) {
  //     throw new Error(error.response?.data?.error || 'Failed to update book');
  //   }
  // },


  updateBook: async (bookId, bookData) => {
    try {
      console.log('Updating book:', bookId, bookData);
      
      // Validate required fields
      if (!bookData.bookTitle?.trim()) {
        throw new Error('Book title is required');
      }
      if (!bookData.author?.trim()) {
        throw new Error('Author is required');
      }
      if (!bookData.isbn?.trim()) {
        throw new Error('ISBN is required');
      }
      if (!bookData.category?.trim()) {
        throw new Error('Category is required');
      }

      const response = await api.put(`/library/books/${bookId}`, bookData);
      
      if (response.data && response.data.book) {
        return response.data.book;
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Error updating book:', error);
      
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.error || 
                            error.response.data?.message || 
                            `Server error: ${error.response.status}`;
        throw new Error(errorMessage);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('No response from server. Please check your connection.');
      } else {
        // Something else happened
        throw new Error(error.message || 'Failed to update book');
      }
    }
  },

  deleteBook: async (bookId) => {
    try {
      const response = await api.delete(`/library/books/${bookId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to delete book');
    }
  },

  // uploadBookCover: async (bookId, file) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('cover', file);
  //     const response = await api.post(`/library/books/${bookId}/cover`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     });
  //     return response.data.coverUrl;
  //   } catch (error) {
  //     throw new Error(error.response?.data?.error || 'Failed to upload cover');
  //   }
  // },


 uploadBookCover: async (bookId, file) => {
  try {
    // Validate inputs
    if (!bookId || !file) {
      throw new Error('Book ID and file are required');
    }

    const formData = new FormData();
    // The backend multer expects just the file, not named 'cover'
    formData.append('cover', file);

    console.log('Uploading cover for book:', bookId, 'File size:', file.size);

    const response = await api.post(`/library/books/${bookId}/cover`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      // Optional: Add timeout for large file uploads
      timeout: 30000, // 30 seconds
    });

    console.log('Upload response:', response.data);

    // Return the cover URL from the response
    return response.data.coverUrl;
  } catch (error) {
    console.error('Upload error:', error);
    
    // Handle different types of errors
    if (error.code === 'ECONNABORTED') {
      throw new Error('Upload timeout - file may be too large');
    }
    
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.error || error.response.data?.message;
      
      switch (status) {
        case 400:
          throw new Error(message || 'Invalid file or request');
        case 403:
          throw new Error('Unauthorized: You do not have permission to upload covers');
        case 404:
          throw new Error('Book not found');
        case 413:
          throw new Error('File too large');
        default:
          throw new Error(message || `Upload failed with status ${status}`);
      }
    }
    
    throw new Error(error.message || 'Failed to upload cover');
  }
},

  bulkImportBooks: async (file) => {
    try {
      const formData = new FormData();
      formData.append('csvFile', file);
      
      const response = await api.post('/library/bulk-import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      // Handle different error types
      if (error.response?.status === 403) {
        throw new Error('Unauthorized: You do not have permission to manage library');
      } else if (error.response?.status === 400) {
        throw new Error(error.response.data.message || 'Invalid file or data format');
      } else if (error.response?.status === 500) {
        throw new Error(error.response.data.error || 'Server error during import');
      } else {
        throw new Error(error.response?.data?.error || error.message || 'Bulk import failed');
      }
    }
  },

  getIssueRequests: async () => {
    try {
      // Backend endpoint: /requests with authMiddleware that gets schoolId from req.school
      const response = await api.get('/library/requests');
      return response.data.requests;
    } catch (error) {
      throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to fetch requests');
    }
  },

  issueBook: async (bookId, studentId, data) => {
    try {
      // Backend endpoint: /books/:bookId/issue/:studentId
      const response = await api.post(`/library/books/${bookId}/issue/${studentId}`, data);
      return response.data.issue;
    } catch (error) {
      throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to issue book');
    }
  },

  issueBookByGrNumber: async (bookId, grNumber, data) => {
    try {
      // Backend endpoint: /books/:bookId/issue/gr/:grNumber
      const response = await api.post(`/library/books/${bookId}/issue/gr/${grNumber}`, data);
      return response.data.issue;
    } catch (error) {
      throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to issue book');
    }
  },

  rejectRequest: async (requestId, remarks) => {
    try {
      // Backend endpoint: /requests/reject/:requestId
      const response = await api.post(`/library/requests/reject/${requestId}`, { remarks });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to reject request');
    }
  },

  returnBook: async (issueId) => {
    try {
      const response = await api.post(`/library/books/return/${issueId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to return book');
    }
  },

  renewBook: async (issueId, remarks) => {
    try {
      const response = await api.post(`/library/books/renew/${issueId}`, { remarks });
      return response.data.issue;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to renew book');
    }
  },

  pardonFine: async (issueId, remarks) => {
    try {
      const response = await api.post(`/library/books/pardon-fine/${issueId}`, { remarks });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to pardon fine');
    }
  },

  // Student History
  getStudentHistory: async (studentId) => {
    try {
      const response = await api.get(`/library/student/${studentId}/history`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch history');
    }
  },

  getStudentHistoryByGrNumber: async (grNumber) => {
    try {
      const response = await api.get(`/library/student/gr/${grNumber}/history`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch history');
    }
  },


   getStudentsWithActiveIssues: async (schoolId) => {
    try {
      const response = await api.get('/library/students/active-issues', {
        params: { schoolId }
      });
      return response.data.students;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch students with active issues');
    }
  },

  // Categories
  getCategories: async (schoolId) => {
    try {
      const response = await api.get('/library/categories', {
        params: { schoolId }
      });
      return response.data.categories;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch categories');
    }
  },

  addCategory: async (name, description) => {
    try {
      const response = await api.post('/library/categories', {
        action: 'add',
        name,
        description
      });
      return response.data.category;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to add category');
    }
  },

  updateCategory: async (categoryId, name, description) => {
    try {
      const response = await api.put(`/library/categories/${categoryId}`, {
        action: 'update',
        name,
        description
      });
      return response.data.category;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to update category');
    }
  },

  deleteCategory: async (categoryId) => {
    try {
      const response = await api.delete(`/library/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to delete category');
    }
  },

  // Statistics
  getLibraryStats: async (schoolId) => {
    try {
      const response = await api.get('/library/stats', {
        params: { schoolId }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch stats');
    }
  },

  getOverdueBooks: async (schoolId) => {
    try {
      const response = await api.get('/library/overdue', {
        params: { schoolId }
      });
      return response.data.overdueBooks;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch overdue books');
    }
  },

  updateOverdueStatus: async (schoolId) => {
    try {
      const response = await api.post('/library/update-overdue', { schoolId });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to update status');
    }
  },

  // Audit Logs
  getAuditLogs: async (schoolId, filters = {}) => {
    try {
      const response = await api.get('/library/audit-logs', {
        params: { schoolId, ...filters }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch logs');
    }
  }
};

export default libraryService;