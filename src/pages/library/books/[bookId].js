import { useRouter } from 'next/router';
import BookDetails from '../../../components/library/BookDetails';

const BookDetailPage = () => {
  const router = useRouter();
  const { bookId } = router.query;

  return <BookDetails bookId={bookId} />;
};

export default BookDetailPage;