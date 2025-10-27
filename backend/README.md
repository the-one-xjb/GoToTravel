# Coze Backend

This folder contains a minimal Koa backend that proxies requests from the frontend to the Coze API.

## How it works
- Endpoint: `POST /api/coze`
- Request body: JSON { "content": "...user query..." }
- The server forwards the request to Coze with configured `bot_id` and returns the Coze response JSON.

## Run locally
1. Install dependencies:

```powershell
cd backend
npm install
```

2. (Optional) Set environment variables to avoid hardcoding the API key:

```powershell
$env:COZE_API_KEY = 'your_api_key_here'
$env:COZE_BOT_ID = 'your_bot_id_here'
```

3. Start the server:

```powershell
npm start
```

The server listens on port 3000 by default. The frontend should POST to `http://localhost:3000/api/coze`.

## Notes
- For production, use proper secret management and do not commit API keys to source control.
- You can change the port with the `PORT` env var.
