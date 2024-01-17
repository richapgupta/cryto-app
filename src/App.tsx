import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import ExchangeRate from './components/cryptocurrencypage/ExchangeRate';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable automatic refetching on window focus
      refetchInterval: 60000, // Refetch queries every 60 seconds
    },
  },
});

function App() {
  return (
    <div>
      <div className="container mt-5">
        <div className="pt-lg-5 p-5 align-items-center rounded-3 border shadow-lg">
          <QueryClientProvider client={queryClient}>
            <ExchangeRate />
          </QueryClientProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
