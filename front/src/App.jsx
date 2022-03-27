import Header from "./components/Header";
import Main from "./pages/Home/index"
import { SessionProvider } from "./pages/Auth/context/SessionContext"

function App() {

    return (
        <>
            <SessionProvider>
                <Header />
                <Main />
            </SessionProvider>
        </>
    );
}

export default App;
