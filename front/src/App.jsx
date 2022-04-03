import Header from "./components/Header";
import Home from "./pages/Home/Home";
import { SessionProvider } from "./pages/Auth/context/SessionContext";

function App() {
    return (
        <>
            <SessionProvider>
                <Header />
                <Home />
            </SessionProvider>
        </>
    );
}

export default App;
