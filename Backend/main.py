from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse
import uvicorn
import pandas as pd
import numpy as np
import json
import io
from typing import List, Dict, Any

app = FastAPI(title="API de Gestion de Données", version="1.0.0")

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Variable globale pour stocker les données en mémoire
stored_data = pd.DataFrame()

@app.get("/")
def read_root():
    return {"message": "Bienvenue sur l'API FastAPI 🚀"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    global stored_data
    
    try:
        # Lire le fichier
        if file.filename.endswith('.csv'):
            df = pd.read_csv(file.file)
        elif file.filename.endswith((".xlsx", ".xls")):
            df = pd.read_excel(file.file)
        else:
            return {"Error": "Format non supporté. Utilisez CSV, XLSX ou XLS"}
        
        # Nettoyer les valeurs non-JSON
        df = df.replace([np.nan, np.inf, -np.inf], None)
        
        # Convertir les dates en string
        for col in df.select_dtypes(include=['datetime64']).columns:
            df[col] = df[col].astype(str)
        
        # Stocker les données
        stored_data = df.copy()
        
        # Convertir en dictionnaire
        data = df.head(20).to_dict(orient='records')
        
        return {
            "columns": df.columns.tolist(),
            "rows": data,
            "total_rows": len(df),
            "message": f"Fichier {file.filename} importé avec succès"
        }
        
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"Error": f"Erreur lors du traitement: {str(e)}"}
        )

@app.post("/clean")
async def clean_data():
    global stored_data
    
    try:
        if stored_data.empty:
            return JSONResponse(
                status_code=400,
                content={"Error": "Aucune donnée à nettoyer. Veuillez d'abord importer un fichier."}
            )
        
        df_cleaned = stored_data.copy()
        errors_found = []
        
        # === 1. Supprimer les lignes avec des valeurs manquantes ===
        initial_rows = len(df_cleaned)
        df_cleaned = df_cleaned.dropna()
        rows_after_na = len(df_cleaned)
        
        if initial_rows - rows_after_na > 0:
            errors_found.append({
                "type": "Valeurs manquantes",
                "removed": initial_rows - rows_after_na,
                "message": f"{initial_rows - rows_after_na} lignes supprimées car elles contiennent des valeurs manquantes"
            })
        
        # === 2. Supprimer les doublons ===
        before_duplicates = len(df_cleaned)
        df_cleaned = df_cleaned.drop_duplicates()
        after_duplicates = len(df_cleaned)
        
        if before_duplicates - after_duplicates > 0:
            errors_found.append({
                "type": "Doublons",
                "removed": before_duplicates - after_duplicates,
                "message": f"{before_duplicates - after_duplicates} lignes dupliquées supprimées"
            })
        
        # === 3. Nettoyer les colonnes texte ===
        text_columns = df_cleaned.select_dtypes(include=['object']).columns
        for col in text_columns:
            df_cleaned[col] = df_cleaned[col].str.strip()
            df_cleaned[col] = df_cleaned[col].replace(['', ' ', '  '], None)
        
        # === 4. Supprimer les lignes avec des valeurs aberrantes ===
        numeric_columns = df_cleaned.select_dtypes(include=[np.number]).columns
        for col in numeric_columns:
            Q1 = df_cleaned[col].quantile(0.25)
            Q3 = df_cleaned[col].quantile(0.75)
            IQR = Q3 - Q1
            lower_bound = Q1 - 1.5 * IQR
            upper_bound = Q3 + 1.5 * IQR
            
            outliers = df_cleaned[(df_cleaned[col] < lower_bound) | (df_cleaned[col] > upper_bound)]
            if not outliers.empty:
                errors_found.append({
                    "type": "Valeurs aberrantes",
                    "column": col,
                    "removed": len(outliers),
                    "message": f"{len(outliers)} valeurs aberrantes détectées dans la colonne '{col}'"
                })
                df_cleaned = df_cleaned[~((df_cleaned[col] < lower_bound) | (df_cleaned[col] > upper_bound))]
        
        # === 5. Standardiser les valeurs texte ===
        for col in text_columns:
            if col in df_cleaned.columns:
                if 'nom' in col.lower() or 'name' in col.lower():
                    df_cleaned[col] = df_cleaned[col].str.upper()
                elif 'email' in col.lower():
                    df_cleaned[col] = df_cleaned[col].str.lower()
        
        # === 6. Supprimer les lignes avec des valeurs invalides ===
        for col in numeric_columns:
            if col in df_cleaned.columns:
                if 'age' in col.lower():
                    invalid_ages = df_cleaned[df_cleaned[col] < 0]
                    if not invalid_ages.empty:
                        errors_found.append({
                            "type": "Valeurs invalides",
                            "column": col,
                            "removed": len(invalid_ages),
                            "message": f"{len(invalid_ages)} âges négatifs supprimés"
                        })
                        df_cleaned = df_cleaned[df_cleaned[col] >= 0]
        
        stored_data = df_cleaned.copy()
        
        cleaned_data = df_cleaned.head(20).to_dict(orient='records')
        
        response = {
            "message": "Données nettoyées avec succès",
            "total_rows_cleaned": len(df_cleaned),
            "errors_found": errors_found,
            "total_errors": len(errors_found),
            "columns": df_cleaned.columns.tolist(),
            "rows": cleaned_data,
            "summary": {
                "before_cleaning": len(stored_data),
                "after_cleaning": len(df_cleaned),
                "rows_removed": len(stored_data) - len(df_cleaned)
            }
        }
        
        return response
        
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"Error": f"Erreur lors du nettoyage: {str(e)}"}
        )

