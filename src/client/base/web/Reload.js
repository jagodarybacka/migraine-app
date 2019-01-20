const Reload = (props) => {
    if (window.localStorage.getItem('isLogged') === 'true') {
        props.history.push('/');
    }
    return null;
}

export default Reload;
