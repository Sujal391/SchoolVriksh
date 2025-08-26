// pages/library/books/[bookId]/edit.js
import { useRouter } from 'next/router';
import EditBook from '../../../../components/library/EditBook';

const BookEditPage = () => {
  const router = useRouter();
  const { bookId } = router.query;

  return <EditBook bookId={bookId} />;
};

export default BookEditPage;