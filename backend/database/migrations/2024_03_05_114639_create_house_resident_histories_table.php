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
        Schema::create('house_resident_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('resident_id')->references('id')->on('residents');
            $table->foreignId('house_id')->references('id')->on('houses');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('house_resident_histories');
    }
};
