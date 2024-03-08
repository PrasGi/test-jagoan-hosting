<?php

namespace App\Http\Resources\HouseResidentHistory;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HouseResidentHistoryResource extends JsonResource
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
            'resident' => $this->resident,
            'house' => $this->house,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
