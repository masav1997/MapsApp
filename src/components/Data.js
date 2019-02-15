import React, {Component} from 'react';
import $ from 'jquery';
import "./MainContent.css"
import {Circle, Map, Polygon, YMaps} from "react-yandex-maps";
import ReactDOM from "react-dom";
import 'datatables.net';

export default class Data extends Component {
    t;
    table = () => {
        this.t = $('#table').DataTable();
    };

    componentDidMount() {
        this.table();
    }

    /*componentDidUpdate() {
        this.table();
    }*/

    validation = () => {
        let valid = true;
        ['inputAddress', 'lon', 'lat'].some(function (el) {
            let els = $('#' + el);
            if ($.trim(els.val()) === '') {
                alert('Заполните ' + els.attr('placeholder'));
                els.val('');
                valid = false;
                return valid === false;
            }
        });
        if (!valid) {
            return false;
        }
        return valid;
    };

    addRow = () => {
        if (!this.validation()) {
            return false;
        }
        let lon = $('#lon').val(), lat = $('#lat').val();
        this.t.row.add([
            lat,
            lon,
            '<a href="https://yandex.ru/maps/?pt=' + lon + ',' + lat + '&z=12&l=map" target="_blank">Яндекс</a>',
            '<a href="https://www.google.com/maps/search/?api=1&query=' + lat + ',' + lon + '" target="_blank">Google</a>'
        ]).draw();
    };

    delRow = () => {
        if (!this.validation()) {
            return false;
        }
        this.t.row($('#table tbody tr:last')).remove().draw();
    };

    placemark = () => {
        $('title').text($('#inputAddress').val());
        let coords = [];
        $('#table tbody tr').each(function (i, el) {
            coords.push([
                $(el).find('td:eq(0)').text(),
                $(el).find('td:eq(1)').text(),
            ]);
        });

        let polygon = {
            geometry: [coords]
        };
        let circle = {
            geometry: [coords]
        };
        let mapState = {center: [$('#lon').val(), $('#lat').val()], zoom: 5};
        const PolygonExample = () => (
            <YMaps>
                <Map defaultState={mapState} className="map">
                    <Polygon {...polygon}/>
                    <Circle {...circle}/>
                </Map>
            </YMaps>
        );
        ReactDOM.render(<PolygonExample/>, document.getElementById('map'));

    };

    render() {
        return (
            <div className="content col-md-12">
                <div className="col-md-6">
                    <div className="row">
                        <div className="forms">
                            <form id="form">
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputAddress">
                                            Введите название объекта и его координаты
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputAddress"
                                            placeholder="Название"
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Широта"
                                            id="lat"
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Долгота"
                                            id="lon"
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <button type="button" className="btn btn-outline-danger"
                                                style={{width: 100 + '%'}}
                                                id="addRow"
                                                onClick={this.addRow}>
                                            +
                                        </button>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <button type="button" className="btn btn-outline-danger"
                                                style={{width: 100 + '%'}}
                                                onClick={this.delRow}>
                                            -
                                        </button>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <button type="button" className="btn btn-outline-danger"
                                                style={{width: 100 + '%'}}
                                                onClick={this.placemark}>
                                            Обработать
                                        </button>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <button type="button" className="btn btn-outline-danger"
                                                style={{width: 100 + '%'}}
                                                onClick={this.delRow}>
                                            Убрать лишние
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row" id="map">
                    </div>
                </div>
                <div className="col-md-6">
                    <table className="table table-striped table-bordered" id="table">
                        <thead>
                        <tr>
                            <th scope="col">Широта</th>
                            <th scope="col">Долгота</th>
                            <th scope="col">Ссылка#1</th>
                            <th scope="col">Ссылка#2</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}