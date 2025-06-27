<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SolicitudesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'fk_id_trabajador' => ['required'],
            'fk_id_solicitante' => ['required'],
            'fk_id_solicitado' => ['required'],
            'fecha_elaboracion' => ['required'],
            'folio' => ['required'],
            'descripcion' => ['required'],
            'fk_id_tipo' => ['required']
        ];
    }

    public function messages(): array {
        return [
            'fk_id_solicitante.required'=> 'Selecciona el area solicitante',
            'fk_id_solicitado.required' => 'Selecciona el area solicitada',
            'fk_id_trabajador'=> 'Selecciona un trabajador',
            'folio'=> 'Introduce el folio',
            'fk_id_tipo'=> 'Selecciona una norma',
            'fecha_elaboracion' => 'Introduce la fecha de elaboracion',
            'descripcion'=> 'Introduce la descripcion de la solicitud',
        ];
    }
}
