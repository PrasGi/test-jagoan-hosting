<?php

namespace App\Http\Controllers;

use App\Http\Resources\House\HouseCollection;
use App\Http\Resources\House\HouseResource;
use App\Models\House;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HouseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $datas = House::all();

        return response()->json([
            'status_code' => 200,
            'message' => 'Data berhasil diambil',
            'data' => new HouseCollection($datas)
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $payload = $request->only('name', 'status');
        $validate = Validator::make($payload, [
            'name' => 'required|string',
            'status' => 'required|in:dihuni,tidak dihuni'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status_code' => 400,
                'message' => 'Data tidak valid',
                'errors' => $validate->errors()
            ], 400);
        }

        if ($house = House::create($payload)) {
            return response()->json([
                'status_code' => 201,
                'message' => 'Data berhasil ditambahkan',
                'data' => new HouseResource($house)
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
    public function show(House $house)
    {
        return response()->json([
            'status_code' => 200,
            'message' => 'Data berhasil diambil',
            'data' => new HouseResource($house)
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, House $house)
    {
        $payload = $request->only('name', 'status');
        $validate = Validator::make($payload, [
            'name' => 'nullable|string',
            'status' => 'nullable|in:dihuni,tidak dihuni'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status_code' => 400,
                'message' => 'Data tidak valid',
                'errors' => $validate->errors()
            ], 400);
        }

        if ($house->update($payload)) {
            return response()->json([
                'status_code' => 200,
                'message' => 'Data berhasil diubah',
                'data' => new HouseResource($house)
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
    public function destroy(House $house)
    {
        if ($house->delete()) {
            return response()->json([
                'status_code' => 200,
                'message' => 'Data berhasil dihapus'
            ], 200);
        }

        return response()->json([
            'status_code' => 500,
            'message' => 'Internal server error'
        ], 500);
    }
}
