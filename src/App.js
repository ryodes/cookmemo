import { SnackbarProvider } from "notistack";
import AppRouter from "router/AppRouter";
import { AuthProvider } from "context/AuthContext";
import { Provider } from "react-redux";
import { store } from "app/store";

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider />
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Provider>
  );
}

export default App;
