import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import PostPreview from "./PostPreview"
import { ApiDataContext } from "../../utils/context/ApiDatas"

const MainContent = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    height: 100%;
    width: 100%;
    margin: 0;
`

export default function Home({children}) {
    const {posts} = useContext(ApiDataContext)
    const postsData = posts.map( post => <PostPreview key={post.id} title={post.title} body={post.body} />)

    return (
        <MainContent>
            {children}
        </MainContent>
    )
}