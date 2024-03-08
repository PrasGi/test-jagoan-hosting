<?php

namespace App\Http\Controllers;

use App\Http\Resources\HouseResidentHistory\HouseResidentHistoryCollection;
use App\Http\Resources\HouseResidentHistory\HouseResidentHistoryResource;
use App\Models\HouseResidentHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HouseResidentHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $datas = HouseResidentHistory::all();

        return response()->json([
            'status_code' => 200,
            'message' => 'Data retrieved successfully',
            'data' => new HouseResidentHistoryCollection($datas)
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $payload = $request->only('resident_id', 'house_id');
        $validate = Validator::make($payload, [
            'resident_id' => 'required|integer|exists:residents,id',
            'house_id' => 'required|integer|exists:houses,id'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status_code' => 400,
                'message' => 'Validation error',
                'errors' => $validate->errors()
            ], 400);
        }

        if ($houseResidentHistory = HouseResidentHistory::create($payload)) {
            return response()->json([
                'status_code' => 201,
                'message' => 'Data created successfully',
                'data' => new HouseResidentHistoryResource($houseResidentHistory)
            ], 201);
        }

        return response()->json([
            'status_code' => 500,
            'message' => 'Internal server error'
        ], 500);
    }

    /**
     * Display the specified resource.
     */
    public function show(HouseResidentHistory $houseResidentHistory)
    {
        return response()->json([
            'status_code' => 200,
            'message' => 'Data retrieved successfully',
            'data' => new HouseResidentHistoryResource($houseResidentHistory)
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HouseResidentHistory $houseResidentHistory)
    {
        $payload = $request->only('resident_id', 'house_id');
        $validate = Validator::make($payload, [
            'resident_id' => 'nullable|integer|exists:residents,id',
            'house_id' => 'nullable|integer|exists:houses,id'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status_code' => 400,
                'message' => 'Validation error',
                'errors' => $validate->errors()
            ], 400);
        }

        if ($houseResidentHistory->update($validate->validated())) {
            return response()->json([
                'status_code' => 200,
                'message' => 'Data updated successfully',
                'data' => new HouseResidentHistoryResource($houseResidentHistory)
            ], 200);
        }

        return response()->json([
            'status_code' => 500,
            'message' => 'Internal server error'
        ], 500);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HouseResidentHistory $houseResidentHistory)
    {
        if ($houseResidentHistory->delete()) {
            return response()->json([
                'status_code' => 200,
                'message' => 'Data deleted successfully'
            ], 200);
        }

        return response()->json([
            'status_code' => 500,
            'message' => 'Internal server error'
        ], 500);
    }
}
