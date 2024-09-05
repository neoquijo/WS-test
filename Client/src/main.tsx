import { createRoot } from 'react-dom/client'
import { WebSocketProvider } from './Context/WebSocketContext'
import MessageInput from './components/MessageInput'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MessageList from './components/MessageList'

const client = new QueryClient()
createRoot(document.getElementById('root')!).render(

  <QueryClientProvider client={client}>
    <WebSocketProvider>
      React WS
      <MessageInput />
      <MessageList />
    </WebSocketProvider>
  </QueryClientProvider>
)
