<h1 align="center">🧹 Data Cleaning Application</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" />
  <img src="https://img.shields.io/badge/FastAPI-Backend-green?logo=fastapi" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-38BDF8?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Python-3.11-yellow?logo=python" />
</p>

<p align="center">
  A modern web application for importing, cleaning, validating, previewing, and exporting Excel/CSV datasets.
</p>

---

# 📖 Overview

<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/3094/3094850.png" width="180">
</p>

The **Data Cleaning Application** is a web-based tool that helps users clean and validate datasets before analysis.

Users can:

- 📂 Import Excel or CSV files
- 🔍 Preview data
- 🧹 Detect and clean invalid values
- ⚠️ Display detected errors
- 📊 View cleaning statistics
- 📤 Export cleaned datasets (CSV or Excel)

---

# ✨ Features

<table>
<tr>
<td width="50%">

### 📂 Import
- Excel (.xlsx)
- Excel (.xls)
- CSV

</td>

<td width="50%">

### 🧹 Cleaning
- Remove duplicates
- Handle missing values
- Detect invalid data
- Data validation

</td>
</tr>

<tr>
<td>

### 📊 Visualization
- Preview dataset
- Display total rows
- Cleaning summary
- Error report

</td>

<td>

### 📤 Export
- CSV
- Excel (.xlsx)

</td>
</tr>
</table>

---

# 🛠 Technologies Used

<p align="center">

<img src="https://skillicons.dev/icons?i=react,ts,python,fastapi,tailwind,vite,git,github,vscode" />

</p>

| Technology | Purpose |
|------------|----------|
| ⚛️ React | Frontend |
| 🔷 TypeScript | Type Safety |
| 🚀 FastAPI | Backend API |
| 🐍 Python | Data Processing |
| 🎨 Tailwind CSS | UI Design |
| ⚡ Vite | React Build Tool |
| 📊 Pandas | Data Cleaning |
| 📁 OpenPyXL | Excel Support |



# 🏗 Project Architecture

<pre>
Data-Cleaning-App/
│
├── backend/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── README.md
└── LICENSE
</pre>

---


Backend URL:

<pre>
http://localhost:8000
</pre>



# 🌐 API Endpoints

<table>
<tr>
<th>Method</th>
<th>Endpoint</th>
<th>Description</th>
</tr>

<tr>
<td><b>GET</b></td>
<td>/</td>
<td>Test API connection</td>
</tr>

<tr>
<td><b>POST</b></td>
<td>/upload</td>
<td>Upload an Excel or CSV file</td>
</tr>

<tr>
<td><b>POST</b></td>
<td>/clean</td>
<td>Clean the uploaded dataset</td>
</tr>

<tr>
<td><b>POST</b></td>
<td>/export?format=csv</td>
<td>Export cleaned data as CSV</td>
</tr>

<tr>
<td><b>POST</b></td>
<td>/export?format=excel</td>
<td>Export cleaned data as Excel (.xlsx)</td>
</tr>

<tr>
<td><b>POST</b></td>
<td>/reset</td>
<td>Reset uploaded data</td>
</tr>

</table>



# 📖 How to Use

1. Launch the backend server.
2. Start the frontend application.
3. Upload an Excel or CSV file.
4. Preview the imported dataset.
5. Click **Clean Data** to detect and remove invalid entries.
6. Review the cleaning summary and detected errors.
7. Export the cleaned dataset as CSV or Excel.

---

# 📸 Screenshots

<p align="center">
  <img width="789" height="433" alt="image" src="https://github.com/user-attachments/assets/6532d5c8-865b-46b6-913d-0d1a1f07d63c" />
</p>

<p align="center">
  <img src="images/cleaning.png" width="900" alt="Cleaning Results">
</p>

<p align="center">
  <img src="images/export.png" width="900" alt="Export Data">
</p>

> Save your screenshots inside an **images/** folder at the root of the project.

---

# 🚀 Future Improvements

* User authentication
* Drag & Drop file upload
* Data visualization with charts
* AI-powered data cleaning suggestions
* Support for larger datasets
* Dark mode
* Docker deployment
* Cloud storage integration

---

# 🤝 Contributing

Contributions are welcome!

If you would like to improve this project:

* Fork the repository
* Create a new feature branch
* Commit your changes
* Push your branch
* Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Hicham Bakaz**

* AI & Data Science Student
* Python Developer
* React & FastAPI Developer

<p align="left">
  <a href="https://github.com/your-github-username">
    <img src="https://img.shields.io/badge/GitHub-Profile-black?logo=github">
  </a>

  <a href="https://www.linkedin.com/in/your-linkedin">
    <img src="https://img.shields.io/badge/LinkedIn-Profile-blue?logo=linkedin">
  </a>
</p>
