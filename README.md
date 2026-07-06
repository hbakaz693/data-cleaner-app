<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Data Cleaner App</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 font-sans antialiased">
    <div class="max-w-6xl mx-auto px-4 py-12">

        <!-- HEADER -->
        <div class="text-center mb-12">
            <div class="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                🚀 Version 1.0
            </div>
            <h1 class="text-5xl font-extrabold text-gray-900 mb-4">
                📊 Data Cleaner App
            </h1>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                Application de gestion et nettoyage de données avec <strong>React</strong> + <strong>FastAPI</strong>
            </p>
        </div>

        <!-- BADGES STACK -->
        <div class="flex flex-wrap justify-center gap-3 mb-12">
            <span class="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">⚛️ React</span>
            <span class="bg-cyan-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">🎨 Tailwind CSS</span>
            <span class="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">🐍 FastAPI</span>
            <span class="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">📦 No Database</span>
        </div>

        <!-- FONCTIONNALITÉS -->
        <div class="mb-12">
            <h2 class="text-3xl font-bold text-gray-800 text-center mb-8">✨ Fonctionnalités</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Card 1 -->
                <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 text-center border border-gray-100">
                    <div class="text-5xl mb-4">📂</div>
                    <h3 class="text-xl font-semibold text-gray-800">Import CSV/Excel</h3>
                    <p class="text-gray-500 text-sm mt-2">Importez vos fichiers avec une interface intuitive</p>
                </div>
                <!-- Card 2 -->
                <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 text-center border border-gray-100">
                    <div class="text-5xl mb-4">🧹</div>
                    <h3 class="text-xl font-semibold text-gray-800">Nettoyage Automatique</h3>
                    <p class="text-gray-500 text-sm mt-2">Détection et correction des erreurs en un clic</p>
                </div>
                <!-- Card 3 -->
                <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 text-center border border-gray-100">
                    <div class="text-5xl mb-4">📋</div>
                    <h3 class="text-xl font-semibold text-gray-800">Aperçu des Données</h3>
                    <p class="text-gray-500 text-sm mt-2">Visualisation interactive en temps réel</p>
                </div>
                <!-- Card 4 -->
                <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 text-center border border-gray-100">
                    <div class="text-5xl mb-4">📤</div>
                    <h3 class="text-xl font-semibold text-gray-800">Export CSV/Excel</h3>
                    <p class="text-gray-500 text-sm mt-2">Téléchargez vos données nettoyées au format souhaité</p>
                </div>
                <!-- Card 5 -->
                <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 text-center border border-gray-100">
                    <div class="text-5xl mb-4">🔄</div>
                    <h3 class="text-xl font-semibold text-gray-800">Réinitialisation</h3>
                    <p class="text-gray-500 text-sm mt-2">Remettez à zéro en toute simplicité</p>
                </div>
                <!-- Card 6 -->
                <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 text-center border border-gray-100">
                    <div class="text-5xl mb-4">⚡</div>
                    <h3 class="text-xl font-semibold text-gray-800">Performance</h3>
                    <p class="text-gray-500 text-sm mt-2">Traitement rapide avec stockage en mémoire</p>
                </div>
            </div>
        </div>

        <!-- SEPARATEUR -->
        <div class="border-t border-gray-200 my-10"></div>

        <!-- AVANT / APRÈS (Images factices) -->
        <div class="mb-12">
            <h2 class="text-3xl font-bold text-gray-800 text-center mb-8">🖼️ Aperçu de l'Application</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Avant -->
                <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                    <div class="bg-gray-100 px-6 py-3 border-b border-gray-200">
                        <span class="font-semibold text-gray-700">📋 Import des données</span>
                    </div>
                    <div class="p-6">
                        <div class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50">
                            <div class="text-5xl mb-3">📂</div>
                            <p class="text-gray-500 font-medium">Glissez ou sélectionnez un fichier</p>
                            <div class="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg text-sm">Choisir un fichier</div>
                        </div>
                        <div class="mt-4 flex gap-2">
                            <div class="flex-1 bg-gray-200 h-2 rounded-full"></div>
                            <div class="flex-1 bg-gray-200 h-2 rounded-full"></div>
                            <div class="flex-1 bg-gray-200 h-2 rounded-full"></div>
                            <div class="flex-1 bg-gray-200 h-2 rounded-full"></div>
                        </div>
                        <p class="text-xs text-gray-400 mt-2 text-center">Exemple : données avant nettoyage</p>
                    </div>
                </div>

                <!-- Après -->
                <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-green-200 shadow-green-100">
                    <div class="bg-green-50 px-6 py-3 border-b border-green-200">
                        <span class="font-semibold text-green-700">✅ Données nettoyées</span>
                    </div>
                    <div class="p-6">
                        <div class="bg-green-50 rounded-xl p-4">
                            <div class="flex justify-between items-center border-b border-green-200 pb-2 mb-2">
                                <span class="text-xs font-bold text-gray-500">ID</span>
                                <span class="text-xs font-bold text-gray-500">Nom</span>
                                <span class="text-xs font-bold text-gray-500">Email</span>
                                <span class="text-xs font-bold text-gray-500">Âge</span>
                            </div>
                            <div class="flex justify-between items-center text-sm py-1">
                                <span>1</span>
                                <span>Dupont</span>
                                <span>dupont@email.com</span>
                                <span>32</span>
                            </div>
                            <div class="flex justify-between items-center text-sm py-1 bg-white/50 rounded">
                                <span>2</span>
                                <span>Martin</span>
                                <span>martin@email.com</span>
                                <span>28</span>
                            </div>
                            <div class="flex justify-between items-center text-sm py-1">
                                <span>3</span>
                                <span>Bernard</span>
                                <span>bernard@email.com</span>
                                <span>45</span>
                            </div>
                        </div>
                        <div class="mt-4 flex gap-2">
                            <div class="flex-1 bg-green-400 h-2 rounded-full"></div>
                            <div class="flex-1 bg-green-400 h-2 rounded-full"></div>
                            <div class="flex-1 bg-green-400 h-2 rounded-full"></div>
                            <div class="flex-1 bg-green-400 h-2 rounded-full"></div>
                        </div>
                        <p class="text-xs text-green-600 mt-2 text-center font-medium">✓ Données nettoyées et prêtes à exporter</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- SEPARATEUR -->
        <div class="border-t border-gray-200 my-10"></div>

        <!-- INSTALLATION RAPIDE -->
        <div class="bg-gray-900 rounded-2xl p-8 text-white mb-10">
            <h2 class="text-2xl font-bold mb-4">⚡ Installation Rapide</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <p class="text-gray-400 text-sm mb-2">🔧 Backend (FastAPI)</p>
                    <div class="bg-gray-800 rounded-lg p-3 text-sm font-mono text-green-400">
                        cd backend<br />
                        python -m venv venv<br />
                        source venv/bin/activate<br />
                        pip install -r requirements.txt<br />
                        python main.py
                    </div>
                </div>
                <div>
                    <p class="text-gray-400 text-sm mb-2">💻 Frontend (React)</p>
                    <div class="bg-gray-800 rounded-lg p-3 text-sm font-mono text-blue-400">
                        cd frontend<br />
                        npm install<br />
                        npm run dev
                    </div>
                </div>
            </div>
        </div>

        <!-- FOOTER -->
        <div class="text-center text-sm text-gray-500 border-t border-gray-200 pt-8">
            <p>© 2024 Data Cleaner App — Construit avec ❤️ en React + FastAPI</p>
            <p class="mt-1 text-xs text-gray-400">Licence MIT — Open Source</p>
        </div>

    </div>
</body>
</html>
