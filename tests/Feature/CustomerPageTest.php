<?php

use App\Models\User;

test('authenticated users can visit the customers index page', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('customers.index'));

    $response->assertOk();
});
