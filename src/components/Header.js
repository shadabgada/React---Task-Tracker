import Button from "./Button";

//1. This can be written as class as well
//2. Instead of passing title we can send props and use by props.title as well
const Header = ({title,onAdd,showAdd}) => {
   
    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button color={showAdd?'red':'steelblue'} text={showAdd?'Close':'Add'} onClick={onAdd}></Button>
        </header>
    )
}


//If title is not passed, it will set this default value
Header.defaultProps = {
    title:'Task Tracker'
}


//CSS in JS
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black'
// }

export default Header