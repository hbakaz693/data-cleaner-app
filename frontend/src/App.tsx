import { useState } from 'react';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [cleaningErrors, setCleaningErrors] = useState<any[]>([]);
  const [cleaningSummary, setCleaningSummary] = useState<any>(null);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [exportFormat, setExportFormat] = useState<string>("csv");

  const handleUpload = async () => {
    if (!file) {
      alert("Veuillez sélectionner un fichier");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setColumns(data.columns || []);
        setRows(data.rows || []);
        setTotalRows(data.total_rows || 0);
        alert(`✅ ${data.message}`);
        setCleaningErrors([]);
        setCleaningSummary(null);
      } else {
        alert(`❌ Erreur: ${data.Error || "Problème lors de l'import"}`);
      }
    } catch (error) {
      alert("❌ Erreur de connexion au serveur");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClean = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/clean", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        if (data.total_errors > 0) {
          setCleaningErrors(data.errors_found);
          setCleaningSummary(data.summary);
          
          let errorMessage = `🧹 Nettoyage terminé !\n`;
          errorMessage += `Lignes supprimées : ${data.summary.rows_removed}\n`;
          errorMessage += `Erreurs trouvées : ${data.total_errors}\n\n`;
          data.errors_found.forEach((error: any, index: number) => {
            errorMessage += `${index + 1}. ${error.message}\n`;
          });
          alert(errorMessage);
        } else {
          alert("✅ Aucune erreur trouvée. Les données sont déjà propres !");
        }

        setColumns(data.columns || []);
        setRows(data.rows || []);
        setTotalRows(data.total_rows_cleaned || 0);
      } else {
        alert(`❌ ${data.Error || "Erreur lors du nettoyage"}`);
      }
    } catch (error) {
      alert("❌ Erreur de connexion au serveur");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/export?format=${exportFormat}`, {
        method: "POST",
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const extension = exportFormat === "csv" ? "csv" : "xlsx";
        a.download = `donnees_exportees.${extension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        setShowExportModal(false);
        alert(`✅ Export en ${exportFormat.toUpperCase()} réussi !`);
      } else {
        const data = await response.json();
        alert(`❌ ${data.Error || "Erreur lors de l'export"}`);
      }
    } catch (error) {
      alert("❌ Erreur de connexion au serveur");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      const response = await fetch("http://localhost:8000/reset", {
        method: "POST",
      });
      const data = await response.json();
      
      setRows([]);
      setColumns([]);
      setTotalRows(0);
      setFile(null);
      setCleaningErrors([]);
      setCleaningSummary(null);
      
      alert(`✅ ${data.message}`);
    } catch (error) {
      alert("❌ Erreur lors de la réinitialisation");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          📊 Page d'accueil - Gestion des données
        </h1>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center hover:border-blue-500 transition">
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) {
                setFile(selectedFile);
              }
            }}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            📂 Importer un fichier Excel ou CSV
          </label>
          {file && (
            <p className="mt-3 text-sm text-gray-600">
              Fichier sélectionné : <span className="font-semibold">{file.name}</span>
            </p>
          )}
          
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="mt-4 ml-4 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "⏳ Upload en cours..." : "📤 Envoyer à l'API"}
          </button>
        </div>

        {totalRows > 0 && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700">
              📊 Total des lignes : <span className="font-bold">{totalRows}</span>
              {cleaningSummary && (
                <>
                  <span className="mx-2">|</span>
                  Lignes supprimées : <span className="font-bold text-red-600">{cleaningSummary.rows_removed}</span>
                  <span className="mx-2">|</span>
                  Erreurs trouvées : <span className="font-bold text-yellow-600">{cleaningErrors.length}</span>
                </>
              )}
            </p>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            📋 Aperçu des données ({rows.length} lignes)
          </h2>
          
          {rows.length > 0 ? (
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                    {columns.map((col, index) => (
                      <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-500">{rowIndex + 1}</td>
                      {columns.map((col, colIndex) => (
                        <td key={colIndex} className="px-6 py-4 text-sm text-gray-900">
                          {row[col] !== undefined && row[col] !== null ? String(row[col]) : "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 bg-gray-50 rounded-lg text-center text-gray-500">
              Aucune donnée à afficher. Importez un fichier !
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleClean}
            disabled={loading || rows.length === 0}
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🧹 Nettoyer les données
          </button>
          
          <button
            onClick={() => setShowExportModal(true)}
            disabled={rows.length === 0}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            📤 Exporter
          </button>
          
          <button
            onClick={handleReset}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition font-medium"
          >
            🔄 Réinitialiser
          </button>
        </div>

        {cleaningErrors.length > 0 && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="font-semibold text-red-700 mb-2">
              ⚠️ Erreurs trouvées lors du nettoyage ({cleaningErrors.length})
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {cleaningErrors.map((error, index) => (
                <li key={index} className="text-sm text-red-600">
                  {error.message}
                </li>
              ))}
            </ul>
          </div>
        )}

        {showExportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                📤 Exporter les données
              </h2>
              
              <p className="text-gray-600 mb-4 text-center">
                Choisissez le format d'exportation :
              </p>
              
              <div className="space-y-4">
                <label className="flex items-center p-4 border-2 rounded-lg hover:border-blue-500 cursor-pointer transition">
                  <input
                    type="radio"
                    name="exportFormat"
                    value="csv"
                    checked={exportFormat === "csv"}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="w-4 h-4 text-blue-500 mr-3"
                  />
                  <div>
                    <span className="font-semibold text-gray-700">CSV</span>
                    <p className="text-sm text-gray-500">Compatible avec Excel et la plupart des outils</p>
                  </div>
                </label>
                
                <label className="flex items-center p-4 border-2 rounded-lg hover:border-blue-500 cursor-pointer transition">
                  <input
                    type="radio"
                    name="exportFormat"
                    value="excel"
                    checked={exportFormat === "excel"}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="w-4 h-4 text-blue-500 mr-3"
                  />
                  <div>
                    <span className="font-semibold text-gray-700">Excel (XLSX)</span>
                    <p className="text-sm text-gray-500">Format Excel avec toutes les fonctionnalités</p>
                  </div>
                </label>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleExport}
                  disabled={loading}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                >
                  {loading ? "⏳ Export..." : "✅ Exporter"}
                </button>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm">
          💡 Astuce : Importez un fichier, nettoyez les données, puis exportez en CSV ou Excel !
        </div>
      </div>
    </div>
  );
}

export default App;
