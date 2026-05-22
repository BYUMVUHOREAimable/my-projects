<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
{
    // Create a user
    $user = \App\Models\User::create([
        'name' => 'John Doe',
        'email' => 'johndoe@example.com',
        'password' => bcrypt('password'),
    ]);

    // Create a post for the user
    $user->usersCoolPosts()->create([
        'title' => 'First Post',
        'body' => 'This is the body of the first post.',
    ]);
}

}
