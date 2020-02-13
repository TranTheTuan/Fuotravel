<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    /**
     * @param $data
     * @param int $httpStatusCode
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendResponse($data, $httpStatusCode = 200)
    {
        $response = [
            'data' => $data,
            'status' => $httpStatusCode
        ];

        return response()->json($response, $httpStatusCode);
    }

    /**
     * @param $error
     * @param int $httpStatusCode
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendError($error, $httpStatusCode = 400)
    {
        $response = [
            'message' => $error,
            'status' => $httpStatusCode
        ];

        return response()->json($response, $httpStatusCode);
    }
}
