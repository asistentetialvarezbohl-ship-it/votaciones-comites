// ═══════════════════════════════════════════════════════════════════
// DATOS — Empresas, Sedes y Candidatos
// Los candidatos son los MISMOS para todas las sedes de cada empresa
// La sede solo se registra para el conteo de participación
// ═══════════════════════════════════════════════════════════════════

export const EMPRESAS = {
  "Alvarez Bohl":             ["PIURA", "TUMBES", "TRUJILLO", "CHIMBOTE", "CHICLAYO", "CAJAMARCA", "HUAMACHUCO"],
  "Punto Blanco":             ["PIURA", "TUMBES"],
  "Megamarcas":               ["PIURA", "TUMBES"],
  "Farmivent":                ["PIURA"],
  "Farmi GAB":                ["PIURA"],
  "Inmobiliaria Las Cumbres": ["PIURA"],
};

// ═══════════════════════════════════════════════════════════════════
// CANDIDATOS POR EMPRESA
// csst        → Comité de Seguridad y Salud en el Trabajo
// cihsl       → Comité de Intervención Frente al Hostigamiento Sexual
// foto: ruta desde /public  (ej: "/fotos/CSST/AB/NOMBRE.png")
// Si no hay foto: foto: null  → muestra círculo con iniciales
// ═══════════════════════════════════════════════════════════════════

