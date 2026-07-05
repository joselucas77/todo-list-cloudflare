import html from './frontend/index.html';
import css from './frontend/style.css';
import js from './frontend/app.js';

export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		// API - LISTAR
		if (url.pathname === '/api/tasks' && request.method === 'GET') {
			const result = await env.DB.prepare('SELECT * FROM tasks ORDER BY id DESC').all();

			return Response.json(result.results);
		}

		// API - CRIAR
		if (url.pathname === '/api/tasks' && request.method === 'POST') {
			const body = await request.json();

			await env.DB.prepare('INSERT INTO tasks (title) VALUES (?)').bind(body.title).run();

			return Response.json({ success: true });
		}

		// FRONTEND - HTML
		if (url.pathname === '/') {
			return new Response(html, {
				headers: { 'content-type': 'text/html' },
			});
		}

		// CSS
		if (url.pathname === '/style.css') {
			return new Response(css, {
				headers: { 'content-type': 'text/css' },
			});
		}

		// JS
		if (url.pathname === '/app.js') {
			return new Response(js, {
				headers: { 'content-type': 'application/javascript' },
			});
		}

		return new Response('Not found', { status: 404 });
	},
};
