<?php

namespace App\Http\Controllers;

use App\Http\Resources\HousePaymentHistory\HousePaymentHistoryCollection;
use App\Http\Resources\HousePaymentHistory\HousePaymentHistoryResource;
use App\Models\HousePaymentHistory;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HousePaymentHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $datas = HousePaymentHistory::all();

        return response()->json([
            'status' => 'success',
            'message' => 'House payment history data loaded successfully',
            'data' => new HousePaymentHistoryCollection($datas)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $payload = $request->only('resident_id', 'house_id', 'type_payment', 'type_time_payment', 'amount', 'status_payment');
        $validate = Validator::make($payload, [
            'resident_id' => 'required|exists:residents,id',
            'house_id' => 'required|exists:houses,id',
            'type_payment' => 'required|in:iuran kebersihan,iuran satpam',
            'type_time_payment' => 'required|in:bulanan,tahunan',
            'amount' => 'required',
            'status_payment' => 'required'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validate->errors()
            ], 400);
        }

        $payload['status_payment'] = (bool) $payload['status_payment'];
        if ($housePaymentHistory = HousePaymentHistory::create($payload)) {
            return response()->json([
                'status' => 'success',
                'message' => 'House payment history data created successfully',
                'data' => new HousePaymentHistoryResource($housePaymentHistory)
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'House payment history data failed to create'
        ], 500);
    }

    public function changeStatus(HousePaymentHistory $housePaymentHistory)
    {
        $housePaymentHistory->status_payment = !$housePaymentHistory->status_payment;
        if ($housePaymentHistory->save()) {
            return response()->json([
                'status' => 'success',
                'message' => 'House payment history status updated successfully',
                'data' => new HousePaymentHistoryResource($housePaymentHistory)
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'House payment history status failed to update'
        ], 500);
    }

    /**
     * Display the specified resource.
     */
    public function show(HousePaymentHistory $housePaymentHistory)
    {
        return response()->json([
            'status' => 'success',
            'message' => 'House payment history data loaded successfully',
            'data' => new HousePaymentHistoryResource($housePaymentHistory)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HousePaymentHistory $housePaymentHistory)
    {
        $payload = $request->only('resident_id', 'house_id', 'type_payment', 'type_time_payment', 'amount', 'status_payment');
        $validate = Validator::make($payload, [
            'resident_id' => 'nullable|exists:residents,id',
            'house_id' => 'nullable|exists:houses,id',
            'type_payment' => 'nullable|in:iuran kebersihan,iuran satpam',
            'type_time_payment' => 'nullable|in:bulanan,tahunan',
            'amount' => 'nullable',
            'status_payment' => 'nullable|boolean'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validate->errors()
            ], 400);
        }

        if ($housePaymentHistory->update($payload)) {
            return response()->json([
                'status' => 'success',
                'message' => 'House payment history data updated successfully',
                'data' => new HousePaymentHistoryResource($housePaymentHistory)
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'House payment history data failed to update'
        ], 500);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HousePaymentHistory $housePaymentHistory)
    {
        if ($housePaymentHistory->delete()) {
            return response()->json([
                'status' => 'success',
                'message' => 'House payment history data deleted successfully'
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'House payment history data failed to delete'
        ], 500);
    }

    public function yearlySummaryReport(Request $request)
    {
        $year = $request->input('year', date('Y'));

        $monthlySummary = [];

        for ($i = 1; $i <= 12; $i++) {
            $startOfMonth = Carbon::createFromDate($year, $i, 1)->startOfMonth();
            $endOfMonth = Carbon::createFromDate($year, $i, 1)->endOfMonth();

            $data = HousePaymentHistory::whereBetween('created_at', [$startOfMonth, $endOfMonth])->get();

            $totalAmount = $data->sum('amount');

            $monthlySummary[] = [
                'name_month' => Carbon::createFromDate($year, $i, 1)->monthName,
                'total_amount' => $totalAmount
            ];
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Yearly summary report generated successfully',
            'data' => $monthlySummary
        ]);
    }


    public function monthlyDetailReport(Request $request)
    {
        $month = $request->input('month', date('m'));
        $year = $request->input('year', date('Y'));

        $startOfMonth = Carbon::createFromDate($year, $month, 1)->startOfMonth();
        $endOfMonth = Carbon::createFromDate($year, $month, 1)->endOfMonth();

        $datas = HousePaymentHistory::whereBetween('created_at', [$startOfMonth, $endOfMonth])->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Monthly summary report generated successfully',
            'data' => new HousePaymentHistoryCollection($datas)
        ]);
    }
}
