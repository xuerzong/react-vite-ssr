import express from 'express'
import { createServer } from 'vite'
import fs from 'node:fs/promises'
import path from 'node:path'
import { render } from '@/render/server'

const port = parseInt(process.env.PORT || '3003')
const isDev = process.env.NODE_ENV !== 'prod'
const rootPath = process.cwd()

const bootstrap = async () => {
  const app = express()

  if (isDev) {
    // Development
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
    })
    app.use(vite.middlewares)
    app.use('*', async (req, res) => {
      try {
        const originalUrl = req.originalUrl
        const url = originalUrl.replace('/', '')
        const template = await fs
          .readFile(path.resolve(rootPath, './index.html'), 'utf-8')
          .then((str) => vite.transformIndexHtml(url, str))

        // YOUR DYNAMIC DATA
        const initialData = { name: 'Foo', age: 18, env: 'dev' }
        const html = render({ html: template, initialProps: initialData })

        res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
      } catch {
        res.status(500).end('Internal Server Error')
      }
    })
  } else {
    app.use('/assets', express.static(path.resolve(rootPath, './dist/assets')))
    // Production
    app.use('*', async (_, res) => {
      try {
        const template = await fs.readFile(path.resolve(rootPath, './dist/index.html'), 'utf-8')

        // YOUR DYNAMIC DATA
        const initialData = { name: 'Foo', age: 18, env: 'prod' }
        const html = render({ html: template, initialProps: initialData })
        res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
      } catch {
        res.status(500).end('Internal Server Error')
      }
    })
  }

  app.listen(port, () => {
    console.log('Server is running on http://localhost:3003')
  })
}

bootstrap()
