import { Fragment } from "react";
import Header from "./components/Header";
import Home from "./pages/Home/index"
import PostsContainer from "./pages/Home/PostsContainer"
import { ApiDatasProvider } from "./utils/context/ApiDatas"

function App() {

    return (
        <Fragment>
            <Header />
            <ApiDatasProvider>
                <Home>
                    <PostsContainer />
                </Home>
            </ApiDatasProvider>
        </Fragment>
    );
}

export default App;
