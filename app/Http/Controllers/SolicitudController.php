<?php

namespace App\Http\Controllers;

use App\Http\Requests\SolicitudesRequest;
use App\Models\Solicitud;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Departamentos;
use App\Models\Departamentos_Trabajadores;
use App\Http\Resources\TrabajadoresResource;

class SolicitudController extends Controller
{
    protected $solicitud;

    public function __construct(Solicitud $solicitud)
    {
        $this->solicitud = $solicitud;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

        $solicitudes = $this->solicitud->getSolicitudes();;

        return Inertia::render('Solicitudes/IndexSolicitudes', [
            'solicitudes' => $solicitudes,
        ]);
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
    public function store(SolicitudesRequest $request)
    {
        //
        $this->solicitud->storeSolicitud($request);
        return redirect()->route('solicitud.index');
    }

    /**
     * Display the specified resource.
     */
    public function show($id_solicitud)
    {
        //
        $solicitudEncontrada = $this->solicitud->getSolicitud($id_solicitud);
        return response()->json(['solicitud' => $solicitudEncontrada]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Solicitud $solicitud)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SolicitudesRequest $request, $id_solicitud)
    {
        //
        $this->solicitud->updateSolicitud($request, $id_solicitud);
        return redirect()->route('solicitud.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Solicitud $solicitud)
    {
        //
        $solicitud->delete();
        return redirect()->route('solicitud.index');
    }
}
