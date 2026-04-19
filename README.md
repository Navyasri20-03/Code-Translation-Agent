# 🚀 Code Translation Agent

A web-based **Code Translation Agent** that converts code from one programming language to another, explains the code, and helps debug errors using AI.

---

## 📌 Features

* 🔄 **Code Translation**
  Convert code between languages (Python, Java, C++, etc.)

* 🧠 **Code Explanation**
  Get a clear explanation of how the code works

* 🐞 **Debugging Support**
  Detect errors and provide corrected code

* 🌐 **Web Interface**
  Simple UI to paste code and get results instantly

* ⚡ **AI Powered**
  Uses Google Gemini API for intelligent processing

---

## 🛠️ Tech Stack

* **Frontend**: HTML, CSS, JavaScript
* **Backend**: FastAPI (Python)
* **AI Model**: Google Gemini API
* **Server**: Uvicorn

---

## 📂 Project Structure

```
code-translation-agent/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/code-translation-agent.git
cd code-translation-agent
```

---

### 2️⃣ Setup backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
```

---

### 3️⃣ Add API Key

Create a `.env` file inside backend:

```
GEMINI_API_KEY=your_api_key_here
```

---

### 4️⃣ Run backend

```bash
uvicorn main:app --reload
```

Server runs at:

```
http://127.0.0.1:8000
```

---

### 5️⃣ Run frontend

```bash
cd ../frontend
python -m http.server 5500
```

Open in browser:

```
http://localhost:5500
```

---

## 📡 API Endpoints

* `POST /api/translate` → Translate code
* `POST /api/explain` → Explain code
* `POST /api/debug` → Debug code

---

## 🧪 Example

Input:

```python
print("Hello")
```

Output (Java):

```java
System.out.println("Hello");
```

---

## ⚠️ Notes

* If API key is not provided, the app returns **mock responses**
* Make sure your API key has **active quota**
* Internet connection is required for AI features

---

## 🎯 Future Enhancements

* 📥 Download translated code
* 🎨 Syntax highlighting (VS Code style)
* 🌍 Support for more programming languages
* 🧾 History of previous translations

---

## 👩‍💻 Author

**Your Name**

---

## ⭐ Acknowledgements

* FastAPI
* Google Gemini AI
* Open-source community

---

## 📜 License

This project is for educational purposes.
