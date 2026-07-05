export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		// permitir CORS (Pages vai chamar essa API)
		const corsHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		};

		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders });
		}

		// LISTAR TASKS
		if (url.pathname === '/api/tasks' && request.method === 'GET') {
			const result = await env.DB.prepare('SELECT * FROM tasks ORDER BY id DESC').all();

			return Response.json(result.results, { headers: corsHeaders });
		}

		// CRIAR TASK
		if (url.pathname === '/api/tasks' && request.method === 'POST') {
			const body = await request.json();

			await env.DB.prepare('INSERT INTO tasks (title) VALUES (?)').bind(body.title).run();

			return Response.json({ success: true }, { headers: corsHeaders });
		}

		return new Response('Not Found', { status: 404 });
	},
};
