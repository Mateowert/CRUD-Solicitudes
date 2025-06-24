<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Solicitud extends Model
{
    //
    public function getSolicitudes()
    {

        $query = "SELECT d1.nombre_departamento as solicitado, 
	   d2.nombre_departamento as solicitante,
	   t.nombre,
	   s.fecha_elaboracion,
       s.id 
	   FROM solicituds s
	INNER JOIN departamentos d1 
    	ON s.FK_Departamento_solicitado  = d1.id
	INNER JOIN departamentos__trabajadores dt 
    	ON s.FK_Departamento_solicitante = dt.id
	INNER JOIN departamentos d2 
    	ON dt.FK_Departamento = d2.id
    INNER JOIN trabajadores t 
    	on dt.FK_Trabajador = t.id";
        $solicitudes = DB::select($query);

        if (count($solicitudes) > 0) {
            return $solicitudes;
        } else {
            return [];
        }
    }
}
