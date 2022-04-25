import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import { SessionProvider } from "./pages/Auth/context/SessionContext";
import { DarkModeContext } from "./components/DarkModeContext";
import MainContainer from "./components/MainContainer";
import MainContent from "./components/MainContent";

function App() {
    return (
        <>
            <Router>
                <ScrollToTop>
                    <SessionProvider>
                        <DarkModeContext>
                            <Header />
                            <MainContainer>
                                <MainContent />
                            </MainContainer>
                        </DarkModeContext>
                    </SessionProvider>
                </ScrollToTop>
            </Router>
        </>
    );
}

export default App;
