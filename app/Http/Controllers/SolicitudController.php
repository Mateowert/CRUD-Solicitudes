<?php

namespace App\Http\Controllers;

use App\Http\Requests\SolicitudesRequest;
use App\Models\Departamentos;
use App\Models\Departamentos_Trabajadores;
use App\Models\Solicitud;
use App\Models\Tipo_solicitud;
use App\Models\Trabajadores;
use Illuminate\Http\Request;
use Inertia\Inertia;

use Barryvdh\DomPDF\Facade\Pdf;

class SolicitudController extends Controller
{
    protected $solicitud;
    protected $departamento;

    public function __construct(Solicitud $solicitud, Departamentos $departamento)
    {
        $this->solicitud = $solicitud;
        $this->departamento = $departamento;
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

    public function getSolicitudPDF(Request $request)
    {
        $solicitud = Solicitud::find($request->id);

        $departamentosSolicitables = $this->departamento->getSolicitables();
        $tipo = Tipo_solicitud::find($solicitud->FK_Tipo_solicitud);
        
        $solicitante = Departamentos_Trabajadores::find($solicitud->FK_Departamento_solicitante);
        $trabajador = Trabajadores::find($solicitante->FK_Trabajador);
        $departamentoSolicitante = Departamentos::find($solicitante->FK_Departamento);
        

        $pdf = PDF::loadView('solicitud', [
            'solicitud' => $solicitud,
            'solicitables' => $departamentosSolicitables,
            'tipo' => $tipo,
            'trabajador' => $trabajador,
            'solicitante' => $departamentoSolicitante,
            'relSol' => $solicitante,
        ]);
        $pdf->setOptions([
            'isRemoteEnabled' => true, // Para cargar imágenes de forma remota
            'isHtml5ParserEnabled' => true, // Activar el analizador HTML5
            'isPhpEnabled' => true, // Activar el soporte PHP para Dompdf
            'enableCssFloat' => true,
            'dpi' => 96,
            'fontHeightRatio' => 0.9,
        ]);

        return $pdf->download();
    }
}
