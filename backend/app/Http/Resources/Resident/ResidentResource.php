<?php

namespace App\Http\Resources\Resident;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResidentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            // 'image_ktp' => env('APP_URL') . '/storage/' . $this->image_ktp,
            'image_ktp' => $this->image_ktp,
            'fullname' => $this->fullname,
            'status_resident' => $this->status_resident,
            'phone_number' => $this->phone_number,
            'status_merried' => $this->status_merried,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
