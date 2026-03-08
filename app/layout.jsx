import './globals.css';

export const metadata = {
  title: 'С праздником весны 🌸',
  description: 'Тёплая весенняя открытка с поздравлением к 8 Марта.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
