<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('solicituds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('FK_Departamento_solicitante')->constrained(
                table: 'departamentos__trabajadores', indexName: 'id'
            );
            $table->foreignId('FK_Departamento_solicitado')->constrained(
                table: 'departamentos', indexName: 'id'
            );
            $table->foreignId('FK_Tipo_solicitud')->constrained(
                table: 'tipo_solicituds', indexName: 'id'
            );
            $table->string('folio');
            $table->text('descripcion');
            $table->date('fecha_revision');
            $table->date('fecha_elaboracion');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solicituds');
    }
};
