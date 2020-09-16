<?php

use App\Http\Controllers\MapBoxController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// obtener coordenadas de la ciudad
Route::get('/map-box/{city}', [MapBoxController::class,'coordinatesCity']);

// obtener  clima de las ci
Route::get('/weather/{lact}/{long}', [MapBoxController::class,'getWeather']);