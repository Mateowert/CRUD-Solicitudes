<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;

class Departamentos_Trabajadores extends Model
{
    //
    public function getTrabajadoresDepartamento($id_departamento)
    {

        $query = "SELECT nombre, trabajadores.id
                    FROM trabajadores
                    LEFT JOIN departamentos__trabajadores
                    ON trabajadores.id = departamentos__trabajadores.FK_Trabajador
                    WHERE departamentos__trabajadores.FK_Departamento = ?;";
        $trabajadores = DB::select($query, [$id_departamento]);

        if(count($trabajadores) > 0) {
            return $trabajadores;
        }else{
            return [];
        }
    }

    public function trabajador(): BelongsTo
    {
        return $this->belongsTo(Trabajadores::class, 'id');
    }

    public function departamento(): BelongsTo
    {
        return $this->belongsTo(Departamentos::class, 'id');
    }
}
