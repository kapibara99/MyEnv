import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import './tailwind.css';

import Base from './components/_common/base';
import Footer from './components/_common/footer';
import Header from './components/_common/header';
import MainRouter from './pages/router';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Base>
			<BrowserRouter>
				<Header />
				<MainRouter />
				<Footer />
			</BrowserRouter>
		</Base>
	</StrictMode>,
);
