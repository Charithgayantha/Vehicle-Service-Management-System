<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>AutoTech Hub - Vehicle Service Management System</title>
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    </head>
    <body class="bg-gray-950 text-gray-100 min-h-screen flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
        <!-- Header -->
        <header class="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-gray-900">
            <div class="flex items-center gap-3">
                <div class="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                </div>
                <div>
                    <span class="font-bold tracking-tight text-white block leading-tight text-base">AutoTech Hub</span>
                    <span class="text-[10px] text-zinc-400 font-mono tracking-wider block">VSS System</span>
                </div>
            </div>
            <nav class="flex items-center gap-4">
                @if (Route::has('login'))
                    @auth
                        <a href="{{ url('/dashboard') }}" class="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition">Dashboard</a>
                    @else
                        <a href="{{ route('login') }}" class="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition">Log in</a>
                        @if (Route::has('register'))
                            <a href="{{ route('register') }}" class="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition">Register</a>
                        @endif
                    @endauth
                @endif
            </nav>
        </header>

        <!-- Main Banner -->
        <main class="w-full max-w-5xl mx-auto px-6 py-20 text-center my-auto space-y-8">
            <span class="inline-block bg-indigo-500/10 text-indigo-400 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-indigo-500/20">
                Vehicle Service Management Suite
            </span>
            <h1 class="text-4xl lg:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
                Streamline Your Entire <span class="text-indigo-400">Workshop Flow</span>
            </h1>
            <p class="text-gray-400 text-lg max-w-2xl mx-auto">
                Easily manage customers, vehicle history logs, mechanics, spare parts inventory, and fast invoices in one integrated system.
            </p>
            <div class="flex justify-center gap-4 pt-2">
                @auth
                    <a href="{{ url('/dashboard') }}" class="px-7 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition">Go to Dashboard</a>
                @else
                    <a href="{{ route('login') }}" class="px-7 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition">Sign In</a>
                    <a href="{{ route('register') }}" class="px-7 py-3.5 bg-gray-900 border border-gray-800 text-gray-300 font-semibold rounded-xl hover:bg-gray-800 hover:text-white transition">Create Account</a>
                @endauth
            </div>
        </main>

        <!-- Footer -->
        <footer class="w-full max-w-7xl mx-auto px-6 py-6 text-center text-xs text-gray-500 border-t border-gray-900">
            Vehicle Service Management System &copy; {{ date('Y') }}
        </footer>
    </body>
</html>