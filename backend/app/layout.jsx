export const metadata = {
  title: 'Consent Over Words - Backend API',
  description: 'Next.js Backend API for Consent Over Words Campaign Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, padding: '2rem', background: '#F8FAFC', color: '#1E293B' }}>
        {children}
      </body>
    </html>
  );
}
