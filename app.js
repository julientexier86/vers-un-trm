/**
 * DHG MANAGER V2 - Version Finale
 */

const PRESETS = {
    'college': {
        levels: [
            { level: "6ème", students: 0, div: 0, target: 28.0 },
            { level: "5ème", students: 0, div: 0, target: 29.0 },
            { level: "4ème", students: 0, div: 0, target: 29.0 },
            { level: "3ème", students: 0, div: 0, target: 29.0 }
        ],
        subjects: {
            "Français": {"6ème":4.5,"5ème":4.5,"4ème":4.5,"3ème":4}, "Maths": {"6ème":4.5,"5ème":3.5,"4ème":3.5,"3ème":3.5},
            "Hist-Géo": {"6ème":3,"5ème":3,"4ème":3,"3ème":3.5}, "LV1 Anglais": {"6ème":4,"5ème":3,"4ème":3,"3ème":3},
            "LV2 Espagnol": {"6ème":0,"5ème":2.5,"4ème":2.5,"3ème":2.5}, "SVT": {"6ème":2,"5ème":1.5,"4ème":1.5,"3ème":1.5},
            "Phys-Chi": {"6ème":2,"5ème":1.5,"4ème":1.5,"3ème":1.5}, "Techno": {"6ème":0,"5ème":1.5,"4ème":1.5,"3ème":1.5},
            "EPS": {"6ème":4,"5ème":3,"4ème":3,"3ème":3}, "Arts Plast.": {"6ème":1,"5ème":1,"4ème":1,"3ème":1},
            "Education Musicale": {"6ème":1,"5ème":1,"4ème":1,"3ème":1}, 
            "Autonomie EPLE": { "6ème": 0, "5ème": 0, "4ème": 0, "3ème": 0 },
            "UNSS": { "6ème": 0, "5ème": 0, "4ème": 0, "3ème": 0 }
        }
    },
    'lgt': {
        levels: [
            { level: "2nde", students: 0, div: 0, target: 29.0 },
            { level: "1ère", students: 0, div: 0, target: 28.0 },
            { level: "Terminale", students: 0, div: 0, target: 28.0 }
        ],
        subjects: {
            "Français": {"2nde":4, "1ère":4, "Terminale":0}, "Philosophie": {"2nde":0, "1ère":0, "Terminale":4},
            "Hist-Géo": {"2nde":3, "1ère":3, "Terminale":3}, "LVA": {"2nde":3, "1ère":2.5, "Terminale":2},
            "LVB": {"2nde":2.5, "1ère":2, "Terminale":2}, "SES": {"2nde":1.5, "1ère":0, "Terminale":0},
            "Maths (TC)": {"2nde":4, "1ère":0, "Terminale":0}, "Phys-Chi (TC)": {"2nde":3, "1ère":0, "Terminale":0},
            "SVT (TC)": {"2nde":1.5, "1ère":0, "Terminale":0}, "EPS": {"2nde":2, "1ère":2, "Terminale":2},
            "Ens. Scientifique": {"2nde":0, "1ère":2, "Terminale":2}, "EMC": {"2nde":0.5, "1ère":0.5, "Terminale":0.5},
            "Autonomie EPLE": { "2nde": 0, "1ère": 0, "Terminale": 0 },
            "UNSS": { "2nde": 0, "1ère": 0, "Terminale": 0 }
        }
    },
    'lp': {
        levels: [{ level: "2nde BacPro", students: 0, div: 0, target: 30.0 }],
        subjects: { 
            "Lettres-Hist": {"2nde BacPro": 4}, "Maths-Sciences": {"2nde BacPro": 4}, "EPS": {"2nde BacPro": 2}, 
            "Autonomie EPLE": { "2nde BacPro": 0 }, "UNSS": { "2nde BacPro": 0 }
        }
    }
};

const SUBJECT_MAPPING = {
    // Lettres & Langues
    "LET MODERN": "Français", "LET CLASS": "Français", "FRANCAIS": "Français", "LETTRES MODERNES": "Français",
    "LITT.  MODERNES": "Français", "LITT. CLASSIQUES": "Français",
    "ANGLAIS": "LV1 Anglais", "ESPAGNOL": "LV2 Espagnol", 
    "ALLEMAND": "LV2 Allemand", "ITALIEN": "LV2 Italien",
    "ANGLAIS LCE": "LV1 Anglais", "LANGUE ET LITTERATURE ANGLAISE": "LV1 Anglais",
    "LATIN": "LCA Latin", "GREC": "LCA Grec",
    
    // Sciences
    "MATHEMATIQ": "Maths", "MATHEMATIQUES": "Maths", "MATHS": "Maths",
    "S. V. T.": "SVT", "SC. VIE TERRE": "SVT", "SVT": "SVT",
    "PHY.CHIMIE": "Phys-Chi", "PHYSIQUE-CHIMIE": "Phys-Chi", "SC. PHYSIQUES": "Phys-Chi",
    "TECHNOLOGI": "Techno", "TECHNOLOGIE": "Techno", "TECHNO": "Techno",
    "MATHS-SCIENCES": "Maths-Sciences",
    
    // Humanités & Arts
    "HIST. GEO.": "Hist-Géo", "HISTOIRE-GEOGRAPHIE": "Hist-Géo", "HISTOIRE-GEO": "Hist-Géo",
    "ARTS PLAST": "Arts Plast.", "ARTS PLASTIQUES": "Arts Plast.",
    "EDU MUSICA": "Education Musicale", "EDUCATION MUSICALE": "Education Musicale", "MUSIQUE": "Education Musicale",
    
    // Sport & Autres
    "E. P. S": "EPS", "EPS": "EPS", "ED. PHYS. SPORT.": "EPS",
    "DOCUMENTA": "Documentation", "DOCUMENTATION": "Documentation"
};

// --- FONCTION CORRECTIVE POUR LES NOMS DE CLASSES ---
// --- NOUVELLE FONCTION DE PRÉFIXE (ANTI-CONFLIT TST2S) ---
function getLevelPrefix(name) {
    if (!name) return "";
    
    // 1. Si le nom COMMENCE par un chiffre (ex: "2nde", "6ème")
    // On prend juste ce chiffre.
    if (/^[0-9]/.test(name)) {
        return name.match(/^[0-9]+/)[0];
    }
    
    // 2. Sinon (ex: "TST2S", "BTS", "UPE2A")
    // On prend les 3 premiers caractères en majuscules.
    // TST2S deviendra "TST" (et non plus "2")
    return name.substring(0, 3).toUpperCase();
}

// --- FONCTION MAÎTRESSE : GÉNÈRE TOUS LES PRÉFIXES UNIQUES ---
function getAllUniquePrefixes() {
    const uniquePrefixes = [];
    const usedRegistry = {};

    DATA.structure.forEach(lvl => {
        // 1. On calcule le préfixe de base (ex: "1")
        let p = getLevelPrefix(lvl.level);
        
        // 2. S'il est déjà pris, on cherche une variante (ex: "12", "13", "14")
        if (usedRegistry[p]) {
            let suffix = 2;
            let candidate = p + suffix;
            while (usedRegistry[candidate]) {
                suffix++;
                candidate = p + suffix;
            }
            p = candidate;
        }
        
        // 3. On valide ce préfixe
        usedRegistry[p] = true;
        uniquePrefixes.push(p);
    });
    
    // Retourne la liste des préfixes dans l'ordre des niveaux
    // Ex: ["6", "5", "4", "3", "2", "1", "12", "T"]
    return uniquePrefixes;
}

let DATA = null;
let chartInstance = null;
let showRhCodes = false;


// --- SYSTEME UNDO / REDO ---
let undoStack = [];
let redoStack = [];
const MAX_STACK_SIZE = 50;

function pushState() {
    if (!DATA) return;
    const state = JSON.stringify(DATA);
    if (undoStack.length > 0 && undoStack[undoStack.length - 1] === state) {
        return;
    }
    undoStack.push(state);
    if (undoStack.length > MAX_STACK_SIZE) {
        undoStack.shift();
    }
    redoStack = []; // Reset redo stack on new action
    updateUndoRedoButtons();
}

function undo() {
    if (undoStack.length <= 1) return;
    const currentState = undoStack.pop();
    redoStack.push(currentState);
    const prevState = undoStack[undoStack.length - 1];
    DATA = JSON.parse(prevState);
    localStorage.setItem('DHG_Data_V9', prevState);
    updateAllAfterStateChange();
    updateUndoRedoButtons();
}

function redo() {
    if (redoStack.length === 0) return;
    const nextState = redoStack.pop();
    undoStack.push(nextState);
    DATA = JSON.parse(nextState);
    localStorage.setItem('DHG_Data_V9', nextState);
    updateAllAfterStateChange();
    updateUndoRedoButtons();
}

function updateUndoRedoButtons() {
    const btnUndo = document.getElementById('btn-undo');
    const btnRedo = document.getElementById('btn-redo');
    if (btnUndo) btnUndo.disabled = (undoStack.length <= 1);
    if (btnRedo) btnRedo.disabled = (redoStack.length === 0);
}

function updateAllAfterStateChange() {
    if (typeof calculateNeeds === 'function') calculateNeeds();
    if (typeof renderStructure === 'function') renderStructure();
    if (typeof renderGridSystem === 'function') renderGridSystem();
    if (typeof renderRH === 'function') renderRH();
    if (typeof renderSubjectsConfig === 'function') renderSubjectsConfig();
    if (typeof calculateRecap === 'function') calculateRecap();
    if (typeof renderScenariosTable === 'function') renderScenariosTable();
    if (typeof calculateBudget === 'function') calculateBudget();
    if (typeof renderDiagnosticTable === 'function') renderDiagnosticTable();
    if (typeof renderPPSummaryTable === 'function') renderPPSummaryTable();
    if (typeof calculateRoomsOccupancy === 'function') calculateRoomsOccupancy();
    if (typeof runStressTest === 'function') runStressTest(document.getElementById('stress-test-input')?.value || -10);
        calculateBudget();
        renderDiagnosticTable();
    
    // Refresh active section specifically
    const activeSection = document.querySelector('.section.active');
    if (activeSection) {
        const id = activeSection.id;
        if (id === 'dashboard' && typeof drawDashboardChart === 'function') {
            drawDashboardChart();
        } else if (id === 'ventilation' && typeof renderGridSystem === 'function') {
            renderGridSystem();
        } else if (id === 'pilotage' && typeof renderRHDisc === 'function') {
            renderRHDisc();
        } else if (id === 'professeurs' && typeof renderRH === 'function') {
            renderRH();
        } else if (id === 'equipes' && typeof renderTeams === 'function') {
            renderTeams();
        } else if (id === 'repartition' && typeof renderRepartition === 'function') {
            renderRepartition();
        } else if (id === 'recap' && typeof calculateRecap === 'function') {
            calculateRecap();
        } else if (id === 'matieres' && typeof renderSubjectsConfig === 'function') {
            renderSubjectsConfig();
        } else if (id === 'eds' && typeof renderEDS === 'function') {
            renderEDS();
        }
    }
}

// --- GESTION DU THEME SOMBRE ---
function initTheme() {
    const savedTheme = localStorage.getItem('DHG_Theme') || 'light';
    const btn = document.getElementById('theme-toggle-btn');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (btn) btn.innerHTML = '☀️ Mode Clair';
    } else {
        document.body.classList.remove('dark-mode');
        if (btn) btn.innerHTML = '🌓 Mode Sombre';
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('DHG_Theme', isDark ? 'dark' : 'light');
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.innerHTML = isDark ? '☀️ Mode Clair' : '🌓 Mode Sombre';
}

window.onload = function() {
    // Tentative de récupération de la sauvegarde
    if(localStorage.getItem('DHG_Data_V9')) {
        try { DATA = JSON.parse(localStorage.getItem('DHG_Data_V9')); } catch(e) {}
    }
    
    if(DATA) {
        // Vérification des structures de données existantes
        if(!DATA.subjectMeta) DATA.subjectMeta = {};

        // --- AJOUT SPÉCIFIQUE POUR LE MENU ÉQUIPES ---
        // Initialise le stockage des affectations profs/classes si inexistant
        if(!DATA.assignments) DATA.assignments = {}; 
        // ---------------------------------------------

        // Initialisation des modes par défaut pour les matières (si manquant)
        DATA.subjects.forEach(s => {
            if(!DATA.subjectMeta[s]) DATA.subjectMeta[s] = {};
            if(!DATA.subjectMeta[s].mode) {
                DATA.subjectMeta[s].mode = 'div';
                DATA.subjectMeta[s].levels = getDefaultActiveLevels(s);
                DATA.subjectMeta[s].etab = 0;
                DATA.subjectMeta[s].volLevel = {};
            }
        });
        checkAndFixData();
        // Masquer l'écran d'accueil et lancer l'interface
        document.getElementById('setup-overlay').style.display = 'none';
        initYearSelector();
        initUI();
        initTheme();
        pushState();
        renderScenariosTable();
        calculateBudget();
        renderDiagnosticTable();
        calculateRoomsOccupancy();
        runStressTest(document.getElementById('stress-test-input')?.value || -10);
    } else {
        // Pas de données : Afficher l'écran de configuration
        document.getElementById('setup-overlay').style.display = 'flex';
        initTheme();
    }
};

function getDefaultActiveLevels(s) {
    if(!DATA || !DATA.structure) return [];
    let all = DATA.structure.map(l => l.level);
    if(s.includes("Techno") || s.includes("Espagnol") || s.includes("LV2")) {
        return all.filter(l => !l.includes("6"));
    }
    if(s.includes("Philosophie")) {
        return all.filter(l => l.toLowerCase().includes("term"));
    }
    return all;
}

function initData(type) {
    const preset = PRESETS[type];
    const currentYear = new Date().getFullYear();
    DATA = {
        type: type,
        config: { year: currentYear, total: 0, hp: 0, hsa: 0 },
        structure: JSON.parse(JSON.stringify(preset.levels)),
        additionalMeans: { total: 0 },
        subjects: Object.keys(preset.subjects),
        subjectMeta: {},
        levelConfig: {},
        classOverrides: {},
        classNames: {}, 
        teachers: [],
        recapComments: {},
        assignments: {},
        // NOUVEAU : Stockage des EDS
        eds: {
            premiere: [],
            terminale: []
        }
    };
    
    DATA.subjects.forEach(s => {
        DATA.subjectMeta[s] = {
            mode: 'div',
            levels: getDefaultActiveLevels(s),
            etab: 0,
            volLevel: {},
            parent: "",
            code: ""
        };
        
        if(s.includes("Latin") || s.includes("LCA")) DATA.subjectMeta[s].parent = "Français";
        
        if(s === "UNSS") {
            DATA.subjectMeta[s].mode = 'etab';
            DATA.subjectMeta[s].etab = 3;
            DATA.subjectMeta[s].parent = "EPS";
        }
    });

    DATA.structure.forEach(lvl => {
        DATA.levelConfig[lvl.level] = {};
        DATA.subjects.forEach(s => {
            const hrs = preset.subjects[s]?.[lvl.level] || 0;
            DATA.levelConfig[lvl.level][s] = {base: hrs, marge: 0, coef: 1.0};
        });
    });
    
    saveData();
    document.getElementById('setup-overlay').style.display = 'none';
    initYearSelector();
    initUI();
}

function changeEpleType() {
    if(confirm("⚠️ Attention : Changer de type d'établissement va réinitialiser les données actuelles.\n\nAvez-vous pensé à sauvegarder ?\n\nConfirmer le changement ?")) {
        localStorage.removeItem('DHG_Data_V9');
        location.reload();
    }
}

function initYearSelector() {
    const select = document.getElementById('dash-year');
    const yNow = new Date().getFullYear();
    const saved = DATA.config.year || yNow;
    select.innerHTML = '';
    for(let y = saved - 1; y <= saved + 5; y++) { let opt = new Option(y, y); if(y == saved) opt.selected = true; select.appendChild(opt); }
}

function initUI() {
    document.getElementById('global-dhg-display').innerText = DATA.config.total;
    document.getElementById('global-hp').value = DATA.config.hp;
    document.getElementById('global-hsa').value = DATA.config.hsa;
    if(!DATA.classNames) DATA.classNames = {}; 
    renderStructure(); renderGridSystem(); renderRH(); calculateRecap();
    renderSubjectsConfig();
}

function nav(id, btn) {
    // Blocage si EDS cliqué en mode collège
    if(id === 'eds' && DATA.type === 'college') {
        alert("Ce module est réservé aux structures Lycée (EDS/Spécialités).");
        return;
    }

    document.querySelectorAll('.section').forEach(el => el.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    
    document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));
    if(btn) btn.classList.add('active');
    
    if(id === 'dashboard') { calculateRecap(); drawDashboardChart(); }
    else if(id === 'ventilation') renderGridSystem();
    else if(id === 'pilotage') renderRHDisc();
    else if(id === 'professeurs') renderRH();
    else if(id === 'equipes') renderTeams();
	else if(id === 'repartition') renderRepartition(); 
    else if(id === 'recap') calculateRecap();
    else if(id === 'matieres') renderSubjectsConfig();
    else if(id === 'eds') renderEDS();
}

function drawDashboardChart() {
    const canvas = document.getElementById('dhgChart');
    if(!canvas || canvas.offsetParent === null) return; 

    const totN = parseFloat(document.getElementById('dash-conso').innerText) || 0;
    const glo = parseFloat(document.getElementById('dash-total-dhg').innerText) || 0;
    const solde = glo - totN;

    const ctx = canvas.getContext('2d');
    if(chartInstance) chartInstance.destroy();
    
    chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Consommé', 'Dispo', 'Déficit'],
            datasets: [{
                data: [
                    Math.min(totN, glo), 
                    Math.max(0, solde), 
                    solde < 0 ? Math.abs(solde) : 0
                ],
                backgroundColor: ['#3498db', '#2ecc71', '#e74c3c']
            }]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false,
            animation: { duration: 500 }
        }
    });
}

function addNewLevel() {
    const name = prompt("Nom du niveau (ex: BTS 1) ?");
    if(!name) return;
    if(DATA.structure.some(l => l.level === name)) { alert("Existe déjà !"); return; }
    DATA.structure.push({ level: name, students: 0, div: 0, target: 29.0 });
    DATA.levelConfig[name] = {};
    DATA.subjects.forEach(s => DATA.levelConfig[name][s] = {base:0, marge:0, coef:1.0});
    saveData(); renderStructure(); renderGridSystem();
}
function renameLevel(idx) {
    const lvl = DATA.structure[idx];
    const oldName = lvl.level;
    
    const newName = prompt("Renommer " + oldName + " en :", oldName);
    if (!newName || newName === oldName) return;

    // 1. On calcule les préfixes AVANT et APRÈS le changement
    // (Nécessite la fonction getLevelPrefix ajoutée précédemment)
    const oldPrefix = getLevelPrefix(oldName); 
    const newPrefix = getLevelPrefix(newName);

    // 2. "Geler" les noms actuels des classes
    // Si une classe s'appelle "6A" par défaut, on enregistre "6A" comme nom fixe.
    // Ainsi, même si le code interne devient "N6A", l'affichage restera "6A".
    if (!DATA.classNames) DATA.classNames = {};
    for (let i = 0; i < lvl.div; i++) {
        const oldId = `${oldPrefix}${String.fromCharCode(65 + i)}`;
        // Si aucun nom personnalisé n'existe, on force le nom actuel
        if (!DATA.classNames[oldId]) {
            DATA.classNames[oldId] = oldId;
        }
    }

    // 3. Appliquer le nouveau nom au niveau
    lvl.level = newName;

    // 4. Migrer la configuration du niveau (Matières)
    if (DATA.levelConfig[oldName]) {
        DATA.levelConfig[newName] = JSON.parse(JSON.stringify(DATA.levelConfig[oldName]));
        delete DATA.levelConfig[oldName];
    }
    
    // Mettre à jour les références dans les Méta-données des matières (si utilisé en mode "niveau")
    DATA.subjects.forEach(s => {
        if (DATA.subjectMeta[s].levels && DATA.subjectMeta[s].levels.includes(oldName)) {
            const i = DATA.subjectMeta[s].levels.indexOf(oldName);
            DATA.subjectMeta[s].levels[i] = newName;
        }
        if (DATA.subjectMeta[s].volLevel && DATA.subjectMeta[s].volLevel[oldName]) {
            DATA.subjectMeta[s].volLevel[newName] = DATA.subjectMeta[s].volLevel[oldName];
            delete DATA.subjectMeta[s].volLevel[oldName];
        }
    });

    // 5. MIGRATION DES CLASSES (Noms & Heures personnalisées)
    // On doit déplacer les données de l'ancien ID (ex: "6A") vers le nouvel ID (ex: "N6A")
    // tout en gardant le nom d'affichage "6A".
    
    if (oldPrefix !== newPrefix) {
        // Migration des noms de classes
        const newClassNames = { ...DATA.classNames };
        Object.keys(DATA.classNames).forEach(key => {
            if (key.startsWith(oldPrefix)) {
                // On crée la nouvelle clé (ex: remplace '6' par 'N6' au début)
                // Attention : on utilise une regex pour ne remplacer que le début
                const newKey = key.replace(new RegExp('^' + oldPrefix), newPrefix);
                newClassNames[newKey] = DATA.classNames[key]; // On garde la valeur (le nom affiché)
                delete newClassNames[key]; // On supprime l'ancienne clé
            }
        });
        DATA.classNames = newClassNames;

        // Migration des surcharges horaires (Overrides)
        if (DATA.classOverrides) {
            const newOverrides = { ...DATA.classOverrides };
            Object.keys(DATA.classOverrides).forEach(key => {
                if (key.startsWith(oldPrefix)) {
                    const newKey = key.replace(new RegExp('^' + oldPrefix), newPrefix);
                    newOverrides[newKey] = DATA.classOverrides[key];
                    delete newOverrides[key];
                }
            });
            DATA.classOverrides = newOverrides;
        }
        
        // Migration des affectations Professeurs (Équipes Pédagogiques)
        if (DATA.assignments) {
            const newAssignments = { ...DATA.assignments };
            Object.keys(DATA.assignments).forEach(key => {
                // key est sous forme "CLASSE_PROFINDEX" (ex: "6A_12")
                const parts = key.split('_');
                const cId = parts[0];
                if (cId.startsWith(oldPrefix)) {
                    const newCId = cId.replace(new RegExp('^' + oldPrefix), newPrefix);
                    const newKey = `${newCId}_${parts[1]}`;
                    newAssignments[newKey] = DATA.assignments[key];
                    delete newAssignments[key];
                }
            });
            DATA.assignments = newAssignments;
        }
    }

    saveData();
    renderStructure();
    renderGridSystem();
    renderSubjectsConfig();
    // Rafraîchir les onglets si nécessaire
    if (document.getElementById('equipes').classList.contains('active')) renderTeams();
}
function deleteLevel(idx) {
    const lvlName = DATA.structure[idx].level;
    if(confirm(`Supprimer le niveau "${lvlName}" ?`)) {
        DATA.structure.splice(idx, 1);
        delete DATA.levelConfig[lvlName];
        saveData(); renderStructure(); renderGridSystem();
    }
}

function renderStructure() {
    const tbody = document.getElementById('structure-body');
    tbody.innerHTML = '';
    let totEleves = 0, totDiv = 0, totHeures = 0;
    
    // ON RÉCUPÈRE LES PRÉFIXES UNIQUES ICI
    const allPrefixes = getAllUniquePrefixes();

    DATA.structure.forEach((lvl, idx) => {
        const besoin = lvl.div * lvl.target;
        totEleves += lvl.students; totDiv += lvl.div; totHeures += besoin;
        
        const avg = lvl.div > 0 ? (lvl.students / lvl.div) : 0;
        const threshold = getThresholdLimit(lvl.level, DATA.type);
        let alertHTML = '';
        if (avg > threshold) {
            alertHTML = `<span style="background:var(--danger); color:white; padding:2px 6px; border-radius:10px; font-size:0.75rem; margin-left:6px;" title="Seuil dépassé (${threshold} max)">⚠️ Dépassement (${threshold} max)</span>`;
        } else if (lvl.div > 0 && avg >= threshold - 2) {
            alertHTML = `<span style="background:var(--accent); color:white; padding:2px 6px; border-radius:10px; font-size:0.75rem; margin-left:6px;" title="Seuil proche (${threshold} max)">⚠️ Proche seuil</span>`;
        }

        tbody.innerHTML += `<tr>
            <td><b>${lvl.level}</b></td>
            <td><input type="number" value="${lvl.students}" onchange="updStruct(${idx},'students',this.value)"></td>
            <td><input type="number" value="${lvl.div}" onchange="updStruct(${idx},'div',this.value)"></td>
            <td>${lvl.div>0 ? avg.toFixed(1) : 0}${alertHTML}</td>
            <td><input type="number" value="${lvl.target}" step="0.5" style="background:#fffbe6; font-weight:bold; text-align:center;" onchange="updStruct(${idx},'target',this.value)"></td>
            <td style="font-weight:bold; color:var(--primary)">${besoin.toFixed(1)} h</td>
            <td>
                <div style="display:flex; gap:5px; justify-content:center;">
                    <button class="btn-sm btn-warning" onclick="renameLevel(${idx})">✏️</button>
                    <button class="btn-sm btn-danger" onclick="deleteLevel(${idx})">🗑️</button>
                </div>
            </td>
        </tr>`;
    });

    if(!DATA.additionalMeans) DATA.additionalMeans = { total: 0 };
    const suppTotal = parseFloat(DATA.additionalMeans.total || 0);
    totHeures += suppTotal;

    tbody.innerHTML += `
    <tr class="row-supp">
        <td colspan="4" style="text-align:right; font-weight:bold; font-style:italic;">
            Moyens supplémentaires :
        </td>
        <td>
            <div class="supp-label-group">
                <input type="number" class="input-supp" value="${suppTotal}" onchange="updSupp(this.value)">
            </div>
        </td>
        <td style="font-weight:bold;">${suppTotal.toFixed(1)} h</td>
        <td></td>
    </tr>
    `;

    const moyGen = totDiv > 0 ? (totEleves / totDiv).toFixed(1) : 0;
    tbody.innerHTML += `<tr class="structure-total-row"><td>TOTAL GÉNÉRAL</td><td>${totEleves}</td><td>${totDiv}</td><td>${moyGen}</td><td style="text-align:right;">Total Moyens :</td><td style="color:#f1c40f;">${totHeures.toFixed(1)} h</td><td></td></tr>`;
    
    // Génération des badges classes en bas de page
    const c = document.getElementById('class-list-container'); c.innerHTML = '';
    
    DATA.structure.forEach((lvl, idx) => {
        // ON UTILISE L'INDEX POUR RÉCUPÉRER LE BON PRÉFIXE UNIQUE
        const prefix = allPrefixes[idx];
        
        for(let i=0; i<lvl.div; i++) {
            const defId = `${prefix}${String.fromCharCode(65+i)}`;
            const displayName = DATA.classNames && DATA.classNames[defId] ? DATA.classNames[defId] : defId;
            c.innerHTML += `<span style="background:var(--secondary); color:white; padding:4px 8px; border-radius:4px; font-size:0.8rem;">${displayName}</span>`;
        }
    });

    DATA.config.total = totHeures;
    const dbTotal = document.getElementById('dash-total-dhg');
    if(dbTotal) dbTotal.innerText = totHeures;
    const dbDisplay = document.getElementById('global-dhg-display');
    if(dbDisplay) dbDisplay.innerText = totHeures;
    
    saveData();
}
function updStruct(i,f,v) { DATA.structure[i][f] = parseFloat(v); if(f==='div') generateClasses(false); saveData(); renderStructure(); }
function updSupp(val) { if(!DATA.additionalMeans) DATA.additionalMeans = { total: 0 }; DATA.additionalMeans.total = parseFloat(val) || 0; saveData(); renderStructure(); }
function generateClasses(conf) {
    // Si on clique sur le bouton "Régénérer", on force le reset (avec confirmation)
    if(conf) {
        if(!confirm("⚠️ Attention : Cela va réinitialiser les noms des classes.\nContinuer ?")) return;
        DATA.classNames = {};
    }

    // Sécurité si l'objet n'existe pas
    if(!DATA.classNames) DATA.classNames = {};
    
    // 1. On récupère les préfixes
    const allPrefixes = getAllUniquePrefixes();
    
    // 2. On parcourt la structure pour AJOUTER ou GARDER les classes
    DATA.structure.forEach((lvl, idx) => {
        const prefix = allPrefixes[idx];
        
        for(let i=0; i<lvl.div; i++) {
            const id = `${prefix}${String.fromCharCode(65+i)}`; // Ex: 12A
            
            // LA CORRECTION EST ICI : 
            // Si le nom n'existe pas, on le crée. 
            // S'il existe déjà (ex: "6ème SEGPA"), on ne le touche pas !
            if (!DATA.classNames[id]) {
                DATA.classNames[id] = id;
            }
        }
    });
    
    // (Optionnel) Nettoyage : On peut supprimer les classes qui seraient "hors limite" 
    // si tu réduis le nombre de divisions (ex: passage de 6 à 5 classes), 
    // mais le plus important est de ne pas écraser les existantes.
    
    saveData();
    renderStructure();
    renderGridSystem();
}

function calculateNeeds() {
    let n = {}; 
    DATA.subjects.forEach(s => n[s] = 0);
    
    DATA.subjects.forEach(s => {
        const meta = DATA.subjectMeta[s] || { mode: 'div', levels: [] };
        
        // --- CORRECTIF ANTI-DOUBLON ---
        // Si c'est un EDS, son besoin est géré par le forfait global, donc ici c'est 0.
        if (meta.isEds) return; 
        // ------------------------------

        // 1. MODE DIVISION
        if(meta.mode === 'div') {
            DATA.structure.forEach(lvl => {
                if(meta.levels && meta.levels.includes(lvl.level)) {
                    const prefix = getLevelPrefix(lvl.level);
                    const cfg = DATA.levelConfig[lvl.level][s] || {base:0, marge:0, coef:1.0};
                    const coef = cfg.coef || 1.0;
                    const hours = (cfg.base||0) + (cfg.marge||0);
                    
                    for(let i=0; i<lvl.div; i++) {
                        const c = `${prefix}${String.fromCharCode(65+i)}`;
                        if (DATA.classOverrides[c] && DATA.classOverrides[c][s]) {
                            const ov = DATA.classOverrides[c][s];
                            n[s] += ((ov.base||0) + (ov.marge||0)) * coef;
                        } else { 
                            n[s] += hours * coef; 
                        }
                    }
                }
            });
        }
        // 2. MODE NIVEAU
        else if (meta.mode === 'level') {
            DATA.structure.forEach(lvl => {
                const val = meta.volLevel ? parseFloat(meta.volLevel[lvl.level] || 0) : 0;
                n[s] += val;
            });
        }
        // 3. MODE ÉTABLISSEMENT
        else if (meta.mode === 'etab') {
            n[s] += (parseFloat(meta.etab) || 0);
        }
    });
    return n;
}

function renderGridSystem() {
    const tabs = document.getElementById('grid-tabs');
    tabs.innerHTML = DATA.structure.map((l,i) => `<div class="tab ${i===0?'active':''}" onclick="changeTab(this, ${i})">${l.level}</div>`).join('');
    
    tabs.innerHTML += `<div class="tab global-tab" onclick="changeTab(this, -1)">🌍 Vue Globale</div>`;
    
    const activeIdx = window.lastActiveGridTab !== undefined ? window.lastActiveGridTab : 0;
    if(activeIdx === -1) {
        const t = tabs.querySelector('.global-tab');
        if(t) { t.classList.add('active'); renderGlobalGrid(); }
    } else {
        const t = tabs.children[activeIdx];
        if(t) { t.classList.add('active'); renderLevelGrid(activeIdx); }
    }
	updateGridCounter();
}

