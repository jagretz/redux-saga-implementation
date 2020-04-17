import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchData } from "./reducer";
import "./App.css";

// eslint-disable-next-line no-shadow
const App = ({ fetchData, url, error }) => {
    useEffect(() => fetchData(), [fetchData]);

    return (
        <>
            <button onClick={() => fetchData()}>Click to show a random cat!</button>

            {url && <img src={url} alt="cat" />}

            {error}
        </>
    );
};

App.propTypes = {
    fetchData: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
};

const mapStateToProps = ({ cat }) => ({ url: cat.url, error: cat.error });
const mapDispatchToProps = { fetchData };

export default connect(mapStateToProps, mapDispatchToProps)(App);
