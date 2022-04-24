import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import { SessionProvider } from "./pages/Auth/context/SessionContext";
import { DarkMode } from "./components/DarkMode";
import MainContainer from "./components/MainContainer";
import MainContent from "./components/MainContent";

function App() {
    return (
        <>
            <Router>
                <ScrollToTop>
                    <SessionProvider>
                        <DarkMode>
                            <Header />
                            <MainContainer>
                                <MainContent />
                            </MainContainer>
                        </DarkMode>
                    </SessionProvider>
                </ScrollToTop>
            </Router>
        </>
    );
}

export default App;
