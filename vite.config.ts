import { defineConfig, loadEnv, type Connect } from 'vite'
import react from '@vitejs/plugin-react'
import verifyRecaptcha from './api/verify-recaptcha'

function apiMiddleware(): Connect.NextHandleFunction {
  return async (req, res, next) => {
    if (req.url !== '/api/verify-recaptcha' || req.method !== 'POST') {
      next()
      return
    }

    const response = res as typeof res & {
      status: (code: number) => typeof res
      json: (body: unknown) => void
    }

    response.status = (code) => {
      res.statusCode = code
      return res
    }
    response.json = (body) => {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(body))
    }

    try {
      await verifyRecaptcha(req, response)
    } catch {
      if (!res.writableEnded) {
        res.statusCode = 500
        res.end(JSON.stringify({ success: false, message: 'Local API request failed.' }))
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  process.env.RECAPTCHA_SECRET_KEY ||= env.RECAPTCHA_SECRET_KEY

  return {
    plugins: [
      react(),
      {
        name: 'local-api',
        configureServer(server) {
          server.middlewares.use(apiMiddleware())
        },
        configurePreviewServer(server) {
          server.middlewares.use(apiMiddleware())
        }
      }
    ]
  }
})
