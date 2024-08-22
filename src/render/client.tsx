import { hydrateRoot } from 'react-dom/client'
import App from '@/app'

const initialData = JSON.parse(document.getElementById('__DATA__')?.innerHTML || '{}')

hydrateRoot(document.getElementById('root')!, <App {...initialData} />)
