<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PlanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string|max:100',
            'description' => 'nullable|string|max:1000',
            'cover' => 'required|image',
            'departure' => 'required|string',
            'start_at' => 'required|date',
            'destination' => 'required|string',
            'arrival_at' => 'required|date',
            'members_quantity' => 'required|numeric|min:2'
        ];
    }
}
