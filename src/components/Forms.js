import React from "react"
import "./Forms.css"
import $ from 'jquery';

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
    let a = '<a href="#">Яндекс</a>';
    $('#table tbody').append('<tr>' +
        '<td>' + $('#lat').val() + '</td>\n' +
        '<td>' + $('#lon').val() + '</td>\n' +
        '<td>' + a + '</td>\n' +
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
    let lat = $('#lat').val();
    let lon = $('#lon').val();
    // var myPlacemark = new ymaps.Placemark([lat, lon]);
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
                    <div className="col-md-6">
                        <button type="button" className="btn btn-outline-danger" style={{width: 100 + '%'}} onClick={placemark}>
                            Обработать
                        </button>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-6" style={{paddingRight: 0}}>
                                <button type="button" className="btn btn-outline-danger" style={{width: 100 + '%'}}
                                        onClick={addRow}>
                                    +
                                </button>
                            </div>
                            <div className="col-md-6">
                                <button type="button" className="btn btn-outline-danger" style={{width: 100 + '%'}} onClick={delRow}>
                                    -
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Forms
     