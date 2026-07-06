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
