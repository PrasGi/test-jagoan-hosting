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
        Schema::create('residents', function (Blueprint $table) {
            $table->id();
            $table->text('image_ktp');
            $table->string('fullname');
            $table->enum('status_resident', ['kontrak', 'tetap'])->default('kontrak');
            $table->string('phone_number');
            $table->enum('status_merried', ['sudah menikah', 'belum menikah'])->default('belum menikah');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('residents');
    }
};