@app.post("/export")
async def export_data(format: str = "csv"):
    """
    Exporter les données au format CSV ou Excel
    Paramètres:
    - format: "csv" ou "excel"
    """
    global stored_data
    
    try:
        if stored_data.empty:
            return JSONResponse(
                status_code=400,
                content={"Error": "Aucune donnée à exporter. Veuillez d'abord importer des données."}
            )
        
        # Créer une copie des données
        df_export = stored_data.copy()
        
        # Remplacer None par NaN pour l'export
        df_export = df_export.replace({None: np.nan})
        
        if format.lower() == "csv":
            # Exporter en CSV
            csv_buffer = io.StringIO()
            df_export.to_csv(csv_buffer, index=False, encoding='utf-8-sig')
            csv_buffer.seek(0)
            
            return StreamingResponse(
                csv_buffer,
                media_type="text/csv",
                headers={
                    "Content-Disposition": "attachment; filename=donnees_exportees.csv"
                }
            )
            
        elif format.lower() == "excel":
            # Exporter en Excel
            excel_buffer = io.BytesIO()
            with pd.ExcelWriter(excel_buffer, engine='openpyxl') as writer:
                df_export.to_excel(writer, index=False, sheet_name='Données')
            excel_buffer.seek(0)
            
            return StreamingResponse(
                excel_buffer,
                media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                headers={
                    "Content-Disposition": "attachment; filename=donnees_exportees.xlsx"
                }
            )
        else:
            return JSONResponse(
                status_code=400,
                content={"Error": "Format non supporté. Utilisez 'csv' ou 'excel'"}
            )
            
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"Error": f"Erreur lors de l'export: {str(e)}"}
        )

@app.get("/data")
async def get_data():
    global stored_data
    
    if stored_data.empty:
        return JSONResponse(
            status_code=404,
            content={"message": "Aucune donnée disponible"}
        )
    
    data = stored_data.to_dict(orient='records')
    
    return {
        "columns": stored_data.columns.tolist(),
        "rows": data,
        "total_rows": len(stored_data)
    }

@app.post("/reset")
async def reset_data():
    global stored_data
    stored_data = pd.DataFrame()
    return {"message": "Données réinitialisées avec succès"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)