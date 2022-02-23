import MainContainer from '../../components/MainContainer'
import MainContent from '../../components/MainContent'
import SideContent from '../../components/SideContent'

export default function Main() {

    return (
        <MainContainer children={undefined}>
            <MainContent />
            <SideContent />
        </MainContainer>
    )
}