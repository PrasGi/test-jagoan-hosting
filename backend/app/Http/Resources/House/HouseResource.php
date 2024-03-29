<?php

namespace App\Http\Resources\House;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HouseResource extends JsonResource
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
            'name' => $this->name,
            'status' => $this->status,
            'resident' => $this->status == 'dihuni' ? $this->residents : null,
            'resident_histories' => $this->historyResidents,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
