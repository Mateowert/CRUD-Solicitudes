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
        Schema::create('departamentos__trabajadores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('FK_Departamento')->constrained(
                table: 'departamentos', indexName: 'id'
            );
            $table->foreignId('FK_Trabajador')->constrained(
                table: 'trabajadores', indexName: 'id'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('departamentos__trabajadores');
    }
};
