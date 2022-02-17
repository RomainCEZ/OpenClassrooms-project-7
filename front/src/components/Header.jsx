import logo from '../assets/icon-left-font-monochrome-white.svg'
import styled from "styled-components"

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background-color: #061c40;
    box-shadow: 2px 0 15px 2px #061c40;
`
const Logo = styled.img`
    display: flex;
    max-height: 50px;
`

export default function Header() {

    return (
        <StyledHeader>
            <Logo src={logo} alt="Groupomania"/>
        </StyledHeader>
    )
}