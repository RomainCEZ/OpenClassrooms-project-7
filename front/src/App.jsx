import Header from "./components/Header";
import Main from "./pages/Home/index"
import { ApiDatasProvider } from "./utils/context/ApiDatas"
import { SessionProvider } from "./pages/Auth/context/SessionContext"

function App() {

    return (
        <>
            <SessionProvider>
            <Header />
            <ApiDatasProvider>
                <Main />
            </ApiDatasProvider>
            </SessionProvider>
        </>
    );
}

export default App;
