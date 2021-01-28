const getDataHoraNow = function () {
    var d = new Date();
    var hora = d.toTimeString().substring(0, 7);
    var dia = d.getDate().toString().padStart(2, '0');
    var mes = (d.getMonth() + 1).toString().padStart(2, '0');
    var ano = d.getFullYear();
    var dh = `${dia}-${mes}-${ano} ${hora}`;
    return dh;
}

const getLogEventoFabrica = function(fabrica, evento) {
    return {
        dataHora: getDataHoraNow(),
        fabrica: fabrica,
        linha: '---',
        operador: '---',
        componente: 'fábrica',
        tipo: 'INFO',
        evento: evento
    }
}

module.exports = {
    getDataHoraNow, getLogEventoFabrica
}