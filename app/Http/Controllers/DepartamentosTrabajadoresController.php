<?php

namespace App\Http\Controllers;

use App\Models\Departamentos_Trabajadores;
use Illuminate\Http\Request;

class DepartamentosTrabajadoresController extends Controller
{
    protected $departamentosTrabajadores;

    public function __construct(Departamentos_Trabajadores $departamentosTrabajadores){
        $this->departamentosTrabajadores = $departamentosTrabajadores;
    }

    public function filter($id_departamento){
        $trabajadores = $this->departamentosTrabajadores->getTrabajadoresDepartamento($id_departamento);
        return response()->json(['dataTrabajadores'=>$trabajadores]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Departamentos_Trabajadores $departamentos_Trabajadores)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Departamentos_Trabajadores $departamentos_Trabajadores)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Departamentos_Trabajadores $departamentos_Trabajadores)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Departamentos_Trabajadores $departamentos_Trabajadores)
    {
        //
    }
}
