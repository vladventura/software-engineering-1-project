import { connect } from "react-redux";

const MainPage = (props) => {
    const { mainReducer } = props;
    const { loaded, message, body } = mainReducer;
    Object.keys(body).forEach(key => console.log(key))

    return <>
        {loaded ? <div>
            <h1>{message}</h1>
            {Object.keys(body).map(key => <p key={key}>{key} =&gt; {body[key]}</p>)}
        </div> : <div>loading</div>}
    </>
};

const mapStateToProps = (state) => {
    return {
        mainReducer: state.mainReducer
    };
};

export default connect(mapStateToProps)(MainPage);