export const CANDIDATOS_POR_EMPRESA = {

  // ── ALVAREZ BOHL ──────────────────────────────────────────────────
  "Alvarez Bohl": {
    csst: [
      { id:"csst-ab-1", nombre:"Adrianzen Pulache Diego Alonso",  ini:"AD", foto:"/fotos/CSST/AB/ADRIANZEN PULACHE DIEGO ALONSO.png" },
      { id:"csst-ab-2", nombre:"Alayo Miñan Jean Paul",           ini:"AL", foto:"/fotos/CSST/AB/ALAYO MIÑAN JEAN PAUL.png" },
      { id:"csst-ab-3", nombre:"Casanova Quintana Fernando",       ini:"CA", foto:"/fotos/CSST/AB/CASANOVA QUINTANA FERNANDO.png" },
      { id:"csst-ab-4", nombre:"Huancas Correa Sofia Elizabeth",   ini:"HU", foto:"/fotos/CSST/AB/HUANCAS CORREA SOFIA ELIZABETH.png" },
      { id:"csst-ab-5", nombre:"Miñan Chumo Madeleine Janet",      ini:"MI", foto:"/fotos/CSST/AB/MIÑAN CHUMO MADELEINE JANET.png" },
      { id:"csst-ab-6", nombre:"Sandoval Sullon Victor Alfredo",   ini:"SA", foto:"/fotos/CSST/AB/SANDOVAL SULLON VICTOR ALFREDO.png" },
    ],
    cihsl: [
      { id:"cihsl-ab-1",  nombre:"Arrunategui Suárez Kieffer Estiven", ini:"AR", foto:"/fotos/CIHSL/AB/Arrunategui Suárez Kieffer Estiven.png" },
      { id:"cihsl-ab-2",  nombre:"Barreto Custodio Jackelyn Karina",   ini:"BA", foto:"/fotos/CIHSL/AB/Barreto Custodio Jackelyn Karina.png" },
      { id:"cihsl-ab-3",  nombre:"Casanova Quintana Fernando",         ini:"CA", foto:"/fotos/CIHSL/AB/Casanova Quintana Fernando.png" },
      { id:"cihsl-ab-4",  nombre:"Colona Arrese Robespierre",          ini:"CO", foto:"/fotos/CIHSL/AB/Colona Arrese Robespierre.png" },
      { id:"cihsl-ab-5",  nombre:"Díaz Monsalva Nancy Duverli",        ini:"DI", foto:"/fotos/CIHSL/AB/Díaz Monsalva, Nancy Duverli.png" },
      { id:"cihsl-ab-6",  nombre:"Juárez Sosa Lila Massiel Anaiss",    ini:"JU", foto:"/fotos/CIHSL/AB/Juárez Sosa Lila Massiel Anaiss.png" },
      { id:"cihsl-ab-7",  nombre:"Martínez Reyes Pedro",               ini:"MA", foto:"/fotos/CIHSL/AB/Martínez Reyes Pedro.png" },
      { id:"cihsl-ab-8",  nombre:"Miñan Chumo Madeleine Janet",        ini:"MI", foto:"/fotos/CIHSL/AB/Miñan Chumo Madeleine Janet.png" },
      { id:"cihsl-ab-9",  nombre:"Saavedra Nizama Kay Romina",         ini:"SN", foto:"/fotos/CIHSL/AB/Saavedra Nizama Kay Romina.png" },
      { id:"cihsl-ab-10", nombre:"Ventura Bernabé Hugo Humberto",      ini:"VE", foto:"/fotos/CIHSL/AB/Ventura Bernabé Hugo Humberto.png" },
    ],
  },

  // ── PUNTO BLANCO ──────────────────────────────────────────────────
  "Punto Blanco": {
    csst: [
      { id:"csst-pb-1", nombre:"Andrade Leon Marco Antonio",        ini:"AN", foto:"/fotos/CSST/PB/ANDRADE LEON, MARCO ANTONIO.png" },
      { id:"csst-pb-2", nombre:"Chero Veramatus Karina",            ini:"CH", foto:"/fotos/CSST/PB/CHERO VERAMATUS, KARINA.png" },
      { id:"csst-pb-3", nombre:"Ferreyra Olivares Patricia Isabel", ini:"FE", foto:"/fotos/CSST/PB/FERREYRA OLIVARES, PATRICIA ISABEL.png" },
      { id:"csst-pb-4", nombre:"Gil Martinez Rudy Verenize",        ini:"GI", foto:"/fotos/CSST/PB/GIL MARTINEZ, RUDY VERENIZE.png" },
      { id:"csst-pb-5", nombre:"Huaccha Quiroz Julio",              ini:"HQ", foto:"/fotos/CSST/PB/HUACCHA QUIROZ, JULIO.png" },
      { id:"csst-pb-6", nombre:"Mendiola Carvallo Alida Vanessa",   ini:"ME", foto:"/fotos/CSST/PB/MENDIOLA CARVALLO, ALIDA VANESSA.png" },
    ],
    cihsl: [
      { id:"cihsl-pb-1",  nombre:"Ancajima Urbina Yohana Patricia",       ini:"AN", foto:"/fotos/CIHSL/PB/Ancajima Urbina, Yohana Patricia.png" },
      { id:"cihsl-pb-2",  nombre:"Andrade Leon Marco Antonio",             ini:"AD", foto:"/fotos/CIHSL/PB/Andrade Leon, Marco Antonio.png" },
      { id:"cihsl-pb-3",  nombre:"Ato Reusche Luis Eduardo",               ini:"AT", foto:"/fotos/CIHSL/PB/Ato Reusche, Luis Eduardo.png" },
      { id:"cihsl-pb-4",  nombre:"Atto Valdiviezo Pedro Miguel Alberto",   ini:"AV", foto:"/fotos/CIHSL/PB/Atto Valdiviezo, Pedro Miguel Alberto.png" },
      { id:"cihsl-pb-5",  nombre:"Benza López Max Alberto",                ini:"BE", foto:"/fotos/CIHSL/PB/Benza López, Max Alberto.png" },
      { id:"cihsl-pb-6",  nombre:"Gonzales Palacios Gustavo Martín",       ini:"GO", foto:"/fotos/CIHSL/PB/Gonzales Palacios, Gustavo Martín.png" },
      { id:"cihsl-pb-7",  nombre:"Miranda López Betty Elizabeth",           ini:"MR", foto:"/fotos/CIHSL/PB/Miranda López, Betty Elizabeth.png" },
      { id:"cihsl-pb-8",  nombre:"Piñin Huertas Magally Elizabeth",        ini:"PI", foto:"/fotos/CIHSL/PB/Piñin Huertas, Magally Elizabeth.png" },
      { id:"cihsl-pb-9",  nombre:"Ticliahuanca Yajahuanca Ulises Humberto",ini:"TI", foto:"/fotos/CIHSL/PB/Ticliahuanca Yajahuanca, Ulises Humberto.png" },
      { id:"cihsl-pb-10", nombre:"Urrego Rosales Dorinda",                 ini:"UR", foto:"/fotos/CIHSL/PB/Urrego Rosales, Dorinda.png" },
    ],
  },

  // ── MEGAMARCAS ────────────────────────────────────────────────────
  "Megamarcas": {
    csst: [
      { id:"csst-mm-1", nombre:"Chicoma Chunga Allinson Alfredo", ini:"CC", foto:"/fotos/CSST/MM/Chicoma Chunga, Allinson Alfredo.png" },
      { id:"csst-mm-2", nombre:"Cordero Talledo Milko Andre",     ini:"CO", foto:"/fotos/CSST/MM/Cordero Talledo, Milko Andre Shirola.png" },
      { id:"csst-mm-3", nombre:"Monja Pozo Ronaldo David",        ini:"MO", foto:"/fotos/CSST/MM/Monja Pozo, Ronaldo David.png" },
      { id:"csst-mm-4", nombre:"Nizama Condolo Ángel Brayan",     ini:"NI", foto:"/fotos/CSST/MM/Nizama Condolo, Ángel Brayan.png" },
    ],
    cihsl: [
      { id:"cihsl-mm-1", nombre:"Gómez Vegas Consuelo Elizabeth", ini:"GO", foto:"/fotos/CIHSL/MM/Gómez Vegas Consuelo Elizabeth.png" },
      { id:"cihsl-mm-2", nombre:"Monja Pozo Ronaldo David",       ini:"MO", foto:"/fotos/CIHSL/MM/Monja Pozo, Ronaldo David.png" },
      { id:"cihsl-mm-3", nombre:"Nizama Condolo Ángel Brayan",    ini:"NI", foto:"/fotos/CIHSL/MM/Nizama Condolo, Ángel Brayan.png" },
      { id:"cihsl-mm-4", nombre:"Peña Zarate Klenly Gisela",      ini:"PE", foto:"/fotos/CIHSL/MM/Peña Zarate, Klenly Gisela.png" },
    ],
  },

  // ── FARMIVENT ─────────────────────────────────────────────────────
  "Farmivent": {
    csst: [
      { id:"csst-fv-1", nombre:"Castillo Paz Karlo Adrian",             ini:"CP", foto:"/fotos/CSST/FV/Castillo Paz, Karlo Adrian.png" },
      { id:"csst-fv-2", nombre:"Neyra Yacsahuache Henry",               ini:"NY", foto:"/fotos/CSST/FV/Castro Zevallos Ronald Alfredo.png" },
      { id:"csst-fv-3", nombre:"Castro Zevallos Ronald Alfredo",        ini:"CZ", foto:"/fotos/CSST/FV/Neyra Yacsahuache, Henry.png" },
    ],
    cihsl: [
      { id:"cihsl-fv-1", nombre:"Barrutia Chumacero Jorge Luis", ini:"BC", foto:"/fotos/CIHSL/FV/Barrutia Chumacero Jorge Luis.png" },
      { id:"cihsl-fv-2", nombre:"Calle Hurtado Mayulli",         ini:"CA", foto:"/fotos/CIHSL/FV/Calle Hurtado Mayulli.png" },
      { id:"cihsl-fv-3", nombre:"Torres Requejo Jhuly Karina",   ini:"TR", foto:"/fotos/CIHSL/FV/Torres Requejo Jhuly Karina.png" },
    ],
  },

  // ── FARMI GAB ─────────────────────────────────────────────────────
  "Farmi GAB": {
    csst: [
      { id:"csst-fg-1", nombre:"Ocampos Mogollón Liliana Elizabeth", ini:"OM", foto:"/fotos/CSST/FGAB/Ocampos Mogollón, Liliana Elizabeth.png" },
      { id:"csst-fg-2", nombre:"Saldarriaga Facho Camila Lisbeth",   ini:"SF", foto:"/fotos/CSST/FGAB/Saldarriaga Facho, Camila Lisbeth.png" },
    ],
    cihsl: [
      { id:"cihsl-fg-1", nombre:"Huancas Herrera Yuri Vannesa",          ini:"HH", foto:"/fotos/CIHSL/FGAB/Huancas Herrera, Yuri Vannesa.png" },
      { id:"cihsl-fg-2", nombre:"Ocampos Mogollón Liliana Elizabeth",     ini:"OM", foto:"/fotos/CIHSL/FGAB/Ocampos Mogollón, Liliana Elizabeth.png" },
    ],
  },

  // ── INMOBILIARIA LAS CUMBRES ──────────────────────────────────────
  "Inmobiliaria Las Cumbres": {
    csst: [
      { id:"csst-ilc-1", nombre:"Maza Cueva Fiorella Anahí",    ini:"MZ", foto:"/fotos/CSST/ILC/Maza Cueva Fiorella Anahí.png" },
      { id:"csst-ilc-2", nombre:"Tavara Cherres Yomira Mariela", ini:"TC", foto:"/fotos/CSST/ILC/Tavara Cherres, Yomira Mariela.png" },
    ],
    cihsl: [
      { id:"cihsl-ilc-1", nombre:"Miranda López Cinthya Del Pilar", ini:"ML", foto:"/fotos/CIHSL/ILC/Miranda López, Cinthya Del Pilar.png" },
      { id:"cihsl-ilc-2", nombre:"Tavara Cherres Yomira Mariela",   ini:"TC", foto:"/fotos/CIHSL/ILC/Tavara Cherres, Yomira Mariela.png" },
    ],
  },
};

// ── HELPERS ───────────────────────────────────────────────────────────────────
export const PALETA = ["#2563EB","#7C3AED","#DB2777","#059669","#D97706","#DC2626","#0891B2","#65A30D","#9333EA","#0284C7"];

export function colorAvatar(str) {
  let h = 0;
  for (let c of str) h = c.charCodeAt(0) + ((h << 5) - h);
  return PALETA[Math.abs(h) % PALETA.length];
}

export function getNombreById(id) {
  for (const emp of Object.values(CANDIDATOS_POR_EMPRESA)) {
    const all = [...(emp.csst||[]), ...(emp.cihsl||[])];
    const found = all.find(c => c.id === id);
    if (found) return found.nombre;
  }
  return id || '—';
}
