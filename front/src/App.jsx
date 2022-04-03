import Header from "./components/Header";
import { SessionProvider } from "./pages/Auth/context/SessionContext";
import MainContainer from "./components/MainContainer";
import MainContent from "./components/MainContent";

function App() {
    return (
        <>
            <SessionProvider>
                <Header />
                <MainContainer>
                    <MainContent />
                </MainContainer>
            </SessionProvider>
        </>
    );
}

export default App;
