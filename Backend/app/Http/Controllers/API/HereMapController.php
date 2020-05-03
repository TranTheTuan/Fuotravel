<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class HereMapController extends ApiController
{
    public function discover($lat, $lng, $query, $limit)
    {
        $client = new Client(['base_uri' => 'https://discover.search.hereapi.com/v1/']);
        return $client->get('discover',['query' => [
            'at' => "$lat,$lng",
            'q' => $query,
            'limit' => $limit,
            'apiKey' => config('services.here.key')
        ]]);
    }

    public function geocode($query)
    {
        $client = new Client(['base_uri' => 'https://geocode.search.hereapi.com/v1/']);
        $data = $client->get('geocode', ['query' => [
            'q' => $query,
            'apiKey' => config('services.here.key')
        ]]);
        return $data;
    }

    public function revgeocode($lat, $lng) {
        $client = new Client(['base_uri' => 'https://revgeocode.search.hereapi.com/v1/']);
        $data = $client->get('revgeocode', ['query' => [
            'at' => "$lat,$lng",
            'apiKey' => config('services.here.key')
        ]]);
        return $data;
    }

    public function autosuggest($lat, $lng, $query, $limit) {
        $client = new Client(['base_uri' => 'https://autosuggest.search.hereapi.com/v1/']);
        return $client->get('autosuggest',['query' => [
            'at' => "$lat,$lng",
            'q' => $query,
            'limit' => $limit,
            'apiKey' => config('services.here.key')
        ]]);
    }
}
