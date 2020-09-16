<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class DarkSkyController extends Controller
{
    public function getWeather($lact,$long){
        $url = env('URLDARK').$lact.','.$long;
        return Http::get($url)->json();
    }
}
