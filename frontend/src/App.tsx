import { useContext } from "react";
import "./App.css";
// import { ServiceList } from "./components/serviceList";
// import { ServiceForm } from "./components/serviceForm";
import { Button, Container } from "./components/styles";
import { MicroserviceProvider } from "./context/microserviceContext";
import { AuthContext, AuthProvider } from "./context/authContext";
import { AuthForm } from "./components/authForm";

function MainApp() {
  const authContext = useContext(AuthContext);
  const handleLogout = () => {
    authContext?.dispatch({ type: "LOGOUT" });
  };
  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Microservice</h1>
        {authContext?.state.isAuthenticated && (
          <Button onClick={handleLogout} style={{ background: "#333" }}>
            Sign Out
          </Button>
        )}
      </div>
      {authContext?.state.isAuthenticated ? (
        <>
          {/* <MicroserviceForm />
          <hr style={{ margin: "30px 0", border: "1px solid #eee" }} />
          <h2>Microservices</h2>
          <ServiceList /> */}
        </>
      ) : (
        <AuthForm />
      )}
    </Container>
  );
}
function App() {
  return (
    <MicroserviceProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </MicroserviceProvider>
  );
}
export default App;