function changeTab(el, idx) {
    document.querySelectorAll('#grid-tabs .tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    window.lastActiveGridTab = idx;
    if(idx === -1) renderGlobalGrid();
    else renderLevelGrid(idx);
}

function renameClass(originalId) {
    if(!DATA.classNames) DATA.classNames = {};
    const currentName = DATA.classNames[originalId] || originalId;
    const newName = prompt("Renommer la classe :", currentName);
    if(newName) {
        DATA.classNames[originalId] = newName;
        saveData();
        const activeTab = document.querySelector('#grid-tabs .tab.active');
        if(activeTab.innerText.includes("Vue Globale")) renderGlobalGrid();
        else renderGridSystem(); 
    }
}

function renderLevelGrid(idx) {
    const lvl = DATA.structure[idx]; if(!lvl) return;
    const name = lvl.level; 
    const safeName = name.replace(/'/g, "\\'");

    // 1. RÉCUPÉRATION DES PRÉFIXES UNIQUES (Ex: 12A, 12B...)
    const allPrefixes = getAllUniquePrefixes();
    const prefix = allPrefixes[idx];
    const cont = document.getElementById('grid-container');
    
    // 2. INITIALISATION
    if(!DATA.levelConfig[name]) DATA.levelConfig[name] = {};
    DATA.subjects.forEach(s => { 
        if(!DATA.levelConfig[name][s]) DATA.levelConfig[name][s] = {base:0, marge:0, coef:1.0}; 
        if(DATA.levelConfig[name][s].coef === undefined) DATA.levelConfig[name][s].coef = 1.0;
    });

    // 3. FILTRAGE MATIÈRES : On masque les spécialités individuelles (isEds) pour la lisibilité
    const visibleSubjects = DATA.subjects.filter(s => {
        const m = DATA.subjectMeta[s];
        if (m.isEds) return false; // Masque les EDS individuels dans cette vue
        if (m.mode === 'etab') return false;
        if (m.mode === 'level') {
            const vol = m.volLevel ? parseFloat(m.volLevel[name] || 0) : 0;
            return vol > 0;
        }
        return (!m.levels || m.levels.includes(name));
    });

    let h = `<div class="grid-wrapper"><table class="grid-table">
    <thead>
        <tr>
            <th class="th-class" style="vertical-align:bottom; padding-bottom:10px;"><span style="font-size:1.1rem; color:#2c3e50;">${name}</span></th>
            ${visibleSubjects.map(s => {
                const safeS = s.replace(/'/g, "\\'");
                return `<th class="th-vertical"><span class="del-badge" onclick="delSubject('${safeS}')">×</span><div class="th-text-wrapper">${s}</div></th>`;
            }).join('')}
            <th class="th-vertical" style="vertical-align:bottom;"><div style="writing-mode:vertical-rl; transform:rotate(180deg); color:#2c3e50; font-weight:bold; height:auto; margin:0 auto;">TOTAL</div></th>
        </tr>
    </thead>
    <tbody>
    
    <tr style="background:#fcf3ff;"><td style="text-align:center; font-weight:bold; color:#8e44ad; font-size:0.75rem;">Coeff.</td>
    ${visibleSubjects.map(s => `<td><input class="inp-coef" value="${DATA.levelConfig[name][s].coef || 1}" onchange="updLvl('${safeName}','${s.replace(/'/g, "\\'")}','coef',this.value)"></td>`).join('')}
    <td style="background:#f4f6f9;"></td></tr>
    
    <tr style="background:#fff;"><td style="text-align:center; font-weight:bold; color:#7f8c8d; font-size:0.75rem;">Off.</td>
    ${visibleSubjects.map(s => {
        const m = DATA.subjectMeta[s];
        if (m.mode === 'level') return `<td style="background:#fdf2e9; color:#d35400; font-weight:bold; text-align:center;">${m.volLevel[name] || 0}</td>`;
        return `<td><input class="inp-hours" value="${DATA.levelConfig[name][s].base}" onchange="updLvl('${safeName}','${s.replace(/'/g, "\\'")}','base',this.value)"></td>`;
    }).join('')}
    <td rowspan="2" id="tot-lvl" style="font-weight:bold; font-size:1.1rem; vertical-align:middle;">-</td></tr>
    
    <tr style="background:#fffcf5;"><td style="text-align:center; font-weight:bold; color:#d35400; font-size:0.65rem;">Autonomie</td>
    ${visibleSubjects.map(s => {
        if (DATA.subjectMeta[s].mode === 'level') return `<td style="background:#fdf2e9;"></td>`; 
        return `<td><input class="inp-marge" value="${DATA.levelConfig[name][s].marge}" onchange="updLvl('${safeName}','${s.replace(/'/g, "\\'")}','marge',this.value)"></td>`;
    }).join('')}
    </tr>
    
    <tr style="height:15px; background:#f4f6f9;"><td colspan="${visibleSubjects.length+2}"></td></tr>`;
    
    // 4. CALCUL DES CLASSES
    let grandTotalLevel = 0;
    let colTotals = {}; 
    visibleSubjects.forEach(s => colTotals[s] = 0);

    for(let i=0; i<lvl.div; i++) {
        const c = `${prefix}${String.fromCharCode(65+i)}`;
        const safeC = c.replace(/'/g, "\\'");
        const isOv = !!DATA.classOverrides[c]; 
        let rowT = 0; 
        const displayName = (DATA.classNames && DATA.classNames[c]) ? DATA.classNames[c] : c;

        h += `<tr style="background:${isOv ? '#eaf2f8' : 'white'}">
            <td class="td-class">
                <button class="class-name-btn" onclick="renameClass('${safeC}')">${displayName}</button>
                <label style="display:block; font-size:0.6rem;"><input type="checkbox" ${isOv?'checked':''} onchange="toggleOv('${safeC}')"> Perso.</label>
            </td>`;
            
        visibleSubjects.forEach(s => {
            if (DATA.subjectMeta[s].mode === 'level') {
                h += `<td style="background:#fdf2e9; color:#ccc; text-align:center;">-</td>`;
            } else {
                let v = isOv && DATA.classOverrides[c][s] ? DATA.classOverrides[c][s] : DATA.levelConfig[name][s];
                const cellTotal = ((v.base||0) + (v.marge||0)) * (DATA.levelConfig[name][s].coef || 1.0);
                rowT += cellTotal; colTotals[s] += cellTotal; 
                h += `<td style="${isOv?'':'opacity:0.6; pointer-events:none;'}"><div class="vertical-stack"><input class="inp-hours" value="${v.base}" onchange="updOv('${safeC}','${s.replace(/'/g, "\\'")}','base',this.value)"><input class="inp-marge" value="${v.marge}" onchange="updOv('${safeC}','${s.replace(/'/g, "\\'")}','marge',this.value)"></div></td>`;
            }
        });
        grandTotalLevel += rowT;
        h += `<td style="font-weight:bold;">${rowT.toFixed(1)}</td></tr>`;
    }

    // 5. LOGIQUE EDS : On affiche uniquement la ligne de résumé global du niveau
    let totalEdsNiveau = 0;
    const lowerName = name.toLowerCase();
    let levelKey = "";
    
    if (lowerName.includes("1") || lowerName.includes("prem")) levelKey = "premiere";
    else if (lowerName.includes("term") || lowerName.includes("tle")) levelKey = "terminale";

    if (levelKey && DATA.eds && DATA.eds[levelKey]) {
        DATA.eds[levelKey].forEach(e => {
            const vol = parseFloat(e.hPerGroup) || (levelKey === 'premiere' ? 4 : 6);
            totalEdsNiveau += (parseFloat(e.groups) || 0) * vol;
        });
    }

    if (totalEdsNiveau > 0) {
        h += `<tr style="background:#ebf5fb; font-style:italic; font-weight:bold; color:#2980b9;">
            <td style="text-align:right; padding-right:10px;">🎓 Spécialités (EDS)</td>
            <td colspan="${visibleSubjects.length}" style="text-align:left; padding-left:20px; color:#7f8c8d; font-weight:normal;">
                Volume global calculé dans l'onglet Spécialités
            </td>
            <td>${totalEdsNiveau.toFixed(1)}</td>
        </tr>`;
        grandTotalLevel += totalEdsNiveau;
    }

    // 6. PIED DE TABLEAU
    h += `<tr style="background:#34495e; color:white; font-weight:bold;">
            <td style="text-align:right; padding-right:10px;">TOTAL NIV.</td>`;
    visibleSubjects.forEach(s => {
        const m = DATA.subjectMeta[s];
        if (m.mode === 'level') {
            const vol = parseFloat(m.volLevel[name] || 0);
            h += `<td>${vol.toFixed(1)}</td>`;
            grandTotalLevel += vol;
        } else {
            h += `<td>${colTotals[s].toFixed(1)}</td>`;
        }
    });
    h += `<td id="total-final-grille" style="font-size:1.1rem; color:#f1c40f;">${grandTotalLevel.toFixed(1)}</td></tr>`;

    cont.innerHTML = h + '</tbody></table></div>';

    // Mise à jour des compteurs et KPI
    let totConf = 0; 
    visibleSubjects.forEach(s => {
        const m = DATA.subjectMeta[s];
        if (m.mode === 'level') totConf += parseFloat(m.volLevel[name] || 0);
        else totConf += (DATA.levelConfig[name][s].base + DATA.levelConfig[name][s].marge) * (DATA.levelConfig[name][s].coef || 1);
    });
    const el = document.getElementById('tot-lvl');
    if(el) el.innerText = totConf.toFixed(1);

    updateGridCounter();
}

function renderGlobalGrid() {
    const cont = document.getElementById('grid-container');
    
    // Séparation des matières par mode pour l'organisation des colonnes
    const subjectsDiv = DATA.subjects.filter(s => DATA.subjectMeta[s].mode === 'div');
    const subjectsLevel = DATA.subjects.filter(s => DATA.subjectMeta[s].mode === 'level');
    const subjectsEtab = DATA.subjects.filter(s => DATA.subjectMeta[s].mode === 'etab');
    
    let totalDecharges = 0;
    DATA.teachers.forEach(t => totalDecharges += (t.decharge || 0));

    let grandTotalTotalEtab = 0; 
    let colTotals = {}; 
    DATA.subjects.forEach(s => colTotals[s] = 0);

    // Construction de l'en-tête de la table
    let h = `<div class="grid-wrapper"><table class="grid-table" style="font-size:0.8rem;">
    <thead><tr><th class="th-class" style="width:100px;">Classe / Niveau</th>
    ${subjectsDiv.map(s => `<th class="th-vertical" style="height:120px;"><div class="th-text-wrapper" style="height:80px;">${s}</div></th>`).join('')}
    ${subjectsLevel.map(s => `<th class="th-vertical" style="height:120px; background:#fdf2e9; border-bottom:2px solid #e67e22;"><div class="th-text-wrapper" style="height:80px; color:#d35400;">${s}<br>(Niv)</div></th>`).join('')}
    ${subjectsEtab.map(s => `<th class="th-vertical" style="height:120px; background:#e8f8f5; border-bottom:2px solid #1abc9c;"><div class="th-text-wrapper" style="height:80px; color:#16a085;">${s}<br>(Etab)</div></th>`).join('')}
    <th class="th-vertical" style="height:120px; background:#fffcf5; border-bottom:2px solid #f39c12;"><div class="th-text-wrapper" style="height:80px; color:#d35400;">Dégagements<br>(Interne)</div></th>
    <th class="th-vertical" style="height:120px;"><div style="writing-mode:vertical-rl; transform:rotate(180deg); margin:0 auto;">Total</div></th>
    </tr></thead><tbody>`;

    const allPrefixes = getAllUniquePrefixes();

    DATA.structure.forEach((lvl, idx) => {
        const name = lvl.level;
        const prefix = allPrefixes[idx];
        
        let levelColTotals = {};
        DATA.subjects.forEach(s => levelColTotals[s] = 0);
        let levelRowTotalTC = 0;

        // --- 1. AFFICHAGE DES CLASSES ---
        for(let i=0; i<lvl.div; i++) {
             const c = `${prefix}${String.fromCharCode(65+i)}`;
             const displayName = (DATA.classNames && DATA.classNames[c]) ? DATA.classNames[c] : c;
             let rowTotal = 0;
             
             h += `<tr><td style="font-weight:bold; padding-left:15px;">${displayName}</td>`;
             
             subjectsDiv.forEach(s => {
                 let val = 0;
                 if(DATA.subjectMeta[s].levels && DATA.subjectMeta[s].levels.includes(name)) {
                     const isOv = DATA.classOverrides[c] && DATA.classOverrides[c][s];
                     const cfg = isOv ? DATA.classOverrides[c][s] : DATA.levelConfig[name][s];
                     val = ((cfg.base||0) + (cfg.marge||0)) * (cfg.coef || 1.0);
                 }
                 if(val > 0) {
                     levelColTotals[s] += val; 
                     colTotals[s] += val;      
                     rowTotal += val;
                 }
                 h += `<td>${val > 0 ? parseFloat(val.toFixed(2)) : '-'}</td>`;
             });
             
             // Colonnes vides pour les modes Hors-Division au niveau de la classe
             subjectsLevel.forEach(s => h += `<td style="background:#fdf2e9; opacity:0.5;">-</td>`);
             subjectsEtab.forEach(s => h += `<td style="background:#e8f8f5; opacity:0.5;">-</td>`);
             h += `<td style="background:#fffcf5; opacity:0.5;">-</td>`;
             h += `<td style="font-weight:bold;">${parseFloat(rowTotal.toFixed(2))}</td></tr>`;
             levelRowTotalTC += rowTotal;
        }

        // --- 2. GESTION DES EDS (Spécialités Lycée) ---
        let totalEdsNiveau = 0;
        let levelKey = "";
        const lowerName = name.toLowerCase();
        
        if (lowerName.match(/1ère|1er|1g|premi/)) {
            levelKey = "premiere";
        } else if (lowerName.match(/term|tle|tg/)) {
            levelKey = "terminale";
        }
        
        if (levelKey && DATA.eds && DATA.eds[levelKey]) {
            DATA.eds[levelKey].forEach(e => {
                const vol = parseFloat(e.hPerGroup) || (levelKey === 'premiere' ? 4 : 6);
                totalEdsNiveau += (parseFloat(e.groups) || 0) * vol;
            });
        }

        // Affichage de la ligne EDS si applicable
        if (totalEdsNiveau > 0) {
            h += `<tr style="background:#ebf5fb; font-style:italic;">
                <td style="text-align:left; padding-left:25px; color:#2980b9;">↳ Spécialités (EDS)</td>
                <td colspan="${subjectsDiv.length}" style="color:#7f8c8d; font-size:0.75rem; text-align:center;">Volume global du niveau</td>`;
            
            subjectsLevel.forEach(s => h += `<td style="background:#fdf2e9; opacity:0.5;">-</td>`);
            subjectsEtab.forEach(s => h += `<td style="background:#e8f8f5; opacity:0.5;">-</td>`);
            h += `<td style="background:#fffcf5; opacity:0.5;">-</td>`;
            h += `<td style="font-weight:bold; color:#2980b9;">${totalEdsNiveau.toFixed(1)}</td></tr>`;
        }

        // --- 3. SOUS-TOTAL DU NIVEAU ---
        h += `<tr style="background:#ecf0f1; border-top:1px solid #bdc3c7; font-weight:bold;">
            <td style="text-align:right; color:#2c3e50; font-style:italic;">SOUS-TOTAL ${name.toUpperCase()}</td>`;
        
        let subRowSum = totalEdsNiveau; 
        subjectsDiv.forEach(s => {
            const val = levelColTotals[s];
            subRowSum += val;
            h += `<td style="font-size:0.85rem;">${val > 0 ? parseFloat(val.toFixed(2)) : '-'}</td>`;
        });

        subjectsLevel.forEach(s => {
            const val = DATA.subjectMeta[s].volLevel ? parseFloat(DATA.subjectMeta[s].volLevel[name] || 0) : 0;
            colTotals[s] += val;
            subRowSum += val;
            h += `<td style="background:#fae5d3; color:#d35400;">${val > 0 ? val.toFixed(1) : '-'}</td>`;
        });

        subjectsEtab.forEach(s => h += `<td style="background:#e8f8f5;">-</td>`);
        h += `<td style="background:#fffcf5;">-</td>`;

        grandTotalTotalEtab += subRowSum; 
        h += `<td style="background:#bdc3c7; color:#2c3e50;">${subRowSum.toFixed(1)}</td></tr>`;
    });

    // --- 4. PIED DE TABLEAU (TOTAL GÉNÉRAL ÉTABLISSEMENT) ---
    h += `<tr style="background:#2c3e50; color:white; font-weight:bold; border-top:3px solid #34495e;">
          <td style="text-align:right; padding-right:10px;">TOTAL GÉNÉRAL</td>`;
    
    subjectsDiv.forEach(s => h += `<td>${colTotals[s] > 0 ? colTotals[s].toFixed(1) : '-'}</td>`);
    subjectsLevel.forEach(s => h += `<td style="color:#e67e22;">${colTotals[s] > 0 ? colTotals[s].toFixed(1) : '-'}</td>`);
    
    // Affichage forcé des matières au forfait Établissement
    subjectsEtab.forEach(s => {
        let val = parseFloat(DATA.subjectMeta[s].etab || 0);
        grandTotalTotalEtab += val;
        h += `<td style="color:#1abc9c; font-size:1rem;">${val > 0 ? val.toFixed(1) : '0.0'}</td>`;
    });
    
    h += `<td style="background:#f39c12; color:white; font-size:1rem;">${totalDecharges > 0 ? totalDecharges.toFixed(1) : '-'}</td>`;
    grandTotalTotalEtab += totalDecharges;

    h += `<td style="background:#16a085; color:white; font-size:1.2rem;">${grandTotalTotalEtab.toFixed(1)}</td></tr>`;

    cont.innerHTML = h + '</tbody></table></div>';
}

function openWeightingMenu() {
    const choice = prompt("Gestion des Coefficients (Pondération)\n\nEntrez une valeur pour l'appliquer à TOUTES les matières.\n\n(Laissez vide pour annuler)");
    if(choice) {
        const val = parseFloat(choice);
        if(!isNaN(val)) {
            if(confirm(`Appliquer le coefficient ${val} à TOUTES les matières de TOUS les niveaux ?`)) {
                DATA.structure.forEach(l => {
                    DATA.subjects.forEach(s => {
                        if(DATA.levelConfig[l.level][s]) DATA.levelConfig[l.level][s].coef = val;
                    });
                });
                saveData();
                renderGridSystem();
                alert("✅ Coefficients mis à jour !");
            }
        }
    }
}

function addSubject(){ const s=prompt("Nom ?"); if(s && !DATA.subjects.includes(s)){ 
    DATA.subjects.push(s); 
    DATA.subjectMeta[s]={ mode:'div', levels: getDefaultActiveLevels(s), etab:0, volLevel:{}, parent:"", code:""}; 
    DATA.structure.forEach(l=>DATA.levelConfig[l.level][s]={base:0,marge:0,coef:1.0}); 
    saveData(); renderGridSystem(); renderRH(); renderSubjectsConfig(); 
} }

function delSubject(s) { if(confirm("Supprimer ?")) { DATA.subjects=DATA.subjects.filter(sub=>sub!==s); delete DATA.subjectMeta[s]; Object.keys(DATA.levelConfig).forEach(l=>delete DATA.levelConfig[l][s]); saveData(); renderSubjectsConfig(); renderGridSystem(); renderRH(); } }
function updLvl(l, s, k, v) {
    DATA.levelConfig[l][s][k] = parseFloat(v) || 0;
    saveData();
	updateGridCounter();
    if (k === 'marge' || k === 'base') {
        const prefix = l.replace(/[^0-9]/g, '') || l.charAt(0);
        let ignoredClasses = [];
        Object.keys(DATA.classOverrides).forEach(c => {
            if (c.startsWith(prefix)) { 
                if (DATA.classOverrides[c][s]) {
                    const displayName = (DATA.classNames && DATA.classNames[c]) ? DATA.classNames[c] : c;
                    ignoredClasses.push(displayName);
                }
            }
        });
        if (ignoredClasses.length > 0) {
            alert(`⚠️ ATTENTION :\n\nVous avez modifié la ${k === 'marge' ? 'marge' : 'base'} pour tout le niveau ${l}.\n\nCependant, les classes suivantes sont en mode "Personnalisé" et n'ont PAS été modifiées :\n\n👉 ${ignoredClasses.join(', ')}\n\nPensez à vérifier leurs horaires manuellement.`);
        }
    }
    renderLevelGrid(DATA.structure.findIndex(x => x.level === l));
}
function toggleOv(c){ 
    if(DATA.classOverrides[c]) delete DATA.classOverrides[c]; 
    else { 
        let foundLvl = null;
        for(let l of DATA.structure) {
            let p = l.level.replace(/[^0-9]/g, '') || l.level.charAt(0);
            if(c.startsWith(p)) { foundLvl=l.level; break; }
        }
        if(foundLvl) DATA.classOverrides[c]=JSON.parse(JSON.stringify(DATA.levelConfig[foundLvl])); 
    } 
    saveData(); 
    const activeTab = document.querySelector('.tab.active');
    if(activeTab) changeTab(activeTab, window.lastActiveGridTab);
}
function updOv(c,s,k,v){ 
    DATA.classOverrides[c][s][k] = parseFloat(v)||0; 
    saveData(); 
	updateGridCounter();
    const activeTab = document.querySelector('.tab.active');
    if(activeTab) changeTab(activeTab, window.lastActiveGridTab);
}

