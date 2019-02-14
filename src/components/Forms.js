import React from "react"
import $ from 'jquery';
import {YMaps, Map, Polygon} from 'react-yandex-maps';
import ReactDOM from 'react-dom';

function validation() {
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
}

function addRow() {
    if (!validation()) {
        return false;
    }
    let lon = $('#lon').val();
    let lat = $('#lat').val();
    $('#table tbody').append('<tr>' +
        '<td>' + lat + '</td>\n' +
        '<td>' + lon + '</td>\n' +
        '<td>' + '<a href="https://yandex.ru/maps/?pt=' + lon + ',' + lat + '&z=12&l=map" target="_blank">Яндекс</a>' + '</td>\n' +
        '<td>' + '<a href="https://www.google.com/maps/search/?api=1&query=' + lat + ',' + lon + '" target="_blank">Google</a>' + '</td>\n' +
        '</tr>');
}

function delRow() {
    if (!validation()) {
        return false;
    }
    $('#table tbody tr:last').remove();
}


function placemark() {

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
    let mapState = {center: [$('#lon').val(),$('#lat').val()], zoom: 5};
    const PolygonExample = () => (
        <YMaps>
            <Map defaultState={mapState} className="map">
                <Polygon {...polygon}/>
            </Map>
        </YMaps>
    );
    ReactDOM.render(<PolygonExample/>, document.getElementById('map'));

}


function Forms() {
    return (
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
                        <button type="button" className="btn btn-outline-danger" style={{width: 100 + '%'}}
                                onClick={addRow}>
                            +
                        </button>
                    </div>
                    <div className="form-group col-md-6">
                        <button type="button" className="btn btn-outline-danger" style={{width: 100 + '%'}}
                                onClick={delRow}>
                            -
                        </button>
                    </div>
                    <div className="form-group col-md-6">
                        <button type="button" className="btn btn-outline-danger" style={{width: 100 + '%'}}
                                onClick={placemark}>
                            Обработать
                        </button>
                    </div>
                    <div className="form-group col-md-6">
                        <button type="button" className="btn btn-outline-danger" style={{width: 100 + '%'}}
                                onClick={delRow}>
                            Убрать лишние
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Forms
