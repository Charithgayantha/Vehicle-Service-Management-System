<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AiServiceSummaryController extends Controller
{
    public function generate(Request $request)
    {
        $request->validate([
            'vehicle_model' => 'required|string',
            'performed_services' => 'required|string',
            'parts_replaced' => 'required|string',
        ]);

        return response()->json([
            'job_summary' => "Successfully performed comprehensive maintenance on the {$request->vehicle_model}. Services executed: {$request->performed_services}. Replaced components: {$request->parts_replaced}. All systems inspected, tested, and verified to meet optimal operational standards.",
            'status' => 'Completed Successfully'
        ]);
    }
}