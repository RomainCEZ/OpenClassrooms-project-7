import { useContext } from "react"
import styled from "styled-components"
import {colors} from "../../utils/styles/colors"
import PostPreview from "./PostPreview"
import { ApiDataContext } from "../../utils/context/ApiDatas"

const PostContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: top;
    margin: 20px 0;
    gap: 20px;
    padding: 60px;
    height: 100%;
    width: 600px;
    background-color: ${colors.secondary};
`

export default function Home() {
    const {posts} = useContext(ApiDataContext)
    const postsData = posts.map( post => <PostPreview key={post.id} title={post.title} body={post.body} />)

    return (
        <PostContainer>
            {postsData}
        </PostContainer>
    )
}