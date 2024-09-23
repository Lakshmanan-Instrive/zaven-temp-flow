import AuthProvider from "./utils/AuthProvider";
import Routes from "./routes";
import { IdleProvider } from "./utils/IdleTimeout";
import { NetworkDetectorProvider } from "./utils/NetworkDetector";

function App() {
  return (
    <AuthProvider>
      <IdleProvider>
        <NetworkDetectorProvider>
          <Routes />
        </NetworkDetectorProvider>
      </IdleProvider>
    </AuthProvider>
  );
}

export default App;
