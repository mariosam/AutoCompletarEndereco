function marioSAM_Autocompletar_BuscarCEP(evt, sender) {
    var fieldPrefix = evt.target.id.indexOf('billing') != -1 ? 'billing' : 'shipping'; //Any Other?

    new Ajax.Request(MarioSAM_AutoCompletar_BuscaCepUrl, {
        method: 'post',
        parameters: 'cep=' + $(fieldPrefix +':postcode').value,
        onComplete: function (transport) {
            var res = transport.responseText.evalJSON();
            if (res.resultado == '1') {
                $(fieldPrefix +':street1').value = res.tipo_logradouro + ' ' + res.logradouro;

                // Muitas pessoas separam Rua, Número, Complemento e Bairro
                // respectivamente nos campos (street1,2,3 e 4)
                // Logo, o script abaixo, joga no último campo
                if ($(fieldPrefix+':street4')) $(fieldPrefix+':street4').value = res.bairro;
                else if($(fieldPrefix+':street3')) $(fieldPrefix+':street3').value = res.bairro;
                else if ($(fieldPrefix+':street2')) $(fieldPrefix+':street2').value = res.bairro;

                $(fieldPrefix+':city').value = res.cidade;
                if ($(fieldPrefix+':region_id') != undefined)
                {
                    var select = $(fieldPrefix+':region_id');
                    var uf = res.uf.toLowerCase();
                    for (var i = 0; i < select.options.length; i++)
                    {
                        if (select.options[i].text.toLowerCase().trim()
                            == marioSAM_Autocompletar_BuscaEstadoPorUF(uf))
                        {
                            select.options[i].selected = true;
                            break;
                        }
                    }
                }
                else
                    $(fieldPrefix+':region').value = res.uf;
            }
        }
    });
}

function marioSAM_Autocompletar_BuscaEstadoPorUF(uf)
{
    var ret = '';

    switch (uf) {
        case 'ac': ret = 'acre'; break;
        case 'al': ret = 'alagoas'; break;
        case 'ap': ret = 'amap\u00e1'; break;
        case 'am': ret = 'amazonas'; break;
        case 'ba': ret = 'bahia'; break;
        case 'ce': ret = 'cear\u00e1'; break;
        case 'df': ret = 'distrito federal'; break;
        case 'es': ret = 'esp\u00edrito santo'; break;
        case 'go': ret = 'goi\u00e1s'; break;
        case 'ma': ret = 'maranh\u00e3oo'; break;
        case 'mt': ret = 'mato grosso'; break;
        case 'ms': ret = 'mato grosso do sul'; break;
        case 'mg': ret = 'minas gerais'; break;
        case 'pa': ret = 'par\u00e1'; break;
        case 'pb': ret = 'para\u00edba'; break;
        case 'pr': ret = 'paran\u00e1'; break;
        case 'pe': ret = 'pernambuco'; break;
        case 'pi': ret = 'piau\u00ed'; break;
        case 'rj': ret = 'rio de janeiro'; break;
        case 'rn': ret = 'rio grande do norte'; break;
        case 'rs': ret = 'rio grande do sul'; break;
        case 'ro': ret = 'rond\u00f4nia'; break;
        case 'rr': ret = 'roraima'; break;
        case 'sc': ret = 'santa catarina'; break;
        case 'sp': ret = 's\u00e3o paulo'; break;
        case 'se': ret = 'sergipe'; break;
        case 'to': ret = 'tocantins'; break;
    }

    return ret;
}

document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("billing:postcode").addEventListener("blur", marioSAM_Autocompletar_BuscarCEP);
    document.getElementById("shipping:postcode").addEventListener("blur", marioSAM_Autocompletar_BuscarCEP);
});