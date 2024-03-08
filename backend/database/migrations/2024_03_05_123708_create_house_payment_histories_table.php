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
        Schema::create('house_payment_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('resident_id')->references('id')->on('residents');
            $table->foreignId('house_id')->references('id')->on('houses');
            $table->enum('type_payment', ['iuran kebersihan', 'iuran satpam']);
            $table->enum('type_time_payment', ['bulanan', 'tahunan'])->default('bulanan');
            $table->string('amount');
            $table->boolean('status_payment');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('house_payment_histories');
    }
};
