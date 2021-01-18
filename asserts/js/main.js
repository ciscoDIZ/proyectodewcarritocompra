const DOM = {
    elmArticulos : $("#articulos"),
    elmCesta : $("#cesta"),
    elmPrecio : $("#precio"),
    elmPrecioTotal : $("#precio-total"),
    elmCargar : $("#btn-cargar")
};
let igic = 0.0;
let importe = 0.0;
$(document).ready(() => {
    let articulos = DOM["elmArticulos"];
    let lista = $('<ul id="basket-items"></ul>');
    DOM["elmCesta"].append(lista);
    $.ajax({
        type: "GET",
        url : "http://localhost:8080/api/products",
        dataType : "json",
        crossDomain: true,
        success: function (result , status, xhr){
            $.each(result.productEntity, function (i, product){
                let div = $(`
                    <div>
                        <span>${product.name}</span> - <span>${product.price}</span>
                    </div>
                `);
                let input = $(`<input type="checkbox" class="check" name="${product.attName}">`)
                $(input).on("click", function (){
                    $(this).attr("checked","checked");
                })
                div.prepend(input);
                articulos.append(div);
            })
        },
        error: function(xhr, status, error){
            alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
        }
    });
        $(DOM["elmPrecio"]).html(igic.toString())
        $(DOM["elmPrecioTotal"]).html(importe.toString())
        $(".check").on("click", function (){
            $(this).attr("checked","checked");
        });
        $(DOM["elmCargar"]).on("click", function (){

            $(DOM["elmArticulos"]).children().each(function () {
                if($(this).children("input").attr("checked") !== undefined){
                    let nombre = $(this).find("span:eq(0)").clone();
                    let precio = $(this).find("span:eq(1)").clone();
                    nombre.attr("class", "nombre");
                    precio.attr("class", "precio");
                    let li = $("<li></li>");
                    li.append(nombre, precio);
                    $(lista).append(li);
                    igic += parseFloat($(this).find("span:eq(1)").text()) * 0.07;
                    importe += parseFloat($(this).find("span:eq(1)").text()) + igic;
                }
            })
            $(DOM["elmCargar"]).loader()
            $(this).fadeOut(1000);
            $(this).fadeIn(100, function (){
                $.loader.close(true);
            });
            $(DOM["elmCesta"]).prepend(lista);
            $(DOM["elmPrecio"]).text(igic);
            $(DOM["elmPrecioTotal"]).text(importe);
            $(".check").removeAttr("checked");
        })
    }
);
