# Optional:🛠️ AutoTech Hub — Auto Service Center Management System

AutoTech Hub is a full-stack enterprise web application built to streamline auto service center operations. It manages multi-role workflows—from initial appointment scheduling and AI-assisted diagnostics to real-time inventory tracking, job card fulfillment, and automated invoicing.
Built with Laravel, Inertia.js, React, and Tailwind CSS.

# Optional:🌟 Key Features

# Optiona2:👥 Role-Based Access Control (RBAC)
Admin: Full system oversight, user management, inventory control, and financial reporting.
Manager: Manages customer records, vehicle profiles, job card creation, and billing.
Mechanic: Specialized workspace to view assigned job cards and update repair statuses.
Customer: Portal to view registered vehicles, active job statuses, and invoice history.

# Optiona2:📋 Core Operational Workflows
Scheduling & Conflict Prevention: Real-time checking ensures mechanics are not double-booked within overlapping time slots.
Transactional Inventory Management: Completing a job card automatically deducts used spare parts from stock within a database transaction (DB::transaction()), locking in historical unit prices.
Automated Invoicing: Sequential invoice generation (INV-YYYYMMDD-XXXX) aggregating labor costs and pivot-table parts calculations.
Real-Time Analytics Dashboard: Instant metrics for today's bookings, active jobs, low stock alerts, and daily revenue.

# Optiona2:🤖 AI Service Advisor ("Smart Diagnose")
Integrated LLM-assisted diagnostic assistant that processes customer complaint text and returns suggested mechanical issues and recommended replacement parts.

# Optiona2:🛠️ Tech Stack
Backend Framework: Laravel 11/10
Frontend Library: React (via Inertia.js)
Styling: Tailwind CSS
Database: MySQL / PostgreSQL
Authorization: Spatie Laravel-Permission
Build Tool: Vite

# Optiona1:🚀 Quick Start & Installation
Follow these steps to set up the project locally.

Prerequisites
PHP: >= 8.2
Composer: >= 2.0
Node.js: >= 18.0 & npm
Database: MySQL / PostgreSQL server running

Step 1: Clone the Repository
Bash
git clone https://github.com/your-username/autotech-hub.git
cd autotech-hub

Step 2: Install Dependencies
Install PHP dependencies via Composer:

Bash
composer install
Install Frontend dependencies via NPM:

Bash
npm install

Step 3: Environment Setup
Copy the example .env file and generate the application encryption key:

Bash
cp .env.example .env
php artisan key:generate
Configure your database connection inside .env:

Code snippet
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=autotech_hub
DB_USERNAME=root
DB_PASSWORD=

# Optional: Add API key for AI Smart Diagnose feature
GEMINI_API_KEY=your_api_key_here

Step 4: Run Migrations & Seeders
Populate the database with tables, Spatie roles/permissions, and realistic demo data (20+ seeded customers, vehicles, parts, and job cards):

Bash
php artisan migrate:fresh --seed
Step 5: Start the Development Servers
Open two terminal windows/tabs to run the backend and frontend dev servers concurrently:

Terminal 1 (Laravel Server):

Bash
php artisan serve
Terminal 2 (Vite Hot Reloading):

Bash
npm run dev
Visit the application at [http://127.0.0.1:8000](http://127.0.0.1:8000).

# Optiona1:🔑 Demo Access Credentials

The database seeder automatically creates the following demo accounts (Password for all accounts is `password`):

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@autotech.com` | `password123` | Full Access |
| **Manager** | `manager@autotech.com` | `password123` | CRUD Customers, Vehicles, Jobs, Invoices |
| **Mechanic** | `mechanic@autotech.com` | `password123` | View Assigned Jobs, Update Job Status |
| **Customer** | `customer@autotech.com` | `password123` | View Personal Vehicles & Invoices |

### 📂 Project Structure Highlights

```text
autotech-hub/
├── app/
│   ├── Http/
│   │   ├── Controllers/     # DashboardController, CustomerController, JobCardController, etc.
│   │   └── Requests/        # Form Validation Classes
│   ├── Models/              # Eloquent Models (Customer, Vehicle, JobCard, Part, Invoice)
│   ├── Policies/            # Authorization Policies for Models
│   └── Services/            # Service Classes (InvoiceService, InventoryService, AiAssistantService)
├── database/
│   ├── migrations/          # Relational Database Schema
│   └── seeders/             # Database Seeders & Factories
├── resources/js/
│   ├── Components/          # Reusable UI Components (Modals, Tables, Forms)
│   ├── Layouts/             # Authenticated & Guest Layouts
│   └── Pages/               # Inertia React Pages (Customers, Dashboard, Mechanics, etc.)
└── routes/
    └── web.php              # Inertia Web Routes & Middleware Scoping
    
🧪 Testing & Verification
Run the test suite to verify backend routes, database transactions, and authorization rules:

Bash
php artisan test
