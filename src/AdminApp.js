import "./App.css";
import AuthState from "./context/Auth/AuthState";
import AppRouter from "./routes/AppRouter";

function AdminApp() {
  return (
    <AuthState>
      <AppRouter />
    </AuthState>
  );
}

export default AdminApp;
