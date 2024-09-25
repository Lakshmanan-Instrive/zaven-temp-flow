import AuthProvider from "./utils/AuthProvider";
import Routes from "./routes";
import { IdleProvider } from "./utils/IdleTimeout";
// import { NetworkDetectorProvider } from "./utils/NetworkDetector";

function App() {
  // const onLogout = async () => {
  //   localStorage.clear();
  //   window.location.href = "/login";
  // };

  return (
    <AuthProvider>
      <IdleProvider>
        {/* <NetworkDetectorProvider onLogout={onLogout}> */}
        <Routes />
        {/* </NetworkDetectorProvider> */}
      </IdleProvider>
    </AuthProvider>
  );
}

export default App;
