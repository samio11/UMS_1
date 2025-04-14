# 🎓 University Management System (UMS)

A robust university management system built with **Node.js**, **Express**, **MongoDB (Mongoose)** — designed to handle user roles, dynamic student/faculty/admin management, and semester-based validation.

---
![uni1](https://github.com/user-attachments/assets/553f4ea7-0762-44ac-8723-e91950c81905)

## 🚀 Features

- **User-Role Based Creation**  
  🔒 A `student`, `faculty`, or `admin` can't be created directly.  
  ➡️ First, a `user` must be created, then assigned a specific role (`student`, `faculty`, `admin`) through a controlled flow.

- **Transaction Handling**  
  ✅ Used `mongoose.session()` transactions to ensure rollback in case of errors during user-role assignment.  
  (For example — if one part of the creation fails, everything rolls back safely.)

- **Custom Generated ID**  
  🔢 Automatically generates custom IDs for users based on role and context.

- **Semester Validation**  
  📆 Each semester has:
  - **Valid Codes:**
    - `Autumn` → `01`
    - `Summer` → `02`
    - `Fall`   → `03`
  - **Uniqueness:**  
    A year (e.g. `2025`) cannot have multiple instances of the same semester (`Autumn`, `Fall`, or `Summer`).


![Screenshot (581)](https://github.com/user-attachments/assets/6a4a793f-aac5-45f3-ad7b-c32d4f9cd232)

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- TypeScript (optional, depending on your next plan!)
- REST API Structure

---

## 📌 Getting Started

### Clone the repository:
```bash
git clone https://github.com/samio11/UMS_1.git
cd UMS_1
