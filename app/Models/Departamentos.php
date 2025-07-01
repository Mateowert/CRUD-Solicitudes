<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Departamentos extends Model
{
    //
    public function getSolicitables()
    {

        $query = "
        select id, nombre_departamento  from departamentos where solicitable = true;
            ";
        $solicitudes = DB::select($query);

        if (count($solicitudes) > 0) {
            return $solicitudes;
        } else {
            return [];
        }
    }
}
