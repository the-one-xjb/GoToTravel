const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const axios = require('axios');

const app = new Koa();
const router = new Router();
const PORT = process.env.PORT || 3000;

// Coze configuration - prefer environment variables
const COZE_URL = 'https://api.coze.cn/open_api/v2/chat';
const API_KEY = process.env.COZE_API_KEY || 'pat_cTfedNkJoUs8nYc4oYZFYNm1ZLXMxQUgNNbBiOvG1BfGcBCWSPAyvjyGyX73XsgG';
const BOT_ID = process.env.COZE_BOT_ID || '7398905353180184614';

app.use(bodyParser());

// Simple CORS middleware for local development
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,OPTIONS');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (ctx.method === 'OPTIONS') {
    ctx.status = 204;
    return;
  }
  await next();
});

router.post('/api/coze', async (ctx) => {
  const { content } = ctx.request.body || {};
  if (typeof content !== 'string') {
    ctx.status = 400;
    ctx.body = { error: 'request body must have a string `content` field' };
    return;
  }

  const data = {
    bot_id: BOT_ID,
    conversation_id: '123456',
    user: 'user_1',
    query: content,
    stream: false,
    chat_history: [
      { role: 'user' },
      { role: 'assistant', type: 'answer' }
    ]
  };

  try {
    const resp = await axios.post(COZE_URL, data, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });

    // Return the Coze API response body as-is
    ctx.body = resp.data;
  } catch (err) {
    const status = err.response?.status || 500;
    const details = err.response?.data || err.message || String(err);
    console.error('Coze API error:', details);
    ctx.status = status;
    ctx.body = { error: 'Coze API request failed', details };
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Coze backend listening on http://localhost:${PORT}`);
});
