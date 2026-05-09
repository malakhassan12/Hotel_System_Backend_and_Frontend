# 🏨 Hotel Management System

A scalable, modern **Hotel Management System** built using **Spring Boot Microservices Architecture**.
The system is designed to manage hotel operations efficiently with support for multiple user roles: **Customer**, **Receptionist**, and **Admin**.

---

# 📖 Overview

This system provides a complete solution for hotel booking, room management, payment handling, and system monitoring.
It follows best practices in **Software Engineering**, including:

* Microservices Architecture
* RESTful APIs
* Role-Based Access Control (RBAC)
* Aspect-Oriented Programming (AOP)
* Dockerized Deployment

---

# 👥 User Roles & Features

## 👤 Customer

The Customer is the main user of the system and can:

* Register and login (Sign-in / Signup)
* Browse all available rooms based on:

  * Availability
  * Price
  * Time (date filtering)
* View detailed room information
* Book rooms and proceed to check-in
* Enter booking details during check-in
* Choose payment type:

  * Online payment (before booking)
  * Cash (after booking)
* Add rooms to favorites
* View all bookings with full details and timestamps
* Perform checkout at any time
* Submit reviews after checkout

---

## 🧑‍💼 Receptionist

The Receptionist manages daily operations and customer interactions:

* View booking and check-in requests in dashboard
* Accept or reject booking requests
* Monitor room availability
* Update room status:

  * Available
  * Booked
  * Maintenance
* Handle customer booking updates (accept/reject)
* Manage payments for "pay after booking"
* Generate and send invoices
* Perform check-in and check-out operations

---

## 👨‍💻 Admin

The Admin is the **Superuser** with full system control:

### 📊 Dashboard & Analytics

* Occupancy Rate
* Revenue Tracking (daily / monthly)
* User Activity Monitoring
* Customer Reviews

### ⚙️ System Management

* Manage rooms (Add / Update / Delete)
* Manage users (Customers & Receptionists)
* Assign roles and permissions

### 🔍 Monitoring & Control

* Monitor system logs using AOP
* Track user actions (who did what and when)
* Handle system errors and exceptions
* Monitor system performance

---

# 🧩 Core Functional Modules

The system is divided into the following main modules:

* **User Management**
* **Room Management**
* **Booking Management**
* **Payment Management**
* **Review Management**

---

# 🏗️ System Architecture

* Microservices-based architecture
* Each service is independently deployable
* Communication via REST APIs
* API Gateway for routing
* Centralized authentication service

### Example Services:

* User Service
* Room Service
* Booking Service
* Payment Service
* Review Service

---

# 🔐 Security

* JWT-based Authentication
* Role-Based Authorization (Admin / Receptionist / Customer)
* Secure API endpoints
* Input validation and error handling

---

# ⚙️ Aspect-Oriented Programming (AOP)

AOP is used to handle cross-cutting concerns:

* Logging all system activities
* Tracking user actions
* Global exception handling
* Security checks before accessing sensitive APIs

---

# 🎨 Frontend Structure

## Customer Pages

* Authentication (Sign-in / Sign-up)
* Rooms Listing (Home)
* Room Details
* Booking (Check-in)
* My Bookings
* Favorites
* Checkout
* Review

## Receptionist Pages

* Dashboard
* Booking Requests
* Rooms Management
* Check-in
* Check-out
* Payments Management

## Admin Pages

* Dashboard (Analytics)
* Users Management
* Rooms Management
* Employees Management
* Logs Page (AOP)
* Reviews Page

## Shared Pages

* Navbar / Sidebar
* Profile Page
* Notifications
* Error Pages (404 / 500)

---

# 🧾 Key Pages Description

## Check-in Page

* Booking details
* Customer information
* Status tracking
* Confirm / Reject actions

## Check-out Page

* Booking summary
* Invoice breakdown
* Payment status
* Checkout confirmation

## Payments Page

* Payments table
* Payment status tracking
* Payment methods (Cash / Online)
* Invoice generation

---

# 🗄️ Database

Relational database design (MySQL / PostgreSQL) including:

* Users
* Rooms
* Bookings
* Payments
* Reviews

---

# 🐳 Deployment

* Fully Dockerized system
* Docker Compose for multi-service setup
* Easy deployment and scalability

---

# 📄 Documentation

The project includes full Software Engineering documentation:

* SRS (Software Requirements Specification)
* Use Case Diagram
* Class Diagram
* Sequence Diagram
* Activity Diagram
* ERD

---

# 🚀 Technologies

* Backend: Spring Boot
* Frontend: (React / Angular / etc.)
* Database: MySQL / PostgreSQL
* Security: JWT
* Architecture: Microservices
* DevOps: Docker

---

# 📌 Final Notes

* The system is designed for scalability, maintainability, and performance
* Follows clean architecture principles
* Implements real-world hotel workflows
* Suitable for academic and production-level projects
