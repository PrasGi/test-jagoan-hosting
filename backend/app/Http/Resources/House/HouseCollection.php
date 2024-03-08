<?php

namespace App\Http\Resources\House;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class HouseCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($house) {
            return new HouseResource($house);
        })->toArray();
    }
}