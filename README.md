# 🛠️ AutoTech Hub — Auto Service Center Management System

AutoTech Hub is a full-stack enterprise web application built to streamline auto service center operations. It manages multi-role workflows—from initial appointment scheduling and AI-assisted diagnostics to real-time inventory tracking, job card fulfillment, and automated invoicing.

Built with **Laravel**, **Inertia.js**, **React**, and **Tailwind CSS**.

---

## 🌟 Key Features

### 👥 Role-Based Access Control (RBAC)
* **Admin:** Full system oversight, user management, inventory control, and financial reporting.
* **Manager:** Manages customer records, vehicle profiles, job card creation, and billing.
* **Mechanic:** Specialized workspace to view assigned job cards and update repair statuses.
* **Customer:** Portal to view registered vehicles, active job statuses, and invoice history.

### 📋 Core Operational Workflows
* **Scheduling & Conflict Prevention:** Real-time checking ensures mechanics are not double-booked within overlapping time slots.
* **Transactional Inventory Management:** Completing a job card automatically deducts used spare parts from stock within a database transaction (`DB::transaction()`), locking in historical unit prices.
* **Automated Invoicing:** Sequential invoice generation (`INV-YYYYMMDD-XXXX`) aggregating labor costs and pivot-table parts calculations.
* **Real-Time Analytics Dashboard:** Instant metrics for today's bookings, active jobs, low stock alerts, and daily revenue.

### 🤖 AI Service Advisor ("Smart Diagnose")
* Integrated LLM-assisted diagnostic assistant that processes customer complaint text and returns suggested mechanical issues and recommended replacement parts.

---

## 🛠️ Tech Stack

* **Backend Framework:** Laravel 11/10
* **Frontend Library:** React (via Inertia.js)
* **Styling:** Tailwind CSS
* **Database:** MySQL / PostgreSQL
* **Authorization:** Spatie Laravel-Permission
* **Build Tool:** Vite

---

## 🚀 Quick Start & Installation

Follow these steps to set up the project locally.

### Prerequisites
* **PHP:** `>= 8.2`
* **Composer:** `>= 2.0`
* **Node.js:** `>= 18.0` & **npm**
* **Database:** MySQL / PostgreSQL server running

---

### Step 1: Clone the Repository
```bash
git clone [https://github.com/your-username/autotech-hub.git](https://github.com/your-username/autotech-hub.git)
cd autotech-hub
