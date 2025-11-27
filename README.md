# My-Task Dashboard

A responsive **React.js dashboard application** with **role-based task management**, **employee statistics**, and **dark/light theme support**. Built with **Tailwind CSS**, **Redux Toolkit**, and **Recharts** for interactive charts.

---

## Features

- **Role-Based Access**
  - Lead users can assign tasks with due dates to members.
  - Member users can view their tasks and update their status.
  
- **Interactive Charts**
  - Line chart for employee activity trends.
  - Pie chart showing gender distribution.

- **Dark/Light Theme Toggle**
  - Seamless theme switch via Redux state.

- **Task Management**
  - Add new tasks with member assignment and due date.
  - Track task progress and completion.

- **Responsive Layout**
  - Works on desktop and mobile screens.
  - Sidebar and Navbar with modern UI components.

---

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, Recharts
- **State Management:** Redux Toolkit
- **Unique ID Generation:** UUID
- **Icons:** lucide-react

---

## Folder Structure

src/
├─ components/
│ ├─ Navbar.jsx
│ ├─ Sidebar.jsx
│ ├─ TaskForm.jsx
│ ├─ TaskList.jsx
│ └─ StatusSelector.jsx
├─ pages/
│ └─ Dashboard.jsx
├─ redux/
│ └─ slices/
│ ├─ membersSlice.js
│ └─ themeSlice.js
├─ App.jsx
└─ index.jsx

yaml
Copy code

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/my-task-dashboard.git
cd my-task-dashboard
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm run dev
Open http://localhost:5173 to view in the browser.

Usage
Select Role

Use the role dropdown in the Navbar to switch between Lead, Manager, or User roles.

Assign Tasks (Lead Role)

Fill in member, task title, and due date.

Click Assign Task to add a task to a member.

Update Status (Member Role)

Change status via the selector below your profile in the dashboard.

Toggle Theme

Click the moon/sun icon in Navbar to switch between dark and light themes.

Deployment
You can deploy this project to Render, Vercel, or Netlify.

For Vercel:

bash
Copy code
npm run build
# then
vercel deploy
For Render (Static Site):

Connect your GitHub repository.

Select "Static Site" deployment.

Set the build command: npm run build

Set publish directory: dist

Contributing
Fork the repository.

Create a feature branch: git checkout -b feature/my-feature

Commit changes: git commit -m "Add my feature"

Push branch: git push origin feature/my-feature

Open a Pull Request.

License
This project is licensed under the MIT License.

Screenshots

Author
Aman – Final Year B.Tech CSE Student – Specializing in Full-Stack & Data Science

pgsql
Copy code

I can also create a **ready-to-deploy version with screenshots and badges** for GitHub if you want it to look fully professional. Do you want me to do that next?






