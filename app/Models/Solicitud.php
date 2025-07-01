<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Guid\Guid;

class Solicitud extends Model
{
    //
    public function getSolicitudes()
    {

        $query = "SELECT d1.nombre_departamento as solicitado, 
	   d2.nombre_departamento as solicitante,
	   t.nombre,
	   strftime('%d/%m/%Y', s.fecha_elaboracion) as fecha_elaboracion,
       s.id 
	   FROM solicituds s
        INNER JOIN departamentos d1 
    	    ON s.FK_Departamento_solicitado  = d1.id
	    INNER JOIN departamentos__trabajadores dt 
    	    ON s.FK_Departamento_solicitante = dt.id
	    INNER JOIN departamentos d2 
    	    ON dt.FK_Departamento = d2.id
        INNER JOIN trabajadores t 
    	    ON dt.FK_Trabajador = t.id
            ORDER BY s.fecha_elaboracion desc;
            ";
        $solicitudes = DB::select($query);

        if (count($solicitudes) > 0) {
            return $solicitudes;
        } else {
            return [];
        }
    }

    public function storeSolicitud($request)
    {
        $query = "
        INSERT INTO solicituds
	        (FK_Departamento_solicitante, 
	        FK_Departamento_solicitado, 
	        FK_Tipo_solicitud ,
	        descripcion, 
	        folio,
	        fecha_elaboracion)
	    VALUES 
	        (
            (select id from departamentos__trabajadores
	            where FK_Departamento = ? and FK_Trabajador = ?), 
	        ?, 
	        ?,
	        ?, 
	        ?,
	        ?
	        )
        ";

        //dd($request->all());
        return DB::insert($query, [
            $request->fk_id_solicitante,
            $request->fk_id_trabajador,
            $request->fk_id_solicitado,
            $request->fk_id_tipo,
            $request->descripcion,
            $request->folio,
            $request->fecha_elaboracion,
        ]);
    }

    public function getSolicitud($id_solicitud)
    {
        $query = "
        select dt.FK_Departamento,
            s.FK_Departamento_solicitado,
            dt.FK_Trabajador,
            s.folio,
            s.FK_Tipo_solicitud,
            s.fecha_elaboracion,
            s.descripcion
            from solicituds s
            inner join departamentos__trabajadores dt 
                on s.FK_Departamento_solicitante = dt.id
            where s.id = ?
            
        ";
        return DB::select($query, [$id_solicitud])[0];
    }

    public function getSolicitudPDF($id_solicitud)
    {
        $query = "
            SELECT strftime('%d', fecha_elaboracion ) || '/' ||
  CASE strftime('%m', fecha_elaboracion )
    WHEN '01' THEN 'ENERO'
    WHEN '02' THEN 'FEBRERO'
    WHEN '03' THEN 'MARZO'
    WHEN '04' THEN 'ABRIL'
    WHEN '05' THEN 'MAYO'
    WHEN '06' THEN 'JUNIO'
    WHEN '07' THEN 'JULIO'
    WHEN '08' THEN 'AGOSTO'
    WHEN '09' THEN 'SEPTIEMBRE'
    WHEN '10' THEN 'OCTUBRE'
    WHEN '11' THEN 'NOVIEMBRE'
    WHEN '12' THEN 'DICIEMBRE'
  END || '/' ||
  strftime('%Y', fecha_elaboracion ) AS fecha_elaboracion, id, FK_Departamento_solicitante, 
  FK_Departamento_solicitado, FK_Tipo_solicitud, folio, descripcion
	FROM solicituds WHERE id = ?;
        ";
        return DB::select($query, [$id_solicitud])[0];
    }

    public function updateSolicitud($request, $id_solicitud)
    {
        $query = "
            update solicituds
	        set FK_Departamento_solicitante = (
		        select id from departamentos__trabajadores dt 
			        where dt.FK_Departamento = ? and dt.FK_Trabajador = ?
		        ),
	            FK_Departamento_solicitado = ?,
	            FK_Tipo_solicitud = ?,
	            folio = ?,
	            descripcion = ?,
	            fecha_elaboracion = ?
	        where id= ?
            
        ";
        return DB::update($query, [
            $request->fk_id_solicitante,
            $request->fk_id_trabajador,
            $request->fk_id_solicitado,
            $request->fk_id_tipo,
            $request->folio,
            $request->descripcion,
            $request->fecha_elaboracion,
            $id_solicitud
        ]);
    }
}
