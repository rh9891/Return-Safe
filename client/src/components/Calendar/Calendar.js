import React, { useState, useEffect } from "react";
import { Calendar as ReactCal } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./Calendar.css";
import API from "../../utils/API";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function Calendar(props) {

    const [fevers, setFevers] = useState([]);
    const { user } = props.auth;

    useEffect(() => {
        API.findFever(user.id)
            .then(res => {
                // console.log(res.data.checkins);
                setFevers(res.data.checkins);
            })
            .catch(err => console.log(err));
    }, []);

    return (

        <div>
            <section className={props.showCalendar ? "center" : "center hide-on-med-and-down"}>

                <div>
                    <ReactCal
                        onChange={props.onChange}
                        value={props.currentDate}
                        maxDate={new Date()}

                        tileClassName={({activeStartDate, date, view}) => {

                            if(fevers) {
                                return fevers.map(data => date.toDateString() === new Date(data.date).toDateString() && "red-text")
                            }
                        }}
                    />
                </div>
            </section>
        </div>
    )
}

Calendar.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(Calendar);