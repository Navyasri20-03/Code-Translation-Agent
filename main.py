import os
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from google import genai
import uvicorn
from dotenv import load_dotenv
import mimetypes

# Fix for Windows MIME types
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("application/javascript", ".js")

load_dotenv()

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

class TranslationData(BaseModel):
    source_code: str
    target_language: str

@app.get("/")
def read_root():
    return FileResponse("static/index.html", headers={"Cache-Control": "no-cache"})

@app.post("/api/translate")
def translate_api(data: TranslationData):
    api_key = os.getenv("GEMINI_API_KEY")
    
    if not api_key:
        return {"translated_code": f"// Mock translation to {data.target_language}\n// No GEMINI_API_KEY found in .env"}
        
    try:
        client = genai.Client(api_key=api_key)
        
        prompt = f"Translate the following code to {data.target_language}. Preserve variable names. Return only the code:\n\n{data.source_code}"
                  
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        
        result = response.text.strip()
        
        if result.startswith("```"):
            lines = result.split('\n')
            if len(lines) > 2:
                result = '\n'.join(lines[1:-1])
                
        return {"translated_code": result}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/explain")
def explain_api(data: TranslationData):
    api_key = os.getenv("GEMINI_API_KEY")
    
    if not api_key:
        return {"explanation": f"// Mock explanation for {data.target_language}\n// No GEMINI_API_KEY found in .env"}
        
    try:
        client = genai.Client(api_key=api_key)
        
        prompt = f"Translate the following code to {data.target_language} and provide a detailed explanation of how the translated code works. Explain the logic and any key language-specific features used. IMPORTANT: Provide plain text only. Do NOT use any markdown formatting like ###, **, or ```.\n\nCode:\n{data.source_code}"
                  
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        
        result = response.text.strip()
        return {"explanation": result}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/debug")
def debug_api(data: TranslationData):
    api_key = os.getenv("GEMINI_API_KEY")
    
    if not api_key:
        return {"debug_result": f"// Mock debug result for {data.target_language}\n// No GEMINI_API_KEY found in .env"}
        
    try:
        client = genai.Client(api_key=api_key)
        
        prompt = f"First, check the following code for any errors or bugs. If there are errors, explain what the error is, provide the fixed version of the code, and then translate the fixed code to {data.target_language}. If there are no errors, simply explain the code and then translate it to {data.target_language}. Return your response clearly separated into 'Analysis', 'Fixed Code' (if applicable), and 'Translated Code' sections. IMPORTANT: Provide plain text only. Do NOT use any markdown formatting like ###, **, or ```.\n\nCode:\n{data.source_code}"
                  
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        
        result = response.text.strip()
        return {"debug_result": result}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
