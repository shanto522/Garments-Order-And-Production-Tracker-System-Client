### Project Name : Garments Order & Production Tracker System

📌 Project Purpose

1.The Garments Order & Production Tracker System is a web-based platform designed to help small and medium-sized garment factories manage orders, production stages, inventory, and delivery tracking efficiently.
The system supports Customer, Manager, and Admin roles with proper access control.

🌐 Live Site

Live URL: https://garments-order-tracker-client.web.app

🔗 Repository Links

1.Client Repository: 

2.Server Repository: 

🚀 Key Features
🔐 Authentication & Security

1.Email & Password Authentication using Firebase

2.Google or GitHub Login (Customer role, status: pending)

3.JWT authentication with token stored in cookies

4.Protected private routes

5.Firebase and MongoDB credentials secured using environment variables

🧭 Layout

1.Navbar (Before Login): Home, All Products, About Us, Contact, Login, Register

2.Navbar (After Login): Home, All Products, Dashboard, User Avatar, Logout

3.Dynamic main section based on routes

4.Footer with logo, description, copyright, and useful links

🏠 Home Page

1.Hero section with call-to-action

2.Our Products section (6 products from MongoDB, Show on Home enabled)

3.How It Works (step-by-step)

4.Customer Feedback carousel

5.Two additional custom sections

🛍️ All Products Page

1.3-column responsive grid layout

2.Product image, name, category, price, available quantity

3.View Details button redirects to Product Details page

📦 Product Details Page (Private Route)

1.Product images / demo video

2.Product details (name, description, category, price, quantity, MOQ)

3.Payment options

4.Order / Booking button (role & account status based)

🧾 Booking / Order System

1.Email (read-only, auto-filled)

2.Product title (read-only)

3.Price & payment info (read-only)

4.Order quantity validation (MOQ & stock limit)

5.Auto-calculated total price

6.Delivery address & additional notes

7.Orders saved to database

8.Customer Dashboard → My Orders

📊 Order Tracking

1.Timeline-based production tracking

2.Production steps:

i.Cutting

ii.Sewing

iii.Finishing

iv.QC

v.Packed

vi.Shipped / Out for Delivery

3.Interactive map using Leaflet

4.Read-only access for customers

📊 Dashboards
👑 Admin Dashboard

1.Manage Users (search, filter, pagination)

2.Update user roles (Customer / Manager)

3.Suspend users with reason & feedback

4.All Products (Show on Home toggle)

5.All Orders with status filter

🧑‍💼 Manager Dashboard

Add Product

1.Manage own products

2.Pending Orders

3.Approve / Reject orders

4.Add tracking updates

5.View approved orders

6.If Manager is Suspended:

i.Cannot add products

ii.Cannot approve or reject orders

iii.Can view suspend feedback

🧑 Customer Dashboard

1.My Orders

2.Track Order

3.My Profile

4.If Customer is Suspended:

i.Cannot place new orders

ii.Existing orders remain visible

iii.Suspend feedback visible on profile

✨ Additional Features

1.Loading spinner during API calls

2.Toast / SweetAlert notifications

3.Dynamic page titles

4.Fully responsive UI

5.404 Not Found page

🛠️ Technologies Used

### Frontend

1.React

2.React Router

3.Tailwind CSS & DaisyUI

4.Firebase Authentication

5.TanStack React Query

6.React Hook Form

7.Framer Motion

### Backend

1.Node.js

2.Express.js

3.MongoDB

4.JWT Authentication

5.Firebase Admin SDK

📦 NPM Packages Used

react, react-router, react-hook-form, firebase, axios,
@tanstack/react-query, framer-motion, sweetalert2,
react-hot-toast, leaflet, tailwindcss, daisyui

🚀 Deployment Checklist

1.Server running without CORS / 404 / 504 errors

2.Private routes persist on page reload

3.Firebase domain authorized

4.Environment variables properly configured
