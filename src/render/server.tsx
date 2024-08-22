import { renderToString } from 'react-dom/server'
import App from '@/app'

interface Options {
  html: string
  initialProps: any
}

export const render = ({ html, initialProps }: Options) => {
  return html
    .replace('<!--content-->', renderToString(<App {...initialProps} />))
    .replace(
      '<!--script-->',
      `<script id="__DATA__" type="application/json">${JSON.stringify(initialProps)}</script>`,
    )
}
