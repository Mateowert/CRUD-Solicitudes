<?php

namespace App\Http\Controllers;

use App\Models\Tipo_solicitud;
use Illuminate\Http\Request;

class TipoSolicitudController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return response()->json(['tipos'=>Tipo_solicitud::get()]);
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
    public function show(Tipo_solicitud $tipo_solicitud)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tipo_solicitud $tipo_solicitud)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tipo_solicitud $tipo_solicitud)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tipo_solicitud $tipo_solicitud)
    {
        //
    }
}
