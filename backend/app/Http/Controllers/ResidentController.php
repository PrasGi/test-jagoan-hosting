<?php

namespace App\Http\Controllers;

use App\Http\Resources\Resident\ResidentCollection;
use App\Http\Resources\Resident\ResidentResource;
use App\Models\Resident;
use Illuminate\Http\Request;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ResidentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $datas = Resident::all();

        return response()->json([
            'status_code' => 200,
            'message' => 'Success',
            'data' => new ResidentCollection($datas)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $payload = $request->only('image_ktp', 'fullname', 'status_resident', 'phone_number', 'status_merried');
        $validate = Validator::make($payload, [
            'image_ktp' => 'required|mimes:png,jpg,jpeg|max:10000',
            'fullname' => 'required',
            'status_resident' => 'required|in:kontrak,tetap',
            'phone_number' => 'required',
            'status_merried' => 'required|in:sudah menikah,belum menikah'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status_code' => 400,
                'message' => 'Bad Request',
                'errors' => $validate->errors()
            ], 400);
        }

        $payload['image_ktp'] = $request->file('image_ktp')->store('ktp');
        $resident = Resident::create($payload);

        if ($resident) {
            return response()->json([
                'status_code' => 201,
                'message' => 'Data berhasil disimpan',
                'data' => new ResidentResource($resident)
            ], 201);
        }

        return response()->json([
            'status_code' => 500,
            'message' => 'Internal Server Error',
        ], 500);
    }

    /**
     * Display the specified resource.
     */
    public function show(Resident $resident)
    {
        return response()->json([
            'status_code' => 200,
            'message' => 'Success',
            'data' => new ResidentResource($resident)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Resident $resident)
    {
        Log::info($request->all());
        $payload = $request->only('image_ktp', 'fullname', 'status_resident', 'phone_number', 'status_merried');
        $validate = validator::make($payload, [
            'image_ktp' => 'nullable|mimes:png,jpg,jpeg|max:10000',
            'fullname' => 'nullable',
            'status_resident' => 'nullable|in:kontrak,tetap',
            'phone_number' => 'nullable',
            'status_merried' => 'nullable|in:sudah menikah,belum menikah'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status_code' => 400,
                'message' => 'Bad Request',
                'errors' => $validate->errors()
            ], 400);
        }

        if ($request->hasFile('image_ktp')) {
            $payload['image_ktp'] = $request->file('image_ktp')->store('ktp');
        }

        if ($resident->update($payload)) {
            return response()->json([
                'status_code' => 200,
                'message' => 'Data berhasil diupdate',
                'data' => new ResidentResource($resident)
            ]);
        }

        return response()->json([
            'status_code' => 500,
            'message' => 'Internal Server Error'
        ], 500);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Resident $resident)
    {
        if ($resident->delete()) {
            return response()->json([
                'status_code' => 200,
                'message' => 'Data berhasil dihapus'
            ]);
        }

        return response()->json([
            'status_code' => 500,
            'message' => 'Internal Server Error'
        ], 500);
    }
}
