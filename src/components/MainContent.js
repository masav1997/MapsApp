import React from "react"
import "./MainContent.css"
import Forms from "../components/Forms"
import Table from "../components/Table"


function MainContent() {
    return (
        <div className="content">
            <div className="col-md-6">
                <div className="row"><Forms/></div>
                <div className="row">
                    <div id="map"></div>
                </div>
            </div>
            <div className="col-md-6"><Table/></div>
        </div>
    )
}

export default MainContent
