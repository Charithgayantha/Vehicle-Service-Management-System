<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        <!-- Styles / Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    </head>
    <body class="bg-[#111] text-[#fff] flex p-6 lg:p-8 items-center lg:justify-center min-h-screen flex-col">
        <header class="w-full lg:max-w-4xl max-w-md text-sm mb-6 flex justify-end">
            @if (Route::has('login'))
                <nav class="flex items-center gap-4">
                    @auth
                        <a
                            href="{{ url('/dashboard') }}"
                            class="rounded-md px-3 py-2 text-white ring-1 ring-transparent transition hover:text-white/80 focus:outline-none focus-visible:ring-[#FF2D20]"
                        >
                            Dashboard
                        </a>
                    @else
                        <a
                            href="{{ route('login') }}"
                            class="rounded-md px-3 py-2 text-white ring-1 ring-transparent transition hover:text-white/80 focus:outline-none focus-visible:ring-[#FF2D20]"
                        >
                            Log in
                        </a>

                        @if (Route::has('register'))
                            <a
                                href="{{ route('register') }}"
                                class="rounded-md px-3 py-2 text-white ring-1 ring-transparent transition hover:text-white/80 focus:outline-none focus-visible:ring-[#FF2D20]"
                            >
                                Register
                            </a>
                        @endif
                    @endauth
                </nav>
            @endif
        </header>

        <div class="flex items-center justify-center w-full transition-opacity opacity-100 duration-750 lg:grow">
            <main class="flex max-w-app flex-col-reverse lg:max-w-4xl lg:flex-row">
                <!-- Content / Laragon / Welcome graphics here -->
                <div class="flex flex-col items-center justify-center w-full p-6 bg-[#161615] rounded-lg border border-[#3E3E3A]">
                    <h1 class="text-3xl font-bold mb-4">Vehicle Service System</h1>
                    <p class="text-gray-400 text-center mb-6">Welcome to your application starter dashboard. Click below to access your workspace.</p>
                    <div class="flex gap-4">
                        <a href="{{ route('login') }}" class="bg-red-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-red-500 transition">Get Started</a>
                    </div>
                </div>
            </main>
        </div>
    </body>
</html>