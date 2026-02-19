// ═══════════════════════════════════════════════════════════════════
// DATOS: Edita aquí los nombres reales de candidatos cuando los tengas
// ═══════════════════════════════════════════════════════════════════

export const EMPRESAS = {
  "Empresa Alvarez Bohl": ["PIURA", "TUMBES", "TRUJILLO", "CHIMBOTE", "CHICLAYO", "CAJAMARCA", "HUAMACHUCO"],
  "Empresa Punto Blanco":  ["PIURA", "TUMBES"],
  "Empresa Megamarcas": ["PIURA"],
  "Empresa Farmivent": ["PIURA"],
  "Empresa Inmobiliaria Las Cumbres": ["PIURA"],
};

export const CANDIDATOS_POR_SEDE = {
  "Empresa Alpha|Central Lima": {
    seguridad:     [ {id:"s-al-cl-1", nombre:"Carlos Mendoza Ríos",   cargo:"Titular",  ini:"CM"}, {id:"s-al-cl-2", nombre:"Ana Lucía Torres",     cargo:"Titular",  ini:"AT"}, {id:"s-al-cl-3", nombre:"Roberto Sánchez Díaz",  cargo:"Suplente", ini:"RS"}, {id:"s-al-cl-4", nombre:"María Fernández Ruiz",  cargo:"Suplente", ini:"MF"} ],
    hostigamiento: [ {id:"h-al-cl-1", nombre:"Lucía Vargas Peña",     cargo:"Titular",  ini:"LV"}, {id:"h-al-cl-2", nombre:"Jorge Huamán Cruz",     cargo:"Titular",  ini:"JH"}, {id:"h-al-cl-3", nombre:"Patricia Quispe Vera",  cargo:"Suplente", ini:"PQ"}, {id:"h-al-cl-4", nombre:"Eduardo Ramos León",    cargo:"Suplente", ini:"ER"} ],
  },
  "Empresa Alpha|Miraflores": {
    seguridad:     [ {id:"s-al-mf-1", nombre:"Sofía Paredes Tello",   cargo:"Titular",  ini:"SP"}, {id:"s-al-mf-2", nombre:"Miguel Ángel Reyes",    cargo:"Titular",  ini:"MR"}, {id:"s-al-mf-3", nombre:"Carmen López Silva",    cargo:"Suplente", ini:"CL"}, {id:"s-al-mf-4", nombre:"Héctor Ríos Campos",    cargo:"Suplente", ini:"HR"} ],
    hostigamiento: [ {id:"h-al-mf-1", nombre:"Diana Castro Flores",   cargo:"Titular",  ini:"DC"}, {id:"h-al-mf-2", nombre:"Andrés Mora Pinto",     cargo:"Titular",  ini:"AM"}, {id:"h-al-mf-3", nombre:"Rosa Gutiérrez Alba",   cargo:"Suplente", ini:"RG"}, {id:"h-al-mf-4", nombre:"Luis Peña Salas",       cargo:"Suplente", ini:"LP"} ],
  },
  "Empresa Alpha|San Isidro": {
    seguridad:     [ {id:"s-al-si-1", nombre:"Verónica Huanca Tito",  cargo:"Titular",  ini:"VH"}, {id:"s-al-si-2", nombre:"Pablo Zavala Mora",      cargo:"Titular",  ini:"PZ"}, {id:"s-al-si-3", nombre:"Inés Cárdenas Vega",    cargo:"Suplente", ini:"IC"}, {id:"s-al-si-4", nombre:"Raúl Espinoza Daza",    cargo:"Suplente", ini:"RE"} ],
    hostigamiento: [ {id:"h-al-si-1", nombre:"Claudia Nieto Barco",   cargo:"Titular",  ini:"CN"}, {id:"h-al-si-2", nombre:"Fernando Chávez Paz",    cargo:"Titular",  ini:"FC"}, {id:"h-al-si-3", nombre:"Natalia Obando Roca",   cargo:"Suplente", ini:"NO"}, {id:"h-al-si-4", nombre:"César Montoya Luz",     cargo:"Suplente", ini:"CZ"} ],
  },
  "Empresa Alpha|Surco": {
    seguridad:     [ {id:"s-al-su-1", nombre:"Gisela Puma Anco",      cargo:"Titular",  ini:"GP"}, {id:"s-al-su-2", nombre:"Martín Delgado Soto",    cargo:"Titular",  ini:"MD"}, {id:"s-al-su-3", nombre:"Sandra Vega Tapia",     cargo:"Suplente", ini:"SV"}, {id:"s-al-su-4", nombre:"Óscar Trujillo Aedo",   cargo:"Suplente", ini:"OT"} ],
    hostigamiento: [ {id:"h-al-su-1", nombre:"Alejandra Fuentes Gil",  cargo:"Titular",  ini:"AF"}, {id:"h-al-su-2", nombre:"Rodrigo Palma Ríos",    cargo:"Titular",  ini:"RP"}, {id:"h-al-su-3", nombre:"Beatriz Suárez Noel",   cargo:"Suplente", ini:"BS"}, {id:"h-al-su-4", nombre:"Iván Lara Ccoa",        cargo:"Suplente", ini:"IL"} ],
  },
  "Empresa Alpha|Callao": {
    seguridad:     [ {id:"s-al-ca-1", nombre:"Norma Choque Yupanqui", cargo:"Titular",  ini:"NC"}, {id:"s-al-ca-2", nombre:"Julio Pinto Arenas",      cargo:"Titular",  ini:"JP"}, {id:"s-al-ca-3", nombre:"Elsa Mamani Quispe",    cargo:"Suplente", ini:"EM"}, {id:"s-al-ca-4", nombre:"Dante Salazar Inga",    cargo:"Suplente", ini:"DS"} ],
    hostigamiento: [ {id:"h-al-ca-1", nombre:"Fabiola Rengifo Solis", cargo:"Titular",  ini:"FR"}, {id:"h-al-ca-2", nombre:"Walter Cortez Bravo",     cargo:"Titular",  ini:"WC"}, {id:"h-al-ca-3", nombre:"Miriam Yañez Cano",     cargo:"Suplente", ini:"MY"}, {id:"h-al-ca-4", nombre:"Alfredo Ponce Díaz",    cargo:"Suplente", ini:"AP"} ],
  },
  "Empresa Alpha|San Borja": {
    seguridad:     [ {id:"s-al-sb-1", nombre:"Liliana Arce Montes",   cargo:"Titular",  ini:"LA"}, {id:"s-al-sb-2", nombre:"Ernesto Velarde Cruz",    cargo:"Titular",  ini:"EV"}, {id:"s-al-sb-3", nombre:"Pilar Condori Ayca",    cargo:"Suplente", ini:"PC"}, {id:"s-al-sb-4", nombre:"Gilberto Haro Rueda",   cargo:"Suplente", ini:"GH"} ],
    hostigamiento: [ {id:"h-al-sb-1", nombre:"Roxana Campos Alva",    cargo:"Titular",  ini:"RC"}, {id:"h-al-sb-2", nombre:"Néstor Llanos Puente",    cargo:"Titular",  ini:"NL"}, {id:"h-al-sb-3", nombre:"Giuliana Meza Rivas",   cargo:"Suplente", ini:"GM"}, {id:"h-al-sb-4", nombre:"Herbert Cueva Taco",    cargo:"Suplente", ini:"HC"} ],
  },
  "Empresa Alpha|Chorrillos": {
    seguridad:     [ {id:"s-al-ch-1", nombre:"Marisol Ticona Llana",  cargo:"Titular",  ini:"MT"}, {id:"s-al-ch-2", nombre:"Ángel Quiñones Paz",     cargo:"Titular",  ini:"AQ"}, {id:"s-al-ch-3", nombre:"Flor Ccasa Apaza",      cargo:"Suplente", ini:"FA"}, {id:"s-al-ch-4", nombre:"Yuri Tapia Mamani",     cargo:"Suplente", ini:"YT"} ],
    hostigamiento: [ {id:"h-al-ch-1", nombre:"Jackeline Ore Huanca",  cargo:"Titular",  ini:"JO"}, {id:"h-al-ch-2", nombre:"Dario Villanueva Sol",   cargo:"Titular",  ini:"DV"}, {id:"h-al-ch-3", nombre:"Susana Inca Choquecc",  cargo:"Suplente", ini:"SI"}, {id:"h-al-ch-4", nombre:"Wilmer Flores Boza",    cargo:"Suplente", ini:"WF"} ],
  },
  "Empresa Beta|Sede Principal": {
    seguridad:     [ {id:"s-be-sp-1", nombre:"Javier Quispe Llave",   cargo:"Titular",  ini:"JQ"}, {id:"s-be-sp-2", nombre:"Stephanie Polo Vega",    cargo:"Titular",  ini:"SV"}, {id:"s-be-sp-3", nombre:"Nelson Arroyo Cano",    cargo:"Suplente", ini:"NA"}, {id:"s-be-sp-4", nombre:"Pamela Rojas Cusi",     cargo:"Suplente", ini:"PR"} ],
    hostigamiento: [ {id:"h-be-sp-1", nombre:"Vanesa Merino Tello",   cargo:"Titular",  ini:"VM"}, {id:"h-be-sp-2", nombre:"Cristian Barreto Aza",   cargo:"Titular",  ini:"CB"}, {id:"h-be-sp-3", nombre:"Gabriela Pino Saico",   cargo:"Suplente", ini:"GS"}, {id:"h-be-sp-4", nombre:"Alberto Turpo Lazo",    cargo:"Suplente", ini:"AL"} ],
  },
  "Empresa Beta|Sucursal Norte": {
    seguridad:     [ {id:"s-be-sn-1", nombre:"Margarita Rosas Aldea", cargo:"Titular",  ini:"MR"}, {id:"s-be-sn-2", nombre:"Kevin Ccori Ttito",       cargo:"Titular",  ini:"KC"}, {id:"s-be-sn-3", nombre:"Lorena Atahua Pilco",   cargo:"Suplente", ini:"LO"}, {id:"s-be-sn-4", nombre:"Roberto Huanca Suri",   cargo:"Suplente", ini:"RH"} ],
    hostigamiento: [ {id:"h-be-sn-1", nombre:"Tatiana Sucari Yana",   cargo:"Titular",  ini:"TS"}, {id:"h-be-sn-2", nombre:"Marco Calcina Pinto",     cargo:"Titular",  ini:"MC"}, {id:"h-be-sn-3", nombre:"Silvia Coyla Masco",     cargo:"Suplente", ini:"SC"}, {id:"h-be-sn-4", nombre:"Henry Condori Zarate",   cargo:"Suplente", ini:"HZ"} ],
  },
  "Empresa Gamma|Oficina Central": {
    seguridad:     [ {id:"s-ga-oc-1", nombre:"Xiomara Bustios Raza",  cargo:"Titular",  ini:"XB"}, {id:"s-ga-oc-2", nombre:"Freddy Lazo Ccama",       cargo:"Titular",  ini:"FL"}, {id:"s-ga-oc-3", nombre:"Isabel Inca Pilco",      cargo:"Suplente", ini:"II"}, {id:"s-ga-oc-4", nombre:"Gonzalo Medrano Pari",   cargo:"Suplente", ini:"GX"} ],
    hostigamiento: [ {id:"h-ga-oc-1", nombre:"Melissa Ccoicca Lima",  cargo:"Titular",  ini:"ML"}, {id:"h-ga-oc-2", nombre:"Darwin Quisocala Cruz",   cargo:"Titular",  ini:"DQ"}, {id:"h-ga-oc-3", nombre:"Priscila Anco Cañari",   cargo:"Suplente", ini:"PA"}, {id:"h-ga-oc-4", nombre:"Yerlan Mamani Coyla",    cargo:"Suplente", ini:"YM"} ],
  },
  "Empresa Gamma|Planta Industrial": {
    seguridad:     [ {id:"s-ga-pi-1", nombre:"Brenda Cárdenas Anco",  cargo:"Titular",  ini:"BC"}, {id:"s-ga-pi-2", nombre:"Leandro Cutipa Tito",     cargo:"Titular",  ini:"LC"}, {id:"s-ga-pi-3", nombre:"Yessenia Chura Cusi",    cargo:"Suplente", ini:"YC"}, {id:"s-ga-pi-4", nombre:"Nilton Hancco Huanca",   cargo:"Suplente", ini:"NH"} ],
    hostigamiento: [ {id:"h-ga-pi-1", nombre:"Cinthia Ticona Mamani", cargo:"Titular",  ini:"CT"}, {id:"h-ga-pi-2", nombre:"Jhon Colque Apaza",       cargo:"Titular",  ini:"JC"}, {id:"h-ga-pi-3", nombre:"Mirella Cusi Quispe",    cargo:"Suplente", ini:"MQ"}, {id:"h-ga-pi-4", nombre:"Remy Layme Tarqui",      cargo:"Suplente", ini:"RL"} ],
  },
};

export const PALETA = ["#2563EB","#7C3AED","#DB2777","#059669","#D97706","#DC2626","#0891B2","#65A30D","#9333EA","#0284C7"];

export function colorAvatar(str) {
  let h = 0;
  for (let c of str) h = c.charCodeAt(0) + ((h << 5) - h);
  return PALETA[Math.abs(h) % PALETA.length];
}

export function getNombreById(id) {
  for (const key of Object.keys(CANDIDATOS_POR_SEDE)) {
    const s = CANDIDATOS_POR_SEDE[key];
    const found = [...s.seguridad, ...s.hostigamiento].find(c => c.id === id);
    if (found) return found.nombre;
  }
  return id;
}
