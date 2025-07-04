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
        Schema::create('home_section_contents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('home_section_id')->constrained('home_sections')->onDelete('cascade');
            $table->string('headline')->nullable();
            $table->text('description')->nullable();
            $table->string('image')->nullable(); 
            $table->string('title')->nullable(); 
            $table->string('button_text')->nullable();
            $table->string('cta_link')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('home_section_contents');
    }
};