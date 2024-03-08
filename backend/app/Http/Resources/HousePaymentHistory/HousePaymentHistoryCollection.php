<?php

namespace App\Http\Resources\HousePaymentHistory;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class HousePaymentHistoryCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($housePaymentHistory) {
            return new HousePaymentHistoryResource($housePaymentHistory);
        })->toArray();
    }
}
