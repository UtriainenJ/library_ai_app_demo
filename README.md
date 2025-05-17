# 📚 Lennu Reads – Library AI Companion Demo

A local demo app combining a **React frontend** and a **Python Flask backend**, designed to interface with the [FINNA API](https://api.finna.fi/). It allows users to search Finnish library materials by keyword, type, and location.

Runs on **LAN**, so you can use it from other devices on the same network.

---

## 🔧 Features

- 🔍 Search Finnish libraries for books and audiobooks via FINNA  
- 🎯 Filter by material type and library location (PIKI, TUNI, Helmet)  
- 🎨 Dark-themed UI (greys and greens)  
- ⚙️ Flask backend handles external API calls   

---

## 📂 Project Structure

    .
    ├── backend/                # Python Flask backend
    │   └── app.py
    ├── frontend/               # React frontend
    │   ├── src/
    │   └── .env                # API base URL config
    ├── frontend/.env.template  # Example .env with setup notes
    └── README.md

---

## ⚙️ Setup Instructions

### 1. Backend (Flask)

    cd backend
    # (Optional but recommended)
    # python -m venv venv
    # source venv/bin/activate     # On Windows: venv\Scripts\activate

    pip install -r requirements.txt
    python app.py

Backend will start at `http://<your-local-ip>:5002`

### 2. Frontend (React)

    cd frontend
    cp .env.template .env
    # Edit .env and set your local IP address (see below)
    npm install
    npm start

Frontend runs at `http://localhost:3000`

---

## 🌐 Access from Other Devices

1. Find your local IP address (e.g., `192.168.x.y`)  
2. Edit `frontend/.env`:

       REACT_APP_API_URL=http://192.168.x.y:5002

3. Start both frontend and backend  
4. Visit `http://192.168.x.y:3000` on any device in the same network  

---

## 🧪 Requirements

- Python 3.7+  
- Node.js 18+  
- Modern browser (Chrome, Firefox, etc.)  

---

## 📝 Notes

- No FINNA API key is required for public queries  
- LAN-only — not set up for public deployment  
