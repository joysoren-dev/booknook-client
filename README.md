# 📚 BookNook – A Small Online Library

**BookNook** is a modern, responsive full-stack online library management application where readers can explore diverse genres, borrow books, manage their personal borrows, and contribute their own titles to the collective catalog.

---

## 🌐 Live Application & Repositories

- **Live URL:** [https://booknook-client-gamma.vercel.app/](https://booknook-client-gamma.vercel.app/)
- **Client Repository:** [https://github.com/joysoren-dev/booknook-client](https://github.com/joysoren-dev/booknook-client)
- **Server Repository:** [https://github.com/joysoren-dev/booknook-server](https://github.com/joysoren-dev/booknook-server)

---

## ✨ Key Features

- **Interactive Book Exploration & Filtering:** Browse the complete book catalog with real-time title/author searching, category-based filtering, and stock availability toggles.
- **Dynamic Swiper Carousel & Latest Arrivals:** Features an engaging hero banner powered by Swiper.js and a dynamically rendered "New Arrivals" showcase presenting the 6 latest added books.
- **Role-Aware Authentication System:** Secure email/password login and Google OAuth integration powered by BetterAuth with automatic private route protection and redirection.
- **Real-Time Borrow & Return Flow:** Registered users can borrow books with automated quantity updates, prevention of duplicate active borrows, and smooth returns via the personal dashboard.
- **User Contribution & Catalog Management:** Authenticated readers can add new books, update existing book details, and safely delete contributed books using custom confirmation modals.
- **Intuitive UX & Instant Feedback:** Fully responsive mobile-friendly interface built with Tailwind CSS, custom loading spinners, custom 404 error page, and instant toast notifications for all CRUD actions.

---

## 🛠️ Technology Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, React Icons, Swiper.js, React Hot Toast, Axios
- **Authentication:** BetterAuth, MongoDB Adapter
- **Backend API:** Node.js, Express.js, JSON Web Tokens (JWT)
- **Database:** MongoDB Native Driver
- **Deployment:** Vercel (Client & Server)

---

## 🚀 Getting Started Locally

### 1. Clone the repository
git clone [https://github.com/joysoren-dev/booknook-client.git](https://github.com/joysoren-dev/booknook-client.git)
cd booknook-client

### 2. Install dependencies
npm install

### 3. Setup environment variables
Create a `.env.local` file in the root directory:
NEXT_PUBLIC_API_URL=http://localhost:5000
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000

### 4. Run the development server
npm run dev

Open http://localhost:3000 in your browser to explore the project.
