<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <style>
        /*generales*/

        body {
            font-family: Arial, Helvetica, sans-serif;
        }

        /* header */

        .logo {
            size: 30%;
        }

        .col-izquierda {
            text-align: center;
        }

        .contenedor-recuadro {
            width: 100%;
            margin-top: 20px;
            font-size: 12px;
        }

        .tabla-columnas {
            width: 100%;
            border-collapse: collapse;
        }

        .tabla-columnas td {
            vertical-align: top;
            padding: 10px;
            border: 1px solid #000;
        }

        .col-izquierda,
        .col-derecha {
            width: 25%;
        }

        .col-derecha {
            text-align: center;
        }

        .col-centro {
            width: 50%;
            text-align: center;
        }

        p {
            margin: 5px 0;
        }

        .logo {
            width: 50px;
            height: 50px;
        }


        /* departamento solicitado */
        .tabla-derecha {
            float: right;
            clear: right;
            top: 20px;
            right: 20px;
            background-color: white;
            font-weight: bold;
        }

        .tabla-derecha table {
            border-collapse: collapse;
        }

        .tabla-derecha td {
            border: 1px solid black;
            padding: 8px 12px;
        }

        /* folio */
        .folio {
            font-weight: bold;

        }

        .div-folio {
            float: right;
        }

        /* area solicitante */
        .solicitante {
            width: 100%;
            border: 1px solid black;
            padding: 5px;
        }

        /* datos */
        .datos {
            width: 100%;
            border: 1px solid black;
            border-collapse: collapse;
        }

        .datos tr {
            border: 1px solid black;
        }

        .marco td {
            padding: 5px;
        }

        .descripcion-ultimo {
            height: 45%;
            vertical-align: top;
        }

        /* foot */
        .itt {
            float: right;
            font-size: 10;
        }
    </style>
</head>

<body>
    <div class="contenedor-recuadro">
        <table class="tabla-columnas">
            <tr>
                <td class="col-izquierda">
                    <br>
                    <img src="https://www.tepic.tecnm.mx/images/itt_escudo.png" class="logo">
                </td>
                <td class="col-centro">
                    <p>Solicitud de Mantenimiento Correctivo</p>
                    <p>Código: {{ $tipo ? $tipo->codigo : 'No especificado' }}</p>
                    <p>Referencia a la Norma {{ $tipo ? $tipo->referencia : 'No especificado'}}</p>
                </td>
                <td class="col-derecha">
                    <p>Fecha de revisión: {{ $tipo ? $tipo->fecha_revision : 'No especificado' }}</p>
                    <p>Revisión: 1</p>
                    <p>Página: 1 de 2</p>
                </td>
            </tr>
        </table>
    </div>

    <br>
    <br>
    <br>

    <div class="tabla-derecha">
        <table>
                @foreach ($solicitables as $item)
                    echo <tr>
                            <td>{{$item->nombre_departamento}}</td>
                            <td>
                                {{ dd($relSol) }}
                            </td>
                        </tr>
                @endforeach
        </table>
    </div>

    <br><br><br><br><br><br><br>

    <div class="div-folio">
        <span class="folio">Folio: </span>
        CC20251-115
    </div>

    <br><br>

    <table class="solicitante">
        <td>
            <span class="folio">Área Solicitante: </span>
            {{ $solicitante->nombre_departamento }}
        </td>
    </table>

    <br><br>

    <table class="datos">
        <tr class="marco">
            <td><span class="folio">Nombre y Firma del Solicitante: </span>
                {{ $trabajador->nombre }}
            </td>
        </tr>
        <tr class="marco">
            <td><span class="folio">Fecha de Elaboración: </span>
                {{ $solicitud->fecha_elaboracion }}
            </td>
        </tr>
        <tr class="marco">
            <td><span class="folio">Descripción del servicio solicitado o falla a reparar: </span></td>
        </tr>
        <tr class="marco">
            <td class="descripcion-ultimo">
                {{ $solicitud->descripcion }}
            </td>
        </tr>
    </table>

    <br>
    <br>

    <div>
        c. c. p. Área Solicitante
    </div>

    <br><br>

    <div class="itt">
        <span class="folio">Instituto Tecnológico de Tepic</span>
    </div>

</body>

</html>