import Header from "./components/Header";
import Main from "./pages/Home/index"
import { ApiDatasProvider } from "./utils/context/ApiDatas"

function App() {

    return (
        <>
            <Header />
            <ApiDatasProvider>
                <Main />
            </ApiDatasProvider>
        </>
    );
}

export default App;
