<?php

namespace App\Http\Resources\HousePaymentHistory;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HousePaymentHistoryResource extends JsonResource
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
            'resident_id' => $this->resident,
            'house_id' => $this->house,
            'type_payment' => $this->type_payment,
            'type_time_payment' => $this->type_time_payment,
            'amount' => $this->amount,
            'status_payment' => $this->status_payment,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
