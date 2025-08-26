// src/pages/_app.js
import { AuthProvider } from '../contexts/AuthContext';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';
import err from 'next/error'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} err={err} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;