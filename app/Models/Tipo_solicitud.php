<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Tipo_solicitud extends Model
{
    //
    public function getTipoSolicitud($id_tipo_solicitud)
    {
        $query = "
       SELECT 
  strftime('%d', fecha_revision) || '/' ||
  CASE strftime('%m', fecha_revision)
    WHEN '01' THEN 'Ene'
    WHEN '02' THEN 'Feb'
    WHEN '03' THEN 'Mar'
    WHEN '04' THEN 'Abr'
    WHEN '05' THEN 'May'
    WHEN '06' THEN 'Jun'
    WHEN '07' THEN 'Jul'
    WHEN '08' THEN 'Ago'
    WHEN '09' THEN 'Sep'
    WHEN '10' THEN 'Oct'
    WHEN '11' THEN 'Nov'
    WHEN '12' THEN 'Dic'
  END || '/' ||
  strftime('%Y', fecha_revision) AS fecha_revision, id, codigo , referencia 
   from tipo_solicituds where id = ?;
        ";

        //dd(DB::select($query, [$id_tipo_solicitud])[0]);

        $resultado = DB::select($query, [$id_tipo_solicitud]);

        if (is_array($resultado)) {
            if (!empty($resultado)) {
                return $resultado[0];
            }else{
                return (object)[
                    'codigo' => 'No especificado',
                    'id' => 'No especificado',
                    'referencia' => 'No especificado',
                    'fecha_revision' => 'No especificado',
                ];
            }
        } else {
            return $resultado;
        }
    }
}
