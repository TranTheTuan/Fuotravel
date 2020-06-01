<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class HereMapController extends ApiController
{
    public function discover(Request $request)
    {
        $data = $request->all();
        $client = new Client(['base_uri' => 'https://discover.search.hereapi.com/v1/']);
        return $client->get('discover',['query' => [
            'at' => $data['lat'].','.$data['lng'],
            'q' => $data['query'],
            'limit' => $data['limit'],
            'apiKey' => config('services.here.key')
        ]]);
    }

    public function geocode(Request $request)
    {
        $data = $request->all();
        $client = new Client(['base_uri' => 'https://geocode.search.hereapi.com/v1/']);
        return $client->get('geocode', ['query' => [
            'q' => $data['query'],
            'apiKey' => config('services.here.key')
        ]]);
    }

    public function revgeocode(Request $request)
    {
        $data = $request->all();
        $client = new Client(['base_uri' => 'https://revgeocode.search.hereapi.com/v1/']);
        return $client->get('revgeocode', ['query' => [
            'at' => $data['lat'].','.$data['lng'],
            'apiKey' => config('services.here.key')
        ]]);
    }

    public function autosuggest(Request $request)
    {
        $data = $request->all();
        $client = new Client(['base_uri' => 'https://autosuggest.search.hereapi.com/v1/']);
        return $client->get('autosuggest',['query' => [
            'at' => $data['lat'].','.$data['lng'],
            'q' => $data['query'],
            'limit' => $data['limit'],
            'apiKey' => config('services.here.key')
        ]]);
    }

    public function calculate(Request $request)
    {
        $data = $request->f;
        $dat = $request->s;
        $xml =['headers'=>['Content-Type' => 'text/xml; charset=UTF8'],
            'body' =>
            `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
      xmlns:us="http://soa.com/soap/calculator">
          <soapenv:Header>

      </soapenv:Header>
      <soapenv:Body>
      <us:getSumRequest>
      <us:firstNumber>${data}</us:firstNumber>
      <us:secondNumber>${dat}</us:secondNumber>
      </us:getSumRequest>
      </soapenv:Body>

      </soapenv:Envelope>
        `];
        $client = new Client();
        return $client->request('POST',
            'http://localhost:8080/ws/', $xml);
    }
}
