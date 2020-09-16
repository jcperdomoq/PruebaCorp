<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MapBoxController extends Controller
{
    /**
     * coordenadas  de un ciudad
     */
    public function coordinatesCity($city){
        $url = env('URL_MAPBOX').$city.'.json?';
        $token = 'access_token='.env('TOKEN_MAPBOX','orderd');
        return Http::get($url.$token)->json();
    }

    public function getWeather($lact,$long){
        $url = env('URLDARK').$lact.','.$long;
        return Http::get($url)->json();
    }
}
