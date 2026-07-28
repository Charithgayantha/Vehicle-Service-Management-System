<?php
require __DIR__ . '/../vendor/autoload.php';

$app = require_once __DIR__ . '/../bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\JobCard;

$jobs = JobCard::with('mechanic')->get();

foreach ($jobs as $j) {
    echo "{$j->id} - " . ($j->mechanic?->name ?? 'Unassigned') . " - scheduled: {$j->scheduled_at}\n";
}

echo "Total: " . $jobs->count() . "\n";