function renderSubjectsConfig() { 
    const t = document.getElementById('subjects-body'); 
    t.innerHTML = ''; 
    
    const sortedSubjects = [...DATA.subjects].sort();

    sortedSubjects.forEach(s => { 
        const m = DATA.subjectMeta[s];
        const safeS = s.replace(/'/g, "\\'"); 

        // 1. Select Parent
        let parentOptions = `<option value="">(Aucun - Racine)</option>`;
        sortedSubjects.forEach(parentName => {
            if (parentName !== s) {
                const isSelected = m.parent === parentName ? 'selected' : '';
                parentOptions += `<option value="${parentName}" ${isSelected}>${parentName}</option>`;
            }
        });

        // 2. BOUTON MODALE (Remplacement de la liste)
        // On compte combien de matières sont déjà liées pour l'afficher sur le bouton
        const linkCount = (m.linkedSubjects && m.linkedSubjects.length > 0) ? m.linkedSubjects.length : 0;
        
        // Style du bouton : Gris si 0, Bleu si des liens existent
        const btnStyle = linkCount > 0 
            ? "background:#3498db; color:white; border:1px solid #2980b9;" 
            : "background:white; color:#7f8c8d; border:1px solid #bdc3c7;";
            
        const linkedBtn = `
            <button class="btn btn-sm" 
                    style="${btnStyle} width:100%; display:flex; justify-content:center; align-items:center; gap:5px;"
                    onclick="openLinkedSubjectsModal('${safeS}')">
                <span>🔗 Gérer</span>
                <span style="background:rgba(0,0,0,0.2); padding:1px 6px; border-radius:10px; font-size:0.75rem;">${linkCount}</span>
            </button>
        `;

        // 3. Paramètres (Niveaux/Volumes)
        let paramHtml = "";
        if (m.mode === 'div') {
            paramHtml = `<div class="lvl-check-container">`;
            DATA.structure.forEach(lvl => {
                const isChecked = m.levels && m.levels.includes(lvl.level);
                const safeLvl = lvl.level.replace(/'/g, "\\'");
                paramHtml += `<label class="lvl-check-item"><input type="checkbox" ${isChecked?'checked':''} onchange="toggleSubLevel('${safeS}','${safeLvl}')">${lvl.level}</label>`;
            });
            paramHtml += `</div>`;
        } else if (m.mode === 'level') {
            paramHtml = `<div style="display:flex; flex-wrap:wrap; gap:8px;">`;
            DATA.structure.forEach(lvl => {
                const val = m.volLevel ? (m.volLevel[lvl.level] || 0) : 0;
                const safeLvl = lvl.level.replace(/'/g, "\\'");
                paramHtml += `<div class="lvl-input-item" style="background:#fff; border:1px solid #ddd; padding:2px 6px; border-radius:4px;"><span style="font-size:0.8rem; font-weight:bold;">${lvl.level}:</span><input type="number" step="0.5" value="${val}" style="width:50px !important; text-align:center; height:24px;" onchange="updSubVolLevel('${safeS}','${safeLvl}',this.value)"></div>`;
            });
            paramHtml += `</div>`;
        } else if (m.mode === 'etab') {
             paramHtml = `<div class="lvl-input-item"><span style="font-weight:bold; color:#16a085;">Forfait :</span><input type="number" step="0.5" value="${m.etab||0}" style="width:80px !important; text-align:center; font-weight:bold; color:#16a085; border:2px solid #1abc9c; margin-left: 10px;" onchange="updSubEtab('${safeS}',this.value)"></div>`;
        }

        t.innerHTML += `<tr>
            <td style="width:80px;"><input type="text" value="${m.code||''}" placeholder="Code" style="font-family:monospace; text-align:center;" onchange="updateSubjectMeta('${safeS}','code',this.value)"></td>
            <td><input type="text" value="${s}" style="font-weight:bold;" onchange="renameSubject('${safeS}',this.value)"></td>
            <td style="width:180px;"><select style="font-size:0.9rem;" onchange="updateSubjectMeta('${safeS}','parent',this.value)">${parentOptions}</select></td>
            
            <td style="width:140px; text-align:center;">${linkedBtn}</td>

            <td style="width:160px;">
                <select onchange="updateSubjectMeta('${safeS}','mode',this.value)">
                    <option value="div" ${m.mode==='div'?'selected':''}>Division</option>
                    <option value="level" ${m.mode==='level'?'selected':''}>Niveau</option>
                    <option value="etab" ${m.mode==='etab'?'selected':''}>Établissement</option>
                </select>
            </td>
            <td style="text-align:left;">${paramHtml}</td>
            <td style="width:50px;"><button class="btn btn-danger btn-sm" onclick="delSubject('${safeS}')">×</button></td>
        </tr>`; 
    }); 
}

/**
 * Active ou désactive le lien entre deux matières
 * @param {string} targetSubject - La matière principale (ex: "Ens. Scientifique")
 * @param {string} linkedSubject - La matière à autoriser (ex: "Maths")
 */
function toggleLinkedSubject(targetSubject, linkedSubject) {
    if (!DATA.subjectMeta[targetSubject]) return;
    
    // Initialisation du tableau si inexistant
    if (!DATA.subjectMeta[targetSubject].linkedSubjects) {
        DATA.subjectMeta[targetSubject].linkedSubjects = [];
    }
    
    const arr = DATA.subjectMeta[targetSubject].linkedSubjects;
    const idx = arr.indexOf(linkedSubject);
    
    if (idx > -1) {
        // Si existe déjà, on retire
        arr.splice(idx, 1);
    } else {
        // Sinon, on ajoute
        arr.push(linkedSubject);
    }
    
    saveData();
    // On ne recharge pas toute la vue pour ne pas perdre le scroll ou le focus,
    // La sauvegarde suffit car l'état visuel (checked) a déjà changé via le clic.
}

function updateSubjectMeta(s,f,v){ 
    if(!DATA.subjectMeta[s]) DATA.subjectMeta[s]={}; 
    DATA.subjectMeta[s][f]=v; 
    
    if(f === 'mode') {
         if(v === 'div' && !DATA.subjectMeta[s].levels) DATA.subjectMeta[s].levels = getDefaultActiveLevels(s);
         if(v === 'level' && !DATA.subjectMeta[s].volLevel) DATA.subjectMeta[s].volLevel = {};
    }
    
    saveData(); 
    renderSubjectsConfig();
}
function toggleSubLevel(s, lvl) {
    if(!DATA.subjectMeta[s].levels) DATA.subjectMeta[s].levels = [];
    const arr = DATA.subjectMeta[s].levels;
    if(arr.includes(lvl)) DATA.subjectMeta[s].levels = arr.filter(x => x !== lvl);
    else arr.push(lvl);
    saveData();
}
function updSubVolLevel(s, lvl, val) {
    if(!DATA.subjectMeta[s].volLevel) DATA.subjectMeta[s].volLevel = {};
    DATA.subjectMeta[s].volLevel[lvl] = parseFloat(val) || 0;
    saveData();
}
function updSubEtab(s, val) {
    DATA.subjectMeta[s].etab = parseFloat(val) || 0;
    saveData();
}

function renameSubject(oldName, newName) { 
    if(!newName || newName===oldName) { renderSubjectsConfig(); return; }
    if(DATA.subjects.includes(newName)) { alert("Ce nom existe déjà !"); renderSubjectsConfig(); return; }

    DATA.subjects[DATA.subjects.indexOf(oldName)] = newName; 
    
    if(DATA.subjectMeta[oldName]){
        DATA.subjectMeta[newName] = DATA.subjectMeta[oldName];
        delete DATA.subjectMeta[oldName];
    }
    
    Object.keys(DATA.subjectMeta).forEach(s => { 
        if(DATA.subjectMeta[s].parent === oldName) {
            DATA.subjectMeta[s].parent = newName;
        }
    }); 
    
    Object.keys(DATA.levelConfig).forEach(l => {
        if(DATA.levelConfig[l][oldName]){
            DATA.levelConfig[l][newName] = DATA.levelConfig[l][oldName];
            delete DATA.levelConfig[l][oldName];
        }
    }); 
    
    Object.keys(DATA.classOverrides).forEach(c => {
        if(DATA.classOverrides[c][oldName]) {
            DATA.classOverrides[c][newName] = DATA.classOverrides[c][oldName];
            delete DATA.classOverrides[c][oldName];
        }
    });

    DATA.teachers.forEach(t => {
        if(t.subject === oldName) t.subject = newName;
    }); 
    
    saveData(); 
    renderSubjectsConfig();
    
    if(document.getElementById('ventilation').classList.contains('active')) renderGridSystem();
}

// ------------------------------------------------------------------------------------------------
// VUE PILOTAGE (DISCIPLINE) - Mise à jour V2.9 (Prise en compte CSD + Décharges)
// ------------------------------------------------------------------------------------------------
function renderRHDisc() {
    const needs = calculateNeeds();
    const tBody = document.getElementById('rh-disc-body');
    const tFoot = document.getElementById('rh-disc-total');
    tBody.innerHTML = '';
    
    const roots = DATA.subjects.filter(s => !DATA.subjectMeta[s]?.parent).sort();

    const getStats = (sub) => {
        const profs = DATA.teachers.map((t, idx) => ({...t, idx: idx})).filter(t => t.subject === sub);
        const dechInt = profs.reduce((a,t)=>a+(t.decharge||0), 0);
        const dechExt = profs.reduce((a,t)=>a+(t.dech_ext||0), 0);
        const hp = profs.reduce((a,t)=> a + (t.ors - (t.csd||0) - (t.dech_ext||0)), 0);
        const hsa = profs.reduce((a,t)=>a+t.hsa, 0);
        const bes = (needs[sub] || 0) + dechInt;
        const app = hp + hsa;
        return { bes, app, hp, hsa, profs };
    };

    roots.forEach(r => {
        const rStats = getStats(r);
        const safeR = r.replace(/'/g, "\\'");
        const kids = DATA.subjects.filter(s => DATA.subjectMeta[s]?.parent === r);
        
        if (kids.length > 0) {
            let poleBes = rStats.bes;
            let poleApp = rStats.app;
            let poleHP = rStats.hp;
            let poleHSA = rStats.hsa;
            
            const kidsData = kids.map(k => {
                const kStats = getStats(k);
                poleBes += kStats.bes;
                poleApp += kStats.app;
                poleHP += kStats.hp;
                poleHSA += kStats.hsa;
                return { name: k, stats: kStats };
            });

            const soldePole = poleApp - poleBes;
            
            // EN-TÊTE PÔLE (Gris Anthracite)
            tBody.innerHTML += `<tr class="row-header">
                <td style="text-align:left; padding-left:10px;">📦 PÔLE ${r.toUpperCase()}</td>
                <td style="color:#f1c40f;">${poleBes.toFixed(1)}</td>
                <td style="color:#81d4fa;">${poleApp.toFixed(1)}</td>
                <td>${poleHP.toFixed(1)}</td>
                <td>${poleHSA.toFixed(1)}</td>
                <td style="background:${soldePole>=0?'#27ae60':'#c0392b'}; color:white;">${soldePole.toFixed(1)}</td>
            </tr>`;

            renderSubjectRow(r, rStats, true, `↳ ${r}`, safeR);

            kidsData.forEach(kd => {
                renderSubjectRow(kd.name, kd.stats, true, `↳ ${kd.name}`, kd.name.replace(/'/g, "\\'"));
            });

        } else {
            // MATIÈRE SOLO (Style En-tête Gris aussi)
            renderSubjectRow(r, rStats, false, r, safeR, true);
        }
    });

    function renderSubjectRow(name, stats, isChild, displayName, safeName, isHeader = false) {
        if(stats.bes === 0 && stats.app === 0) return;

        let rowClass = isChild ? 'row-sub-master' : 'row-master';
        let styleBes = isChild ? 'background:#fcf3cf; color:#d35400;' : 'background:#fdf2e9; color:#d35400;';
        let styleApp = isChild ? 'background:#d6eaf8; color:#2980b9;' : 'background:#ebf5fb; color:#2980b9;';
        
        if (isHeader) {
            rowClass = 'row-header';
            styleBes = 'color:#f1c40f;'; 
            styleApp = 'color:#81d4fa;'; 
        }

        const addBtn = `<button class="btn-add-subject-teacher" onclick="addTeacherToSubject('${safeName}')" style="${isHeader ? 'border:1px solid white;' : ''}">+</button>`;
        const solde = stats.app - stats.bes;
        const paddingName = isChild ? 'padding-left:20px;' : '';

        tBody.innerHTML += `<tr class="${rowClass}">
            <td style="text-align:left; display:flex; align-items:center; ${paddingName}">${displayName} ${addBtn}</td>
            <td style="${styleBes}">${stats.bes.toFixed(1)}</td>
            <td style="${styleApp}">${stats.app.toFixed(1)}</td>
            <td><small>${stats.hp.toFixed(1)}</small></td>
            <td><small>${stats.hsa.toFixed(1)}</small></td>
            <td style="color:${solde>=0 ? (isHeader?'#2ecc71':'green') : (isHeader?'#e74c3c':'red')}">${solde.toFixed(1)}</td>
        </tr>`;

        stats.profs.forEach(p => {
            let detailsTxt = "";
            
            // --- RESTAURATION : BADGES CLIQUABLES AVEC CRAYON ---
            
            // 1. BMP (Si > 0)
            if(p.bmp > 0) {
                detailsTxt += `<div onclick="setBMP(${p.idx})" title="Modifier le volume du BMP" style="cursor:pointer; background:#ebf5fb; border:1px solid #aed6f1; color:#2c3e50; font-size:0.75rem; font-weight:bold; margin-top:2px; padding:2px 5px; border-radius:4px; display:inline-flex; align-items:center; gap:5px;">
                   <span>★ BMP : ${p.bmp}h</span> <span>✏️</span>
                </div><br>`;
            }
            
            // 2. CSD (Si > 0)
            if(p.csd > 0) {
                detailsTxt += `<div onclick="setCSD(${p.idx})" title="Modifier le volume CSD" style="cursor:pointer; background:#fdf2e9; border:1px solid #fad7a0; color:#e67e22; font-size:0.75rem; font-weight:bold; margin-top:2px; padding:2px 5px; border-radius:4px; display:inline-flex; align-items:center; gap:5px;">
                   <span>(Dont ${p.csd}h CSD)</span> <span>✏️</span>
                </div><br>`;
            }

            // (Autres décharges : informatif seulement pour l'instant)
            if(p.decharge > 0) detailsTxt += `<span style="color:#8e44ad; font-size:0.7rem; display:block; margin-top:2px;">(Dont ${p.decharge}h DGH)</span>`;
            if(p.dech_ext > 0) detailsTxt += `<span style="color:#27ae60; font-size:0.7rem; display:block; margin-top:2px;">(Dont ${p.dech_ext}h Rect.)</span>`;

            const realContribution = (p.ors - (p.csd||0) - (p.dech_ext||0)) + p.hsa;
            const paddingProf = isChild ? 'padding-left:50px;' : 'padding-left:30px;';

            // Boutons d'ajout (colonne 1) : Masqués si valeur déjà saisie
            const btnBmp = (p.bmp > 0) 
                ? '' 
                : `<button onclick="setBMP(${p.idx})" style="cursor:pointer; background:#34495e; color:white; border:none; border-radius:3px; padding:1px 5px; font-size:0.65rem; margin-left:5px;" title="Définir BMP">BMP ?</button>`;

            const btnCsd = (p.csd > 0) 
                ? '' 
                : `<button onclick="setCSD(${p.idx})" style="cursor:pointer; background:#17a2b8; color:white; border:none; border-radius:3px; padding:1px 5px; font-size:0.65rem; margin-left:5px;" title="Définir CSD">CSD ?</button>`;

            tBody.innerHTML += `<tr class="row-detail">
                <td style="${paddingProf} text-align:left; display:flex; align-items:center;">
                    <span style="color:#bdc3c7; margin-right:5px;">↳</span>
                    <input type="text" value="${p.name}" onchange="updT(${p.idx},'name',this.value)" style="border:none; border-bottom:1px dashed #bdc3c7; background:transparent; width:140px; color:#2c3e50; font-weight:500;" placeholder="Nom">
                    ${btnBmp} ${btnCsd}
                    <span style="font-size:0.75rem; color:#999; margin-left:5px;">(${p.status})</span>
                </td>
                <td colspan="2"></td>
                <td>
                    <input type="number" class="input-inline" value="${p.ors}" step="0.5" onchange="updT(${p.idx},'ors',this.value)">
                    <div style="display:flex; flex-direction:column; align-items:center;">${detailsTxt}</div>
                </td>
                <td><input type="number" class="input-inline" value="${p.hsa}" step="0.5" onchange="updT(${p.idx},'hsa',this.value)"></td>
                <td style="font-weight:bold; color:#7f8c8d;">${realContribution.toFixed(1)}</td>
            </tr>`;
        });
    }
    
    // Totaux
    let realHP=0, realHSA=0, realBesoin = 0; 
    DATA.teachers.forEach(t=>{ 
        realHP += (t.ors - (t.csd||0) - (t.dech_ext||0)); 
        realHSA += t.hsa; 
        realBesoin += (t.decharge || 0);
    });
    Object.values(needs).forEach(v=>realBesoin+=v);
    const realApport = realHP + realHSA;

    tFoot.innerHTML = `<td>TOTAUX GÉNÉRAUX</td>
        <td>${realBesoin.toFixed(1)}</td>
        <td>${realApport.toFixed(1)}</td>
        <td>HP:${realHP.toFixed(1)}</td>
        <td>HSA:${realHSA.toFixed(1)}</td>
        <td style="background:${(realApport-realBesoin)>=0?'var(--success)':'var(--danger)'}; color:white;">${(realApport-realBesoin).toFixed(1)}</td>`;
}

function updateYear(v){ DATA.config.year=parseInt(v); saveData(); }
function updateGlobalDHG(){ DATA.config.hp=parseFloat(document.getElementById('global-hp').value); DATA.config.hsa=parseFloat(document.getElementById('global-hsa').value); saveData(); calculateRecap(); }
function saveData(a){ 
    localStorage.setItem('DHG_Data_V9', JSON.stringify(DATA)); 
    if (typeof pushState === 'function') pushState();
    if(a) alert("✅ Sauvegardé"); 
}

function loadSaveFile(input) {
    const f = input.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = e => {
        try {
            let loadedData = JSON.parse(e.target.result);
            
            // --- MIGRATIONS & INITIALISATIONS ---
            // On garde les migrations existantes si elles sont définies dans ton code
            if (typeof migrateV18toV19 === 'function') {
                loadedData = migrateV18toV19(loadedData);
            }
            
            // Initialisations V3
            if (!loadedData.assignments) loadedData.assignments = {}; 
            if (!loadedData.config) loadedData.config = { year: new Date().getFullYear(), total: 0, hp: 0, hsa: 0 };
            if (loadedData.teachers) {
                loadedData.teachers.forEach(p => {
                    if (p.csd === undefined) p.csd = 0;
                    if (p.decharge === undefined) p.decharge = 0;
                    if (p.dech_ext === undefined) p.dech_ext = 0; 
                });
            }

            // --- CHARGEMENT EN MÉMOIRE ---
            DATA = loadedData;

            // --- DÉTECTION INTELLIGENTE (LGT vs COLLÈGE) ---
            let isLGT = false;
            // On sécurise la lecture de la structure pour éviter le bug "Fichier corrompu"
            if (DATA.structure && Array.isArray(DATA.structure)) {
                isLGT = DATA.structure.some(lvl => {
                    // On gère les deux noms de propriétés possibles (.level ou .name)
                    const nom = lvl.level || lvl.name || ""; 
                    return nom.includes("1ère") || nom.includes("Terminale");
                });
            }

            // --- DÉCISION ---
            if (isLGT) {
                // Cas LGT : On sauvegarde et on lance l'assistant de nettoyage
                saveData(); 
                alert("✅ Fichier chargé ! Une étape de vérification des Spécialités va s'ouvrir pour nettoyer votre grille.");
                
                if (typeof showEdsIdentificationModal === 'function') {
                    showEdsIdentificationModal(); 
                } else {
                    console.error("Fonction showEdsIdentificationModal introuvable, rechargement standard.");
                    location.reload();
                }
                return; // STOP : On ne recharge pas la page tout de suite
            }
            
            // Cas Autre (Collège) : On termine normalement
            saveData();
            alert("✅ Fichier chargé avec succès !");
            location.reload();
            
        } catch (err) {
            console.error("Erreur import:", err);
            alert("❌ Erreur : Le fichier semble corrompu ou illisible.\n(Détails dans la console F12)");
        }
    };
    r.readAsText(f);
    input.value = '';
}


function showEdsIdentificationModal() {
    // 1. Création de l'interface (Overlay + Fenêtre)
    const overlay = document.createElement('div');
    overlay.id = 'eds-check-overlay';
    overlay.style = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.85); z-index: 10000;
        display: flex; justify-content: center; align-items: center;
    `;

    const modal = document.createElement('div');
    modal.style = `
        background: white; padding: 25px; border-radius: 12px;
        width: 600px; max-height: 90vh; display: flex; flex-direction: column;
        box-shadow: 0 10px 40px rgba(0,0,0,0.5); font-family: 'Segoe UI', sans-serif;
    `;

    // 2. Contenu HTML de la fenêtre
    modal.innerHTML = `
        <h2 style="margin-top:0; color:#2c3e50;">🧹 Nettoyage de la Grille (LGT)</h2>
        <p style="color:#666; font-size:0.9rem; margin-bottom:20px;">
            Cochez les matières qui sont des <strong>Spécialités (EDS)</strong>.<br>
            <em>Elles seront masquées de la grille horaire principale pour éviter les doublons et alléger l'affichage.</em>
        </p>
        <div style="flex:1; overflow-y:auto; border:1px solid #eee; border-radius:8px; padding:10px; margin-bottom:20px;" id="eds-check-list">
            </div>
        <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button id="btn-skip-eds" style="padding:10px 20px; background:#bdc3c7; border:none; border-radius:6px; cursor:pointer; font-weight:bold; color:white;">Passer (Tout garder)</button>
            <button id="btn-save-eds" style="padding:10px 20px; background:#27ae60; border:none; border-radius:6px; cursor:pointer; font-weight:bold; color:white;">Valider & Masquer</button>
        </div>
    `;

    // 3. Génération de la liste des matières
    const listContainer = modal.querySelector('#eds-check-list');
    const sortedSubjects = DATA.subjects.slice().sort(); // Tri alphabétique

    let htmlTable = `<table style="width:100%; border-collapse:collapse;">
        <tr style="background:#f8f9fa; text-align:left; color:#7f8c8d;">
            <th style="padding:8px;">Matière</th>
            <th style="padding:8px; text-align:center;">Masquer en 1ère ?</th>
            <th style="padding:8px; text-align:center;">Masquer en Term ?</th>
        </tr>`;

    sortedSubjects.forEach(sub => {
        const meta = DATA.subjectMeta[sub] || {};
        
        // On essaye de deviner si c'est déjà un EDS pour pré-cocher
        const isLikelyEds = meta.isEds || meta.parent === "Spécialités";
        const hasPrem = meta.levels && meta.levels.some(l => l.includes('1ère'));
        const hasTerm = meta.levels && meta.levels.some(l => l.includes('Term'));

        htmlTable += `
            <tr style="border-bottom:1px solid #eee;">
                <td style="padding:8px; font-weight:500;">${sub}</td>
                <td style="padding:8px; text-align:center;">
                    <input type="checkbox" class="chk-prem" data-sub="${sub}" 
                           ${(isLikelyEds && hasPrem) ? 'checked' : ''} 
                           style="transform:scale(1.3); cursor:pointer;">
                </td>
                <td style="padding:8px; text-align:center;">
                    <input type="checkbox" class="chk-term" data-sub="${sub}" 
                           ${(isLikelyEds && hasTerm) ? 'checked' : ''} 
                           style="transform:scale(1.3); cursor:pointer;">
                </td>
            </tr>
        `;
    });
    htmlTable += `</table>`;
    listContainer.innerHTML = htmlTable;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // --- 4. GESTION DES CLICS ---

    // Bouton "Passer"
    document.getElementById('btn-skip-eds').onclick = () => {
        if(confirm("Aucune matière ne sera masquée. Continuer ?")) {
            document.body.removeChild(overlay);
            location.reload();
        }
    };

    // Bouton "Valider" (Logique de Nettoyage Uniquement)
    document.getElementById('btn-save-eds').onclick = () => {
        const rows = listContainer.querySelectorAll('tr');
        
        // On parcourt chaque ligne du tableau (sauf l'en-tête)
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const chkPrem = row.querySelector('.chk-prem');
            const chkTerm = row.querySelector('.chk-term');
            const subjectName = chkPrem.getAttribute('data-sub');
            
            // Si au moins une case est cochée pour cette matière
            if (chkPrem.checked || chkTerm.checked) {
                if (!DATA.subjectMeta[subjectName]) DATA.subjectMeta[subjectName] = {};
                
                // A. On active le masquage (isEds)
                DATA.subjectMeta[subjectName].isEds = true;
                DATA.subjectMeta[subjectName].mode = 'level';
                DATA.subjectMeta[subjectName].parent = "Spécialités";
                
                // B. On supprime les heures manuelles de la grille (Nettoyage)
                DATA.subjectMeta[subjectName].volLevel = {}; 

                // C. On met à jour les niveaux concernés
                let levels = [];
                if (chkPrem.checked) levels.push("1ère");
                if (chkTerm.checked) levels.push("Terminale");
                DATA.subjectMeta[subjectName].levels = levels;
                
                // NOTE : On n'ajoute PAS la matière dans le tableau EDS du bas (DATA.eds).
                // Elle est juste masquée de la grille principale.
            }
        }

        saveData();
        alert("✅ Grille nettoyée ! Les matières sélectionnées ont été masquées.");
        document.body.removeChild(overlay);
        location.reload(); // Rechargement final pour afficher le résultat
    };
}

// Fonction utilitaire pour créer l'entrée dans le tableau EDS du bas si elle n'existe pas
function ensureEdsExistsInManager(levelCode, subjectName) {
    if (!DATA.eds) DATA.eds = { premiere: [], terminale: [] };
    if (!DATA.eds[levelCode]) DATA.eds[levelCode] = [];

    const exists = DATA.eds[levelCode].some(e => e.name === subjectName);
    if (!exists) {
        DATA.eds[levelCode].push({
            name: subjectName,
            students: 0,
            groups: 0,
            hPerGroup: (levelCode === 'premiere' ? 4 : 6) // Forfait par défaut (4h ou 6h)
        });
    }
}
function migrateV18toV19(data) {
    if (!data.subjects || !data.structure) return data;
    const allLevels = data.structure.map(l => l.level);
    if (!data.subjectMeta) data.subjectMeta = {};

    data.subjects.forEach(s => {
        if (!data.subjectMeta[s]) data.subjectMeta[s] = {};
        const meta = data.subjectMeta[s];

        if (!meta.mode) {
            if (meta.type === 'div' || !meta.type) meta.mode = 'div';
            else if (meta.type === 'etab') meta.mode = 'etab';
            else if (meta.type === 'level') meta.mode = 'level';
        }

        if (!meta.levels || !Array.isArray(meta.levels)) {
            if (s.includes("Techno") || s.includes("Espagnol") || s.includes("LV2")) {
                meta.levels = allLevels.filter(l => !l.includes("6"));
            } else if (s.includes("Philosophie")) {
                meta.levels = allLevels.filter(l => l.toLowerCase().includes("term"));
            } else {
                meta.levels = [...allLevels]; 
            }
        }

        if (meta.etab === undefined) meta.etab = 0;
        if (!meta.volLevel) meta.volLevel = {};
        if (!meta.code) meta.code = "";
    });

    return data;
}

// --- FONCTION DE SAUVEGARDE SUR DISQUE (Correction) ---
function downloadSaveFile() {
    const dateStr = new Date().toISOString().slice(0, 10);
    const filename = `DHG_Manager_Export_${dateStr}.data`;
    
    // On convertit l'objet DATA en chaîne JSON propre
    const blob = new Blob([JSON.stringify(DATA)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Création d'un lien invisible pour déclencher le téléchargement
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    // Nettoyage
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function switchRHView(mode) { 
    document.getElementById('rh-view-list').style.display=mode==='list'?'block':'none'; 
    document.getElementById('rh-view-disc').style.display=mode==='disc'?'block':'none'; 
    document.getElementById('btn-view-list').classList.toggle('active',mode==='list'); 
    document.getElementById('btn-view-disc').classList.toggle('active',mode==='disc'); 
    if(mode==='disc') renderRHDisc(); 
}

function toggleRhCodes() { showRhCodes = !showRhCodes; document.getElementById('btn-toggle-codes').classList.toggle('active', showRhCodes); renderRH(); }

// ------------------------------------------------------------------------------------------------
// GESTION RH (CORRECTIF V2.9.2) - Correction alignement hauteur des boutons
// ------------------------------------------------------------------------------------------------
function renderRH() { 
    const t = document.getElementById('rh-body'); 
    t.innerHTML = ''; 
    const headers = document.querySelectorAll('#rh-table-list th');
    headers.forEach(h => { if(h.classList.contains('col-code-header')) h.style.display = showRhCodes ? 'table-cell' : 'none'; });

    // 1. CRÉATION D'UNE VUE TRIÉE (On garde l'index original en mémoire)
    // Cela permet d'afficher par ordre alphabétique sans casser les liens avec les Équipes Pédagogiques
    const sortedTeachers = DATA.teachers.map((t, index) => ({...t, originalIndex: index}));
    
    // Tri alphabétique (insensible à la casse et aux accents)
    sortedTeachers.sort((a, b) => a.name.localeCompare(b.name, 'fr', {sensitivity: 'base'}));

    // 2. BOUCLE D'AFFICHAGE SUR LA LISTE TRIÉE
    sortedTeachers.forEach((p) => { 
        // IMPORTANT : On utilise l'index original (p.originalIndex) pour toutes les modifications
        const i = p.originalIndex;

        // Initialisation des valeurs si manquantes
        if (p.csd === undefined) p.csd = 0;
        if (p.decharge === undefined) p.decharge = 0;
        if (p.dech_ext === undefined) p.dech_ext = 0;
        if (p.bmp === undefined) p.bmp = 0; 

        let metaCode = DATA.subjectMeta[p.subject]?.code || "";
        let codeHtml = showRhCodes ? `<td class="col-code">${metaCode}</td>` : '';
        
        let infoDisplay = ``;
        let rowStyle = ``;
        
        // Gestion des affichages conditionnels (Couleurs de lignes)
        if (p.bmp > 0) {
            infoDisplay += `<div style="font-size:0.7rem; color:#2c3e50; font-weight:bold;">★ BMP/CSR : ${p.bmp}h</div>`;
            rowStyle = `background: linear-gradient(90deg, #fff 0%, #ebf5fb 100%);`; 
        }
        if (p.csd > 0) {
            infoDisplay += `<div style="font-size:0.7rem; color:#17a2b8; font-weight:bold;">- ${p.csd}h CSD</div>`;
            if(!rowStyle) rowStyle = `background: linear-gradient(90deg, #fff 0%, #eefbfd 100%);`; 
        }
        if (p.decharge > 0) {
            infoDisplay += `<div style="font-size:0.7rem; color:#e67e22; font-weight:bold;">- ${p.decharge}h DGH</div>`;
            if(!rowStyle) rowStyle = `background: linear-gradient(90deg, #fff 0%, #fffcf5 100%);`; 
        }
        if (p.dech_ext > 0) {
            infoDisplay += `<div style="font-size:0.7rem; color:#27ae60; font-weight:bold;">- ${p.dech_ext}h Rect.</div>`;
            if(!rowStyle) rowStyle = `background: linear-gradient(90deg, #fff 0%, #eafaf1 100%);`; 
        }

        const btnStyle = "padding:2px 5px; margin:0; font-size:0.7rem;";
        
        // Boutons d'action (utilisent 'i', l'index original)
        const bmpBtn = `<button class="btn btn-sm" style="background:#34495e; color:white; ${btnStyle}" onclick="setBMP(${i})" title="Définir comme BMP">BMP</button>`;
        const csdBtn = `<button class="btn btn-sm" style="background:#17a2b8; color:white; ${btnStyle}" onclick="setCSD(${i})" title="CSD">CSD</button>`;
        const dechBtn = `<button class="btn btn-sm" style="background:#9b59b6; color:white; ${btnStyle}" onclick="openDechargeMenu(${i})" title="Décharge">Déch.</button>`;
        
        const children = DATA.subjects.filter(s => DATA.subjectMeta[s].parent === p.subject);
        let splitBtn = '';
        if (children.length > 0) {
            splitBtn = `<button class="btn btn-warning btn-sm" style="${btnStyle}" onclick="splitTeacher(${i})" title="Ventiler">✂️</button>`;
        }

        t.innerHTML += `<tr style="${rowStyle}">
            <td style="vertical-align:middle;"><input type="text" value="${p.name}" onchange="updT(${i},'name',this.value)"></td>
            ${codeHtml}
            <td style="vertical-align:middle;"><select onchange="updT(${i},'subject',this.value)">${DATA.subjects.map(s => `<option ${s === p.subject ? 'selected' : ''}>${s}</option>`).join('')}</select></td>
            <td style="vertical-align:middle;">
                <select onchange="updT(${i},'status',this.value)">
                    <option>Certifié</option>
                    <option ${p.status == 'Agrégé' ? 'selected' : ''}>Agrégé</option>
                    <option ${p.status == 'BMP/CSR' ? 'selected' : ''}>BMP/CSR</option>
                    <option ${p.status == 'Contractuel' ? 'selected' : ''}>Contractuel</option>
                </select>
            </td>
            
            <td style="vertical-align:middle;">
                <div style="display:flex; flex-direction:column; align-items:center;">
                    <input type="number" value="${p.ors}" step="0.5" style="width:60px; text-align:center;" onchange="updT(${i},'ors',this.value)">
                    ${infoDisplay}
                </div>
            </td>
            
            <td style="vertical-align:middle;"><input type="number" value="${p.hsa}" step="0.5" style="width:60px" onchange="updT(${i},'hsa',this.value)"></td>
            
            <td style="vertical-align:middle; font-weight:bold; color:var(--weight);">${getTeacherWeighting(i).toFixed(1)} h</td>
            
            <td style="vertical-align:middle;"><input type="number" value="${p.pacte || 0}" min="0" step="1" style="width:50px" onchange="updT(${i},'pacte',parseInt(this.value)||0)"></td>
            
            <td style="vertical-align:middle;">
                ${(() => {
                    const expected = p.ors + p.hsa - p.csd - p.decharge - p.dech_ext;
                    const pond = getTeacherWeighting(i);
                    const assigned = getGlobalTeacherService(i) + pond;
                    const diff = assigned - expected;
                    let alertRH = '';
                    if (diff < 0) {
                        alertRH = `<div style="color:var(--danger); font-size:0.75rem; font-weight:bold;">⚠️ Sous-service (${Math.abs(diff).toFixed(1)}h)</div>`;
                    } else if (diff > 0) {
                        alertRH = `<div style="color:var(--accent); font-size:0.75rem; font-weight:bold;">⚠️ Surcharge (${diff.toFixed(1)}h)</div>`;
                    }
                    if (p.hsa > 2) {
                        alertRH += `<div style="color:var(--danger); font-size:0.7rem;">⚠️ Max 2 HSA réglementaires</div>`;
                    }
                    return `<div><strong>${assigned.toFixed(1)}h</strong> <span style="font-size:0.75rem; color:var(--text-muted);">/ ${expected.toFixed(1)}h</span></div>${alertRH}`;
                })()}
            </td>
            
            <td style="vertical-align:middle; width:220px;">
                <div style="display:flex; justify-content:center; align-items:center; gap:4px; flex-wrap:wrap;">
                    ${splitBtn} ${bmpBtn} ${dechBtn} ${csdBtn}
                    <button class="btn btn-sm" style="background:#8e44ad; color:white; ${btnStyle}" onclick="exportTeacherServicePDF(${i})" title="Fiche Service PDF">📄 PDF</button>
                    <button class="btn btn-danger btn-sm" style="${btnStyle}" onclick="delT(${i})">X</button>
                </div>
            </td>
        </tr>`; 
    }); 
    
    if (document.getElementById('pilotage').classList.contains('active')) renderRHDisc(); 
    
    // Update KPIs
    const totalTeachersCount = DATA.teachers.length;
    const totalHSA = DATA.teachers.reduce((acc, curr) => acc + (parseFloat(curr.hsa) || 0), 0);
    const totalPacte = DATA.teachers.reduce((acc, curr) => acc + (parseInt(curr.pacte) || 0), 0);

    const kpiCount = document.getElementById('rh-kpi-count');
    const kpiHsa = document.getElementById('rh-kpi-hsa');
    const kpiPacte = document.getElementById('rh-kpi-pacte');
    if (kpiCount) kpiCount.innerText = totalTeachersCount;
    if (kpiHsa) kpiHsa.innerText = totalHSA.toFixed(1) + " h";
    if (kpiPacte) kpiPacte.innerText = totalPacte;
}

function setCSD(idx) {
    const teacher = DATA.teachers[idx];
    const current = teacher.csd || 0;
    
    const val = prompt(`Gérer le CSD (Complément de Service Donné) pour ${teacher.name}.\n\nCe professeur fera une partie de son service ailleurs.\nCombien d'heures fait-il À L'EXTÉRIEUR ?`, current);
    
    if (val !== null) {
        const hours = parseFloat(val);
        if (isNaN(hours) || hours < 0) return alert("Valeur invalide");
        if (hours >= teacher.ors) return alert("Le CSD ne peut pas être supérieur ou égal à l'ORS total !");
        
        teacher.csd = hours;
        saveData();
        renderRH();
        // On rafraîchit les tableaux de bord car l'apport change
        if (document.getElementById('rh-view-disc').style.display !== 'none') renderRHDisc();
        calculateRecap();
    }
}

function setDecharge(idx) {
    const teacher = DATA.teachers[idx];
    const current = teacher.decharge || 0;
    
    const val = prompt(`Gérer les Décharges / Heures de Labo pour ${teacher.name}.\n\nCes heures sont PAYÉES mais ne sont PAS des heures de cours (face élèves).\nEx: Heure de Vaisselle, Cabinet, Syndical...\n\nVolume à déduire du temps de cours :`, current);
    
    if (val !== null) {
        const hours = parseFloat(val);
        if (isNaN(hours) || hours < 0) return alert("Valeur invalide");
        if (hours >= teacher.ors) return alert("La décharge ne peut pas dépasser l'ORS !");
        
        teacher.decharge = hours;
        saveData();
        renderRH();
        if (document.getElementById('rh-view-disc').style.display !== 'none') renderRHDisc();
        calculateRecap();
    }
}

// ------------------------------------------------------------------------------------------------
// VENTILATION VISUELLE (V2.5) - Pop-up avec cases multiples
// ------------------------------------------------------------------------------------------------

let currentSplitIdx = -1; // Pour mémoriser quel prof on modifie

function splitTeacher(idx) {
    const teacher = DATA.teachers[idx];
    
    // 1. Trouver les sous-matières
    const children = DATA.subjects.filter(s => DATA.subjectMeta[s].parent === teacher.subject);
    
    if (children.length === 0) return alert("⚠️ Cette matière n'a aucune sous-matière rattachée (ex: UNSS, Section...) dans l'onglet 'Matières'.");

    currentSplitIdx = idx;
    
    // 2. Remplir les infos du Pop-up
    document.getElementById('split-info').innerHTML = `
        Professeur : ${teacher.name}<br>
        Discipline : ${teacher.subject}<br>
        <span style="display:block; margin-top:5px; border-top:1px solid #a2d9ce; padding-top:5px;">
        Disponible sur cette ligne : <strong>${teacher.ors} h</strong>
        </span>
    `;

    const container = document.getElementById('split-container');
    container.innerHTML = '';

    // 3. Générer une ligne pour chaque matière fille
    children.forEach(child => {
        container.innerHTML += `
            <div class="split-row">
                <label>${child}</label>
                <input type="number" id="split-val-${child}" placeholder="0" min="0" max="${teacher.ors}" step="0.5">
            </div>
        `;
    });

    // 4. Afficher le Pop-up
    document.getElementById('split-overlay').style.display = 'flex';
    
    // Focus sur la première case
    setTimeout(() => {
        const firstInput = container.querySelector('input');
        if(firstInput) firstInput.focus();
    }, 100);
}

function confirmVentilation() {
    if (currentSplitIdx === -1) return;
    
    const teacher = DATA.teachers[currentSplitIdx];
    const children = DATA.subjects.filter(s => DATA.subjectMeta[s].parent === teacher.subject);
    let totalVentile = 0;
    let newLines = [];

    // 1. On récupère les valeurs saisies
    for (let child of children) {
        const input = document.getElementById(`split-val-${child}`);
        const val = parseFloat(input.value);
        
        if (!isNaN(val) && val > 0) {
            totalVentile += val;
            newLines.push({ subject: child, hours: val });
        }
    }

    // 2. Vérifications
    if (totalVentile === 0) {
        return closeSplitModal(); // Rien à faire
    }
    if (totalVentile > teacher.ors) {
        alert(`⛔ Erreur : Vous essayez de ventiler ${totalVentile}h alors que le professeur n'a que ${teacher.ors}h sur cette ligne !`);
        return;
    }

    // 3. Application des changements
    // A. On réduit la ligne mère
    teacher.ors -= totalVentile;

    // B. On insère les nouvelles lignes juste en dessous
    // On inverse la boucle pour les insérer dans le bon ordre visuel
    for (let i = newLines.length - 1; i >= 0; i--) {
        const line = newLines[i];
        DATA.teachers.splice(currentSplitIdx + 1, 0, {
            name: teacher.name,
            subject: line.subject,
            status: teacher.status,
            ors: line.hours,
            hsa: 0 // Pas d'HSA sur les ventilations
        });
    }

    // 4. Sauvegarde et Fermeture
    saveData();
    renderRH();
    closeSplitModal();
    
    // Petit feedback sympa
    // alert(`✅ Ventilation effectuée avec succès !`); 
}

function closeSplitModal() {
    document.getElementById('split-overlay').style.display = 'none';
    currentSplitIdx = -1;
}

function updT(i,f,v){ 
    DATA.teachers[i][f]=(f=='ors'||f=='hsa')?parseFloat(v)||0:v; 
    saveData(); 
    
    // CORRECTION : Si on est sur l'onglet Pilotage, on rafraîchit le tableau de pilotage
    if(document.getElementById('pilotage').classList.contains('active')) {
        renderRHDisc(); 
    } else {
        renderRH(); // Sinon on rafraîchit la liste
    }
}
function addTeacherToSubject(s) { 
    DATA.teachers.push({name:"Nouveau", subject:s, status:"Certifié", ors:18, hsa:0, csd:0, decharge:0}); 
    renderRH(); 
    saveData(); 
    // CORRECTION : Si on est déjà sur le pilotage (ce qui est le cas quand on clique sur le +), on recharge le pilotage
    if(document.getElementById('pilotage').classList.contains('active')) renderRHDisc(); 
}
function delT(i){ DATA.teachers.splice(i,1); renderRH(); saveData(); }
function clearTeachers(){ if(confirm("Vider ?")) { DATA.teachers=[]; renderRH(); saveData(); } }
function promptAddTeacher() { 
    let s = prompt("Discipline ?"); 
    if(!s) return; 

    if(!DATA.subjects.includes(s)) { 
        if(confirm("La matière '" + s + "' n'existe pas. Voulez-vous la créer ?")) { 
            // 1. On ajoute le nom
            DATA.subjects.push(s); 
            
            // 2. CORRECTION : On initialise immédiatement les paramètres de la matière
            // (C'est cette partie qui manquait et faisait planter l'affichage)
            DATA.subjectMeta[s] = { 
                mode: 'div', 
                levels: getDefaultActiveLevels(s), 
                etab: 0, 
                volLevel: {}, 
                parent: "", 
                code: ""
            }; 

            // 3. On initialise les heures à 0 pour tous les niveaux
            DATA.structure.forEach(l => {
                if(!DATA.levelConfig[l.level]) DATA.levelConfig[l.level] = {};
                DATA.levelConfig[l.level][s] = {base:0, marge:0, coef:1.0};
            });

            saveData(); 
        } else {
            return; // Si on annule la création, on s'arrête là
        }
    } 
    
    // Si la matière existe (ou vient d'être créée proprement), on ajoute le prof
    addTeacherToSubject(s); 
}

function importRH(input) {
    const f = input.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = e => {
        try {
            const wb = XLSX.read(new Uint8Array(e.target.result), { type: 'array', codepage: 1252 });
            const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
            let cnt = 0;
            rows.forEach(r => {
                const get = k => r[Object.keys(r).find(x => x.trim().toLowerCase() === k.toLowerCase())];
                const n = get('Nom') || get('NOM');
                const d = get('Discipline') || get('DISCIPLINE');
                if (n && d) {
                    let codeRaw = "";
                    let codeMatch = d.match(/^([A-Z0-9]+)\s+/);
                    if (codeMatch) codeRaw = codeMatch[1];
                    let cl = d.replace(/^([A-Z0-9]+)\s+/, '').replace(/^[L]\d+\s+/, '').trim().toUpperCase();
                    let fin = cl;
                    
                    // Votre logique de mapping originale (V2.old) qui fonctionne bien pour vous
                    for (const [k, v] of Object.entries(SUBJECT_MAPPING))
                        if (cl.includes(k)) { fin = v; break; }

                    if (!DATA.subjects.includes(fin)) {
                        DATA.subjects.push(fin);
                        DATA.subjectMeta[fin] = { mode: 'div', levels: getDefaultActiveLevels(fin), etab: 0, volLevel: {}, parent: "", code: codeRaw };
                        DATA.structure.forEach(l => DATA.levelConfig[l.level][fin] = { base: 0, marge: 0, coef: 1.0 });
                    }

                    // --- MODIFICATION ICI ---
                    // On ajoute csd:0 et decharge:0 pour la compatibilité V2
                    DATA.teachers.push({ 
                        name: `${n} ${get('Prénom') || ''}`.trim(), 
                        subject: fin, 
                        status: "Certifié", 
                        ors: 18, 
                        hsa: 0,
                        csd: 0,       // Ajouté
                        decharge: 0   // Ajouté
                    });
                    cnt++;
                }
            });
            alert(`${cnt} importés`); renderRH(); saveData();
        } catch (err) {
            console.error(err); // J'ai ajouté ceci pour voir l'erreur précise dans la console (F12) au cas où
            alert("Erreur lors de l'import");
        }
        input.value = '';
    };
    r.readAsArrayBuffer(f);
}


function calculateRecap() { 
    // Sécurité : On vérifie que les besoins sont calculés
    const needs = (typeof calculateNeeds === 'function') ? calculateNeeds() : {};
    const t = document.getElementById('recap-body'); 
    if (!t) return; 
    t.innerHTML = ''; 
    
    // --- 1. CALCUL PASSERELLE EDS (Volume Dynamique) ---
    let totalHeuresEDS = 0;
    if (DATA.type !== 'college' && DATA.eds) {
        ['premiere', 'terminale'].forEach(lvl => {
            if (DATA.eds[lvl]) {
                DATA.eds[lvl].forEach(e => {
                    // Utilise le volume saisi par ligne ou le défaut officiel (4h/6h)
                    const vol = parseFloat(e.hPerGroup) || (lvl === 'premiere' ? 4 : 6);
                    totalHeuresEDS += (parseFloat(e.groups) || 0) * vol;
                });
            }
        });
    }

    // 2. Initialisation des compteurs et commentaires
    let res = {}; 
    let autoComments = {}; 

    DATA.subjects.forEach(s => {
        res[s] = { teaching:0, cost:0, hsa:0, dechInt:0 };
        autoComments[s] = []; 
    }); 
    
    // 3. Calculs issus des professeurs (Apports)
    DATA.teachers.forEach(p => {
        if (!p.subject) return;
        if (!res[p.subject]) res[p.subject] = { teaching:0, cost:0, hsa:0, dechInt:0 };
        if (!autoComments[p.subject]) autoComments[p.subject] = [];

        const csd = parseFloat(p.csd || 0);
        const dechInt = parseFloat(p.decharge || 0);
        const dechExt = parseFloat(p.dech_ext || 0);
        const ors = parseFloat(p.ors || 0);
        const hsa = parseFloat(p.hsa || 0);
        const bmp = parseFloat(p.bmp || 0);

        // Coût financier réel : (ORS - CSD - DechExterne) + HSA
        const financialCost = (ors - csd - dechExt) + hsa;
        
        res[p.subject].cost += financialCost;
        res[p.subject].hsa += hsa;
        res[p.subject].dechInt += dechInt;

        // Génération des tags automatiques (BMP, CSD)
        if (bmp > 0) autoComments[p.subject].push(`BMP ${bmp}h`);
        if (csd > 0) autoComments[p.subject].push(`CSD ${p.name} ${csd}h`);
    }); 
    
    // --- CORRECTIF ICI ---
    // On initialise l'apport à 0 (ce sont les profs qui vont le remplir plus bas)
    let globalNeed = totalHeuresEDS, totalApport = 0, totalHSA = 0;
    // ---------------------

    // 4. Fonction de rendu des lignes (Restauration de votre logique visuelle)
    const renderRow = (s, label, isPole, isChild) => {
        const stats = res[s] || { cost:0, hsa:0, dechInt:0 };
        const structNeed = needs[s] || 0;
        const totalNeed = structNeed + stats.dechInt; 
        const apport = stats.cost;
        const ecart = apport - totalNeed;
        const hpOnly = apport - stats.hsa;

        if (!isPole && totalNeed === 0 && apport === 0) return null;

        const meta = DATA.subjectMeta[s];
        const isCounted = (meta && meta.isCounted !== false);
        const safeS = s.replace(/'/g, "\\'");
        
        if (!DATA.recapComments) DATA.recapComments = {};
        const comm = DATA.recapComments[s] || ""; 
        
        let rowClass = "";
        let bgStyle = "";
        let nameStyle = "text-align:left; font-weight:bold;";
        
        if (isPole) rowClass = "row-header"; 
        else if (!isChild && !isPole) rowClass = "row-header"; 
        else if (isChild) { bgStyle = "background:#f9f9f9;"; nameStyle += " padding-left:20px;"; }
        else if (!isCounted) bgStyle = "background:#f4f6f6; color:#95a5a6; font-style:italic;";

        const badge = (!isPole && !isCounted && rowClass !== "row-header") ? '<span style="font-size:0.7rem; background:#95a5a6; color:white; padding:1px 4px; border-radius:3px; margin-left:5px;">HORS DHG</span>' : '';
        const isHeader = (rowClass === "row-header");

        const autoTags = autoComments[s] || [];
        let autoHTML = "";
        const alertColor = isHeader ? '#ffca28' : '#d35400'; 

        if (autoTags.length > 0 && !isPole) {
            autoHTML = `<div style="margin-bottom:4px; font-size:0.75rem; color:${alertColor}; font-weight:bold;">${autoTags.join(' / ')}</div>`;
        }

        return {
            html: `<tr class="${rowClass}" style="${bgStyle}">
                <td style="${nameStyle}; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${label} ${badge}</td>
                <td style="font-weight:bold; ${isHeader?'color:#f1c40f;':'color:#c0392b;'}">${totalNeed.toFixed(1)}</td>
                <td style="font-weight:bold; ${isHeader?'color:#81d4fa;':'color:#16a085;'}">${apport.toFixed(1)}</td>
                <td>${hpOnly.toFixed(1)}</td> 
                <td>${stats.hsa.toFixed(1)}</td>
                <td style="font-weight:bold; color:${ecart>=0?(isHeader?'#2ecc71':'green'):(isHeader?'#e74c3c':'red')};">${ecart.toFixed(1)}</td>
                <td style="padding:4px; vertical-align:middle;">
                    ${!isPole ? `${autoHTML}<input class="input-comment" value="${comm}" onchange="updComment('${safeS}',this.value)" style="width:100%; box-sizing:border-box; border:1px solid ${isHeader?'#78909c':'#ccc'}; padding:4px; color:black;" placeholder="Autre commentaire...">` : ''}
                </td>
            </tr>`,
            data: { need: totalNeed, apport: apport, hsa: stats.hsa, counted: isCounted }
        };
    };

    // --- 5. INSERTION DE LA LIGNE EDS (Gris Anthracite) ---
    if (totalHeuresEDS > 0) {
        t.innerHTML += `<tr class="row-header" style="background:#2c3e50; color:white;">
            <td style="text-align:left; font-weight:bold;">🎓 ENVELOPPE SPÉCIALITÉS (EDS)</td>
            <td style="color:#f1c40f;">${totalHeuresEDS.toFixed(1)}</td>
            <td style="color:#81d4fa;">-</td>
            <td>-</td>
            <td>-</td>
            <td style="color:#e74c3c;">-${totalHeuresEDS.toFixed(1)}</td>
            <td style="font-size:0.8rem; font-style:italic;">Besoin global à couvrir par les matières ci-dessous</td>
        </tr>`;
    }

    // 6. Boucle d'affichage des pôles et matières
    const roots = DATA.subjects.filter(s => DATA.subjectMeta[s] && !DATA.subjectMeta[s].parent).sort();

    roots.forEach(r => {
        const kids = DATA.subjects.filter(s => DATA.subjectMeta[s] && DATA.subjectMeta[s].parent === r);
        if (kids.length > 0) {
            let poleNeed = 0, poleApport = 0, poleHSA = 0;
            let rowsToRender = [];
            const rRow = renderRow(r, `↳ ${r}`, false, true);
            if (rRow) {
                if(rRow.data.counted) { poleNeed += rRow.data.need; poleApport += rRow.data.apport; poleHSA += rRow.data.hsa; }
                rowsToRender.push(rRow.html);
            }
            kids.forEach(k => {
                const kRow = renderRow(k, `↳ ${k}`, false, true);
                if (kRow) {
                    if(kRow.data.counted) { poleNeed += kRow.data.need; poleApport += kRow.data.apport; poleHSA += kRow.data.hsa; }
                    rowsToRender.push(kRow.html);
                }
            });
            const poleEcart = poleApport - poleNeed;
            const poleHPOnly = poleApport - poleHSA;
            if (rowsToRender.length > 0) {
                t.innerHTML += `<tr class="row-header">
                    <td style="text-align:left; font-weight:bold;">📦 PÔLE ${r.toUpperCase()}</td>
                    <td style="font-weight:bold; color:#f1c40f;">${poleNeed.toFixed(1)}</td>
                    <td style="font-weight:bold; color:#81d4fa;">${poleApport.toFixed(1)}</td>
                    <td>${poleHPOnly.toFixed(1)}</td>
                    <td>${poleHSA.toFixed(1)}</td>
                    <td style="font-weight:bold; background:${poleEcart>=0?'#27ae60':'#c0392b'}; color:white;">${poleEcart.toFixed(1)}</td>
                    <td></td>
                </tr>`;
                rowsToRender.forEach(html => t.innerHTML += html);
            }
            globalNeed += poleNeed; totalApport += poleApport; totalHSA += poleHSA;
        } else {
            const row = renderRow(r, r, false, false);
            if (row) {
                t.innerHTML += row.html;
                if(row.data.counted) { globalNeed += row.data.need; totalApport += row.data.apport; totalHSA += row.data.hsa; }
            }
        }
    });
    
    // 7. Mise à jour des Totaux (Pied de tableau)
    const totalEl = document.getElementById('recap-total');
    if(totalEl) {
        totalEl.innerHTML = `
            <td style="text-align:right;">TOTAL GÉNÉRAL</td>
            <td style="color:#c0392b; font-size:1.1rem;">${globalNeed.toFixed(1)}</td>
            <td style="color:#16a085; font-size:1.1rem;">${totalApport.toFixed(1)}</td>
            <td>${(totalApport - totalHSA).toFixed(1)}</td>
            <td>${totalHSA.toFixed(1)}</td>
            <td style="color:${(totalApport - globalNeed)>=0?'green':'red'}; font-size:1.1rem;">${(totalApport - globalNeed).toFixed(1)}</td>
            <td></td>`; 
    }
    
    // 8. Mise à jour des KPI du Dashboard d'accueil
    if(DATA.config && document.getElementById('dash-total-dhg')) {
        const g = DATA.config.total || 0; 
        document.getElementById('dash-total-dhg').innerText = g; 
        document.getElementById('dash-conso').innerText = totalApport.toFixed(1); 
        document.getElementById('dash-hsa').innerText = totalHSA.toFixed(1); 
        document.getElementById('dash-solde').innerText = (g - totalApport).toFixed(1);
        
        const hpUsed = Math.max(0, totalApport - totalHSA);
        document.getElementById('dash-hp-used').innerText = hpUsed.toFixed(1);

        const hsaInput = document.getElementById('global-hsa');
        const globalHsaInput = hsaInput ? (parseFloat(hsaInput.value) || 0) : 0;
        const globalDotation = parseFloat(document.getElementById('dash-total-dhg').innerText) || 0;
        let ratio = 0; if(globalDotation > 0) { ratio = (globalHsaInput / globalDotation) * 100; }
        document.getElementById('global-hsa-percent-display').innerText = ratio.toFixed(1) + "%";
    }
}
function renderFinalKPIs(need, apport, hsa) {
    const totalEl = document.getElementById('recap-total');
    if(totalEl) {
        totalEl.innerHTML = `
            <td style="text-align:right;">TOTAL GÉNÉRAL</td>
            <td style="color:#c0392b;">${need.toFixed(1)}</td>
            <td style="color:#16a085;">${apport.toFixed(1)}</td>
            <td>${(apport - hsa).toFixed(1)}</td><td>${hsa.toFixed(1)}</td>
            <td style="color:${(apport - need)>=0?'green':'red'};">${(apport - need).toFixed(1)}</td><td></td>`; 
    }
    // Mise à jour Dashboard
    document.getElementById('dash-conso').innerText = apport.toFixed(1);
    document.getElementById('dash-solde').innerText = (DATA.config.total - apport).toFixed(1);
}

function updComment(s,v){ if(!DATA.recapComments)DATA.recapComments={}; DATA.recapComments[s]=v; saveData(); }

// Variable globale pour savoir quelle page on est en train d'exporter
let pendingExportSection = "";
let pendingExportTitle = "";
function exportCurrentPage(type) {
    // 1. Identification de la section active
    const activeSection = document.querySelector('.section.active').id;
    
    // ========================================================================
    // CAS SPÉCIFIQUE : ONGLET RÉPARTITION
    // ========================================================================
    if (activeSection === 'repartition') {
        
        // A. Sous-vue "Par Enseignant" (Cartes visuelles)
        if (typeof currentRepartitionView !== 'undefined' && currentRepartitionView === 'profs') {
            if (type === 'excel') {
                alert("⛔ Export Excel impossible sur la vue 'Cartes Enseignants'.\n\nCette vue est graphique. Utilisez l'export PDF pour imprimer les fiches, ou passez en vue 'Par Matière' pour un export Excel.");
                return;
            }
            if (type === 'pdf') {
                // Lance la fonction PDF spécifique "Cartes"
                generateRepartitionProfsPDF(); 
                return;
            }
        } 
        
        // B. Sous-vue "Par Matière" (Tableaux)
        else {
            if (type === 'excel') {
                // Lance la fonction Excel spécifique (Multi-onglets par Pôle)
                exportRepartitionMatiereExcel(); 
                return;
            }
            if (type === 'pdf') {
                // Lance la fonction PDF spécifique (Sauts de page par Pôle)
                exportRepartitionMatierePDF(); 
                return;
            }
        }
    }

    // ========================================================================
    // CAS STANDARD : AUTRES ONGLETS
    // ========================================================================
    
    const dateStr = new Date().toLocaleDateString('fr-FR');
    let title = 'Export';
    let tableId = null;

    // Configuration des IDs de tableaux selon la page
    if (activeSection === 'dashboard') title = 'Tableau de Bord';
    else if (activeSection === 'structure') { title = 'Structure'; tableId = 'structure-table'; }
    else if (activeSection === 'ventilation') title = 'Grille Horaire'; 
    else if (activeSection === 'professeurs') { title = 'Liste des Enseignants'; tableId = 'rh-table-list'; }
    else if (activeSection === 'pilotage') { title = 'Ventilation par Matière'; tableId = 'rh-table-disc'; }
    else if (activeSection === 'recap') { title = 'Bilan'; tableId = 'recap-table'; }
    else if (activeSection === 'equipes') title = 'Equipes Pédagogiques';
    else if (activeSection === 'matieres') { title = 'Matières'; tableId = 'subjects-table'; }

    const filename = `DHG - ${title} - ${dateStr}`;

    // --- Export EXCEL Standard ---
    if (type === 'excel') {
        const wb = XLSX.utils.book_new();
        
        // Cas 1 : Tableaux complexes nécessitant un nettoyage (Inputs -> Texte)
        if (activeSection === 'ventilation' || activeSection === 'matieres' || activeSection === 'structure') {
            let grid = null;
            if (activeSection === 'ventilation') grid = document.querySelector('.grid-table');
            else if (activeSection === 'matieres') grid = document.getElementById('subjects-table');
            else if (activeSection === 'structure') grid = document.getElementById('structure-table');
            
            if(grid) {
                const cleanT = cleanTableForExport(grid);
                XLSX.utils.book_append_sheet(wb, XLSX.utils.table_to_sheet(cleanT), "Données");
            }
        }
        // Cas 2 : Tableaux simples via ID
        else if (tableId) {
            const el = document.getElementById(tableId);
            if(el) {
                const cleanT = cleanTableForExport(el);
                XLSX.utils.book_append_sheet(wb, XLSX.utils.table_to_sheet(cleanT), "Données");
            }
        }
        // Cas 3 : Pilotage (Tableau spécifique)
        else if (activeSection === 'pilotage') {
             const el = document.getElementById('rh-table-disc');
             if(el) XLSX.utils.book_append_sheet(wb, XLSX.utils.table_to_sheet(el), "Données");
        }
        // Cas 4 : Rien à exporter
        else {
            alert("Rien à exporter sur cette vue.");
            return;
        }
        
        XLSX.writeFile(wb, `${filename}.xlsx`);
    } 
    
    // --- Export PDF Standard (Via Modale) ---
    else if (type === 'pdf') {
        // On stocke le contexte et on ouvre la modale de choix (A4/A3, Portrait/Paysage)
        pendingExportSection = activeSection;
        pendingExportTitle = title;
        openExportModal();
    }
}

// --- UTILITAIRE : Convertit un index (0, 1, 2) en lettre Excel (A, B, C... AA, AB) ---
function getExcelAlpha(colIndex) {
    let temp, letter = '';
    while (colIndex >= 0) {
        temp = (colIndex) % 26;
        letter = String.fromCharCode(temp + 65) + letter;
        colIndex = (colIndex - temp - 1) / 26;
    }
    return letter;
}

function exportRepartitionMatiereExcel() {
    const wb = XLSX.utils.book_new();
    const roots = DATA.subjects.filter(s => !DATA.subjectMeta[s]?.parent).sort();

    // --- STYLES PREMUM (SLATE & EMERALD) ---
    const baseStyle = {
        border: {
            top: { style: "thin", color: { rgb: "BDC3C7" } },
            bottom: { style: "thin", color: { rgb: "BDC3C7" } },
            left: { style: "thin", color: { rgb: "BDC3C7" } },
            right: { style: "thin", color: { rgb: "BDC3C7" } }
        },
        font: { name: "Segoe UI", sz: 10 }
    };

    const headerStyle = {
        ...baseStyle,
        fill: { fgColor: { rgb: "2C3E50" } }, // Bleu ardoise foncé
        font: { name: "Segoe UI", sz: 10, bold: true, color: { rgb: "FFFFFF" } },
        alignment: { horizontal: "center", vertical: "center" }
    };

    const needStyle = {
        ...baseStyle,
        fill: { fgColor: { rgb: "EAFAF1" } }, // Vert émeraude très clair
        font: { name: "Segoe UI", sz: 10, italic: true, color: { rgb: "196F3D" } }
    };

    const relStyle = {
        ...baseStyle,
        fill: { fgColor: { rgb: "FDEDEC" } }, // Rouge très clair pour reliquat
        font: { name: "Segoe UI", sz: 10, bold: true, color: { rgb: "C0392B" } }
    };
    
    // Fonction nettoyage nom onglet
    const cleanSheetName = (name) => name.replace(/[\\/?*[\]]/g, ' ').substring(0, 31);

    roots.forEach(root => {
        const subjectsInPole = [root, ...DATA.subjects.filter(s => DATA.subjectMeta[s]?.parent === root)];
        let wsData = [];
        
        // Titre du Pôle (Ligne 1)
        wsData.push([{ v: `PÔLE : ${root.toUpperCase()}`, s: { font: { bold: true, sz: 14 } } }]);
        wsData.push([]); 

        subjectsInPole.forEach(sub => {
            const meta = DATA.subjectMeta[sub];
            if (!meta) return;
            const isLabo = (meta.code === 'LAB' && meta.parent);
            
            let profs = [];
            if (isLabo) profs = DATA.teachers.map((t, i) => ({...t, idx: i})).filter(t => t.subject === meta.parent);
            else profs = DATA.teachers.map((t, i) => ({...t, idx: i})).filter(t => t.subject === sub);
            if (profs.length === 0 && isLabo) return;

            // --- 1. PRÉPARATION DES COLONNES ---
            let colKeys = []; 
            let headerRow = [{ v: "Enseignant", s: headerStyle }];

            if (meta.mode === 'div') {
                DATA.structure.forEach(lvl => {
                    const prefix = getLevelPrefix(lvl.level);
                    for (let i = 0; i < lvl.div; i++) {
                        const cId = `${prefix}${String.fromCharCode(65 + i)}`;
                        const isActive = (meta.levels && meta.levels.includes(lvl.level));
                        const hasHours = getHoursForClassSubject(cId, lvl.level, sub) > 0;
                        
                        if (hasHours || isActive) {
                            headerRow.push({ v: DATA.classNames[cId] || cId, s: headerStyle });
                            
                            // ⬇️ C'EST ICI QUE C'ÉTAIT CORRIGÉ : Ajout de 'lvl: lvl.level'
                            colKeys.push({id: cId, type: 'class', lvl: lvl.level}); 
                        }
                    }
                });
            } else if (meta.mode === 'level') {
                DATA.structure.forEach(lvl => {
                    headerRow.push({ v: lvl.level, s: headerStyle });
                    colKeys.push({id: lvl.level, type: 'level'}); // Ici le niveau est l'ID
                });
            } else if (meta.mode === 'etab') {
                headerRow.push({ v: "Global", s: headerStyle });
                colKeys.push({id: 'ETAB', type: 'etab'});
            }

            if (colKeys.length === 0) return;

            // Colonnes Totaux
            headerRow.push(
                { v: "Total Matière", s: headerStyle },
                { v: "Service Global", s: headerStyle },
                { v: "Service Dû", s: headerStyle },
                { v: "Solde", s: headerStyle }
            );

            // Titre Matière
            wsData.push([{ v: `Matière : ${sub}`, s: { font: { bold: true, color: { rgb: "2F75B5" } } } }]);
            wsData.push(headerRow);
            
            // --- 2. LIGNE BESOIN (Cible) ---
            if (!isLabo) {
                let needRow = [{ v: "BESOIN (Cible)", s: needStyle }];
                
                colKeys.forEach(col => {
                    let besoin = 0;
                    // Maintenant 'col.lvl' existe bien, donc le calcul fonctionne !
                    if(col.type === 'class') besoin = getHoursForClassSubject(col.id, col.lvl, sub);
                    else if(col.type === 'level') besoin = (meta.volLevel && meta.volLevel[col.id]) || 0;
                    else if(col.type === 'etab') besoin = meta.etab || 0;
                    
                    // On force un Nombre (t:'n') pour que les formules Excel marchent
                    needRow.push({ v: besoin > 0 ? besoin : "", t: 'n', s: needStyle });
                });
                
                // Cellules vides de fin de ligne (pour le style)
                needRow.push({v:"", s:needStyle}, {v:"", s:needStyle}, {v:"", s:needStyle}, {v:"", s:needStyle});
                wsData.push(needRow);
            }

            // --- 3. LIGNES PROFS ---
            profs.forEach(p => {
                const currentRowNum = wsData.length + 1; // Index Excel (1-based)
                
                let row = [{ v: p.name, s: baseStyle }];

                colKeys.forEach(col => {
                    let val = 0;
                    if (isLabo) val = p.decharge || 0; 
                    else {
                        const key = `${col.id}_${p.idx}`;
                        const assign = DATA.assignments[key];
                        val = (assign && assign.quota !== undefined) ? assign.quota : 0;
                    }
                    row.push({ v: val > 0 ? val : "", t: 'n', s: baseStyle });
                });

                // FORMULE SOMME
                const startChar = getExcelAlpha(1); // "B"
                const endChar = getExcelAlpha(colKeys.length); 
                const formulaTotal = `SUM(${startChar}${currentRowNum}:${endChar}${currentRowNum})`;
                
                row.push({ t: 'n', f: formulaTotal, s: { ...baseStyle, font: { bold: true } } });

                // Services & Solde
                const serviceGlobal = getGlobalTeacherService(p.idx);
                const serviceDu = p.ors - (p.csd || 0);
                
                row.push({ v: serviceGlobal, t: 'n', s: baseStyle });
                row.push({ v: serviceDu, t: 'n', s: baseStyle });
                
                // Formule Solde
                const colGlobalChar = getExcelAlpha(colKeys.length + 2);
                const colDuChar = getExcelAlpha(colKeys.length + 3);
                const formulaSolde = `${colGlobalChar}${currentRowNum}-${colDuChar}${currentRowNum}`;
                
                row.push({ t: 'n', f: formulaSolde, s: { ...baseStyle, font: { bold: true } } });

                wsData.push(row);
            });

            // --- 4. LIGNE RELIQUAT ---
            if (!isLabo) {
                const currentRowNum = wsData.length + 1;
                const needRowNum = currentRowNum - profs.length - 1; // On remonte chercher la ligne Besoin

                let relRow = [{ v: "RELIQUAT", s: relStyle }];
                
                colKeys.forEach((col, idx) => {
                    const colChar = getExcelAlpha(idx + 1);
                    const profStartRow = needRowNum + 1;
                    const profEndRow = currentRowNum - 1;
                    
                    // Formule : = Besoin - SOMME(Profs)
                    let formulaRel = "";
                    if (profStartRow > profEndRow) {
                        // Cas sans profs : Reliquat = Besoin
                        formulaRel = `${colChar}${needRowNum}`;
                    } else {
                        formulaRel = `${colChar}${needRowNum}-SUM(${colChar}${profStartRow}:${colChar}${profEndRow})`;
                    }
                    
                    relRow.push({ t: 'n', f: formulaRel, s: baseStyle });
                });
                
                relRow.push({v:"", s:baseStyle}, {v:"", s:baseStyle}, {v:"", s:baseStyle}, {v:"", s:baseStyle});
                wsData.push(relRow);
            }

            wsData.push([]); 
            wsData.push([]); 
        });

        // Création de la feuille
        if (wsData.length > 2) {
            const ws = XLSX.utils.aoa_to_sheet([]);
            XLSX.utils.sheet_add_aoa(ws, wsData, { origin: "A1" });

            // Largeurs colonnes
            let maxColCount = 0;
            wsData.forEach(r => { if(r.length > maxColCount) maxColCount = r.length; });
            let wscols = [];
            for(let i=0; i<maxColCount; i++) wscols.push({wch: 12});
            wscols[0] = {wch: 25};
            ws['!cols'] = wscols;

            XLSX.utils.book_append_sheet(wb, ws, cleanSheetName(root));
        }
    });

    const dateStr = new Date().toLocaleDateString('fr-FR').replace(/\//g, '-');
    XLSX.writeFile(wb, `DHG_Repartition_Matieres_PRO_${dateStr}.xlsx`);
}

function exportRepartitionMatierePDF() {
    const { jsPDF } = window.jspdf;
    // Format Paysage obligatoire vu la largeur des tableaux
    const doc = new jsPDF({ orientation: 'landscape', format: 'a4' });
    
    const margin = 14;
    let cursorY = 20;
    const pageWidth = doc.internal.pageSize.width;

    // Fonction En-tête (répétée sur chaque page si besoin)
    const printHeader = (title) => {
        doc.setFillColor(44, 62, 80);
        doc.rect(0, 0, pageWidth, 15, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text(`DHG MANAGER - RÉPARTITION : ${title.toUpperCase()}`, margin, 10);
        doc.text(`Année ${DATA.config.year}`, pageWidth - margin, 10, { align: 'right' });
        cursorY = 25;
    };

    const roots = DATA.subjects.filter(s => !DATA.subjectMeta[s]?.parent).sort();
    let isFirstPage = true;

    roots.forEach(root => {
        const subjectsInPole = [root, ...DATA.subjects.filter(s => DATA.subjectMeta[s]?.parent === root)];
        
        // Vérifier s'il y a du contenu à afficher pour ce pôle
        // (Pour éviter de créer une page vide si le pôle est vide)
        let hasContent = subjectsInPole.some(sub => {
             const meta = DATA.subjectMeta[sub];
             // Logique simplifiée : si la matière existe, on suppose qu'il faut l'afficher
             return !!meta; 
        });

        if (!hasContent) return;

        // GESTION DU SAUT DE PAGE ENTRE PÔLES
        if (!isFirstPage) {
            doc.addPage();
            cursorY = 20;
        }
        isFirstPage = false;

        // Impression du Titre du Pôle (Haut de page)
        printHeader(root);

        // Boucle sur les matières du pôle
        subjectsInPole.forEach(sub => {
            const meta = DATA.subjectMeta[sub];
            if (!meta) return;

            const isLabo = (meta.code === 'LAB' && meta.parent);
            let profs = [];
            if (isLabo) profs = DATA.teachers.map((t, i) => ({...t, idx: i})).filter(t => t.subject === meta.parent);
            else profs = DATA.teachers.map((t, i) => ({...t, idx: i})).filter(t => t.subject === sub);

            if (profs.length === 0 && isLabo) return;

            // --- Préparation des colonnes pour le PDF ---
            let pdfColumns = [{ header: 'Enseignant', dataKey: 'name' }];
            let colKeys = [];

            if (meta.mode === 'div') {
                DATA.structure.forEach(lvl => {
                    const prefix = getLevelPrefix(lvl.level);
                    for (let i = 0; i < lvl.div; i++) {
                        const cId = `${prefix}${String.fromCharCode(65 + i)}`;
                        const isActive = (meta.levels && meta.levels.includes(lvl.level));
                        const hasHours = getHoursForClassSubject(cId, lvl.level, sub) > 0;
                        if (hasHours || isActive) {
                            pdfColumns.push({ header: DATA.classNames[cId] || cId, dataKey: cId });
                            colKeys.push({id: cId, lvl: lvl.level, type: 'class'});
                        }
                    }
                });
            } else if (meta.mode === 'level') {
                DATA.structure.forEach(lvl => {
                    pdfColumns.push({ header: lvl.level, dataKey: lvl.level });
                    colKeys.push({id: lvl.level, lvl: lvl.level, type: 'level'});
                });
            } else if (meta.mode === 'etab') {
                pdfColumns.push({ header: 'Global', dataKey: 'ETAB' });
                colKeys.push({id: 'ETAB', type: 'etab'});
            }

            if (colKeys.length === 0) return;

            // Colonnes de totaux
            pdfColumns.push(
                { header: 'Tot.', dataKey: 'total' },
                { header: 'Svc.', dataKey: 'global' },
                { header: 'Dû', dataKey: 'due' }
            );

            // --- Préparation des données (Lignes) ---
            let pdfRows = [];
            profs.forEach(p => {
                let row = { name: p.name };
                let rowTotal = 0;

                colKeys.forEach(col => {
                    let val = 0;
                    if (isLabo) val = p.decharge || 0;
                    else {
                        const key = `${col.id}_${p.idx}`;
                        const assign = DATA.assignments[key];
                        val = (assign && assign.quota !== undefined) ? assign.quota : 0;
                    }
                    if (val > 0) rowTotal += parseFloat(val);
                    row[col.id] = val > 0 ? val : "";
                });

                const serviceGlobal = getGlobalTeacherService(p.idx);
                const serviceDu = p.ors - (p.csd || 0);

                row.total = rowTotal.toFixed(1);
                row.global = serviceGlobal.toFixed(1);
                row.due = serviceDu.toFixed(1);
                
                // Info de style pour la ligne
                row._style_global = { textColor: serviceGlobal >= serviceDu ? [39, 174, 96] : [192, 57, 43], fontStyle: 'bold' };
                row._style_due = { textColor: [142, 68, 173] }; // Violet pour le dû
                
                pdfRows.push(row);
            });

            // Ligne Reliquat
            if (!isLabo) {
                let relRow = { name: "RELIQUAT" };
                colKeys.forEach(col => {
                    let assignedInCol = 0;
                    profs.forEach(p => {
                         const q = DATA.assignments[`${col.id}_${p.idx}`]?.quota || 0;
                         assignedInCol += parseFloat(q);
                    });
                    
                    let besoin = 0;
                    if(col.type === 'class') besoin = getHoursForClassSubject(col.id, col.lvl, sub);
                    else if(col.type === 'level') besoin = (meta.volLevel && meta.volLevel[col.id]) || 0;
                    else if(col.type === 'etab') besoin = meta.etab || 0;

                    const diff = besoin - assignedInCol;
                    relRow[col.id] = Math.abs(diff) < 0.01 ? "OK" : diff.toFixed(1);
                    
                    // Style conditionnel cellule
                    relRow[`_style_${col.id}`] = { 
                        textColor: Math.abs(diff) < 0.01 ? [39, 174, 96] : (diff > 0 ? [192, 57, 43] : [230, 126, 34]),
                        fontStyle: 'bold'
                    };
                });
                // Styles vides pour les totaux sur la ligne reliquat
                relRow.total = ""; relRow.global = ""; relRow.due = "";
                pdfRows.push(relRow);
            }

            // --- Génération du Tableau PDF ---
            
            // Titre de la matière
            doc.setFontSize(11);
            doc.setTextColor(52, 152, 219);
            doc.text(`${sub} (${isLabo ? 'Labo' : meta.mode})`, margin, cursorY + 5);
            
            doc.autoTable({
                startY: cursorY + 7,
                columns: pdfColumns,
                body: pdfRows,
                theme: 'grid',
                styles: { fontSize: 8, cellPadding: 1, textColor: 50, halign: 'center' },
                headStyles: { fillColor: [52, 73, 94], textColor: 255, fontStyle: 'bold' },
                columnStyles: { name: { halign: 'left', fontStyle: 'bold', cellWidth: 35 } },
                
                // Application des styles conditionnels
                didParseCell: function(data) {
                    if (data.section === 'body') {
                        const rowRaw = data.row.raw;
                        
                        // Style Colonne Totale Global Prof
                        if (data.column.dataKey === 'global' && rowRaw._style_global) {
                            data.cell.styles.textColor = rowRaw._style_global.textColor;
                            data.cell.styles.fontStyle = rowRaw._style_global.fontStyle;
                        }
                        // Style Colonne Dû
                        if (data.column.dataKey === 'due' && rowRaw._style_due) {
                            data.cell.styles.textColor = rowRaw._style_due.textColor;
                        }
                        // Style Cellules Reliquat
                        const styleMeta = rowRaw[`_style_${data.column.dataKey}`];
                        if (styleMeta) {
                            data.cell.styles.textColor = styleMeta.textColor;
                            data.cell.styles.fontStyle = styleMeta.fontStyle;
                        }
                        // Fond rouge pour la ligne Reliquat
                        if (rowRaw.name === "RELIQUAT" && data.column.dataKey === 'name') {
                             data.cell.styles.fontStyle = 'italic';
                             data.cell.styles.textColor = [192, 57, 43];
                        }
                    }
                },
                margin: { left: margin, right: margin }
            });

            cursorY = doc.lastAutoTable.finalY + 10;
            
            // Si on arrive en bas de page, on saute
            if (cursorY > doc.internal.pageSize.height - 20) {
                doc.addPage();
                cursorY = 20;
            }
        });
    });

    const dateStr = new Date().toLocaleDateString('fr-FR').replace(/\//g, '-');
    doc.save(`Repartition_Matiere_Par_Pole_${dateStr}.pdf`);
}

function generateRepartitionProfsPDF() {
    const { jsPDF } = window.jspdf;
    // Force paysage (Landscape) pour avoir de la place, format A4
    const doc = new jsPDF({ orientation: 'landscape', format: 'a4' });
    
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 14;
    let cursorY = 20;

    // --- EN-TÊTE DU DOCUMENT ---
    const addHeader = () => {
        doc.setFillColor(44, 62, 80); // Couleur Primary
        doc.rect(0, 0, pageWidth, 15, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text(`DHG MANAGER - RÉPARTITION PAR ENSEIGNANT`, margin, 10);
        doc.text(`Année ${DATA.config.year}`, pageWidth - margin, 10, { align: 'right' });
        cursorY = 25;
    };
    addHeader();

    // 1. Regroupement des données (Idem que l'affichage écran)
    const consolidated = {};
    DATA.teachers.forEach((t, idx) => {
        const cleanName = t.name.trim();
        if(!consolidated[cleanName]) {
            consolidated[cleanName] = { name: cleanName, indices: [], data: [] };
        }
        consolidated[cleanName].indices.push(idx);
        consolidated[cleanName].data.push(t);
    });

    // Tri alphabétique
    const groups = Object.values(consolidated).sort((a, b) => a.name.localeCompare(b.name));

    // 2. Boucle sur chaque professeur
    groups.forEach(group => {
        // --- Calculs (Copie de la logique écran) ---
        let totalServiceFait = 0;
        let totalDu = 0;
        let rows = [];

        // Matière principale
        let mainSub = group.data[0].subject;
        group.data.forEach(t => {
            const meta = DATA.subjectMeta[t.subject];
            const metaMain = DATA.subjectMeta[mainSub];
            if(DATA.subjects.some(s => DATA.subjectMeta[s]?.parent === t.subject)) mainSub = t.subject;
            if(metaMain?.parent === t.subject) mainSub = t.subject;
        });

        // Traitement des lignes
        group.data.forEach((t, i) => {
            const realIdx = group.indices[i];
            const csd = parseFloat(t.csd || 0);
            const dech = (parseFloat(t.decharge || 0) + parseFloat(t.dech_ext || 0));
            totalDu += (t.ors - csd);

            let levelsPaid = new Set();
            const relevantKeys = Object.keys(DATA.assignments).filter(k => parseInt(k.split('_')[1]) === realIdx);

            relevantKeys.forEach(key => {
                const parts = key.split('_');
                const assign = DATA.assignments[key];
                const entityId = parts.slice(0, parts.length - 1).join('_');
                const meta = DATA.subjectMeta[t.subject];
                
                let parentLevelName = null;
                const structLvlExact = DATA.structure.find(l => l.level === entityId);
                if (structLvlExact) parentLevelName = structLvlExact.level;
                else {
                    const structLvlPrefix = DATA.structure.find(l => entityId.startsWith(getLevelPrefix(l.level)));
                    if (structLvlPrefix) parentLevelName = structLvlPrefix.level;
                }

                let h = assign.quota !== undefined ? parseFloat(assign.quota) : 0;
                if(h === 0 && parentLevelName) h = getHoursForClassSubject(entityId, parentLevelName, t.subject);

                if(h > 0) {
                    let label = DATA.classNames[entityId] || entityId;
                    let typeBadge = "Cl.";
                    if (entityId === 'ETAB') { label = "Forfait Etab"; typeBadge = "Etab"; }
                    else if (structLvlExact) { typeBadge = "Niv"; }

                    let effectiveHours = h;
                    let isIncluded = false;

                    if (meta && meta.mode === 'level' && parentLevelName) {
                        if (levelsPaid.has(parentLevelName)) { effectiveHours = 0; isIncluded = true; }
                        else { levelsPaid.add(parentLevelName); effectiveHours = h; }
                    }

                    totalServiceFait += effectiveHours;
                    
                    let rowLabel = label;
                    if(t.subject !== mainSub) rowLabel += ` (${t.subject})`;

                    // Ajout au tableau PDF
                    rows.push({
                        col1: rowLabel,
                        col2: effectiveHours > 0 ? h.toFixed(1) : "(Incl.)",
                        col3: typeBadge,
                        isIncluded: isIncluded,
                        isDech: false
                    });
                }
            });

            if(dech > 0) {
                totalServiceFait += dech;
                rows.push({ col1: "Décharges / Autres", col2: dech.toFixed(1), col3: "Div.", isDech: true });
            }
        });

        // Calcul du solde et couleur
        const solde = totalServiceFait - totalDu;
        const isOk = solde >= -0.1;
        const colorHex = isOk ? "#27ae60" : "#c0392b"; // Vert ou Rouge
        const colorRGB = isOk ? [39, 174, 96] : [192, 57, 43];

        // --- RENDU SUR LE PDF ---

        // 1. Vérification de l'espace restant pour éviter de couper une carte
        // Estimation hauteur : Header (10) + Table (approx 7 par ligne) + Padding
        const estimatedHeight = 15 + (rows.length * 7) + 10;
        
        if (cursorY + estimatedHeight > pageHeight - 10) {
            doc.addPage();
            addHeader(); // Remettre l'en-tête sur la nouvelle page
        }

        // 2. Dessin du cadre "Carte"
        const cardStartY = cursorY;
        
        // Barre de couleur à gauche
        doc.setFillColor(colorRGB[0], colorRGB[1], colorRGB[2]);
        doc.rect(margin, cardStartY, 2, 8, 'F'); // Petite barre colorée visuelle

        // Titre Professeur
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(44, 62, 80);
        doc.text(`${group.name} - ${mainSub}`, margin + 4, cardStartY + 6);

        // Indicateur Solde (à droite)
        doc.setFontSize(10);
        doc.text(`Fait: ${totalServiceFait.toFixed(2)}h / Dû: ${totalDu.toFixed(1)}h`, pageWidth - margin - 30, cardStartY + 6, { align: 'right' });
        
        // Badge Solde
        doc.setFillColor(colorRGB[0], colorRGB[1], colorRGB[2]);
        doc.roundedRect(pageWidth - margin - 25, cardStartY + 1, 25, 7, 2, 2, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.text(`${solde > 0 ? '+' : ''}${solde.toFixed(2)}`, pageWidth - margin - 12.5, cardStartY + 5.5, { align: 'center' });

        cursorY += 10;

        // 3. Tableau des services (s'il y a des lignes)
        if (rows.length > 0) {
            doc.autoTable({
                startY: cursorY,
                head: [['Support / Classe', 'Heures', 'Type']],
                body: rows.map(r => [r.col1, r.col2, r.col3]),
                theme: 'grid',
                styles: { fontSize: 9, cellPadding: 1, textColor: 50 },
                headStyles: { fillColor: [236, 240, 241], textColor: 50, fontStyle: 'bold', lineWidth: 0.1, lineColor: 200 },
                columnStyles: {
                    0: { cellWidth: 'auto' },
                    1: { cellWidth: 20, halign: 'center', fontStyle: 'bold' },
                    2: { cellWidth: 15, halign: 'center', textColor: 100 }
                },
                didParseCell: function(data) {
                    // Style conditionnel (lignes grisées si incluses, etc.)
                    const rowRaw = rows[data.row.index];
                    if (data.section === 'body' && rowRaw) {
                        if (rowRaw.isIncluded) {
                            data.cell.styles.textColor = [150, 150, 150];
                            data.cell.styles.fillColor = [248, 249, 250];
                        }
                        if (rowRaw.isDech) {
                            data.cell.styles.textColor = [142, 68, 173]; // Violet pour décharges
                            data.cell.styles.fillColor = [244, 236, 247];
                        }
                    }
                },
                margin: { left: margin + 4, right: margin } // Indentation légère sous le titre
            });

            cursorY = doc.lastAutoTable.finalY + 8; // Espace après le tableau
        } else {
            // Cas sans service
            doc.setFont("helvetica", "italic");
            doc.setFontSize(9);
            doc.setTextColor(150);
            doc.text("(Aucun service saisi)", margin + 4, cursorY + 5);
            cursorY += 15;
        }
        
        // Ligne de séparation légère entre les profs (optionnel)
        doc.setDrawColor(230, 230, 230);
        doc.line(margin, cursorY - 4, pageWidth - margin, cursorY - 4);

    });

    // Finalisation
    const dateStr = new Date().toLocaleDateString('fr-FR').replace(/\//g, '-');
    doc.save(`Repartition_Service_Enseignants_${dateStr}.pdf`);
}

// Fonction appelée quand on clique sur "Télécharger" dans le pop-up
function confirmGlobalExport() {
    // Récupère les choix du menu
    const orientation = expConfig.orientation; // 'portrait' ou 'landscape'
    const format = expConfig.format;           // 'a3' ou 'a4'
    const forceOnePage = document.getElementById('chk-force-one-page').checked;
    
    // Ferme le menu
    document.getElementById('export-overlay').style.display = 'none';

    // Lance le bon export selon la section
    if (pendingExportSection === 'equipes') {
        exportTeamsGridPDF(orientation, format, forceOnePage);
    } else {
        const dateStr = new Date().toLocaleDateString('fr-FR');
        const filename = `DHG - ${pendingExportTitle} - ${dateStr}`;
        generateProPDF(pendingExportSection, pendingExportTitle, filename, orientation, format);
    }
}

// Nouvelle version de generateProPDF qui accepte le format et l'orientation
function generateProPDF(section, title, filename, customOrientation, customFormat) {
    const { jsPDF } = window.jspdf;
    
    // Si pas de choix (ex: appel direct), valeurs par défaut
    const orient = customOrientation || 'landscape';
    const fmt = customFormat || 'a4';

    const doc = new jsPDF({ orientation: orient, format: fmt });
    
    const pageWidth = doc.internal.pageSize.width;
    const margin = 14;

    // Ajustement de la taille de police de base selon le format pour remplir l'espace
    // A3 permet d'écrire plus gros ou d'avoir plus de colonnes
    let baseFontSize = (fmt === 'a3') ? 11 : 9;
    let headerFontSize = (fmt === 'a3') ? 11 : 9;

    // --- EN-TÊTE ---
    const addHeader = (data) => {
        doc.setTextColor(44, 62, 80);
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text(title.toUpperCase(), margin, 20); 
        
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(100); 
        doc.text(`Rentrée ${DATA.config.year} - ${DATA.config.year+1}`, pageWidth - margin, 20, { align: 'right' });
        
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, 25, pageWidth - margin, 25);
    };

    // --- VENTILATION (PILOTAGE) ---
    if (section === 'pilotage') {
        const needs = calculateNeeds();
        const rows = [];
        
        // (Logique de récupération des données identique...)
        const getStats = (sub) => {
            const profs = DATA.teachers.map((t, idx) => ({...t, idx: idx})).filter(t => t.subject === sub);
            const dechInt = profs.reduce((a,t)=>a+(t.decharge||0), 0);
            const dechExt = profs.reduce((a,t)=>a+(t.dech_ext||0), 0);
            const hp = profs.reduce((a,t)=> a + (t.ors - (t.csd||0) - (t.dech_ext||0)), 0);
            const hsa = profs.reduce((a,t)=>a+t.hsa, 0);
            const bes = (needs[sub] || 0) + dechInt;
            const app = hp + hsa;
            return { bes, app, hp, hsa, profs };
        };

        const roots = DATA.subjects.filter(s => !DATA.subjectMeta[s]?.parent).sort();
        
        roots.forEach(r => {
            const rStats = getStats(r);
            const kids = DATA.subjects.filter(s => DATA.subjectMeta[s]?.parent === r);
            
            if (kids.length > 0) {
                let poleBes = rStats.bes, poleApp = rStats.app, poleHP = rStats.hp, poleHSA = rStats.hsa;
                const kidsData = kids.map(k => {
                    const kStats = getStats(k);
                    poleBes += kStats.bes; poleApp += kStats.app; poleHP += kStats.hp; poleHSA += kStats.hsa;
                    return { name: k, stats: kStats };
                });
                const soldePole = poleApp - poleBes;

                rows.push({
                    col1: `PÔLE ${r.toUpperCase()}`,
                    col2: poleBes.toFixed(1), col3: poleApp.toFixed(1), col4: poleHP.toFixed(1), col5: poleHSA.toFixed(1), col6: soldePole.toFixed(1),
                    _style: { fillColor: [69, 90, 100], fontStyle: 'bold', textColor: 255 } // Gris Anthracite
                });

                addSubjectRows(rows, r, rStats, true);
                kidsData.forEach(kd => addSubjectRows(rows, kd.name, kd.stats, true));

            } else {
                // Matière Solo : Style "En-tête" aussi
                rows.push({
                    col1: r,
                    col2: rStats.bes.toFixed(1), col3: rStats.app.toFixed(1), col4: rStats.hp.toFixed(1), col5: rStats.hsa.toFixed(1), col6: (rStats.app - rStats.bes).toFixed(1),
                    _style: { fillColor: [69, 90, 100], fontStyle: 'bold', textColor: 255 } // Gris Anthracite
                });
                
                // Profs de la matière solo
                rStats.profs.forEach(p => addProfRow(rows, p, false));
            }
        });

        function addSubjectRows(targetArray, name, stats, indent) {
            // Pour les sous-matières dans un pôle
            if(stats.bes === 0 && stats.app === 0) return;
            const solde = stats.app - stats.bes;
            const label = indent ? `   ${name}` : name; 

            targetArray.push({
                col1: label,
                col2: stats.bes.toFixed(1), col3: stats.app.toFixed(1), col4: stats.hp.toFixed(1), col5: stats.hsa.toFixed(1), col6: solde.toFixed(1),
                _style: { fillColor: [245, 245, 245], fontStyle: 'bold', textColor: 0 } // Gris très clair
            });
            stats.profs.forEach(p => addProfRow(targetArray, p, true));
        }

        function addProfRow(targetArray, p, indent) {
            const realContrib = (p.ors - (p.csd||0) - (p.dech_ext||0)) + p.hsa;
            let info = ""; 
            if(p.bmp>0) info += `BMP ${p.bmp}h `;
            if(p.csd>0) info += `(Dont ${p.csd}h CSD) `;
            if(p.decharge>0) info += `(Dont ${p.decharge}h DGH) `;
            
            const profLabel = indent ? `      ${p.name} (${p.status})` : `   ${p.name} (${p.status})`;

            targetArray.push({
                col1: profLabel,
                col2: '', col3: '', 
                col4: `${p.ors} ${info}`, 
                col5: p.hsa, 
                col6: realContrib.toFixed(1),
                _style: { fillColor: [255, 255, 255], fontStyle: 'normal', textColor: 50 }
            });
        }

        doc.autoTable({
            head: [['Discipline / Enseignant', 'Besoin', 'Apport', 'HP', 'HSA', 'Solde']],
            body: rows.map(r => [r.col1, r.col2, r.col3, r.col4, r.col5, r.col6]),
            startY: 35,
            theme: 'grid',
            headStyles: { fillColor: [52, 152, 219], textColor: 255, fontStyle: 'bold', halign: 'center', fontSize: headerFontSize },
            styles: { fontSize: baseFontSize, cellPadding: 1.5, valign: 'middle', halign: 'center', lineColor: [200,200,200], lineWidth: 0.1 },
            columnStyles: { 0: { halign: 'left', cellWidth: 'auto' } },
            didParseCell: function(data) {
                const rowObj = rows[data.row.index];
                if (data.section === 'body' && rowObj && rowObj._style) {
                    data.cell.styles.fillColor = rowObj._style.fillColor;
                    data.cell.styles.fontStyle = rowObj._style.fontStyle;
                    data.cell.styles.textColor = rowObj._style.textColor;
                }
            },
            didDrawPage: addHeader,
            margin: { top: 35, bottom: 20, left: margin, right: margin }
        });
    }

    // --- AUTRES (BILAN, PROFS, ETC.) ---
    else {
        let sourceElem = null;
        if (section === 'professeurs') sourceElem = document.getElementById('rh-table-list'); 
        else if (section === 'recap') sourceElem = document.getElementById('recap-table');
        else if (section === 'ventilation') sourceElem = document.querySelector('.grid-table');
        else if (section === 'structure') sourceElem = document.getElementById('structure-table');
        else if (section === 'matieres') sourceElem = document.getElementById('subjects-table');

        if (!sourceElem && section !== 'dashboard') { alert("Rien à exporter."); return; }

        if (section === 'dashboard') {
             // (Code dashboard inchangé...)
             addHeader();
             doc.save(`${filename}.pdf`);
             return;
        }

        // Nettoyage avant export
        const cleanT = cleanTableForExport(sourceElem);
        
        doc.autoTable({
            html: cleanT,
            startY: 35,
            theme: 'grid',
            headStyles: { fillColor: [52, 152, 219], textColor: 255, fontStyle: 'bold', halign: 'center', fontSize: headerFontSize },
            styles: { fontSize: baseFontSize, textColor: 50, valign: 'middle', halign: 'center', cellPadding: 1 },
            
            // Gestion des couleurs pour le BILAN
            didParseCell: function(data) {
                if(section === 'recap' && data.section === 'body') {
                    const rowRaw = data.row.raw;
                    // Si la ligne a la classe "row-header" (notre gris anthracite)
                    if(rowRaw.classList && rowRaw.classList.contains('row-header')) {
                         data.cell.styles.fillColor = [69, 90, 100]; // Gris Anthracite
                         data.cell.styles.textColor = 255;
                         data.cell.styles.fontStyle = 'bold';
                    }
                }
            },
            
            didDrawPage: addHeader,
            margin: { top: 35, bottom: 20, left: margin, right: margin }
        });
    }

    doc.save(`${filename}.pdf`);
}

function cleanTableForExport(original) {
    if (!original) return null;
    const clone = original.cloneNode(true);

    // 1. Suppression Colonne Code
    const codeHeader = clone.querySelector('.col-code-header');
    if(codeHeader) codeHeader.remove();
    clone.querySelectorAll('.col-code').forEach(el => el.remove());

    // 2. Aplatissement des Inputs
    clone.querySelectorAll('.td-class').forEach(td => {
        const btn = td.querySelector('.class-name-btn');
        const name = btn ? btn.innerText : td.innerText;
        td.innerHTML = '';
        td.innerText = name.trim();
        td.style.fontWeight = 'bold';
        td.style.textAlign = 'center'; 
    });

    clone.querySelectorAll('.vertical-stack').forEach(stack => {
        const inputs = stack.querySelectorAll('input');
        if(inputs.length === 2) {
            const base = parseFloat(inputs[0].value || 0);
            const marge = parseFloat(inputs[1].value || 0);
            const span = document.createElement('span');
            span.innerText = marge > 0 ? `${base} + ${marge}` : base;
            span.style.whiteSpace = 'nowrap';
            stack.parentNode.replaceChild(span, stack);
        }
    });

    clone.querySelectorAll('input').forEach(input => {
        const span = document.createElement('span');
        span.innerText = input.value !== "" ? input.value : "";
        input.parentNode.replaceChild(span, input);
    });

    clone.querySelectorAll('select').forEach(select => {
        const span = document.createElement('span');
        span.innerText = select.options[select.selectedIndex]?.text || "";
        select.parentNode.replaceChild(span, select);
    });

    // 3. Nettoyage Interface
    clone.querySelectorAll('button, .del-badge, .btn, label, input[type=checkbox]').forEach(el => el.remove());

    // 4. Nettoyage En-têtes
    clone.querySelectorAll('th').forEach(th => {
        const text = th.innerText.trim().replace(/\s+/g, ' '); 
        th.innerHTML = text;
        th.style.width = 'auto';
        th.style.height = 'auto';
    });
    
    // 5. Suppression Colonne Actions
    const headers = clone.querySelectorAll('th');
    let actionIndex = -1;
    headers.forEach((th, idx) => {
        if(th.innerText.includes('Act') || th.innerText.includes('Suppr') || th.innerText.includes('Actions') || th.innerText.includes('Action')) actionIndex = idx;
    });
    
    if (actionIndex > -1) {
        headers[actionIndex].remove();
        clone.querySelectorAll('tbody tr').forEach(tr => {
            if(tr.cells.length > actionIndex) tr.deleteCell(actionIndex);
        });
    }

    // --- 6. OPTIMISATION ET NETTOYAGE DES ICONES ---
    clone.querySelectorAll('td').forEach(el => {
        // Suppression flèches
        if(el.innerText.includes('↳')) {
            el.innerText = el.innerText.replace(/↳/g, '').trim();
        }
        
        // AJOUT : Suppression de l'icône BOÎTE/POLE (📦) pour le PDF
        if(el.innerText.includes('📦')) {
            el.innerText = el.innerText.replace(/📦/g, '').trim();
        }
        
        // Nettoyage général
        el.innerHTML = el.innerText.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
        
        // Compactage visuel
        el.style.paddingLeft = '2px';
        el.style.textAlign = 'left';
    });

    return clone;
}

function renderTeams() {
    const t = document.getElementById('teams-table');
    if (!t) return;
    t.innerHTML = '';
    
    // Modification de la légende (inchangé)
    const legendContainer = t.closest('.card').querySelector('.card-header div[style*="font-style:italic"]');
    if (legendContainer) {
        legendContainer.innerHTML = `
            <span style="display:flex; align-items:center;"><span style="width:12px; height:12px; background:#27ae60; margin-right:4px;"></span>Classe</span>
            <span style="display:flex; align-items:center; margin-left:10px;"><span style="width:12px; height:12px; background:#3498db; margin-right:4px;"></span>Partage de classe</span>
            <span style="margin-left:10px;">👑 Clic Droit = Prof Principal</span>
            <span style="color:#c0392b; font-weight:bold; margin-left:10px;">Rouge = Prof manquant</span>
        `;
    }

    // Construction du Header (inchangé)
    let headerHTML = '<thead><tr><th style="min-width:220px; text-align:left; padding-left:10px;">Matière / Enseignant</th>';
    DATA.structure.forEach(lvl => {
        const prefix = getLevelPrefix(lvl.level);
        for(let i=0; i<lvl.div; i++) {
            const defId = `${prefix}${String.fromCharCode(65+i)}`;
            const displayName = DATA.classNames[defId] || defId;
            headerHTML += `<th style="width:45px; font-size:0.8rem;">${displayName}</th>`;
        }
    });
    headerHTML += '</tr></thead>';
    t.innerHTML = headerHTML;
    if (typeof renderPPSummaryTable === 'function') renderPPSummaryTable();
    
    const body = document.createElement('tbody');
    const roots = DATA.subjects.filter(s => !DATA.subjectMeta[s]?.parent).sort();
    const organized = [];
    
    // Organisation hiérarchique
    roots.forEach(r => { 
        organized.push({name: r, isChild: false}); 
        DATA.subjects.filter(s => DATA.subjectMeta[s]?.parent === r).forEach(c => organized.push({name: c, isChild: true, parent: r})); 
    });

    organized.forEach(subjItem => {
        const sub = subjItem.name;
        const meta = DATA.subjectMeta[sub] || {};
        let isSubjectVisible = false;

        // Vérification de visibilité (inchangé)
        DATA.structure.forEach(lvl => {
            const prefix = getLevelPrefix(lvl.level);
            for(let i=0; i<lvl.div; i++) {
                const cId = `${prefix}${String.fromCharCode(65+i)}`;
                if (getHoursForClassSubject(cId, lvl.level, sub) > 0) isSubjectVisible = true;
            }
        });
        
        if (!isSubjectVisible) return;

        // Titre de la section Matière
        body.innerHTML += `<tr class="team-subject-row"><td colspan="100%">${sub}</td></tr>`;

        // --- NOUVELLE LOGIQUE DE FUSION ---
        
        // 1. Les titulaires
        const mainProfs = DATA.teachers
            .map((p, idx) => ({...p, idx}))
            .filter(p => p.subject === sub);
            
        // 2. Les invités (Disciplines associées)
        let guestProfs = [];
        if (meta.linkedSubjects && meta.linkedSubjects.length > 0) {
            guestProfs = DATA.teachers
                .map((p, idx) => ({...p, idx}))
                .filter(p => meta.linkedSubjects.includes(p.subject));
        }

        // 3. Fusion et Tri
        const profs = [...mainProfs, ...guestProfs].sort((a, b) => a.name.localeCompare(b.name));
        
        // ----------------------------------

        profs.forEach(p => {
            // Affichage distinctif pour les invités
            let displayName = p.name;
            if (p.subject !== sub) {
                displayName += ` <span style="font-size:0.75rem; color:#e67e22; font-weight:normal;">(${p.subject})</span>`;
            }

            let rowHTML = `<tr><td class="team-teacher-label" title="${p.name}">${displayName}</td>`;
            
            // Génération des cellules (Logique inchangée)
            DATA.structure.forEach(lvl => {
                const prefix = getLevelPrefix(lvl.level);
                for(let i=0; i<lvl.div; i++) {
                    const cId = `${prefix}${String.fromCharCode(65+i)}`;
                    const key = `${cId}_${p.idx}`;
                    const assign = DATA.assignments[key];
                    const hours = getHoursForClassSubject(cId, lvl.level, sub);
                    
                    let cellClass = "cell-assign";
                    let content = "";
                    
                    if (hours <= 0) {
                        cellClass += " cell-disabled";
                    } else if (assign) {
                        cellClass += assign.mode === 'GROUP' ? " mode-group" : " mode-class";
                        content = assign.mode === 'GROUP' ? "👥" : "✅";
                        if(assign.isPP) cellClass += " is-pp";
                    } else {
                        cellClass += " missing-teacher";
                    }
                    
                    const actions = hours > 0 ? `onclick="toggleTeamAssign('${cId}', ${p.idx})" oncontextmenu="toggleTeamPP(event, '${cId}', ${p.idx})"` : "";
                    rowHTML += `<td><div class="${cellClass}" ${actions}>${content}</div></td>`;
                }
            });
            rowHTML += `</tr>`;
            body.innerHTML += rowHTML;
        });

        // Cas vide (inchangé)
        if(profs.length === 0) {
            let rowHTML = `<tr><td class="team-teacher-label" style="font-style:italic; color:#999;">(Aucun enseignant)</td>`;
            DATA.structure.forEach(lvl => {
                const prefix = getLevelPrefix(lvl.level);
                for(let i=0; i<lvl.div; i++) {
                    const cId = `${prefix}${String.fromCharCode(65+i)}`;
                    if (getHoursForClassSubject(cId, lvl.level, sub) <= 0) rowHTML += `<td><div class="cell-assign cell-disabled"></div></td>`;
                    else rowHTML += `<td><div class="cell-assign missing-teacher"></div></td>`;
                }
            });
            body.innerHTML += rowHTML + `</tr>`;
        }
    });
    t.appendChild(body);
}

function toggleTeamAssign(cId, tIdx) {
    const key = `${cId}_${tIdx}`;
    const teacher = DATA.teachers[tIdx];

    if (!DATA.assignments[key]) {
        const lvlName = DATA.structure.find(l => cId.startsWith(getLevelPrefix(l.level)))?.level;
        const h = getHoursForClassSubject(cId, lvlName, teacher.subject);
        DATA.assignments[key] = { mode: 'CLASS', quota: h, isPP: false };
    } else {
        delete DATA.assignments[key];
    }

    // Recalcul immédiat des modes pour la classe/matière
    const subject = teacher.subject;
    const assigned = DATA.teachers.map((t, i) => i)
        .filter(idx => DATA.assignments[`${cId}_${idx}`] && DATA.teachers[idx].subject === subject);

    const newMode = assigned.length > 1 ? 'GROUP' : 'CLASS';
    assigned.forEach(idx => { DATA.assignments[`${cId}_${idx}`].mode = newMode; });

    saveData();
    renderTeams();
}

// Clic Droit : Prof Principal
function toggleTeamPP(e, cId, tIdx) {
    e.preventDefault(); // Bloque le menu contextuel du navigateur
    if(!DATA.assignments) DATA.assignments = {};
    const key = `${cId}_${tIdx}`;
    
    // Si la case est vide, le clic droit l'active en "Classe entière" direct
    if(!DATA.assignments[key]) DATA.assignments[key] = { mode: 'CLASS', isPP: false };
    
    DATA.assignments[key].isPP = !DATA.assignments[key].isPP;
    saveData();
    renderTeams();
}

function exportTeamsListsPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    let pageAdded = false;

    DATA.structure.forEach(lvl => {
        const prefix = lvl.level.replace(/[^0-9]/g, '') || lvl.level.charAt(0);
        for(let i=0; i<lvl.div; i++) {
            const cId = `${prefix}${String.fromCharCode(65+i)}`;
            const displayName = DATA.classNames[cId] || cId;
            
            if(pageAdded) doc.addPage();
            pageAdded = true;

            // Titre Classe
            doc.setFillColor(44, 62, 80);
            doc.rect(0, 0, pageWidth, 25, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(16);
            doc.setFont("helvetica", "bold");
            doc.text(`ÉQUIPE PÉDAGOGIQUE - ${displayName}`, pageWidth/2, 16, { align: 'center' });

            let ppName = "Non désigné";
            for(const [key, val] of Object.entries(DATA.assignments)) {
                if(key.startsWith(cId+'_') && val.isPP) {
                    const idx = parseInt(key.split('_')[1]);
                    const teacher = DATA.teachers[idx];
                    if(teacher) {
                        const sub = teacher.subject;
                        const meta = DATA.subjectMeta[sub] || {};
                        let isActive = false;
                        if (meta.mode === 'div') {
                             const ov = DATA.classOverrides[cId] && DATA.classOverrides[cId][sub];
                             const cfg = DATA.levelConfig[lvl.level] && DATA.levelConfig[lvl.level][sub];
                             if( ((ov||cfg).base||0) + ((ov||cfg).marge||0) > 0 ) isActive = true;
                        } else if (meta.mode === 'level') {
                             if( (meta.volLevel && meta.volLevel[lvl.level] > 0) ) isActive = true;
                        }
                        if(isActive) ppName = teacher.name;
                    }
                }
            }

            doc.setFontSize(11);
            doc.text(`Professeur Principal : ${ppName}`, pageWidth/2, 23, { align: 'center' });

            const tableBody = [];
             const roots = DATA.subjects.filter(s => !DATA.subjectMeta[s]?.parent).sort();
             const organized = [];
             roots.forEach(r => { 
                organized.push(r); 
                DATA.subjects.filter(s => DATA.subjectMeta[s]?.parent === r).forEach(c => organized.push(c)); 
             });

             organized.forEach(sub => {
                 const meta = DATA.subjectMeta[sub] || {};
                 let hours = 0;
                 if (meta.mode === 'etab') return;

                 if (meta.mode === 'div') {
                     const ov = DATA.classOverrides[cId] && DATA.classOverrides[cId][sub];
                     const cfg = DATA.levelConfig[lvl.level] && DATA.levelConfig[lvl.level][sub];
                     if(ov || cfg) hours = ((ov||cfg).base||0) + ((ov||cfg).marge||0);
                 } else if (meta.mode === 'level') {
                     hours = (meta.volLevel && meta.volLevel[lvl.level]) || 0;
                 }
                 
                 if (hours <= 0) return; 

                 const assignedProfs = [];
                 DATA.teachers.forEach((t, idx) => {
                     if(t.subject === sub) {
                         const key = `${cId}_${idx}`;
                         if(DATA.assignments[key] && DATA.assignments[key].mode) {
                             let name = t.name;
                             // MODIFICATION ICI : Terme "Partage"
                             if(DATA.assignments[key].mode === 'GROUP') name += " (Partage)";
                             if(DATA.assignments[key].isPP) name += " (PP)";
                             assignedProfs.push(name);
                         }
                     }
                 });

                 if(assignedProfs.length > 0) {
                     tableBody.push([sub, assignedProfs.join(', ')]);
                 }
             });

            doc.autoTable({
                head: [['Matière', 'Enseignant(s)']],
                body: tableBody,
                startY: 35,
                theme: 'grid',
                headStyles: { fillColor: [52, 152, 219] },
                columnStyles: { 0: { fontStyle: 'bold', width: 60 } }
            });
        }
    });
    doc.save(`Equipes_Pedagogiques_${DATA.config.year}.pdf`);
}

// Variables d'état pour l'export
let expConfig = {
    orientation: 'landscape', // 'portrait' ou 'landscape'
    format: 'a3'              // 'a4' ou 'a3'
};

function openExportModal() {
    document.getElementById('export-overlay').style.display = 'flex';
    // On remet les valeurs par défaut visuellement
    setExportParam('orientation', 'landscape');
    setExportParam('format', 'a3');
}

function setExportParam(type, value) {
    // Mise à jour de la config
    expConfig[type] = value;
    
    // Mise à jour visuelle (Classe .selected)
    if (type === 'orientation') {
        document.getElementById('tile-orient-portrait').classList.toggle('selected', value === 'portrait');
        document.getElementById('tile-orient-landscape').classList.toggle('selected', value === 'landscape');
    } else if (type === 'format') {
        document.getElementById('tile-format-a4').classList.toggle('selected', value === 'a4');
        document.getElementById('tile-format-a3').classList.toggle('selected', value === 'a3');
    }
}

function confirmTeamExport() {
    const forceOnePage = document.getElementById('chk-force-one-page').checked;
    exportTeamsGridPDF(expConfig.orientation, expConfig.format, forceOnePage);
    document.getElementById('export-overlay').style.display = 'none';
}

function exportTeamsGridPDF(orientation, format, forceOnePage) {
    const { jsPDF } = window.jspdf;
    
    const doc = new jsPDF({ 
        orientation: orientation, 
        format: format 
    });
    
    const dateStr = new Date().toLocaleDateString('fr-FR');
    const pageWidth = doc.internal.pageSize.width;
    const margin = 14;

    // --- 1. EN-TÊTE ---
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("ÉQUIPES PÉDAGOGIQUES", margin, 15);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Version du ${dateStr}`, margin, 20);
    
    doc.setFontSize(9);
    doc.setTextColor(100);
    
    const legendX = orientation === 'landscape' ? pageWidth - margin : margin;
    const legendAlign = orientation === 'landscape' ? 'right' : 'left';
    const legendY = orientation === 'landscape' ? 15 : 25;
    
    // MODIFICATION DE LA LÉGENDE ICI
    doc.text("Légende : Vert = Classe | Bleu = Partage de classe | (PP) = Prof. Principal", legendX, legendY, { align: legendAlign });
    doc.setTextColor(0);

    let baseFontSize = 8;
    let cellPadding = 1;
    
    if (forceOnePage) {
        baseFontSize = 7;
        cellPadding = 0.8;
        if (orientation === 'portrait' && format === 'a4') {
            baseFontSize = 5;
            cellPadding = 0.5;
        } else if (format === 'a4' || orientation === 'portrait') {
            baseFontSize = 6;
        }
    } else {
        if (format === 'a3' && orientation === 'landscape') {
            baseFontSize = 10;
        }
    }

    const columns = [
        { header: 'Discipline / Enseignant', dataKey: 'libelle' }
    ];
    
    const classKeys = [];
    DATA.structure.forEach(lvl => {
        const prefix = lvl.level.replace(/[^0-9]/g, '') || lvl.level.charAt(0);
        for(let i=0; i<lvl.div; i++) {
            const cId = `${prefix}${String.fromCharCode(65+i)}`;
            const cName = DATA.classNames[cId] || cId;
            columns.push({ header: cName, dataKey: cId });
            classKeys.push(cId);
        }
    });

    const colNameWidth = (format === 'a3' && orientation === 'landscape') ? 80 : 50;
    const availableWidth = pageWidth - (margin * 2) - colNameWidth;
    const nbClasses = classKeys.length;
    const colClassWidth = nbClasses > 0 ? (availableWidth / nbClasses) : 20;

    let customColStyles = { 
        0: { cellWidth: colNameWidth, halign: 'left' } 
    };
    for(let i=1; i <= nbClasses; i++) {
        customColStyles[i] = { cellWidth: colClassWidth, halign: 'center' };
    }

    const rows = [];
    const roots = DATA.subjects.filter(s => !DATA.subjectMeta[s]?.parent).sort();
    const organized = [];
    roots.forEach(r => { 
        organized.push({name: r, isChild: false}); 
        DATA.subjects.filter(s => DATA.subjectMeta[s]?.parent === r).forEach(c => organized.push({name: c, isChild: true, parent: r})); 
    });

    organized.forEach(subjItem => {
        const sub = subjItem.name;
        let isVisible = false;
        const meta = DATA.subjectMeta[sub] || {};
        if (meta.mode !== 'etab') {
            DATA.structure.forEach(lvl => {
                 const prefix = lvl.level.replace(/[^0-9]/g, '') || lvl.level.charAt(0);
                 for(let i=0; i<lvl.div; i++) {
                    const cId = `${prefix}${String.fromCharCode(65+i)}`;
                    if (DATA.levelConfig[lvl.level] && DATA.levelConfig[lvl.level][sub] && DATA.levelConfig[lvl.level][sub].base > 0) isVisible = true;
                    if (DATA.classOverrides[cId] && DATA.classOverrides[cId][sub] && DATA.classOverrides[cId][sub].base > 0) isVisible = true;
                    if (meta.mode === 'level' && meta.volLevel && meta.volLevel[lvl.level] > 0) isVisible = true;
                 }
            });
        }
        if (!isVisible) return;

        rows.push({ libelle: sub, isSubjectRow: true });

        const profs = DATA.teachers.map((p, idx) => ({...p, idx})).filter(p => p.subject === sub);
        profs.forEach(p => {
            const pRow = { libelle: p.name, isSubjectRow: false };
            classKeys.forEach(cId => {
                const key = `${cId}_${p.idx}`;
                const assign = (DATA.assignments && DATA.assignments[key]) ? DATA.assignments[key] : null;
                if (assign) {
                    let txt = "";
                    if (assign.mode === 'CLASS') txt = "X";
                    // MODIFICATION ICI : Abréviation "Ptg" pour "Partage"
                    if (assign.mode === 'GROUP') txt = "Ptg";
                    if (assign.isPP) txt += " PP";
                    pRow[cId] = txt;
                    pRow[`_style_${cId}`] = {
                        fillColor: assign.mode === 'CLASS' ? [39, 174, 96] : [52, 152, 219],
                        textColor: 255,
                        fontStyle: assign.isPP ? 'bold' : 'normal'
                    };
                }
            });
            rows.push(pRow);
        });
    });

    doc.autoTable({
        columns: columns,
        body: rows,
        startY: orientation === 'landscape' ? 25 : 30,
        theme: 'grid',
        styles: { 
            fontSize: baseFontSize,
            cellPadding: cellPadding,
            valign: 'middle', 
            lineWidth: 0.1,
            lineColor: [200, 200, 200],
            overflow: 'linebreak'
        },
        headStyles: {
            fillColor: [44, 62, 80],
            textColor: 255,
            fontStyle: 'bold',
            halign: 'center',
            fontSize: baseFontSize + 1
        },
        columnStyles: customColStyles,
        didParseCell: function(data) {
            if (data.row.raw.isSubjectRow) {
                data.cell.styles.fillColor = [230, 230, 250];
                data.cell.styles.fontStyle = 'bold';
                data.cell.styles.textColor = [0, 0, 0];
                if(data.column.index > 0) data.cell.text = "";
            }
            if (!data.row.raw.isSubjectRow && data.column.dataKey !== 'libelle') {
                const styleMeta = data.row.raw[`_style_${data.column.dataKey}`];
                if (styleMeta) {
                    data.cell.styles.fillColor = styleMeta.fillColor;
                    data.cell.styles.textColor = styleMeta.textColor;
                    data.cell.styles.fontStyle = styleMeta.fontStyle;
                }
            }
        }
    });

    doc.save(`Equipes_Pedagogiques_${format.toUpperCase()}_${orientation}.pdf`);
}

// --- FONCTION DE MISE À JOUR DES COMPTEURS (WIDGET & GLOBALS) ---
function updateGridCounter() {
    if (!DATA) return;

    // --- 1. CALCUL GLOBAL ÉTABLISSEMENT ---
    let totalConsoEtab = 0;
    
    // A. Ajout des EDS (Le forfait global)
    if (DATA.type !== 'college' && DATA.eds) {
        ['premiere', 'terminale'].forEach(lvl => {
            if (DATA.eds[lvl]) {
                DATA.eds[lvl].forEach(e => {
                    const vol = parseFloat(e.hPerGroup) || (lvl === 'premiere' ? 4 : 6);
                    totalConsoEtab += (parseFloat(e.groups) || 0) * vol;
                });
            }
        });
    }

    // B. Ajout du Tronc Commun (On ignore les matières EDS ici)
    DATA.structure.forEach(lvl => {
        const prefix = getLevelPrefix(lvl.level);
        for(let i=0; i<lvl.div; i++) {
            const cId = `${prefix}${String.fromCharCode(65+i)}`;
            DATA.subjects.forEach(s => {
                const meta = DATA.subjectMeta[s];
                // CORRECTIF : On saute si c'est un EDS
                if (meta && meta.isEds) return; 

                if (meta && meta.mode === 'div') {
                    const cfg = (DATA.classOverrides && DATA.classOverrides[cId] && DATA.classOverrides[cId][s]) 
                                ? DATA.classOverrides[cId][s] 
                                : DATA.levelConfig[lvl.level][s];
                    if (cfg) totalConsoEtab += ((cfg.base||0) + (cfg.marge||0)) * (cfg.coef||1);
                }
            });
        }
        DATA.subjects.forEach(s => {
             const meta = DATA.subjectMeta[s];
             // CORRECTIF : On saute si c'est un EDS
             if (meta && meta.isEds) return;

             if (meta && meta.mode === 'level' && meta.volLevel && meta.volLevel[lvl.level]) {
                 totalConsoEtab += parseFloat(meta.volLevel[lvl.level] || 0);
             }
        });
    });

    // C. Ajout décharges et forfaits Etab
    DATA.subjects.forEach(s => { 
        if(DATA.subjectMeta[s] && DATA.subjectMeta[s].mode === 'etab') 
            totalConsoEtab += parseFloat(DATA.subjectMeta[s].etab || 0); 
    });
    DATA.teachers.forEach(t => { totalConsoEtab += parseFloat(t.decharge || 0); });

    // Mise à jour des Widgets
    const dotationEtab = DATA.config.total || 0;
    const soldeEtab = dotationEtab - totalConsoEtab;
    const etabValEl = document.getElementById('kpi-etab-val');
    if (etabValEl) {
        etabValEl.innerText = `${totalConsoEtab.toFixed(1)} / ${dotationEtab.toFixed(1)} h`;
        updateKpiTag('kpi-etab-diff', soldeEtab);
    }
    
    // (Le reste de la fonction pour le Widget Niveau reste identique...)
    const activeTab = document.querySelector('#grid-tabs .tab.active');
    const levelRow = document.getElementById('kpi-level-row');
    if (!activeTab || activeTab.classList.contains('global-tab')) {
        if (levelRow) levelRow.style.display = 'none';
    } else {
        if (levelRow) levelRow.style.display = 'flex';
        const levelName = activeTab.innerText;
        const lvlObj = DATA.structure.find(l => l.level === levelName);
        if (lvlObj) {
            const dotationNiveau = (lvlObj.div * lvlObj.target); 
            const grilleTotalEl = document.getElementById('total-final-grille');
            const consoNiveau = grilleTotalEl ? parseFloat(grilleTotalEl.innerText) : 0;
            const soldeNiveau = dotationNiveau - consoNiveau;
            const lvlValEl = document.getElementById('kpi-lvl-val');
            if (lvlValEl) {
                lvlValEl.innerText = `${consoNiveau.toFixed(1)} / ${dotationNiveau.toFixed(1)} h`;
                updateKpiTag('kpi-lvl-diff', soldeNiveau);
            }
        }
    }
}

// Petit helper pour la couleur du badge (Correctif inclus)
function updateKpiTag(id, val) {
    const el = document.getElementById(id);
    if(!el) return;
    const sign = val > 0 ? "+" : "";
    el.innerText = `${sign}${val.toFixed(1)}`;
    el.className = 'kpi-tag'; 
    if(Math.abs(val) < 0.1) el.classList.add('bg-nul');
    else if(val > 0) el.classList.add('bg-pos');
    else el.classList.add('bg-neg');
}


function changeTab(el, idx) {
    document.querySelectorAll('#grid-tabs .tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    window.lastActiveGridTab = idx;
    if(idx === -1) renderGlobalGrid();
    else renderLevelGrid(idx);
    
    // AJOUT ICI : Mettre à jour le compteur (Etab + Niveau actif)
    updateGridCounter();
}

/* --- GESTION AVANCÉE DES DÉCHARGES --- */
let currentDechIdx = -1;

function openDechargeMenu(idx) {
    currentDechIdx = idx;
    const t = DATA.teachers[idx];
    
    // On remplit les champs du pop-up avec les valeurs actuelles du prof
    document.getElementById('dech-teacher-name').innerText = t.name;
    document.getElementById('input-dech-int').value = t.decharge || 0;
    document.getElementById('input-dech-ext').value = t.dech_ext || 0;
    
    // Affichage du pop-up
    document.getElementById('dech-overlay').style.display = 'flex';
    document.getElementById('input-dech-int').focus();
}

function saveDechargeDetails() {
    if (currentDechIdx === -1) return;
    
    const valInt = parseFloat(document.getElementById('input-dech-int').value) || 0;
    const valExt = parseFloat(document.getElementById('input-dech-ext').value) || 0;
    
    const t = DATA.teachers[currentDechIdx];
    
    // Vérification de cohérence avant modification
    if ((valInt + valExt) > t.ors) {
        alert("Attention : Le total des décharges dépasse l'ORS du professeur !");
        return;
    }
    
    // On applique les modifications seulement maintenant
    t.decharge = valInt;
    t.dech_ext = valExt;
    
    // Sauvegarde et mise à jour de l'interface
    saveData();
    
    // Fermeture du pop-up AVANT les rafraîchissements lourds pour éviter les blocages visuels
    document.getElementById('dech-overlay').style.display = 'none';
    
    // Mise à jour des tableaux
    renderRH();
    if (document.getElementById('pilotage').classList.contains('active')) renderRHDisc();
    calculateRecap();
    
    currentDechIdx = -1;
}

function setBMP(idx) {
    const t = DATA.teachers[idx];
    const current = t.bmp || 0;
    
    const val = prompt(`Gérer BMP / CSR pour ${t.name}.\n\nSaisissez le volume horaire de ce bloc.\n(Cela remplacera automatiquement la valeur de l'ORS).`, current);
    
    if (val !== null) {
        const hours = parseFloat(val);
        if (isNaN(hours) || hours < 0) return alert("Valeur invalide");
        
        t.bmp = hours;
        
        // Logique métier : Si c'est un BMP, l'ORS devient égal au volume du BMP
        if (hours > 0) {
            t.ors = hours;
            t.status = "BMP/CSR"; // On met à jour le statut automatiquement
        } else {
            // Si on remet à 0, on repasse en Certifié par défaut (à ajuster manuellement si besoin)
            if(t.status === "BMP/CSR") t.status = "Certifié";
        }

        saveData();
        
        // Rafraîchissement intelligent selon la page active
        if (document.getElementById('pilotage').classList.contains('active')) {
            renderRHDisc();
        } else {
            renderRH();
        }
        calculateRecap();
    }
}

/* --- EXPORT PPTX POUR CA (VERSION NETTOYÉE - SANS EDS DANS LES GRILLES) --- */
function generateCAPres() {
    let pptx = new PptxGenJS();
    pptx.layout = 'LAYOUT_16x9'; 
    
    const colors = {
        primary: "2C3E50", secondary: "3498DB", accent: "E67E22",
        tableHeader: "34495E", tableRowAlt: "F4F6F6", success: "27AE60",
        danger: "C0392B", poleHeader: "455A64", text: "2C3E50",
        white: "FFFFFF", black: "000000", border: "BDC3C7"
    };

    const headerStyles = { fill: colors.tableHeader, color: colors.white, bold: true, halign: 'center', valign:'middle' };
    const stdBorder = { pt: 0.5, color: colors.border };
    const chunkArray = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));
    const addFooter = (slide, text) => {
        slide.addText(text, { x: 0.5, y: 5.3, fontSize: 8, color: "95A5A6" });
        slide.addText(`DHG ${DATA.config.year}`, { x: 9, y: 5.3, w:0.5, fontSize: 8, color: "95A5A6", align:'right' });
    };

    // --- SLIDE 1 : COUVERTURE ---
    let s1 = pptx.addSlide();
    s1.background = { color: "ECF0F1" };
    s1.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.6, h: '100%', fill: colors.primary });
    s1.addText("CONSEIL D'ADMINISTRATION", { x: 1.2, y: 1.8, w: '80%', fontSize: 20, bold: true, color: colors.secondary, spc:2 });
    s1.addText("PRÉPARATION DE LA RENTRÉE", { x: 1.2, y: 2.4, w: '80%', fontSize: 36, bold: true, color: colors.primary });
    s1.addText(`PROJET DE RÉPARTITION DE LA DHG`, { x: 1.2, y: 3.2, w: '80%', fontSize: 16, bold: true, color: colors.accent });
    s1.addText(`Année Scolaire ${DATA.config.year} - ${DATA.config.year + 1}`, { x: 1.2, y: 4.0, w: '80%', fontSize: 16, color: "7F8C8D", italic:true });

    // --- SLIDE 2 : STRUCTURE & DOTATION ---
    let s2 = pptx.addSlide();
    s2.addText("1. Structure & Moyens", { x: 0.5, y: 0.3, fontSize: 18, bold: true, color: colors.primary });
    s2.addShape(pptx.ShapeType.line, { x:0.5, y:0.7, w:9, h:0, line:{color:colors.accent, width:2} });

    let structHeaders = [
        { text: "Niveau", options: { ...headerStyles, fill: colors.secondary, w: 1.1 } },
        { text: "Eff.", options: { ...headerStyles, fill: colors.secondary, w: 0.7 } },
        { text: "Div.", options: { ...headerStyles, fill: colors.secondary, w: 0.6 } },
        { text: "E/D", options: { ...headerStyles, fill: colors.secondary, w: 0.7 } },
        { text: "H/Div", options: { ...headerStyles, fill: colors.secondary, w: 0.8 } },
        { text: "Dotation", options: { ...headerStyles, fill: colors.primary, w: 1.1 } }
    ];

    let structRows = [];
    let totEleves = 0, totDiv = 0, totDot = 0;

    DATA.structure.forEach(lvl => {
        const div = parseFloat(lvl.div) || 0;
        const target = parseFloat(lvl.target) || 0;
        let need = div * target;

        structRows.push([
            { text: lvl.level, options: { bold: true, align: 'left', border: stdBorder } },
            { text: lvl.students.toString(), options: { border: stdBorder } },
            { text: div.toString(), options: { border: stdBorder } },
            { text: div > 0 ? (lvl.students/div).toFixed(1) : "-", options: { border: stdBorder } },
            { text: target.toFixed(1), options: { border: stdBorder, fill: "F4F6F6" } },
            { text: need.toFixed(1), options: { bold: true, color: colors.primary, border: stdBorder } }
        ]);

        totEleves += lvl.students; 
        totDiv += div; 
        totDot += need;
    });

    const supp = DATA.additionalMeans ? parseFloat(DATA.additionalMeans.total || 0) : 0;
    if(supp > 0) {
        structRows.push([
            { text: "Moyens Supplémentaires", options: { colspan: 5, align: 'right', italic: true, color: "8D6E63", fill: colors.white, border: stdBorder } }, 
            { text: "+ " + supp.toFixed(1), options: { bold: true, color: colors.accent, fill: colors.white, border: stdBorder, align: 'center' } }
        ]);
        totDot += supp;
    }
    
    structRows.push([
        { text: "TOTAL", options: { fill: "D5D8DC", bold: true, border: stdBorder } }, 
        { text: totEleves.toString(), options: { fill: "D5D8DC", bold: true, border: stdBorder } }, 
        { text: totDiv.toString(), options: { fill: "D5D8DC", bold: true, border: stdBorder } }, 
        { text: totDiv>0?(totEleves/totDiv).toFixed(1):"-", options: { fill: "D5D8DC", bold: true, border: stdBorder } }, 
        { text: "-", options: { fill: "D5D8DC", bold: true, border: stdBorder } }, 
        { text: totDot.toFixed(1), options: { fill: "D5D8DC", bold: true, color: colors.primary, border: stdBorder } }
    ]);
    
    s2.addTable([structHeaders, ...structRows], { x: 0.5, y: 1.2, w: 5.0, fontSize: 10, rowH: 0.35, align:'center', valign:'middle', fill: { color: colors.tableRowAlt } });

    const dhgTotale = parseFloat(DATA.config.total || 0);
    const hp = parseFloat(DATA.config.hp || 0);
    const hsa = parseFloat(DATA.config.hsa || 0);
    const percentHSA = dhgTotale > 0 ? ((hsa / dhgTotale) * 100).toFixed(1) : 0;
    
    // Remplacement par des cartes KPI Premium
    s2.addShape(pptx.ShapeType.rect, { x: 5.8, y: 1.2, w: 3.7, h: 1.0, fill: "F2F4F4", line: {color: colors.primary, width: 1.5} });
    s2.addText("DOTATION GLOBALE (DHG)", { x: 5.9, y: 1.3, w: 3.5, fontSize: 10, bold: true, color: colors.primary });
    s2.addText(`${dhgTotale.toFixed(1)} h`, { x: 5.9, y: 1.6, w: 3.5, fontSize: 22, bold: true, color: colors.primary });

    s2.addShape(pptx.ShapeType.rect, { x: 5.8, y: 2.4, w: 3.7, h: 1.0, fill: "EBF5FB", line: {color: colors.secondary, width: 1} });
    s2.addText("DONT HEURES POSTES (HP)", { x: 5.9, y: 2.5, w: 3.5, fontSize: 10, bold: true, color: colors.secondary });
    s2.addText(`${hp.toFixed(1)} h`, { x: 5.9, y: 2.8, w: 3.5, fontSize: 20, bold: true, color: colors.secondary });

    s2.addShape(pptx.ShapeType.rect, { x: 5.8, y: 3.6, w: 3.7, h: 1.0, fill: "FEF5E7", line: {color: colors.accent, width: 1} });
    s2.addText(`DONT HSA (${percentHSA}%)`, { x: 5.9, y: 3.7, w: 3.5, fontSize: 10, bold: true, color: colors.accent });
    s2.addText(`${hsa.toFixed(1)} h`, { x: 5.9, y: 4.0, w: 3.5, fontSize: 20, bold: true, color: colors.accent });

    addFooter(s2, "Structure prévisionnelle");

    // --- SLIDE 3 : [NOUVEAU] BUDGET PRÉVISIONNEL ---
    let sBudget = pptx.addSlide();
    sBudget.addText("2. Estimation Budgétaire (HSA & Pactes)", { x: 0.5, y: 0.3, fontSize: 18, bold: true, color: colors.primary });
    sBudget.addShape(pptx.ShapeType.line, { x:0.5, y:0.7, w:9, h:0, line:{color:colors.success, width:2} });
    
    // Calcul des coûts
    let costHSA = 0, costPacte = 0;
    DATA.teachers.forEach(p => {
        const hsa = parseFloat(p.hsa) || 0;
        const pacte = parseInt(p.pacte) || 0;
        const status = (p.status || "").toLowerCase();
        if (hsa > 0) {
            costHSA += hsa * (status.includes('agrégé') || status.includes('agrege') ? 1800 : 1400);
        }
        costPacte += pacte * 1250;
    });

    sBudget.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.5, w: 2.8, h: 2.5, fill: "F9EBEA", line: {color: colors.danger, width: 1.5} });
    sBudget.addText("ENVELOPPE HSA", { x: 0.6, y: 1.7, w: 2.6, fontSize: 12, bold: true, color: colors.danger, align: 'center' });
    sBudget.addText(`${costHSA.toLocaleString('fr-FR')} €`, { x: 0.6, y: 2.3, w: 2.6, fontSize: 26, bold: true, color: colors.danger, align: 'center' });
    sBudget.addText("Tarifs indicatifs moyens :\n1400€ Certifié / 1800€ Agrégé", { x: 0.6, y: 3.2, w: 2.6, fontSize: 8, color: "7F8C8D", align: 'center' });

    sBudget.addShape(pptx.ShapeType.rect, { x: 3.6, y: 1.5, w: 2.8, h: 2.5, fill: "EBF5FB", line: {color: colors.secondary, width: 1.5} });
    sBudget.addText("ENVELOPPE PACTE", { x: 3.7, y: 1.7, w: 2.6, fontSize: 12, bold: true, color: colors.secondary, align: 'center' });
    sBudget.addText(`${costPacte.toLocaleString('fr-FR')} €`, { x: 3.7, y: 2.3, w: 2.6, fontSize: 26, bold: true, color: colors.secondary, align: 'center' });
    sBudget.addText("Base de 1250€\npar brique affectée", { x: 3.7, y: 3.2, w: 2.6, fontSize: 9, color: "7F8C8D", align: 'center' });

    sBudget.addShape(pptx.ShapeType.rect, { x: 6.7, y: 1.5, w: 2.8, h: 2.5, fill: "EAF2F8", line: {color: colors.primary, width: 2} });
    sBudget.addText("TOTAL BUDGET", { x: 6.8, y: 1.7, w: 2.6, fontSize: 14, bold: true, color: colors.primary, align: 'center' });
    sBudget.addText(`${(costHSA + costPacte).toLocaleString('fr-FR')} €`, { x: 6.8, y: 2.3, w: 2.6, fontSize: 28, bold: true, color: colors.success, align: 'center' });
    sBudget.addText("Moyens annuels totaux\nestimés pour l'établissement", { x: 6.8, y: 3.2, w: 2.6, fontSize: 9, color: "7F8C8D", align: 'center' });

    addFooter(sBudget, "Éléments de cadrage financier");

    // --- SLIDE 4 : [NOUVEAU] DIAGNOSTIC DE COUVERTURE ---
    let sDiag = pptx.addSlide();
    sDiag.addText("3. Diagnostic Adéquation Offre / Besoin", { x: 0.5, y: 0.3, fontSize: 18, bold: true, color: colors.primary });
    sDiag.addShape(pptx.ShapeType.line, { x:0.5, y:0.7, w:9, h:0, line:{color:colors.accent, width:2} });

    // Calcul couverture
    const needs = (typeof calculateNeeds === 'function') ? calculateNeeds() : {};
    let res = {}; 
    DATA.subjects.forEach(s => { res[s] = { cost: 0, dechInt: 0 }; }); 
    DATA.teachers.forEach(p => {
        if (!p.subject) return;
        if (!res[p.subject]) res[p.subject] = { cost: 0, dechInt: 0 };
        res[p.subject].cost += (p.ors - (p.csd||0) - (p.dech_ext||0)) + p.hsa;
        res[p.subject].dechInt += parseFloat(p.decharge || 0);
    });

    let deficits = [], balances = [], surpluses = [];
    DATA.subjects.forEach(s => {
        const stats = res[s] || { cost: 0, dechInt: 0 };
        const structNeed = needs[s] || 0;
        const totalNeed = structNeed + stats.dechInt;
        const apport = stats.cost;
        const ecart = apport - totalNeed;
        
        if (totalNeed > 0 || apport > 0) {
            if (ecart < 0) deficits.push(`${s} (${ecart.toFixed(1)}h)`);
            else if (ecart > 0) surpluses.push(`${s} (+${ecart.toFixed(1)}h)`);
            else balances.push(s);
        }
    });

    sDiag.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.2, w: 2.8, h: 3.5, fill: "FDEDEC", line: {color: colors.danger, width: 1} });
    sDiag.addText("🔴 DÉFICIT / HEURES VACANTES", { x: 0.6, y: 1.4, w: 2.6, fontSize: 10, bold: true, color: colors.danger });
    sDiag.addText(deficits.slice(0, 8).join('\n') || "Aucune matière", { x: 0.6, y: 1.8, w: 2.6, fontSize: 9, color: colors.black });

    sDiag.addShape(pptx.ShapeType.rect, { x: 3.6, y: 1.2, w: 2.8, h: 3.5, fill: "EAFAF1", line: {color: colors.success, width: 1} });
    sDiag.addText("🟢 EXCENT / SOUS-SERVICE", { x: 3.7, y: 1.4, w: 2.6, fontSize: 10, bold: true, color: colors.success });
    sDiag.addText(surpluses.slice(0, 8).join('\n') || "Aucune matière", { x: 3.7, y: 1.8, w: 2.6, fontSize: 9, color: colors.black });

    sDiag.addShape(pptx.ShapeType.rect, { x: 6.7, y: 1.2, w: 2.8, h: 3.5, fill: "F2F4F4", line: {color: colors.primary, width: 1} });
    sDiag.addText("🎯 ÉQUILIBRE PARFAIT", { x: 6.8, y: 1.4, w: 2.6, fontSize: 10, bold: true, color: colors.primary });
    sDiag.addText(balances.slice(0, 8).join('\n') || "Aucune matière", { x: 6.8, y: 1.8, w: 2.6, fontSize: 9, color: colors.black });

    addFooter(sDiag, "Bilan de couverture des besoins");

    // --- SLIDE 5 : DÉTAIL EDS ---
    const levelsEDS = [{ key: 'premiere', label: 'PREMIÈRE' }, { key: 'terminale', label: 'TERMINALE' }];
    levelsEDS.forEach(lvl => {
        if (DATA.eds && DATA.eds[lvl.key] && DATA.eds[lvl.key].length > 0) {
            const chunks = chunkArray(DATA.eds[lvl.key], 8);
            chunks.forEach((chunk, idx) => {
                let sEds = pptx.addSlide();
                sEds.addText(`4. Spécialités (EDS) : Niveau ${lvl.label}${chunks.length > 1 ? ` (${idx + 1}/${chunks.length})` : ""}`, { x: 0.5, y: 0.3, fontSize: 18, bold: true, color: colors.secondary });
                sEds.addShape(pptx.ShapeType.line, { x:0.5, y:0.7, w:9, h:0, line:{color:colors.secondary, width:2} });
                let edsRows = chunk.map(e => {
                    const vol = parseFloat(e.hPerGroup) || (lvl.key === 'premiere' ? 4 : 6);
                    return [{ text: e.name, options: { align: 'left', bold: true, border: stdBorder } }, { text: e.students.toString(), options: { border: stdBorder } }, { text: e.groups.toString(), options: { border: stdBorder } }, { text: vol.toFixed(1) + " h", options: { border: stdBorder } }, { text: (e.groups * vol).toFixed(1) + " h", options: { bold: true, fill: "EBF5FB", border: stdBorder } }];
                });
                sEds.addTable([[{ text: "Spécialité", options: { ...headerStyles, w: 3.5 } }, { text: "Élèves", options: { ...headerStyles, w: 1.0 } }, { text: "Gr.", options: { ...headerStyles, w: 1.0 } }, { text: "H/Gr.", options: { ...headerStyles, w: 1.0 } }, { text: "Total", options: { ...headerStyles, w: 1.5, fill: colors.primary } }], ...edsRows], { x: 0.5, y: 1.0, w: 9, fontSize: 11, valign: 'middle', align: 'center' });
                addFooter(sEds, `Détail EDS ${lvl.label}`);
            });
        }
    });

    // --- SLIDE 6 : GRILLES PAR NIVEAU ---
    const LIMIT_GRID = 11;
    DATA.structure.forEach(lvl => {
        let allGridRows = [];
        DATA.subjects.forEach(s => {
            const meta = DATA.subjectMeta[s];
            if (meta.isEds) return;
            let base = 0, marge = 0, coef = 1, display = false, labelHoraire = "";
            if(meta.mode === 'div' && meta.levels && meta.levels.includes(lvl.level)) {
                const cfg = DATA.levelConfig[lvl.level][s];
                if(cfg && (cfg.base > 0 || cfg.marge > 0)) {
                    base = cfg.base; marge = cfg.marge; coef = cfg.coef || 1;
                    labelHoraire = base.toFixed(1) + " h"; display = true;
                }
            } else if(meta.mode === 'level') {
                const vol = meta.volLevel ? parseFloat(meta.volLevel[lvl.level] || 0) : 0;
                if(vol > 0) { labelHoraire = "(Forfait)"; base = vol; display = true; }
            }
            if(display) {
                allGridRows.push([{ text: s, options: { align: 'left', bold: true } }, labelHoraire, marge > 0 ? marge.toFixed(1) + " h" : "-", { text: ((base + marge) * coef).toFixed(1) + " h", options: { bold: true, fill: "EAF2F8", color: colors.primary } }]);
            }
        });
        if(allGridRows.length > 0) {
            const chunks = chunkArray(allGridRows, LIMIT_GRID);
            chunks.forEach((chunk, idx) => {
                let sLvl = pptx.addSlide();
                sLvl.addText(`5. Grille Horaire : Niveau ${lvl.level}${chunks.length > 1 ? ` (${idx+1}/${chunks.length})` : ""}`, { x: 0.5, y: 0.3, fontSize: 18, bold: true, color: colors.primary });
                sLvl.addShape(pptx.ShapeType.line, { x:0.5, y:0.5, w:9, h:0, line:{color:colors.secondary, width:2} });
                sLvl.addTable([[{ text: "Discipline", options: { ...headerStyles, fill: colors.primary, w: 3.5 } }, { text: "Horaire Élève", options: { ...headerStyles, fill: colors.secondary, w: 2.0 } }, { text: "Autonomie", options: { ...headerStyles, fill: colors.accent, w: 2.0 } }, { text: "Total Prof", options: { ...headerStyles, fill: colors.tableHeader, w: 2.0 } }], ...chunk], { x: 0.25, y: 0.65, w: 9.5, fontSize: 10, rowH: 0.35, border: stdBorder, align: 'center', valign: 'middle' });
                addFooter(sLvl, `Grille ${lvl.level}`);
            });
        }
    });

    // --- SLIDE 7 : SYNTHÈSE GLOBALE ---
    const LIMIT_GLOBAL = 14; 
    let colW = (9.5 - 2.5) / (DATA.structure.length + 1);
    let globHeaders = [{ text: "Discipline", options: { ...headerStyles, fill: colors.primary, w: 2.5 } }];
    DATA.structure.forEach(l => globHeaders.push({ text: l.level, options: { ...headerStyles, fill: colors.secondary, w: colW } }));
    globHeaders.push({ text: "TOT", options: { ...headerStyles, fill: colors.tableHeader, w: colW } });

    let allGlobRows = [];
    DATA.subjects.forEach(s => {
        let rowData = [], grandTotal = 0, visible = false;
        rowData.push({ text: s, options: { align: 'left', bold: true, fill: "F2F3F4", fontSize: 8 } });
        DATA.structure.forEach(lvl => {
            let h = 0; const meta = DATA.subjectMeta[s];
            if(meta.mode === 'div') { const cfg = DATA.levelConfig[lvl.level][s]; if(cfg) h = ((cfg.base||0) + (cfg.marge||0)) * (cfg.coef||1) * lvl.div; }
            else if(meta.mode === 'level') { h = meta.volLevel ? parseFloat(meta.volLevel[lvl.level] || 0) : 0; }
            if(h > 0) visible = true; grandTotal += h; rowData.push({ text: h > 0 ? h.toFixed(1) : "-", options: { fontSize: 8, color: h>0?colors.black:"CCCCCC" } });
        });
        if(DATA.subjectMeta[s].mode === 'etab') { grandTotal += parseFloat(DATA.subjectMeta[s].etab || 0); visible = true; }
        rowData.push({ text: grandTotal.toFixed(1), options: { bold: true, fill: "EAFAF1", color: colors.success, fontSize: 8 } });
        if(visible) allGlobRows.push(rowData);
    });
    chunkArray(allGlobRows, LIMIT_GLOBAL).forEach((chunk, idx) => {
        let sGlobal = pptx.addSlide();
        sGlobal.addText(`6. Synthèse Globale${allGlobRows.length > LIMIT_GLOBAL ? ` (${idx+1})` : ""}`, { x: 0.5, y: 0.3, fontSize: 18, bold: true, color: colors.primary });
        sGlobal.addShape(pptx.ShapeType.line, { x:0.5, y:0.6, w:9, h:0, line:{color:colors.tableHeader, width:2} });
        sGlobal.addTable([globHeaders, ...chunk], { x: 0.25, y: 0.75, w: 9.5, rowH: 0.3, border: { pt: 0.25, color: "CCCCCC" }, align: 'center', valign: 'middle' });
        addFooter(sGlobal, "Vue d'ensemble");
    });

    // --- SLIDE 8 : VOTE CA ---
    let sVote = pptx.addSlide();
    sVote.background = { color: "FDFEFE" };
    sVote.addText("VOTE DU CONSEIL D'ADMINISTRATION", { x: 0.5, y: 0.3, fontSize: 18, bold: true, color: colors.primary });
    sVote.addShape(pptx.ShapeType.line, { x:0.5, y:0.6, w:9, h:0, line:{color:colors.primary, width:2} });
    sVote.addShape(pptx.ShapeType.rect, { x: 0.5, y: 0.8, w: 9, h: 3.2, fill: "FFF8E1", line: {color: colors.accent, dashType:'dash'} });
    sVote.addText("Résultat officiel du scrutin :", { x: 0.8, y: 1.0, fontSize: 14, bold: true, color: colors.primary });
    
    let boxY = 1.6, boxH = 1.0;
    sVote.addShape(pptx.ShapeType.rect, { x: 0.8, y: boxY, w: 2.3, h: boxH, fill: "EAFAF1", line: {color: colors.success, width: 1.5} });
    sVote.addText("POUR", { x: 0.8, y: boxY + 0.1, w: 2.3, fontSize: 12, bold: true, color: colors.success, align:'center' });
    
    sVote.addShape(pptx.ShapeType.rect, { x: 3.8, y: boxY, w: 2.3, h: boxH, fill: "FDEDEC", line: {color: colors.danger, width: 1.5} });
    sVote.addText("CONTRE", { x: 3.8, y: boxY + 0.1, w: 2.3, fontSize: 12, bold: true, color: colors.danger, align:'center' });
    
    sVote.addShape(pptx.ShapeType.rect, { x: 6.8, y: boxY, w: 2.3, h: boxH, fill: "F2F4F4", line: {color: colors.primary, width: 1.5} });
    sVote.addText("ABSTENTIONS", { x: 6.8, y: boxY + 0.1, w: 2.3, fontSize: 12, bold: true, color: colors.primary, align:'center' });

    pptx.writeFile({ fileName: `DHG_CA_${DATA.config.year}.pptx` });
}
let currentEdsLevel = ''; // Pour savoir si on est en 1ere ou Term
let tempSelectedEds = new Set();

const EDS_REFERENTIEL = [
    // --- ENSEIGNEMENTS DE SPÉCIALITÉ GÉNÉRAUX ---
    { name: "Mathématiques", cat: "Gen" },
    { name: "Physique-Chimie", cat: "Gen" },
    { name: "SVT", cat: "Gen" },
    { name: "HGGSP", cat: "Gen" },
    { name: "SES", cat: "Gen" },
    { name: "HLP", cat: "Gen" },
    { name: "LLCE Anglais", cat: "Gen" },
    { name: "LLCE Espagnol", cat: "Gen" },
    { name: "LLCE Allemand", cat: "Gen" },
    { name: "LLCE Italien", cat: "Gen" },
    { name: "NSI", cat: "Gen" },
    { name: "SI (Sciences de l'Ingénieur)", cat: "Gen" },
    { name: "AMC (Anglais Monde Contemp.)", cat: "Gen" },
    { name: "EPPCS (Sport)", cat: "Gen" },
    
    // --- PÔLE ARTS (Indépendants) ---
    { name: "Spé Arts Plastiques (Arts)", cat: "Gen" },
    { name: "Spé Musique (Arts)", cat: "Gen" },
    { name: "Spé Théâtre (Arts)", cat: "Gen" },
    { name: "Spé Cinéma-Audiovisuel (Arts)", cat: "Gen" },
    { name: "Spé Danse (Arts)", cat: "Gen" },
    { name: "Spé Histoire des Arts (Arts)", cat: "Gen" },
    { name: "Spé Arts du Cirque (Arts)", cat: "Gen" },

    // --- FILIÈRE STI2D : PREMIÈRE ---
    { name: "STI2D - Innovation Technologique (IT)", cat: "Tech" },
    { name: "STI2D - Ingénierie et dév. durable (I2D)", cat: "Tech" },
    { name: "STI2D - Phys.-Chimie et Maths (PCM)", cat: "Tech" },

    // --- FILIÈRE STI2D : TERMINALE ---
    { name: "Physique-Chimie et Mathématiques (STI2D)", cat: "Tech" },
    { name: "2I2D - Arch. et Construction (AC)", cat: "Tech" },
    { name: "2I2D - Énergie et Environnement (EE)", cat: "Tech" },
    { name: "2I2D - Innovation Tech. et Éco-conception (ITEC)", cat: "Tech" },
    { name: "2I2D - Systèmes d'Info. et Numérique (SIN)", cat: "Tech" },

    // --- FILIÈRE STMG ---
    { name: "STMG - Gestion et Finance", cat: "Tech" },
    { name: "STMG - Mercatique (Marketing)", cat: "Tech" },
    { name: "STMG - Ressources Humaines et Comm.", cat: "Tech" },
    { name: "STMG - Systèmes d'Information de Gestion", cat: "Tech" },

    // --- AUTRES FILIÈRES TECHNO ---
    { name: "ST2S - Sciences et tech. sanitaires et sociales", cat: "Tech" },
    { name: "ST2S - Biologie et physiopathologie humaines", cat: "Tech" },
    { name: "STL - Biotechnologies", cat: "Tech" },
    { name: "STL - Sciences phys. et chim. en labo", cat: "Tech" },
    { name: "STD2A - Analyse et méthodes en design", cat: "Tech" },
    { name: "STD2A - Conception et création en design", cat: "Tech" },
    { name: "STHR - Hôtellerie et Restauration", cat: "Tech" },
    { name: "STAV - Aménagement / Production / Transformation", cat: "Tech" },
    { name: "S2TMD - Musique / Danse / Théâtre", cat: "Tech" }
];

function addEDS(level) {
    // Sécurité : on s'assure que la structure existe au moment du clic
    if (!DATA.eds) DATA.eds = { premiere: [], terminale: [] };
    if (!DATA.eds[level]) DATA.eds[level] = [];

    currentEdsLevel = level;
    tempSelectedEds.clear();
    
    const container = document.getElementById('eds-tiles-container');
    const title = document.getElementById('eds-selector-title');
    
    if (!container || !title) return;

    title.innerText = `Choisir les EDS : ${level === 'premiere' ? 'Première' : 'Terminale'}`;
    container.innerHTML = '';

    const existing = DATA.eds[level].map(e => e.name || "");

    // Génération des tuiles avec FILTRAGE CORRIGÉ
    EDS_REFERENTIEL.forEach(eds => {
        // --- LOGIQUE DE FILTRAGE STI2D / 2I2D ---
        
        // 1. En Première : On cache les spés de Terminale (celles commençant par 2I2D ou contenant (STI2D))
        if (level === 'premiere' && (eds.name.startsWith("2I2D") || eds.name.includes("(STI2D)"))) {
            return;
        }
        
        // 2. En Terminale : On cache les 3 spés obligatoires de Première (celles commençant par STI2D -)
        if (level === 'terminale' && eds.name.startsWith("STI2D - ")) {
            return;
        }

        // Affichage si pas déjà sélectionné
        if (!existing.includes(eds.name)) {
            const tile = document.createElement('div');
            tile.className = 'eds-tile';
            tile.innerText = eds.name;
            tile.onclick = () => {
                tile.classList.toggle('selected');
                if(tile.classList.contains('selected')) tempSelectedEds.add(eds.name);
                else tempSelectedEds.delete(eds.name);
            };
            container.appendChild(tile);
        }
    });

    const overlay = document.getElementById('eds-selector-overlay');
    if (overlay) {
        overlay.style.display = 'flex';
        document.getElementById('btn-validate-eds').onclick = confirmEdsSelection;
    }
}

function confirmEdsSelection() {
    tempSelectedEds.forEach(name => {
        // 1. Ajout dans la liste de gestion des EDS (Tableau du bas)
        if (!DATA.eds[currentEdsLevel].some(e => e.name === name)) {
            DATA.eds[currentEdsLevel].push({ 
                name: name, 
                students: 0, 
                groups: 0, 
                hPerGroup: (currentEdsLevel === 'premiere' ? 4 : 6) 
            });
        }

        // 2. Gestion de la Matière (Tableau principal)
        if (!DATA.subjects.includes(name)) {
            // Cas A : La matière n'existe pas, on la crée proprement
            DATA.subjects.push(name);
            DATA.subjectMeta[name] = { 
                mode: 'level', 
                levels: [currentEdsLevel === 'premiere' ? '1ère' : 'Terminale'],
                etab: 0, 
                volLevel: {}, 
                parent: "Spécialités",
                code: "EDS",
                isEds: true // C'est ce flag qui cache la colonne
            };
        } else {
            // Cas B : La matière EXISTE DÉJÀ (Saisie manuelle avant)
            // ==> ON FORCE LA CONVERSION EN EDS
            if (!DATA.subjectMeta[name]) DATA.subjectMeta[name] = {};
            
            DATA.subjectMeta[name].isEds = true; // On force le masquage de la colonne
            DATA.subjectMeta[name].mode = 'level'; // On force le mode "Niveau"
            DATA.subjectMeta[name].parent = "Spécialités"; // On la range dans le bon pôle
            
            // On s'assure que le niveau actuel est bien activé pour cette matière
            const lvlLabel = currentEdsLevel === 'premiere' ? '1ère' : 'Terminale';
            if (!DATA.subjectMeta[name].levels) DATA.subjectMeta[name].levels = [];
            if (!DATA.subjectMeta[name].levels.includes(lvlLabel)) {
                DATA.subjectMeta[name].levels.push(lvlLabel);
            }
        }
    });
    
    saveData();
    syncEdsToVentilation(); // Synchronise les heures
    renderEDS();
    closeEdsSelector();
    
    // Rafraîchit les écrans pour faire disparaître instantanément la colonne en trop
    if(typeof renderSubjectsConfig === 'function') renderSubjectsConfig();
    if(typeof renderGridSystem === 'function') renderGridSystem();
}

function closeEdsSelector() {
    document.getElementById('eds-selector-overlay').style.display = 'none';
}

function renderEDS() {
    const levels = ['premiere', 'terminale'];
    let globalTotal = 0;

    levels.forEach(lvl => {
        const tbody = document.getElementById(`eds-full-${lvl === 'premiere' ? '1ere' : 'term'}`);
        if(!tbody) return;
        tbody.innerHTML = '';
        let levelTotal = 0;

        // 1. Filtrage et Tri Alphabétique
        const genItems = DATA.eds[lvl]
            .filter(e => {
                const ref = EDS_REFERENTIEL.find(r => r.name === e.name);
                return !ref || ref.cat === 'Gen';
            })
            .sort((a, b) => a.name.localeCompare(b.name)); // Tri alphabétique

        const techItems = DATA.eds[lvl]
            .filter(e => {
                const ref = EDS_REFERENTIEL.find(r => r.name === e.name);
                return ref && ref.cat !== 'Gen';
            })
            .sort((a, b) => a.name.localeCompare(b.name)); // Tri alphabétique

        const renderItems = (items, label) => {
            if(items.length === 0) return;
            tbody.innerHTML += `<tr><td colspan="7" class="eds-cat-header">${label}</td></tr>`;
            
            items.forEach(item => {
                const globalIdx = DATA.eds[lvl].indexOf(item);
                if(item.hPerGroup === undefined) item.hPerGroup = (lvl === 'premiere' ? 4 : 6);
                
                const ratioE_G = item.groups > 0 ? (item.students / item.groups).toFixed(1) : 0;
                const totalHours = item.groups * item.hPerGroup;
                levelTotal += totalHours;

                const costPerStudent = item.students > 0 ? (totalHours / item.students).toFixed(3) : 0;
                const ratioClass = ratioE_G > 35 ? 'text-danger' : (ratioE_G < 15 ? 'text-warning' : 'text-success');

                tbody.innerHTML += `
                    <tr>
                        <td style="text-align:left; font-weight:bold; font-size:0.9rem;">
                            <span class="badge-cat">${label.includes('GÉN') ? 'GEN' : 'TECH'}</span>${item.name}
                        </td>
                        <td><input type="number" value="${item.students}" class="input-inline-eds" onchange="updEDS('${lvl}', ${globalIdx}, 'students', this.value)"></td>
                        <td><input type="number" value="${item.groups}" class="input-inline-eds" style="border-color:var(--secondary)" onchange="updEDS('${lvl}', ${globalIdx}, 'groups', this.value)"></td>
                        <td><input type="number" value="${item.hPerGroup}" class="input-inline-eds" style="border-color:var(--accent)" onchange="updEDS('${lvl}', ${globalIdx}, 'hPerGroup', this.value)"></td>
                        <td class="${ratioClass}" style="font-weight:bold; font-size:1.1rem;">${ratioE_G}</td>
                        <td><span class="cost-badge">${costPerStudent} h/él.</span></td>
                        <td><button onclick="delEDS('${lvl}', ${globalIdx})" style="border:none; background:none; color:#c0392b; cursor:pointer; font-size:1.2rem;">×</button></td>
                    </tr>
                `;
            });
        };

        renderItems(genItems, "EDS GÉNÉRAUX");
        renderItems(techItems, "EDS TECHNOLOGIQUES");

        document.getElementById(`total-eds-${lvl === 'premiere' ? '1ere' : 'term'}`).innerText = levelTotal.toFixed(1);
        globalTotal += levelTotal;
    });

    if(document.getElementById('total-eds-global')) 
        document.getElementById('total-eds-global').innerText = globalTotal.toFixed(1) + " h";
}

// FONCTION DE BASCULEMENT (Transfert)
function transferEDS(from, to) {
    if(DATA.eds[from].length === 0) return alert("Rien à transférer !");
    if(!confirm(`Voulez-vous copier la structure des EDS de ${from} vers ${to} ?\n(Les effectifs seront remis à 0, mais les groupes et noms seront conservés)`)) return;

    DATA.eds[from].forEach(source => {
        // On vérifie si l'EDS n'existe pas déjà dans la cible
        if(!DATA.eds[to].some(e => e.name === source.name)) {
            DATA.eds[to].push({
                name: source.name,
                students: 0,
                groups: source.groups,
                hPerGroup: (to === 'terminale' ? 6 : 4) // Ajustement automatique du volume
            });
        }
    });
    saveData();
    renderEDS();
    alert("✅ Structure transférée ! Pensez à ajuster les effectifs et les volumes horaires.");
}

function updEDS(lvl, idx, field, val) {
    DATA.eds[lvl][idx][field] = parseFloat(val) || 0;
    
    // Synchroniser les volumes vers la ventilation
    syncEdsToVentilation();
    
    saveData();
    renderEDS();
    calculateRecap();
}

function delEDS(lvl, idx) {
    if(confirm("Supprimer cet enseignement de spécialité ?")) {
        // On retire l'élément du tableau correspondant (1ere ou Term)
        DATA.eds[lvl].splice(idx, 1);
        
        // Sauvegarde et mise à jour de l'interface
        saveData();
        renderEDS();
        
        // On met à jour le bilan global pour refléter la suppression des heures
        calculateRecap();
    }
}

function syncEdsToVentilation() {
    const levels = ['premiere', 'terminale'];
    levels.forEach(lvlKey => {
        const realLevelName = DATA.structure.find(l => 
            lvlKey === 'premiere' ? (l.level.includes("1") || l.level.includes("Prem")) : (l.level.includes("Term") || l.level.includes("Tle"))
        )?.level;

        if (realLevelName && DATA.eds[lvlKey]) {
            DATA.eds[lvlKey].forEach(eds => {
                const totalHours = (eds.groups || 0) * (eds.hPerGroup || (lvlKey === 'premiere' ? 4 : 6));
                if (DATA.subjectMeta[eds.name]) {
                    if (!DATA.subjectMeta[eds.name].volLevel) DATA.subjectMeta[eds.name].volLevel = {};
                    DATA.subjectMeta[eds.name].volLevel[realLevelName] = totalHours;
                }
            });
        }
    });
}
// Changez 'profs' par 'matieres'
let currentRepartitionView = 'matieres'; 

function switchRepartitionView(view) {
    currentRepartitionView = view;
    // Mise à jour visuelle des boutons
    document.getElementById('btn-view-repart-prof').classList.toggle('active', view === 'profs');
    document.getElementById('btn-view-repart-mat').classList.toggle('active', view === 'matieres');
    renderRepartition();
}

function renderRepartition() {
    const container = document.getElementById('repartition-content');
    if (!container) return;
    container.innerHTML = '';

    if (currentRepartitionView === 'profs') {
        renderRepartitionProfs(container);
    } else {
        renderRepartitionMatieres(container);
    }
}
// --- VUE PAR ENSEIGNANT (CORRIGÉE V7 : Dédoublonnage Strict Classes vs Niveau) ---
function renderRepartitionProfs(container) {
    // 1. Regroupement par Enseignant
    const consolidated = {};

    DATA.teachers.forEach((t, idx) => {
        const cleanName = t.name.trim();
        if(!consolidated[cleanName]) {
            consolidated[cleanName] = { name: cleanName, indices: [], data: [] };
        }
        consolidated[cleanName].indices.push(idx);
        consolidated[cleanName].data.push(t);
    });

    // 2. Génération de l'affichage
    Object.values(consolidated)
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach(group => {
            let totalServiceFait = 0;
            let totalDu = 0;
            let rows = [];

            // A. Matière principale
            let mainSub = group.data[0].subject;
            group.data.forEach(t => {
                const meta = DATA.subjectMeta[t.subject];
                const metaMain = DATA.subjectMeta[mainSub];
                if(DATA.subjects.some(s => DATA.subjectMeta[s]?.parent === t.subject)) mainSub = t.subject;
                if(metaMain?.parent === t.subject) mainSub = t.subject;
            });

            // B. Parcours des lignes RH
            group.data.forEach((t, i) => {
                const realIdx = group.indices[i];
                const csd = parseFloat(t.csd || 0);
                const dech = (parseFloat(t.decharge || 0) + parseFloat(t.dech_ext || 0));
                totalDu += (t.ors - csd);

                // --- SET ANTI-DOUBLON ---
                let levelsPaid = new Set();

                // C. Récupération et TRI des affectations
                // On veut traiter les colonnes "Niveau" (ex: 4ème) AVANT les classes (ex: 4A)
                const relevantKeys = Object.keys(DATA.assignments).filter(key => {
                    return parseInt(key.split('_')[1]) === realIdx;
                });

                const sortedKeys = relevantKeys.sort((a, b) => {
                    const idA = a.split('_')[0];
                    const idB = b.split('_')[0];
                    // Est-ce une colonne Niveau ? (Exact match dans structure)
                    const isLvlA = DATA.structure.some(l => l.level === idA) || idA === 'ETAB';
                    const isLvlB = DATA.structure.some(l => l.level === idB) || idB === 'ETAB';
                    return isLvlB - isLvlA; // True (1) avant False (0)
                });

                sortedKeys.forEach(key => {
                    const parts = key.split('_');
                    const assign = DATA.assignments[key];
                    const entityId = parts.slice(0, parts.length - 1).join('_'); // ex: "4A" ou "4ème"
                    const meta = DATA.subjectMeta[t.subject];
                    
                    // 1. Identification du Niveau Parent (CRUCIAL)
                    let parentLevelName = null;
                    
                    // Cas 1: C'est une colonne niveau (ex: entityId = "4ème")
                    const structLvlExact = DATA.structure.find(l => l.level === entityId);
                    if (structLvlExact) {
                        parentLevelName = structLvlExact.level;
                    } 
                    // Cas 2: C'est une classe (ex: entityId = "4A"), on cherche son parent
                    else {
                        const structLvlPrefix = DATA.structure.find(l => entityId.startsWith(getLevelPrefix(l.level)));
                        if (structLvlPrefix) parentLevelName = structLvlPrefix.level;
                    }

                    // 2. Calcul des heures
                    let h = 0;
                    if(assign.quota !== undefined && assign.quota !== null) {
                        h = parseFloat(assign.quota);
                    } else {
                        // Fallback
                        if(parentLevelName) h = getHoursForClassSubject(entityId, parentLevelName, t.subject);
                    }

                    if(h > 0) {
                        let label = DATA.classNames[entityId] || entityId;
                        let typeBadge = "Cl.";
                        if (entityId === 'ETAB') { label = "Forfait Global"; typeBadge = "Etab"; }
                        else if (structLvlExact) { typeBadge = "Niv"; }

                        // --- LOGIQUE DE DÉDOUBLONNAGE ---
                        let effectiveHours = h;
                        let isIncluded = false;

                        // Si la matière est en mode "Forfait Niveau" (ex: LCE, Chorale)
                        if (meta && meta.mode === 'level' && parentLevelName) {
                            
                            // Si ce niveau a déjà été payé pour ce prof sur cette matière
                            if (levelsPaid.has(parentLevelName)) {
                                effectiveHours = 0;
                                isIncluded = true;
                            } else {
                                // Premier passage (grâce au tri, c'est souvent la colonne Niveau)
                                levelsPaid.add(parentLevelName);
                                effectiveHours = h;
                            }
                        }
                        // --------------------------------

                        totalServiceFait += effectiveHours;

                        // Cosmétique
                        if(typeBadge === "Cl." && assign.mode === 'GROUP') typeBadge = "Ptg";
                        const labelSub = (t.subject !== mainSub) ? `<br><small style="color:#e67e22; font-weight:bold;">${t.subject}</small>` : '';
                        
                        let displayHours = effectiveHours > 0 ? h.toFixed(1) + "h" : `<span style="color:#bdc3c7; font-size:0.8rem;">(Incl.)</span>`;
                        let styleCell = "";
                        
                        if (isIncluded) styleCell = "background:#f4f6f6; color:#95a5a6; border:1px dashed #bdc3c7;";
                        else if (typeBadge === "Niv" || typeBadge === "Etab") styleCell = "background:#fffcf5; border-bottom:2px solid #f1c40f;";

                        rows.push({
                            isDech: false,
                            isMain: (t.subject === mainSub),
                            isIncluded: isIncluded,
                            html: `<td style="${styleCell}"><b>${label}</b>${labelSub}<br>${displayHours} <small style="color:#999;">(${typeBadge})</small></td>`
                        });
                    }
                });

                // Décharges
                if(dech > 0) {
                    totalServiceFait += dech;
                    rows.push({ isDech: true, html: `<td style="color:#8e44ad; background:#f4ecf7;"><i>Décharges</i><br>${dech.toFixed(1)}h</td>` });
                }
            });

            // Tri final pour l'affichage (Inclus à la fin)
            rows.sort((a, b) => {
                if (a.isDech) return 1; if (b.isDech) return -1;
                if (a.isIncluded && !b.isIncluded) return 1;
                if (!a.isIncluded && b.isIncluded) return -1;
                return 0;
            });

            const solde = totalServiceFait - totalDu;
            const isOk = solde >= -0.1;
            const color = isOk ? '#27ae60' : '#c0392b';
            const bg = isOk ? '#e8f8f5' : '#fdedec';

            container.innerHTML += `
            <div class="card" style="border-left: 5px solid ${color}; margin-bottom: 10px; padding: 15px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <h4 style="margin:0; color:#2c3e50;">
                        ${group.name} 
                        <span style="font-weight:normal; font-size:0.9rem; color:#7f8c8d; margin-left:5px;">
                            ${mainSub} ${group.data.length > 1 ? '(+ Options)' : ''}
                        </span>
                    </h4>
                    <div style="text-align:right;">
                        <span style="font-weight:800; font-size:1.1rem; color:#2c3e50;">
                            ${totalServiceFait.toFixed(2)} <span style="font-size:0.9rem; color:#999; font-weight:normal;">/ ${totalDu.toFixed(1)} h</span>
                        </span>
                        <span style="margin-left:10px; padding:2px 8px; border-radius:4px; background:${bg}; color:${color}; font-weight:bold; font-size:0.9rem;">
                            ${solde > 0 ? '+' : ''}${solde.toFixed(2)}
                        </span>
                    </div>
                </div>
                <div style="margin-top:12px; overflow-x:auto;">
                    <table style="font-size:0.85rem; width:auto;">
                        <tr style="background:#f8f9fa; border-radius:4px;">
                            ${rows.length > 0 ? rows.map(r => r.html).join('') : '<td style="font-style:italic; color:#c0392b; padding:5px; font-weight:bold;">⚠️ Aucun service saisi</td>'}
                        </tr>
                    </table>
                </div>
            </div>`;
        });
}

function renderRepartitionMatieres(container) {
    container.innerHTML = '';
    
    // Correction préventive des données
    checkAndFixData();

    // On récupère les matières racines (Pôles)
    const roots = DATA.subjects.filter(s => !DATA.subjectMeta[s]?.parent).sort();

    roots.forEach(root => {
        const subjectsInPole = [root, ...DATA.subjects.filter(s => DATA.subjectMeta[s]?.parent === root)];
        
        // Création de la carte du Pôle
        let poleHTML = `<div class="card" style="overflow-x:auto; margin-bottom:30px; border-top: 4px solid #455a64;">
                        <h3 style="color:#455a64; margin-bottom:20px;">📦 Pôle ${root.toUpperCase()}</h3>`;

        subjectsInPole.forEach(sub => {
            const meta = DATA.subjectMeta[sub];
            if (!meta) return;
            
            // --- 1. DÉTECTION DU TYPE DE MATIÈRE (LABO ?) ---
            const isLabo = (meta.code === 'LAB' && meta.parent);

            // --- 2. RÉCUPÉRATION DES PROFS (Mise à jour Co-intervention) ---
            let profs = [];
            
            if (isLabo) {
                // CAS LABO : On prend les profs de la matière PARENTE
                profs = DATA.teachers
                    .map((t, i) => ({...t, idx: i}))
                    .filter(t => t.subject === meta.parent);
            } else {
                // CAS STANDARD : Titulaires + Invités (Co-intervention)
                
                // A. Profs titulaires de la matière
                const mainProfs = DATA.teachers
                    .map((t, i) => ({...t, idx: i}))
                    .filter(t => t.subject === sub);
                
                // B. Profs "invités" via les disciplines associées
                let guestProfs = [];
                if (meta.linkedSubjects && meta.linkedSubjects.length > 0) {
                    guestProfs = DATA.teachers
                        .map((t, i) => ({...t, idx: i}))
                        .filter(t => meta.linkedSubjects.includes(t.subject));
                }

                // C. Fusion et Tri
                profs = [...mainProfs, ...guestProfs];
                
                // D. Tri alphabétique pour un affichage propre
                profs.sort((a, b) => a.name.localeCompare(b.name));
            }

            // Si aucun prof concerné, on n'affiche pas le tableau
            if (profs.length === 0 && isLabo) return;

            // --- 3. DÉFINITION DES COLONNES (Classes/Niveaux) ---
            let columns = [];
            if (meta.mode === 'div') {
                DATA.structure.forEach(lvl => {
                    const prefix = getLevelPrefix(lvl.level);
                    for (let i = 0; i < lvl.div; i++) {
                        const cId = `${prefix}${String.fromCharCode(65 + i)}`;
                        // On affiche la colonne si :
                        // 1. Le niveau est coché dans les paramètres
                        // 2. OU s'il y a des heures saisies (override)
                        const isActive = (meta.levels && meta.levels.includes(lvl.level));
                        const hasHours = getHoursForClassSubject(cId, lvl.level, sub) > 0;
                        
                        if (hasHours || isActive) {
                            columns.push({ 
                                id: cId, 
                                name: DATA.classNames[cId] || cId, 
                                lvl: lvl.level, 
                                type: 'class' 
                            });
                        }
                    }
                });
            } else if (meta.mode === 'level') {
                DATA.structure.forEach(lvl => columns.push({ id: lvl.level, name: lvl.level, lvl: lvl.level, type: 'level' }));
            } else if (meta.mode === 'etab') {
                columns.push({ id: 'ETAB', name: 'Forfait Global', lvl: 'Etab', type: 'etab' });
            }

            if (columns.length === 0) return;

            // --- 4. CONSTRUCTION DU HEADER DU TABLEAU ---
            let tableHTML = `<h4 style="color:var(--secondary); margin-bottom:10px; padding-left:5px;">
                                ${sub} <small style="color:#999; font-weight:normal; font-size:0.7rem;">(${isLabo ? 'Décharge / Heure de Vaisselle' : (meta.mode === 'div' ? 'Par Classe' : 'Forfait')})</small>
                             </h4>
                             <table style="width:100%; font-size:0.8rem; border-collapse:collapse; margin-bottom:25px;">
                             <thead>
                                <tr style="background:#455a64; color:white;">
                                    <th style="text-align:left; border:1px solid #ddd; padding:8px; width:180px;">Enseignant</th>
                                    ${columns.map(col => `<th style="border:1px solid #ddd; padding:8px;">${col.name}</th>`).join('')}
                                    <th style="border:1px solid #bdc3c7; padding:8px; width:65px; background:#d6eaf8; color:#2980b9; font-weight:bold;">Tot. Mat.</th>
                                    <th style="border:1px solid #bdc3c7; padding:8px; width:65px; background:#d5f5e3; color:#27ae60; font-weight:bold;">Tot. Serv.</th>
                                    <th style="border:1px solid #bdc3c7; padding:8px; width:65px; background:#ebdef0; color:#8e44ad; font-weight:bold;">Svc. Du</th>
                                </tr>`;
            
            // Ligne de Besoin (Masquée pour les Labos car c'est du bonus enseignant)
            if (!isLabo) {
                 tableHTML += `<tr style="background:#fffbe6; font-size:0.75rem;">
                                    <td style="text-align:right; font-weight:bold; border:1px solid #ddd; padding:6px;">Besoin (h)</td>
                                    ${columns.map(col => {
                                        let val = 0;
                                        if(col.type === 'class') val = getHoursForClassSubject(col.id, col.lvl, sub);
                                        else if(col.type === 'level') val = (meta.volLevel && meta.volLevel[col.id]) || 0;
                                        else if(col.type === 'etab') val = meta.etab || 0;
                                        return `<td style="border:1px solid #ddd; padding:6px; font-weight:bold;">${val.toFixed(1)}</td>`;
                                    }).join('')}
                                    <td colspan="3" style="border:1px solid #ddd; background:#fff9c4;"></td>
                                </tr>`;
            }
            tableHTML += `</thead><tbody>`;

            // --- 5. LIGNES ENSEIGNANTS ---
            profs.forEach(p => {
                let rowTotal = 0;
                const serviceDu = p.ors - (p.csd || 0);
                const serviceGlobal = getGlobalTeacherService(p.idx);
                let glbColor = serviceGlobal >= serviceDu ? "#27ae60" : "#c0392b";

                // Affichage du nom + Discipline d'origine si différente
                let displayName = p.name;
                if (p.subject !== sub) {
                    displayName += ` <span style="font-size:0.7rem; color:#e67e22; font-weight:normal;">(${p.subject})</span>`;
                }

                tableHTML += `<tr>
                    <td style="text-align:left; font-weight:bold; border:1px solid #ddd; padding:8px; background:#fafafa;">${displayName}</td>`;
                
                // CELLULES DE SAISIE
                tableHTML += columns.map(col => {
                    let val = 0;
                    let action = "";
                    
                    if (isLabo) {
                        // CAS LABO : On lit/écrit directement p.decharge
                        val = p.decharge || 0;
                        action = `onchange="updateDechargeFromGrid(${p.idx}, this.value, this)"`;
                    } else {
                        // CAS NORMAL : On lit/écrit dans assignments
                        const key = `${col.id}_${p.idx}`;
                        const assign = DATA.assignments[key];
                        val = (assign && assign.quota !== undefined) ? assign.quota : 0;
                        action = `onchange="updateCoTeaching('${col.id}', ${p.idx}, this.value, this)" oninput="updateCoTeaching('${col.id}', ${p.idx}, this.value, this)"`;
                    }
                    
                    if (val > 0) rowTotal += parseFloat(val);

                    return `<td style="border:1px solid #ddd; padding:4px; background:${val > 0 ? '#e3f2fd' : 'white'};">
                                <input type="number" step="0.5" value="${val === 0 ? '' : val}" 
                                       placeholder="0"
                                       style="width:50px; text-align:center; border:1px solid ${val > 0 ? '#90caf9' : '#eee'}; font-weight:${val > 0 ? 'bold' : 'normal'};"
                                       ${action}>
                            </td>`;
                }).join('');
                    
                // Cellules Totaux de fin de ligne
                tableHTML += `<td style="border:1px solid #ddd; padding:8px; font-weight:bold; background:#e8f0fe; color:var(--primary); text-align:center;">${rowTotal.toFixed(1)}</td>
                              <td style="border:1px solid #ddd; padding:8px; font-weight:bold; color:${glbColor}; text-align:center;">${serviceGlobal.toFixed(1)}</td>
                              <td style="border:1px solid #ddd; padding:8px; font-weight:bold; background:#f4ecf7; color:#8e44ad; text-align:center;">${serviceDu.toFixed(1)}</td>
                </tr>`;
            });
            
            // --- 6. RELIQUAT (Uniquement si pas Labo) ---
            if (!isLabo) {
                tableHTML += `<tr style="background:#fdedec;">
                    <td style="text-align:right; font-style:italic; border:1px solid #ddd; padding:8px; color:#c0392b; font-weight:bold;">Reliquat</td>
                    ${columns.map(col => {
                        let assignedInCol = 0;
                        // On somme les heures assignées pour tous les profs affichés
                        profs.forEach(p => {
                             const q = DATA.assignments[`${col.id}_${p.idx}`]?.quota || 0;
                             assignedInCol += parseFloat(q);
                        });
                        
                        let besoin = 0;
                        if(col.type === 'class') besoin = getHoursForClassSubject(col.id, col.lvl, sub);
                        else if(col.type === 'level') besoin = (meta.volLevel && meta.volLevel[col.id]) || 0;
                        else if(col.type === 'etab') besoin = meta.etab || 0;

                        const diff = besoin - assignedInCol;
                        // Vert si 0, Rouge si positif (manque), Orange si négatif (trop)
                        let color = Math.abs(diff) < 0.01 ? "#27ae60" : (diff > 0 ? "#c0392b" : "#e67e22");
                        let text = Math.abs(diff) < 0.01 ? 'OK' : diff.toFixed(1);

                        return `<td style="border:1px solid #ddd; padding:4px; font-weight:bold; color:${color}; text-align:center;">${text}</td>`;
                    }).join('')}
                    <td colspan="3" style="border:1px solid #ddd; background:#fdedec;"></td>
                </tr>`;
            }

            tableHTML += `</tbody></table>`;
            poleHTML += tableHTML;
        });
        
        container.innerHTML += poleHTML + `</div>`;
    });
}

/**
 * FONCTION DE CORRECTION AUTOMATIQUE DE LA STRUCTURE
 * Gère l'UNSS et les Labos (SVT/PC uniquement)
 */
function checkAndFixData() {
    if (!DATA) return;

    // 1. Lier UNSS à EPS
    if (DATA.subjects.includes("UNSS")) {
        if (!DATA.subjectMeta["UNSS"]) DATA.subjectMeta["UNSS"] = {};
        DATA.subjectMeta["UNSS"].parent = "EPS";
        DATA.subjectMeta["UNSS"].mode = "etab"; 
    }

    // 2. Créer les matières "Laboratoire" UNIQUEMENT pour SVT et Physique
    // On retire "Techno" de la liste
    const scienceSubjects = ["SVT", "Phys-Chi", "Sciences", "S. V. T.", "PHYSIQUE-CHIMIE"];
    
    scienceSubjects.forEach(sc => {
        // On cherche si la matière existe
        const parentExists = DATA.subjects.find(s => s.toUpperCase() === sc.toUpperCase() && !DATA.subjectMeta[s]?.parent);
        
        if (parentExists) {
            const laboName = `Labo ${parentExists}`; // Ex: "Labo SVT"
            
            // On crée le Labo seulement s'il n'existe pas
            if (!DATA.subjects.includes(laboName)) {
                DATA.subjects.push(laboName);
                DATA.subjectMeta[laboName] = {
                    mode: 'etab',       
                    parent: parentExists,
                    code: 'LAB',
                    etab: 0             
                };
            } else {
                // S'il existe, on force le mode 'etab' et le code 'LAB'
                if(DATA.subjectMeta[laboName]) {
                    DATA.subjectMeta[laboName].parent = parentExists;
                    DATA.subjectMeta[laboName].mode = 'etab';
                    DATA.subjectMeta[laboName].code = 'LAB';
                }
            }
        }
    });
    
    // Nettoyage éventuel : Si un "Labo Techno" traîne d'une version précédente, on pourrait le supprimer ici,
    // mais par sécurité on le laisse juste inactif ou on le supprime manuellement via le menu Matières.

    saveData();
}

/**
 * Met à jour la décharge d'un enseignant depuis la grille "Labo"
 */
function updateDechargeFromGrid(tIdx, val, inputElement) {
    const teacher = DATA.teachers[tIdx];
    if (teacher) {
        teacher.decharge = parseFloat(val) || 0;
        saveData();
        
        // Mise à jour visuelle des totaux de la ligne
        if (inputElement) {
             const row = inputElement.closest('tr');
             // On met à jour la cellule "Tot. Serv." (avant-dernière) et "Tot. Mat."
             // Note : Pour une décharge, le "Tot. Mat." est égal à la décharge elle-même
             if(row) {
                 const cells = row.cells;
                 const totMatCell = cells[cells.length - 3];
                 const totServCell = cells[cells.length - 2];
                 const svcDuCell = cells[cells.length - 1];
                 
                 // Tot. Mat = La décharge
                 totMatCell.innerText = teacher.decharge.toFixed(1);
                 
                 // Tot. Serv = Recalcul global
                 const newGlobal = getGlobalTeacherService(tIdx);
                 totServCell.innerText = newGlobal.toFixed(1);
                 
                 // Couleurs
                 const target = parseFloat(svcDuCell.innerText) || 0;
                 totServCell.style.color = newGlobal >= target ? "#27ae60" : "#c0392b";
             }
        }
    }
}

/**
 * CALCULE LE SERVICE RÉEL (FACE À ÉLÈVES) D'UN ENSEIGNANT
 * Prend en compte les heures de co-enseignement saisies manuellement
 */
function getTeacherLiveService(teacherIdx) {
    const teacher = DATA.teachers[teacherIdx];
    if (!teacher) return 0;

    let totalService = 0;
    
    // On parcourt toutes les clés d'affectations (format: "ClasseID_ProfIndex")
    Object.keys(DATA.assignments).forEach(key => {
        const [cId, tIdx] = key.split('_');
        
        if (parseInt(tIdx) === teacherIdx) {
            const assign = DATA.assignments[key];
            
            // Si une répartition manuelle (quota) existe, on l'utilise
            if (assign.quota !== undefined && assign.quota !== null) {
                totalService += parseFloat(assign.quota);
            } else {
                // Sinon, on récupère la valeur par défaut de la grille horaire
                const levelObj = DATA.structure.find(l => cId.startsWith(getLevelPrefix(l.level)));
                if (levelObj) {
                    totalService += getHoursForClassSubject(cId, levelObj.level, teacher.subject);
                }
            }
        }
    });
    return totalService;
}

function updateCoTeaching(cId, tIdx, val, inputElement) {
    const hours = parseFloat(val);
    const key = `${cId}_${tIdx}`;

    // --- 1. SAUVEGARDE (Back-End) ---
    if (isNaN(hours) || hours <= 0) {
        if (DATA.assignments[key]) delete DATA.assignments[key];
        if (inputElement) {
            inputElement.style.borderColor = '#eee';
            inputElement.style.fontWeight = 'normal';
            inputElement.parentElement.style.background = 'white';
        }
    } else {
        if (!DATA.assignments[key]) DATA.assignments[key] = { mode: 'CLASS', quota: hours, isPP: false };
        else DATA.assignments[key].quota = hours;
        
        if (inputElement) {
            inputElement.style.borderColor = '#90caf9';
            inputElement.style.fontWeight = 'bold';
            inputElement.parentElement.style.background = '#e3f2fd';
        }
    }

    // Calcul auto Groupe/Classe
    const teacher = DATA.teachers[tIdx];
    if (teacher) {
        const subject = teacher.subject;
        const assignedPeers = DATA.teachers.map((t, i) => i)
            .filter(idx => {
                const k = `${cId}_${idx}`;
                return DATA.assignments[k] && DATA.teachers[idx].subject === subject;
            });
        const newMode = assignedPeers.length > 1 ? 'GROUP' : 'CLASS';
        assignedPeers.forEach(idx => {
            const k = `${cId}_${idx}`;
            if (DATA.assignments[k]) DATA.assignments[k].mode = newMode;
        });
    }
    
    saveData();

    // --- 2. MISE À JOUR VISUELLE (Front-End) ---
    if (inputElement) {
        const table = inputElement.closest('table');
        const row = inputElement.closest('tr');
        
        // A. MISE À JOUR LIGNE (PROF)
        if (row) {
            const inputs = row.querySelectorAll('input[type="number"]');
            let rowTotal = 0;
            inputs.forEach(inp => rowTotal += parseFloat(inp.value) || 0);
            
            // On cible les 3 dernières cellules de la ligne
            const cellTotMat = row.cells[row.cells.length - 3]; // Total Matière
            const cellTotGlb = row.cells[row.cells.length - 2]; // Total Global
            const cellSvcDu = row.cells[row.cells.length - 1];  // Service Dû
            
            // 1. Mise à jour Total Matière
            cellTotMat.innerText = rowTotal.toFixed(1);
            if(rowTotal > 0) {
                cellTotMat.style.backgroundColor = '#e8f0fe';
                cellTotMat.style.color = '#2c3e50';
            } else {
                cellTotMat.style.backgroundColor = 'white';
                cellTotMat.style.color = 'black';
            }
            
            // 2. Mise à jour Total Global
            const newGlobal = getGlobalTeacherService(tIdx); // Recalcul global instantané
            cellTotGlb.innerText = newGlobal.toFixed(1);
            
            // Comparaison avec le Service Dû (qui ne change pas, lui)
            const target = parseFloat(cellSvcDu.innerText) || 0;
            cellTotGlb.style.color = newGlobal >= target ? "#27ae60" : "#c0392b";
            cellTotGlb.style.fontWeight = "bold";
        }

        // B. MISE À JOUR COLONNE (RELIQUAT)
        const cell = inputElement.closest('td');
        const colIdx = cell.cellIndex;
        
        // On récupère le besoin (ligne 2 du header, car ligne 1 = titres colonnes)
        const needCell = table.tHead.rows[1].cells[colIdx];
        const needVal = parseFloat(needCell.innerText) || 0;

        let colSum = 0;
        const bodyRows = table.tBodies[0].rows;
        // On boucle sur toutes les lignes sauf la dernière (le reliquat)
        for(let i=0; i < bodyRows.length - 1; i++) {
            const cellInRow = bodyRows[i].cells[colIdx];
            if(cellInRow) {
                const inputInRow = cellInRow.querySelector('input');
                if(inputInRow) colSum += parseFloat(inputInRow.value) || 0;
            }
        }

        const diff = needVal - colSum;
        const reliquatRow = table.tBodies[0].lastElementChild;
        const reliquatCell = reliquatRow.cells[colIdx];
        
        if (reliquatCell) {
            if (Math.abs(diff) < 0.01) {
                reliquatCell.innerText = "OK";
                reliquatCell.style.color = "#27ae60";
            } else {
                reliquatCell.innerText = diff.toFixed(1);
                reliquatCell.style.color = diff > 0 ? "#c0392b" : "#e67e22";
            }
        }
    }
}

/**
 * RÉCUPÈRE LE PRÉFIXE DU NIVEAU (ex: "6" pour "6ème")
 */
function getLevelPrefix(levelName) {
    return levelName.replace(/[^0-9]/g, '') || levelName.charAt(0);
}

// Helper pour récupérer l'horaire d'une classe (gère les overrides)
function getHoursForClassSubject(cId, levelName, subject) {
    const meta = DATA.subjectMeta[subject];
    if (!meta || meta.mode === 'etab') return 0;
    if (meta.mode === 'level') return (meta.volLevel && meta.volLevel[levelName]) || 0;
    
    const cfg = (DATA.classOverrides && DATA.classOverrides[cId] && DATA.classOverrides[cId][subject]) 
                ? DATA.classOverrides[cId][subject] 
                : (DATA.levelConfig[levelName] ? DATA.levelConfig[levelName][subject] : null);
    
    return cfg ? ((cfg.base || 0) + (cfg.marge || 0)) * (cfg.coef || 1) : 0;
}
/**
 * Calcule la somme de TOUTES les heures assignées à un prof
 * (Toutes matières et toutes classes confondues)
 */
function getGlobalTeacherService(tIdx) {
    let total = 0;
    Object.keys(DATA.assignments).forEach(key => {
        // La clé est sous forme "ClasseID_ProfIndex"
        // On vérifie si la clé termine par "_IndexDuProf"
        if (key.endsWith('_' + tIdx)) {
            total += parseFloat(DATA.assignments[key].quota) || 0;
        }
    });
    return total;
}

let currentSubjectForLinking = ""; // Variable globale temporaire

function openLinkedSubjectsModal(subjectName) {
    currentSubjectForLinking = subjectName;
    const container = document.getElementById('linked-subjects-list');
    const title = document.getElementById('linked-modal-target-name');
    const overlay = document.getElementById('linked-subjects-overlay');
    
    // Titre
    title.innerText = subjectName;
    container.innerHTML = '';
    
    // Récupération des données existantes
    const m = DATA.subjectMeta[subjectName];
    const linkedList = m.linkedSubjects || [];

    // Génération des cases à cocher (Toutes les matières sauf elle-même)
    const sortedSubjects = [...DATA.subjects].sort();
    
    sortedSubjects.forEach(s => {
        if (s !== subjectName) {
            const isChecked = linkedList.includes(s);
            const safeS = s.replace(/'/g, "\\'");
            
            // Création de l'élément visuel
            const item = document.createElement('label');
            item.style.cssText = `
                display:flex; align-items:center; gap:8px; 
                padding:8px; background:white; border:1px solid #eee; 
                border-radius:4px; cursor:pointer; transition:0.1s;
            `;
            // Effet hover
            item.onmouseover = () => item.style.background = "#ebf5fb";
            item.onmouseout = () => item.style.background = "white";

            item.innerHTML = `
                <input type="checkbox" 
                       ${isChecked ? 'checked' : ''} 
                       onchange="toggleLinkedSubjectInModal('${safeS}')"
                       style="width:16px; height:16px; cursor:pointer;">
                <span style="font-size:0.9rem; color:#2c3e50; font-weight:500;">${s}</span>
            `;
            container.appendChild(item);
        }
    });

    // Affichage
    overlay.style.display = 'flex';
}

function toggleLinkedSubjectInModal(linkedSubject) {
    if (!currentSubjectForLinking) return;
    const m = DATA.subjectMeta[currentSubjectForLinking];
    
    if (!m.linkedSubjects) m.linkedSubjects = [];
    
    const idx = m.linkedSubjects.indexOf(linkedSubject);
    if (idx > -1) {
        m.linkedSubjects.splice(idx, 1);
    } else {
        m.linkedSubjects.push(linkedSubject);
    }
    
    saveData();
    // On ne recharge pas la page ici pour garder la fluidité dans la modale
}

function closeLinkedSubjectsModal() {
    document.getElementById('linked-subjects-overlay').style.display = 'none';
    currentSubjectForLinking = "";
    
    // On recharge la liste des matières pour mettre à jour les compteurs sur les boutons
    renderSubjectsConfig();
}

function sanitizeLegacyData() {
    if (!DATA.eds) return;

    // 1. Dictionnaire des synonymes courants (Minuscule sans accent -> Nom Officiel EDS)
    // Cela permet de faire le lien entre "Maths" (saisi main) et "Mathématiques" (EDS)
    const aliases = {
        "maths": "Mathématiques",
        "math": "Mathématiques",
        "mathematiques": "Mathématiques",
        "ses": "Sciences Économiques et Sociales",
        "eco": "Sciences Économiques et Sociales",
        "nsi": "Numérique et Sciences Informatiques",
        "si": "Sciences de l'Ingénieur",
        "svt": "Sciences de la Vie et de la Terre",
        "bio": "Sciences de la Vie et de la Terre",
        "llce": "LLCE Anglais", // ou autre langue selon votre menu
        "amc": "LLCE Anglais Monde Contempo.",
        "hlp": "Humanités, Littérature et Philosophie",
        "hggsp": "Histoire-Géo, Géopolitique & SP",
        "hgg": "Histoire-Géo, Géopolitique & SP",
        "geopo": "Histoire-Géo, Géopolitique & SP",
        "physique": "Physique-Chimie",
        "pc": "Physique-Chimie"
    };

    // Fonction pour nettoyer une chaine (minuscule, sans accent, sans espace inutile)
    const cleanStr = (str) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

    console.log("Nettoyage intelligent des doublons EDS...");

    // On parcourt TOUTES les matières existantes du tableau
    DATA.subjects.forEach(subjectName => {
        const cleanName = cleanStr(subjectName);
        
        // On vérifie si cette matière correspond à un EDS actif (via Nom Exact ou Alias)
        ['premiere', 'terminale'].forEach(level => {
            if (DATA.eds[level]) {
                DATA.eds[level].forEach(edsItem => {
                    const cleanEdsName = cleanStr(edsItem.name);
                    
                    // Est-ce que ça matche ?
                    // 1. Nom exact nettoyé (ex: "mathematiques" == "mathematiques")
                    // 2. Via l'alias (ex: "maths" -> "mathematiques" == "mathematiques")
                    const isMatch = (cleanName === cleanEdsName) || 
                                    (aliases[cleanName] === edsItem.name);

                    if (isMatch) {
                        // BINGO ! C'est un doublon. On cache la matière manuelle.
                        if (!DATA.subjectMeta[subjectName]) DATA.subjectMeta[subjectName] = {};
                        
                        // On applique les tags pour la masquer de la grille
                        DATA.subjectMeta[subjectName].isEds = true;
                        DATA.subjectMeta[subjectName].mode = 'level';
                        DATA.subjectMeta[subjectName].parent = "Spécialités";
                        
                        console.log(`Doublon détecté et corrigé : "${subjectName}" est lié à l'EDS "${edsItem.name}"`);
                    }
                });
            }
        });
    });
}

/**
 * ============================================================================
 * MOTEUR D'EXPORT EDT MONOPOSTE MULTI-PAGES
 * ============================================================================
 */

// 1. Initialise et affiche l'Étape 1 de l'assistant (Catalogue exhaustif des matières)
function openEdtModal() {
    const container = document.getElementById('edt-groups-container');
    container.innerHTML = '';

    // Gestion du retour d'affichage des pages
    document.getElementById('edt-page-2').style.display = 'none';
    document.getElementById('edt-page-1').style.display = 'flex';

    if (!DATA.subjects || DATA.subjects.length === 0) {
        container.innerHTML = "<p style='color:var(--danger); font-size:0.9rem; grid-column:1/-1;'>⚠️ Aucun catalogue de matières disponible.</p>";
        document.getElementById('edt-modal-overlay').style.display = 'flex';
        return;
    }

    // Tri alphabétique pour le confort de lecture
    const sortedSubjects = [...DATA.subjects].sort((a, b) => a.localeCompare(b, 'fr'));

    sortedSubjects.forEach(sub => {
        const safeSub = sub.replace(/'/g, "\\'");
        
        // Pré-cochage automatisé de confort si la matière possède déjà une affectation en groupe
        let hasGroups = false;
        if (DATA.assignments) {
            Object.keys(DATA.assignments).forEach(key => {
                const parts = key.split('_');
                const tIdx = parseInt(parts[parts.length - 1]);
                if (DATA.assignments[key].mode === 'GROUP' && DATA.teachers[tIdx]?.subject === sub) {
                    hasGroups = true;
                }
            });
        }

        const label = document.createElement('label');
        label.style.cssText = "display:flex; align-items:center; gap:8px; padding:8px; background:white; border:1px solid #ccc; border-radius:6px; cursor:pointer;";
        label.innerHTML = `
            <input type="checkbox" class="edt-sub-chk" value="${safeSub}" ${hasGroups ? 'checked' : ''} style="width:18px; height:18px; accent-color:var(--secondary);">
            <span style="font-size:0.9rem; color:#2c3e50; font-weight:500;">${sub}</span>
        `;
        container.appendChild(label);
    });

    document.getElementById('edt-modal-overlay').style.display = 'flex';
}

// 2. Commute vers l'Étape 2 : Répartiteur granulaire de volumes horaires
function goToEdtPage2() {
    const checkedSubjects = Array.from(document.querySelectorAll('.edt-sub-chk:checked')).map(cb => cb.value);
    const p1 = document.getElementById('edt-page-1');
    const p2 = document.getElementById('edt-page-2');
    const container = document.getElementById('edt-page-2-container');
    container.innerHTML = '';

    const allPrefixes = getAllUniquePrefixes();
    const targetCourses = [];

    // Extraction des classes concernées par les matières sélectionnées
    DATA.structure.forEach((lvl, lvlIdx) => {
        const prefix = allPrefixes[lvlIdx];
        checkedSubjects.forEach(sub => {
            const meta = DATA.subjectMeta[sub] || {};
            if (meta.mode === 'div') {
                for (let i = 0; i < lvl.div; i++) {
                    const cId = `${prefix}${String.fromCharCode(65 + i)}`;
                    const totalHours = getHoursForClassSubject(cId, lvl.level, sub);
                    if (totalHours > 0) {
                        targetCourses.push({ entityId: cId, className: DATA.classNames[cId] || cId, subject: sub, totalHours: totalHours });
                    }
                }
            }
        });
    });

    if (targetCourses.length === 0) {
        container.innerHTML = "<p style='color:#7f8c8d; font-style:italic; text-align:center; padding:20px;'>Aucun service détecté pour ces matières. Vous pouvez générer ou revenir en arrière.</p>";
    } else {
        const coursesByClass = {};
        targetCourses.forEach(c => {
            if (!coursesByClass[c.className]) coursesByClass[c.className] = [];
            coursesByClass[c.className].push(c);
        });

        Object.keys(coursesByClass).sort().forEach(className => {
            const classBox = document.createElement('div');
            classBox.style.cssText = "background:white; border:1px solid #e2e8f0; border-radius:8px; padding:15px; margin-bottom:15px; box-shadow:0 1px 3px rgba(0,0,0,0.05);";
            
            let html = `<h4 style="margin:0 0 15px 0; color:var(--primary); font-size:1.05rem; border-bottom:2px solid #edf2f7; padding-bottom:8px;">🏫 Division : ${className}</h4>`;
            
            coursesByClass[className].forEach(course => {
                html += `<div style="margin-bottom:15px;">
                    <div style="font-weight:600; color:var(--secondary); font-size:0.95rem; margin-bottom:10px;">📚 ${course.subject} <span style="font-weight:400; font-size:0.85rem; color:#7f8c8d;">(Total : ${course.totalHours}h)</span></div>
                    <div style="display:flex; flex-direction:column; gap:10px; padding-left:5px;">`;

                const meta = DATA.subjectMeta[course.subject] || {};
                const assignedProfs = DATA.teachers.map((t, idx) => ({ ...t, idx })).filter(t => {
                    const hasAssign = DATA.assignments && DATA.assignments[`${course.entityId}_${t.idx}`];
                    return hasAssign && ((t.subject === course.subject) || (meta.linkedSubjects && meta.linkedSubjects.includes(t.subject)));
                });

                assignedProfs.sort((a, b) => a.idx - b.idx);

                // Fonction utilitaire interne pour dessiner les 4 inputs (Réutilisable prof/vacant)
                const renderInputs = (profName, profId, quota, mode, profIndex) => {
                    // Pré-répartition intelligente selon l'état de la grille
                    let dEnt = 0, dP1 = 0, dP2 = 0, dCo = 0;
                    if (mode === 'GROUP') {
                        if (profIndex === 0) dP1 = quota;
                        else if (profIndex === 1) dP2 = quota;
                        else dEnt = quota;
                    } else {
                        dEnt = quota;
                    }

                    const bgConfig = profId === 'VACANT' ? 'background:#fff5f5; border:1px dashed #feb2b2;' : 'background:#f8fafc; border:1px solid #edf2f7;';
                    const titleColor = profId === 'VACANT' ? 'color:#c53030;' : 'color:#334155;';

                    return `
                    <div class="edt-teacher-config" data-entity="${course.entityId}" data-subject="${course.subject.replace(/'/g, "\\'")}" data-prof="${profId}" style="${bgConfig} padding:10px; border-radius:6px;">
                        <div style="font-weight:600; ${titleColor} margin-bottom:10px; display:flex; justify-content:space-between; font-size:0.9rem;">
                            <span>${profId === 'VACANT' ? '⚠️ Besoin Vacant' : '👨‍🏫 ' + profName}</span>
                            <span style="font-size:0.8rem; opacity:0.8;">Quota à répartir : ${quota}h</span>
                        </div>
                        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; font-size:0.8rem;">
                            <label style="display:flex; flex-direction:column; gap:4px; color:#475569; font-weight:500;">
                                Cl. Entière (h)
                                <input type="number" class="val-ent" step="0.5" min="0" value="${dEnt}" style="padding:5px; border:1px solid #cbd5e1; border-radius:4px; width:100%;">
                            </label>
                            <label style="display:flex; flex-direction:column; gap:4px; color:#475569; font-weight:500;">
                                Groupe P1 (h)
                                <input type="number" class="val-p1" step="0.5" min="0" value="${dP1}" style="padding:5px; border:1px solid #cbd5e1; border-radius:4px; width:100%;">
                            </label>
                            <label style="display:flex; flex-direction:column; gap:4px; color:#475569; font-weight:500;">
                                Groupe P2 (h)
                                <input type="number" class="val-p2" step="0.5" min="0" value="${dP2}" style="padding:5px; border:1px solid #cbd5e1; border-radius:4px; width:100%;">
                            </label>
                            <label style="display:flex; flex-direction:column; gap:4px; color:#475569; font-weight:500;">
                                Co-interv. (h)
                                <input type="number" class="val-co" step="0.5" min="0" value="${dCo}" style="padding:5px; border:1px solid #cbd5e1; border-radius:4px; width:100%;">
                            </label>
                        </div>
                    </div>`;
                };

                if (assignedProfs.length > 0) {
                    assignedProfs.forEach((prof, idx) => {
                        const assign = DATA.assignments[`${course.entityId}_${prof.idx}`];
                        const quota = parseFloat(assign.quota) || course.totalHours;
                        html += renderInputs(prof.name, prof.idx, quota, assign.mode, idx);
                    });
                } else {
                    html += renderInputs("Vacant", "VACANT", course.totalHours, "ENTIERE", 0);
                }

                html += `</div></div>`;
            });
            classBox.innerHTML = html;
            container.appendChild(classBox);
        });
    }

    p1.style.display = 'none';
    p2.style.display = 'flex';
}

// 6. Générateur final du fichier d'import pour EDT (Version Multi-Volumes)
function generateEdtExport() {
    const splitMode = document.querySelector('input[name="edt-split"]:checked').value;
    const edtHeaders = [
        "Durée", "Jour et heure", "Fréquence", "État", "Nb. Places", "Nb. Jours", 
        "Répartition", "Professeur", "Matière", "Modalité d'élection", "Classe", 
        "Semaine d'application", "Effectif", "Nb. élèves", "Salle", "Récréation", 
        "Alternances", "Modalités", "Co-Enseignement", "Pondération", "STSWEB", 
        "Effectif variable", "Famille", "Permanence", "Personnel", "Matériel"
    ];
    let wsData = [edtHeaders];

    const coursesToExport = [];
    const allPrefixes = getAllUniquePrefixes();

    // 1. Collecte structurelle
    DATA.structure.forEach((lvl, lvlIdx) => {
        const prefix = allPrefixes[lvlIdx];
        DATA.subjects.forEach(sub => {
            const meta = DATA.subjectMeta[sub] || {};
            if (meta.mode === 'div') {
                for (let i = 0; i < lvl.div; i++) {
                    const cId = `${prefix}${String.fromCharCode(65 + i)}`;
                    const totalHours = getHoursForClassSubject(cId, lvl.level, sub);
                    if (totalHours > 0) coursesToExport.push({ entityId: cId, entityType: 'class', subject: sub, totalHours: totalHours });
                }
            } else if (meta.mode === 'level') {
                const totalHours = (meta.volLevel && meta.volLevel[lvl.level]) || 0;
                if (totalHours > 0) coursesToExport.push({ entityId: lvl.level, entityType: 'level', subject: sub, totalHours: totalHours });
            }
        });
    });
    
    DATA.subjects.forEach(sub => {
        const meta = DATA.subjectMeta[sub] || {};
        if (meta.mode === 'etab' && parseFloat(meta.etab) > 0) {
            coursesToExport.push({ entityId: 'ETAB', entityType: 'etab', subject: sub, totalHours: parseFloat(meta.etab) });
        }
    });

    // 2. Traitement et application des volumes
    coursesToExport.forEach(item => {
        const meta = DATA.subjectMeta[item.subject] || {};
        const assignedProfs = DATA.teachers.map((t, idx) => ({ ...t, idx })).filter(t => {
            const hasAssign = DATA.assignments && DATA.assignments[`${item.entityId}_${t.idx}`];
            return hasAssign && ((t.subject === item.subject) || (meta.linkedSubjects && meta.linkedSubjects.includes(t.subject)));
        });

        assignedProfs.sort((a, b) => a.idx - b.idx);
        let baseClassName = (item.entityType === 'class') ? (DATA.classNames[item.entityId] || item.entityId) : (item.entityType === 'etab' ? "Forfait" : item.entityId);

        // Processus interne d'extraction et d'écriture des lignes
        const processProfData = (profName, profId, defaultQuota, assignMode, index) => {
            // Lecture des 4 champs dans le DOM
            const configRow = document.querySelector(`.edt-teacher-config[data-entity="${item.entityId}"][data-subject="${item.subject.replace(/'/g, "\\'")}"][data-prof="${profId}"]`);
            
            let volumes = [];
            
            if (configRow) {
                // L'utilisateur a configuré cette matière via la modale
                volumes.push({ hours: parseFloat(configRow.querySelector('.val-ent').value) || 0, className: baseClassName });
                volumes.push({ hours: parseFloat(configRow.querySelector('.val-p1').value) || 0, className: `${baseClassName}P1` });
                volumes.push({ hours: parseFloat(configRow.querySelector('.val-p2').value) || 0, className: `${baseClassName}P2` });
                volumes.push({ hours: parseFloat(configRow.querySelector('.val-co').value) || 0, className: baseClassName }); // Co-intervention reste sur la classe de base
            } else {
                // Matière non cochée à l'étape 1 : Fallback automatique
                if (assignMode === 'GROUP' && item.entityType === 'class') {
                    if (index === 0) volumes.push({ hours: defaultQuota, className: `${baseClassName}P1` });
                    else if (index === 1) volumes.push({ hours: defaultQuota, className: `${baseClassName}P2` });
                    else volumes.push({ hours: defaultQuota, className: baseClassName });
                } else {
                    volumes.push({ hours: defaultQuota, className: baseClassName });
                }
            }

            // Génération des lignes Excel pour chaque volume strictement supérieur à 0
            volumes.forEach(vol => {
                if (vol.hours > 0) {
                    const chunks = getEdtChunks(vol.hours, splitMode);
                    chunks.forEach(chunk => {
                        const row = new Array(edtHeaders.length).fill("");
                        row[0] = chunk.duree;
                        row[1] = "Non placé";
                        row[2] = chunk.freq;
                        row[7] = profId === 'VACANT' ? "" : profName;
                        row[8] = item.subject;
                        row[9] = "O - Obligatoire";
                        row[10] = vol.className;
                        wsData.push(row);
                    });
                }
            });
        };

        if (assignedProfs.length > 0) {
            assignedProfs.forEach((profEntry, index) => {
                const assign = DATA.assignments[`${item.entityId}_${profEntry.idx}`];
                let quota = parseFloat(assign.quota) || item.totalHours;
                processProfData(profEntry.name, profEntry.idx, quota, assign.mode, index);
            });
        } else {
            processProfData("", "VACANT", item.totalHours, "ENTIERE", 0);
        }
    });

    // 3. Écriture Fichier
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    ws['!cols'] = [{wch: 8}, {wch: 10}, {wch: 5}, {wch: 5}, {wch: 5}, {wch: 5}, {wch: 5}, {wch: 25}, {wch: 25}, {wch: 15}, {wch: 10}];

    XLSX.utils.book_append_sheet(wb, ws, "Import_EDT");
    const dateStr = new Date().toLocaleDateString('fr-FR').replace(/\//g, '-');
    XLSX.writeFile(wb, `DHG_Export_EDT_${dateStr}.xlsx`);

    document.getElementById('edt-modal-overlay').style.display = 'none';
}

// --- SEUILS DE DÉDOUBLELEMENT ---
function getThresholdLimit(levelName, type) {
    const lvl = levelName.toLowerCase();
    if (type === 'college') return 28;
    if (type === 'lgt') {
        if (lvl.includes('2nde') || lvl.includes('seconde')) return 30;
        return 35;
    }
    return 30; // default for lp
}

// --- COMPARAISON DE SCENARIOS ---
function getScenarios() {
    try {
        return JSON.parse(localStorage.getItem('DHG_Scenarios') || '[]');
    } catch (e) {
        return [];
    }
}

function getBaselineScenarioId() {
    return localStorage.getItem('DHG_Baseline_Scenario_ID') || null;
}

function saveCurrentScenario() {
    const name = prompt("Nom du scénario ? (ex: Scénario A - Marge 3ème)");
    if (!name) return;
    const notes = prompt("Notes stratégiques / Commentaires ? (Optionnel)", "");
    
    const scenarios = getScenarios();
    const currentConso = parseFloat(document.getElementById('dash-conso')?.innerText) || 0;
    const currentMarge = parseFloat(document.getElementById('dash-solde')?.innerText) || 0;
    const currentTotalDiv = DATA.structure.reduce((acc, curr) => acc + (curr.div || 0), 0);
    const hsaPercent = document.getElementById('global-hsa-percent-display')?.innerText || "0%";
    
    const scenario = {
        id: Date.now(),
        name: name,
        notes: notes || "",
        dhg: DATA.config.total,
        divisions: currentTotalDiv,
        conso: currentConso,
        hsaPercent: hsaPercent,
        marge: currentMarge,
        date: new Date().toLocaleDateString('fr-FR'),
        data: JSON.parse(JSON.stringify(DATA))
    };
    
    scenarios.push(scenario);
    localStorage.setItem('DHG_Scenarios', JSON.stringify(scenarios));
    renderScenariosTable();
}

function duplicateScenario(id) {
    const scenarios = getScenarios();
    const found = scenarios.find(s => s.id === id);
    if (!found) return;
    
    const clone = JSON.parse(JSON.stringify(found));
    clone.id = Date.now();
    clone.name = found.name + " (Copie)";
    clone.date = new Date().toLocaleDateString('fr-FR');
    
    scenarios.push(clone);
    localStorage.setItem('DHG_Scenarios', JSON.stringify(scenarios));
    renderScenariosTable();
}

function setBaselineScenario(id) {
    const currentBaseline = getBaselineScenarioId();
    if (currentBaseline == id) {
        // Toggle baseline off
        localStorage.removeItem('DHG_Baseline_Scenario_ID');
    } else {
        localStorage.setItem('DHG_Baseline_Scenario_ID', id);
    }
    renderScenariosTable();
}

function deleteScenario(id) {
    if (!confirm("Supprimer ce scénario ?")) return;
    let scenarios = getScenarios();
    scenarios = scenarios.filter(s => s.id !== id);
    localStorage.setItem('DHG_Scenarios', JSON.stringify(scenarios));
    
    const baselineId = getBaselineScenarioId();
    if (baselineId == id) {
        localStorage.removeItem('DHG_Baseline_Scenario_ID');
    }
    
    renderScenariosTable();
}

function loadScenario(id) {
    if (!confirm("Attention : Charger ce scénario remplacera vos données actuelles. Continuer ?")) return;
    const scenarios = getScenarios();
    const found = scenarios.find(s => s.id === id);
    if (found) {
        DATA = JSON.parse(JSON.stringify(found.data));
        saveData();
        updateAllAfterStateChange();
        alert("✅ Scénario chargé !");
    }
}

function clearScenarios() {
    if (!confirm("Voulez-vous réinitialiser tous les scénarios comparatifs ?")) return;
    localStorage.removeItem('DHG_Scenarios');
    localStorage.removeItem('DHG_Baseline_Scenario_ID');
    renderScenariosTable();
}

function renderScenariosTable() {
    const tbody = document.getElementById('scenarios-comparison-body');
    if (!tbody) return;
    
    const scenarios = getScenarios();
    if (scenarios.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="color:var(--text-muted); font-style:italic;">Aucun scénario enregistré pour le moment.</td></tr>`;
        return;
    }
    
    const baselineId = getBaselineScenarioId();
    const baseline = scenarios.find(s => s.id == baselineId);
    
    tbody.innerHTML = scenarios.map(s => {
        const isBaseline = s.id == baselineId;
        let statusHTML = `<button class="btn btn-sm btn-outline" style="font-size:0.75rem; padding:2px 6px;" onclick="setBaselineScenario(${s.id})">📌 Réf.</button>`;
        if (isBaseline) {
            statusHTML = `<span style="background:var(--success); color:white; padding:2px 8px; border-radius:10px; font-size:0.75rem; font-weight:bold;">👑 Référence</span>`;
        }
        
        // Calcul des Deltas si baseline définie
        let deltaMargeText = "";
        if (baseline && !isBaseline) {
            const diff = s.marge - baseline.marge;
            deltaMargeText = ` <small style="color:${diff >= 0 ? 'var(--success)' : 'var(--danger)'}; font-weight:bold;">(${diff >= 0 ? '+' : ''}${diff.toFixed(1)}h)</small>`;
        }
        
        let margeColor = s.marge >= 0 ? 'var(--success)' : 'var(--danger)';
        
        return `<tr>
            <td style="text-align:left;">
                <strong>${s.name}</strong>
                ${s.notes ? `<div style="font-size:0.8rem; color:var(--text-muted); margin-top:2px;">📝 ${s.notes}</div>` : ""}
            </td>
            <td>${statusHTML}</td>
            <td>${s.dhg.toFixed(1)} h</td>
            <td>${s.divisions} cls</td>
            <td>${s.conso.toFixed(1)} h</td>
            <td>${s.hsaPercent}</td>
            <td style="color:${margeColor}; font-weight:bold;">
                ${s.marge.toFixed(1)} h
                ${deltaMargeText}
            </td>
            <td>
                <div style="display:flex; gap:4px; justify-content:center; flex-wrap:wrap;">
                    <button class="btn btn-sm btn-success" onclick="loadScenario(${s.id})" title="Charger">🔄 Charger</button>
                    <button class="btn btn-sm btn-purple" onclick="duplicateScenario(${s.id})" title="Dupliquer">💾 Cloner</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteScenario(${s.id})" title="Supprimer">🗑️</button>
                </div>
            </td>
        </tr>`;
    }).join('');
}

// --- VISUALISATION CÔTE À CÔTE DES SCÉNARIOS ---
function openComparisonModal() {
    const scenarios = getScenarios();
    if (scenarios.length < 2) {
        return alert("Veuillez enregistrer au moins 2 scénarios pour pouvoir les comparer.");
    }
    
    const selectA = document.getElementById('compare-select-a');
    const selectB = document.getElementById('compare-select-b');
    
    if (!selectA || !selectB) return;
    
    selectA.innerHTML = '';
    selectB.innerHTML = '';
    
    scenarios.forEach((s, idx) => {
        selectA.add(new Option(s.name, s.id));
        selectB.add(new Option(s.name, s.id));
    });
    
    // Select different ones by default
    selectB.selectedIndex = 1;
    
    document.getElementById('comparison-modal-overlay').style.display = 'flex';
    renderComparisonResult();
}

function closeComparisonModal() {
    document.getElementById('comparison-modal-overlay').style.display = 'none';
}

function renderComparisonResult() {
    const selectA = document.getElementById('compare-select-a');
    const selectB = document.getElementById('compare-select-b');
    const body = document.getElementById('comparison-result-body');
    
    if (!selectA || !selectB || !body) return;
    
    const scenarios = getScenarios();
    const sA = scenarios.find(s => s.id == selectA.value);
    const sB = scenarios.find(s => s.id == selectB.value);
    
    if (!sA || !sB) return;
    
    document.getElementById('compare-name-a').innerText = sA.name;
    document.getElementById('compare-name-b').innerText = sB.name;
    
    // Calculate metrics
    const metrics = [
        { label: "Dotation globale (DHG)", valA: sA.dhg, valB: sB.dhg, unit: " h", dec: 1 },
        { label: "Divisions (Classes)", valA: sA.divisions, valB: sB.divisions, unit: " classes", dec: 0 },
        { label: "Consommation horaire", valA: sA.conso, valB: sB.conso, unit: " h", dec: 1 },
        { label: "Solde / Marge de sécurité", valA: sA.marge, valB: sB.marge, unit: " h", dec: 1 }
    ];
    
    body.innerHTML = metrics.map(m => {
        const diff = m.valB - m.valA;
        let diffHTML = "";
        if (diff > 0) {
            diffHTML = `<span style="color:var(--success); font-weight:bold;">+${diff.toFixed(m.dec)}${m.unit}</span>`;
        } else if (diff < 0) {
            diffHTML = `<span style="color:var(--danger); font-weight:bold;">${diff.toFixed(m.dec)}${m.unit}</span>`;
        } else {
            diffHTML = `<span style="color:var(--text-muted); font-weight:bold;">0</span>`;
        }
        
        return `<tr>
            <td style="text-align:left;"><strong>${m.label}</strong></td>
            <td>${m.valA.toFixed(m.dec)}${m.unit}</td>
            <td>${m.valB.toFixed(m.dec)}${m.unit}</td>
            <td>${diffHTML}</td>
        </tr>`;
    }).join('');
}
// --- GÉNÉRATEUR DE STRUCTURE INITIALE AUTO ---
function autoInitializeStructure() {
    if (!confirm("Voulez-vous écraser la structure actuelle et la générer automatiquement à partir de vos effectifs d'élèves ?")) return;
    
    let updated = false;
    DATA.structure.forEach(lvl => {
        const val = prompt(`Saisissez l'effectif d'élèves total estimé pour le niveau : ${lvl.level}`, lvl.students || 0);
        if (val !== null) {
            const students = parseInt(val) || 0;
            const threshold = getThresholdLimit(lvl.level, DATA.type);
            const divisions = Math.ceil(students / threshold);
            
            lvl.students = students;
            lvl.div = divisions;
            updated = true;
        }
    });
    
    if (updated) {
        generateClasses(false);
        saveData();
        updateAllAfterStateChange();
        alert("✅ Structure initiale générée automatiquement avec succès !");
    }
}

// --- SUIVI DES PROFESSEURS PRINCIPAUX (PP & ISOE) ---
function renderPPSummaryTable() {
    const tbody = document.getElementById('pp-summary-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    const ppMap = {};
    
    // Initialise les classes
    DATA.structure.forEach(lvl => {
        const prefix = getLevelPrefix(lvl.level);
        for(let i=0; i<lvl.div; i++) {
            const cId = `${prefix}${String.fromCharCode(65+i)}`;
            ppMap[cId] = [];
        }
    });
    
    // Parcourt les assignments pour trouver les PP
    if (DATA.assignments) {
        Object.keys(DATA.assignments).forEach(key => {
            if (DATA.assignments[key].isPP) {
                const parts = key.split('_');
                const cId = parts[0];
                const tIdx = parseInt(parts[1]);
                const teacher = DATA.teachers[tIdx];
                if (teacher && ppMap[cId] !== undefined) {
                    ppMap[cId].push(teacher.name);
                }
            }
        });
    }
    
    const classes = Object.keys(ppMap).sort();
    if (classes.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="color:var(--text-muted); font-style:italic;">Aucune classe configurée dans la structure.</td></tr>`;
        return;
    }
    
    tbody.innerHTML = classes.map(cId => {
        const pps = ppMap[cId];
        const displayName = DATA.classNames[cId] || cId;
        
        let pp1 = pps[0] || '<span style="color:var(--danger); font-style:italic;">Non désigné</span>';
        let pp2 = pps[1] || '<span style="color:var(--text-muted); font-style:italic;">-</span>';
        
        let statusHTML = '';
        if (pps.length === 0) {
            statusHTML = `<span style="background:rgba(192, 57, 43, 0.1); color:var(--danger); padding:4px 8px; border-radius:4px; font-size:0.8rem; font-weight:bold;">⚠️ Pas de Professeur Principal</span>`;
        } else if (pps.length > 2) {
            statusHTML = `<span style="background:rgba(230, 126, 34, 0.1); color:var(--accent); padding:4px 8px; border-radius:4px; font-size:0.8rem; font-weight:bold;">⚠️ Plus de 2 PP</span>`;
        } else {
            statusHTML = `<span style="background:rgba(39, 174, 96, 0.1); color:var(--success); padding:4px 8px; border-radius:4px; font-size:0.8rem; font-weight:bold;">✅ Conforme</span>`;
        }
        
        return `<tr>
            <td style="text-align:left;"><strong>${displayName}</strong></td>
            <td>${pp1}</td>
            <td>${pp2}</td>
            <td>${statusHTML}</td>
        </tr>`;
    }).join('');
}

// --- GÉNÉRATEUR DE FICHE DE SERVICE INDIVIDUELLE PDF ---
function exportTeacherServicePDF(tIdx) {
    const p = DATA.teachers[tIdx];
    if (!p) return alert("Enseignant introuvable.");
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    
    // Titre Document
    doc.setFillColor(44, 62, 80);
    doc.rect(0, 0, pageWidth, 25, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("FICHE DE SERVICE PRÉVISIONNELLE - RENTRÉE " + (DATA.config.year || new Date().getFullYear()), pageWidth/2, 16, { align: 'center' });
    
    // Infos Enseignant
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    
    let y = 35;
    doc.text(`Enseignant : ${p.name}`, 15, y);
    doc.text(`Discipline : ${p.subject}`, 120, y);
    y += 7;
    doc.text(`Statut : ${p.status || "Non précisé"}`, 15, y);
    
    const expected = p.ors + p.hsa - p.csd - p.decharge - p.dech_ext;
    const pond = getTeacherWeighting(tIdx);
    const assigned = getGlobalTeacherService(tIdx) + pond;
    
    y += 12;
    // Cadre Récapitulatif Heures
    doc.setFillColor(248, 249, 250);
    doc.rect(15, y, pageWidth - 30, 25, 'F');
    doc.setDrawColor(220, 224, 230);
    doc.rect(15, y, pageWidth - 30, 25, 'D');
    
    doc.setFont("helvetica", "bold");
    doc.text("RÉSUMÉ DU SERVICE :", 20, y + 6);
    doc.setFont("helvetica", "normal");
    doc.text(`ORS : ${p.ors.toFixed(1)}h  |  HSA : ${p.hsa.toFixed(1)}h  |  Décharge : ${p.decharge.toFixed(1)}h  |  Pondération : ${pond.toFixed(1)}h`, 20, y + 14);
    doc.text(`Total Attendu : ${expected.toFixed(1)}h  |  Total Assigné (Pond. incluse) : ${assigned.toFixed(1)}h`, 20, y + 21);
    
    y += 35;
    
    // Tableau des heures assignées
    const relevantAssignments = [];
    Object.keys(DATA.assignments).forEach(key => {
        if (key.endsWith('_' + tIdx)) {
            const entityId = key.substring(0, key.lastIndexOf('_'));
            const assign = DATA.assignments[key];
            const displayName = DATA.classNames[entityId] || entityId;
            relevantAssignments.push([
                displayName,
                p.subject,
                assign.mode === 'CLASS' ? 'Classe Entière' : 'Groupe',
                (parseFloat(assign.quota) || 0).toFixed(1) + ' h'
            ]);
        }
    });
    
    if (pond > 0) {
        relevantAssignments.push([
            "Cycle Terminal",
            "Pondération réglementaire 1.1",
            "-",
            pond.toFixed(1) + " h"
        ]);
    }
    
    doc.setFont("helvetica", "bold");
    doc.text("DÉTAIL DES ENSEIGNEMENTS AFFECTÉS :", 15, y);
    y += 5;
    
    doc.autoTable({
        startY: y,
        head: [['Classe / Division', 'Discipline', 'Modalité', 'Volume Hebdo']],
        body: relevantAssignments,
        theme: 'striped',
        headStyles: { fillColor: [44, 62, 80] },
        styles: { fontSize: 9 }
    });
    
    // Signatures
    let finalY = doc.previousAutoTable.finalY + 30;
    if (finalY > doc.internal.pageSize.height - 40) {
        doc.addPage();
        finalY = 30;
    }
    
    doc.setFont("helvetica", "italic");
    doc.text("Pour accord,", 15, finalY);
    doc.text("Pour l'établissement,", 120, finalY);
    
    finalY += 15;
    doc.setFont("helvetica", "normal");
    doc.text("Signature de l'enseignant", 15, finalY);
    doc.text("Signature du Chef d'Établissement", 120, finalY);
    
    doc.save(`Fiche_Service_${p.name.replace(/\s+/g, '_')}.pdf`);
}
