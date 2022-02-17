import styled from "styled-components"
import {colors} from "../../utils/styles/colors"

const StyledPreview = styled.a`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    padding: 20px;
    width: 100%;
    box-shadow: 0 0 10px grey;
    text-decoration: none;
    color: black;
    border: solid 1px transparent;
    background-color: white;
    &:hover {
        box-shadow: 0 0 20px ${colors.primary};
    }
`

export default function PostPreview({ title, body }) {
    
    return (
        <StyledPreview href="#">
            <article>
                <h2>{title}</h2>
                <p>{body}</p>
            </article>
        </StyledPreview>
    )
}