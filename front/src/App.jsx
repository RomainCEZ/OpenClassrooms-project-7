import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import { SessionProvider } from "./pages/Auth/context/SessionContext";
import { DarkModeContext } from "./components/Darkmode/DarkModeContext";
import MainContainer from "./components/MainContainer";
import MainContent from "./components/MainContent";
import { MessageOverlay } from "./components/MessageOverlay";
import { UserProvider } from "./pages/Auth/context/UserContext";

function App() {
    return (
        <>
            <Router>
                <ScrollToTop>
                    <DarkModeContext>
                        <UserProvider>
                            <MessageOverlay>
                                <SessionProvider>
                                    <Header />
                                    <MainContainer>
                                        <MainContent />
                                    </MainContainer>
                                </SessionProvider>
                            </MessageOverlay>
                        </UserProvider>
                    </DarkModeContext>
                </ScrollToTop>
            </Router>
        </>
    );
}

export default App;
