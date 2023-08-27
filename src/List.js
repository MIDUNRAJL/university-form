import React from "react";
import ReactDOM from "react-dom";
import './List.css'
function List(props) {
    const { heading, value } = props;
    return (
        <div className="course">
            <label>
                <input type="radio"
                    name="courseList"
                    value={FormData.courseList}
                />
                <h1>{heading}</h1>
                <ul>
                    {
                        value && value.map((str) => {
                            return (
                                <li>{str}</li>
                            )
                        })
                    }
                </ul>
            </label>
        </div>
    )
}
export default List;