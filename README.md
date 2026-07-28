<div align="center">

# 🛠️ AutoTech Hub
### Auto Service Center Management System

**A full-stack enterprise web application built to streamline auto service center operations.**

It manages multi-role workflows — from initial appointment scheduling and AI-assisted diagnostics to real-time inventory tracking, job card fulfillment, and automated invoicing.

[![Laravel](https://img.shields.io/badge/Laravel-11%2F10-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-Inertia.js-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![MySQL](https://img.shields.io/badge/MySQL-PostgreSQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com)

</div>

---

## 🌟 Key Features

### 👥 Role-Based Access Control (RBAC)

| Role | Access Level |
|---|---|
| 🛡️ **Admin** | Full system oversight, user management, inventory control, and financial reporting. |
| 🧾 **Manager** | Manages customer records, vehicle profiles, job card creation, and billing. |
| 🔧 **Mechanic** | Specialized workspace to view assigned job cards and update repair statuses. |
| 🚗 **Customer** | Portal to view registered vehicles, active job statuses, and invoice history. |

### 📋 Core Operational Workflows

- **📅 Scheduling & Conflict Prevention** — Real-time checking ensures mechanics are not double-booked within overlapping time slots.
- **📦 Transactional Inventory Management** — Completing a job card automatically deducts used spare parts from stock within a database transaction (`DB::transaction()`), locking in historical unit prices.
- **🧮 Automated Invoicing** — Sequential invoice generation (`INV-YYYYMMDD-XXXX`) aggregating labor costs and pivot-table parts calculations.
- **📊 Real-Time Analytics Dashboard** — Instant metrics for today's bookings, active jobs, low stock alerts, and daily revenue.

### 🤖 AI Service Advisor ("Smart Diagnose")

Integrated LLM-assisted diagnostic assistant that processes customer complaint text and returns suggested mechanical issues and recommended replacement parts.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend Framework** | Laravel 11/10 |
| **Frontend Library** | React (via Inertia.js) |
| **Styling** | Tailwind CSS |
| **Database** | MySQL / PostgreSQL |
| **Authorization** | Spatie Laravel-Permission |
| **Build Tool** | Vite |

---

## 🚀 Quick Start & Installation

Follow these steps to set up the project locally.

### ✅ Prerequisites

- **PHP:** >= 8.2
- **Composer:** >= 2.0
- **Node.js:** >= 18.0 & npm
- **Database:** MySQL / PostgreSQL server running

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/autotech-hub.git
cd autotech-hub
```

### Step 2: Install Dependencies

Install PHP dependencies via Composer:

```bash
composer install
```

Install Frontend dependencies via NPM:

```bash
npm install
```

### Step 3: Environment Setup

Copy the example `.env` file and generate the application encryption key:

```bash
cp .env.example .env
php artisan key:generate
```

Configure your database connection inside `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=autotech_hub
DB_USERNAME=root
DB_PASSWORD=

# Optional: Add API key for AI Smart Diagnose feature
GEMINI_API_KEY=your_api_key_here
```

### Step 4: Run Migrations & Seeders

Populate the database with tables, Spatie roles/permissions, and realistic demo data (20+ seeded customers, vehicles, parts, and job cards):

```bash
php artisan migrate:fresh --seed
```

### Step 5: Start the Development Servers

Open two terminal windows/tabs to run the backend and frontend dev servers concurrently:

**Terminal 1 (Laravel Server):**

```bash
php artisan serve
```

**Terminal 2 (Vite Hot Reloading):**

```bash
npm run dev
```

Visit the application at **[http://127.0.0.1:8000](http://127.0.0.1:8000)**.

---

## 🔑 Demo Access Credentials

The database seeder automatically creates the following demo accounts (**Password for all accounts is `password123`**):

| Role | Email | Password | Access Level |
|---|---|---|---|
| 🛡️ **Admin** | `Admin@gmail.com` | `password123` | Full Access |
| 🧾 **Manager** | `Manager@gmail.com` | `password123` | CRUD Customers, Vehicles, Jobs, Invoices |
| 🔧 **Mechanic** | `Mechanic@gmail.comm` | `password123` | View Assigned Jobs, Update Job Status |
| 🚗 **Customer** | `Customer@gmail.com` | `password123` | View Personal Vehicles & Invoices |

---

## 📂 Project Structure Highlights

```
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
```

---

## 🧪 Testing & Verification

Run the test suite to verify backend routes, database transactions, and authorization rules:

```bash
php artisan test
```

---

<div align="center">

https://github.com/Charithgayantha/Vehicle-Service-Management-System/issues/2#issue-4985196059
</div>
