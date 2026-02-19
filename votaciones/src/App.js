import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { EMPRESAS, CANDIDATOS_POR_SEDE, colorAvatar, getNombreById } from './data';
import * as XLSX from 'xlsx';

// ─── ESTILOS GLOBALES ────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #060b18; color: #f8fafc; font-family: 'DM Sans', sans-serif; }
  select option { background: #1e293b; color: #f8fafc; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
  @keyframes popIn  { from { opacity:0; transform:scale(0.88); } to { opacity:1; transform:scale(1); } }
  .fade-up { animation: fadeUp 0.42s cubic-bezier(.22,1,.36,1) both; }
  .pop-in  { animation: popIn  0.32s cubic-bezier(.22,1,.36,1) both; }
  .cand-card:hover { transform: translateY(-5px) scale(1.03) !important; border-color: rgba(255,255,255,0.28) !important; box-shadow: 0 12px 36px rgba(0,0,0,0.5) !important; }
  input:focus, select:focus { border-color: #60a5fa !important; box-shadow: 0 0 0 3px #60a5fa1e; outline: none; }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
`;

// ─── AVATAR ──────────────────────────────────────────────────────────────────
function Avatar({ ini, size = 70 }) {
  const bg = colorAvatar(ini);
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.29, fontWeight: 800, color: '#fff',
      fontFamily: "'Playfair Display', serif",
      boxShadow: `0 5px 22px ${bg}55`, flexShrink: 0,
    }}>{ini}</div>
  );
}

// ─── TARJETA CANDIDATO ───────────────────────────────────────────────────────
function CandidatoCard({ c, seleccionado, onClick, disabled }) {
  return (
    <div
      className={disabled ? '' : 'cand-card'}
      onClick={disabled ? null : onClick}
      style={{
        background: seleccionado ? 'linear-gradient(145deg,#1e3a8a,#312e81)' : 'rgba(255,255,255,0.04)',
        border: `2px solid ${seleccionado ? '#60a5fa' : 'rgba(255,255,255,0.09)'}`,
        borderRadius: 18, padding: '20px 14px',
        cursor: disabled ? 'default' : 'pointer',
        transition: 'all 0.22s ease',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 11,
        transform: seleccionado ? 'translateY(-5px) scale(1.03)' : 'none',
        opacity: disabled && !seleccionado ? 0.4 : 1,
        position: 'relative', minWidth: 138, flex: '1 1 138px',
        boxShadow: seleccionado ? '0 10px 32px #1e3a8a55' : 'none',
      }}
    >
      {seleccionado && (
        <div style={{
          position:'absolute', top:-12, right:-12,
          background:'#22c55e', borderRadius:'50%', width:28, height:28,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:15, fontWeight:800, color:'#fff', boxShadow:'0 2px 10px #22c55e66',
        }}>✓</div>
      )}
      <Avatar ini={c.ini} size={66} />
      <div style={{ textAlign:'center' }}>
        <p style={{ margin:0, fontWeight:700, fontSize:13, color:'#f1f5f9', lineHeight:1.38 }}>{c.nombre}</p>
        <span style={{
          display:'inline-block', marginTop:6, fontSize:11, color:'#94a3b8',
          background:'rgba(148,163,184,0.12)', padding:'2px 10px', borderRadius:20,
        }}>{c.cargo}</span>
      </div>
    </div>
  );
}

// ─── BLOQUE COMITÉ ───────────────────────────────────────────────────────────
function BloqueComite({ titulo, icono, color, candidatos, votoActual, onVotar, bloqueado }) {
  return (
    <div style={{
      background:'rgba(255,255,255,0.025)', border:`1.5px solid ${color}30`,
      borderRadius:22, padding:'22px 18px', marginBottom:20,
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
        <span style={{ fontSize:20 }}>{icono}</span>
        <h3 style={{ margin:0, color, fontFamily:"'Playfair Display',serif", fontSize:17 }}>{titulo}</h3>
        {bloqueado && (
          <span style={{
            marginLeft:'auto', background:'#22c55e18', color:'#22c55e',
            padding:'3px 12px', borderRadius:20, fontSize:11, fontWeight:700,
          }}>✓ Registrado</span>
        )}
      </div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:12, justifyContent:'center' }}>
        {candidatos.map(c => (
          <CandidatoCard key={c.id} c={c}
            seleccionado={votoActual === c.id}
            onClick={() => onVotar(c.id)}
            disabled={bloqueado}
          />
        ))}
      </div>
      {!bloqueado && !votoActual && (
        <p style={{ textAlign:'center', marginTop:14, color:'#334155', fontSize:12 }}>
          Haz clic en un candidato para seleccionarlo
        </p>
      )}
    </div>
  );
}

// ─── PANEL ADMIN ─────────────────────────────────────────────────────────────
function AdminPanel({ onClose }) {
  const [votantes, setVotantes] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filtro, setFiltro]     = useState('Todas');
  const [error, setError]       = useState('');

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('votantes')
        .select('*')
        .order('fecha', { ascending: false });
      if (error) { setError('Error al cargar datos: ' + error.message); }
      else { setVotantes(data || []); }
      setLoading(false);
    }
    fetchData();
  }, []);

  const lista = filtro === 'Todas' ? votantes : votantes.filter(v => v.empresa === filtro);

  // Conteo votos por candidato ID
  const conteo = {};
  for (const v of votantes) {
    if (v.seguridad)     conteo[v.seguridad]     = (conteo[v.seguridad]     || 0) + 1;
    if (v.hostigamiento) conteo[v.hostigamiento] = (conteo[v.hostigamiento] || 0) + 1;
  }

  const unique = (arr) => arr.filter((c,i,a) => a.findIndex(x=>x.id===c.id)===i);
  const topSeg = unique(Object.values(CANDIDATOS_POR_SEDE).flatMap(s => s.seguridad))
    .map(c => ({...c, votos: conteo[c.id]||0})).filter(c=>c.votos>0).sort((a,b)=>b.votos-a.votos);
  const topHos = unique(Object.values(CANDIDATOS_POR_SEDE).flatMap(s => s.hostigamiento))
    .map(c => ({...c, votos: conteo[c.id]||0})).filter(c=>c.votos>0).sort((a,b)=>b.votos-a.votos);

  const total = votantes.length;

  // ── EXPORTAR EXCEL ──
  function exportarExcel() {
    const wb = XLSX.utils.book_new();

    // Hoja 1: todos los votos
    const datosVotos = lista.map((v, i) => ({
      '#':                    i + 1,
      'DNI':                  v.dni,
      'Nombre Completo':      v.nombre,
      'Empresa':              v.empresa,
      'Sede':                 v.sede,
      'Voto Comité Seguridad':      getNombreById(v.seguridad),
      'Voto Comité Hostigamiento':  getNombreById(v.hostigamiento),
      'Fecha y Hora':         new Date(v.fecha).toLocaleString('es-PE'),
    }));
    const ws1 = XLSX.utils.json_to_sheet(datosVotos);
    ws1['!cols'] = [
      {wch:5},{wch:12},{wch:30},{wch:20},{wch:20},{wch:35},{wch:35},{wch:22}
    ];
    XLSX.utils.book_append_sheet(wb, ws1, 'Registro de Votos');

    // Hoja 2: resultados seguridad
    const resSeg = topSeg.map((c, i) => ({
      'Posición':  i + 1,
      'Candidato': c.nombre,
      'Cargo':     c.cargo,
      'Votos':     c.votos,
      '% del total': total > 0 ? `${Math.round(c.votos/total*100)}%` : '0%',
    }));
    const ws2 = XLSX.utils.json_to_sheet(resSeg);
    ws2['!cols'] = [{wch:10},{wch:30},{wch:12},{wch:8},{wch:14}];
    XLSX.utils.book_append_sheet(wb, ws2, 'Resultados Seguridad');

    // Hoja 3: resultados hostigamiento
    const resHos = topHos.map((c, i) => ({
      'Posición':  i + 1,
      'Candidato': c.nombre,
      'Cargo':     c.cargo,
      'Votos':     c.votos,
      '% del total': total > 0 ? `${Math.round(c.votos/total*100)}%` : '0%',
    }));
    const ws3 = XLSX.utils.json_to_sheet(resHos);
    ws3['!cols'] = [{wch:10},{wch:30},{wch:12},{wch:8},{wch:14}];
    XLSX.utils.book_append_sheet(wb, ws3, 'Resultados Hostigamiento');

    const fecha = new Date().toISOString().slice(0,10);
    XLSX.writeFile(wb, `Votaciones_Comites_${fecha}.xlsx`);
  }

  const sel = {
    background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)',
    borderRadius:9, padding:'7px 12px', color:'#f8fafc', fontSize:12,
    fontFamily:"'DM Sans',sans-serif", cursor:'pointer',
  };

  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(6,11,24,0.95)',
      zIndex:1000, overflow:'auto', padding:'20px 14px',
    }}>
      <div style={{
        maxWidth:960, margin:'0 auto', background:'#0c1423',
        borderRadius:24, border:'1px solid rgba(255,255,255,0.07)', padding:30,
      }}>
        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:26, flexWrap:'wrap', gap:12 }}>
          <div>
            <h2 style={{ margin:0, fontFamily:"'Playfair Display',serif", fontSize:21, color:'#f8fafc' }}>
              📊 Panel de Resultados
            </h2>
            <p style={{ margin:'3px 0 0', color:'#334155', fontSize:11.5 }}>
              Datos en tiempo real desde Supabase
            </p>
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={exportarExcel} style={{
              background:'linear-gradient(135deg,#14532d,#166534)',
              border:'none', borderRadius:10, color:'#fff',
              padding:'9px 18px', cursor:'pointer', fontSize:13, fontWeight:700,
              fontFamily:"'DM Sans',sans-serif", boxShadow:'0 4px 16px #16653440',
            }}>
              ⬇ Exportar Excel
            </button>
            <button onClick={onClose} style={{ ...sel, padding:'9px 16px' }}>✕ Cerrar</button>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign:'center', color:'#334155', padding:40 }}>
            <div style={{ fontSize:32, marginBottom:12 }}>⏳</div>
            Cargando datos desde Supabase...
          </div>
        ) : error ? (
          <div style={{ background:'#ef444415', border:'1px solid #ef444432', borderRadius:12, padding:20, color:'#fca5a5' }}>
            ⚠️ {error}
          </div>
        ) : (
          <>
            {/* Stats */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:26 }}>
              {[
                { label:'Total votantes',      val:total,                               color:'#60a5fa' },
                { label:'Votos Seguridad',     val:topSeg.reduce((a,c)=>a+c.votos,0),  color:'#f59e0b' },
                { label:'Votos Hostigamiento', val:topHos.reduce((a,c)=>a+c.votos,0),  color:'#a78bfa' },
              ].map(s => (
                <div key={s.label} style={{
                  background:'rgba(255,255,255,0.025)', border:`1px solid ${s.color}1e`,
                  borderRadius:14, padding:'16px 12px', textAlign:'center',
                }}>
                  <p style={{ margin:0, fontSize:36, fontWeight:800, color:s.color }}>{s.val}</p>
                  <p style={{ margin:'3px 0 0', color:'#475569', fontSize:11 }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Resultados por comité */}
            {[
              { titulo:'🛡️ Comité de Seguridad',     color:'#f59e0b', data:topSeg },
              { titulo:'⚖️ Comité de Hostigamiento',  color:'#a78bfa', data:topHos },
            ].map(({ titulo, color, data }) => (
              <div key={titulo} style={{ marginBottom:24 }}>
                <h3 style={{ color, fontFamily:"'Playfair Display',serif", fontSize:14, margin:'0 0 12px' }}>{titulo}</h3>
                {data.length === 0
                  ? <p style={{ color:'#1e293b', fontSize:12 }}>Sin votos registrados aún.</p>
                  : data.map(c => (
                    <div key={c.id} style={{ display:'flex', alignItems:'center', gap:11, marginBottom:9 }}>
                      <Avatar ini={c.ini} size={32} />
                      <div style={{ flex:1 }}>
                        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                          <span style={{ color:'#cbd5e1', fontSize:12.5 }}>{c.nombre}</span>
                          <span style={{ color:'#475569', fontSize:12 }}>
                            {c.votos} voto{c.votos!==1?'s':''} · {total>0?Math.round(c.votos/total*100):0}%
                          </span>
                        </div>
                        <div style={{ background:'rgba(255,255,255,0.05)', borderRadius:4, height:8 }}>
                          <div style={{
                            width:`${data[0].votos>0?Math.round(c.votos/data[0].votos*100):0}%`,
                            height:'100%', borderRadius:4,
                            background:`linear-gradient(90deg,${color},${color}77)`,
                            transition:'width 0.5s ease',
                          }}/>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            ))}

            {/* Tabla votantes */}
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10, flexWrap:'wrap', gap:8 }}>
                <h3 style={{ margin:0, color:'#64748b', fontSize:13 }}>
                  Registro de votantes ({lista.length})
                </h3>
                <div style={{ display:'flex', gap:8 }}>
                  <select style={sel} value={filtro} onChange={e=>setFiltro(e.target.value)}>
                    <option>Todas</option>
                    {Object.keys(EMPRESAS).map(e=><option key={e}>{e}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ background:'rgba(0,0,0,0.2)', borderRadius:12, maxHeight:280, overflow:'auto', padding:8 }}>
                <table style={{ width:'100%', borderCollapse:'collapse', fontSize:11.5 }}>
                  <thead>
                    <tr>
                      {['#','DNI','Nombre','Empresa','Sede','Voto Seguridad','Voto Hostigamiento','Fecha'].map(h=>(
                        <th key={h} style={{
                          color:'#334155', padding:'7px 8px', textAlign:'left',
                          borderBottom:'1px solid rgba(255,255,255,0.04)', whiteSpace:'nowrap',
                          position:'sticky', top:0, background:'#0c1423',
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {lista.length===0 && (
                      <tr><td colSpan={8} style={{ color:'#1e293b', padding:20, textAlign:'center' }}>Sin registros aún</td></tr>
                    )}
                    {lista.map((v,i)=>(
                      <tr key={v.id} style={{ borderBottom:'1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ color:'#1e293b', padding:'6px 8px' }}>{i+1}</td>
                        <td style={{ color:'#94a3b8', padding:'6px 8px', fontWeight:600 }}>{v.dni}</td>
                        <td style={{ color:'#cbd5e1', padding:'6px 8px' }}>{v.nombre}</td>
                        <td style={{ color:'#64748b', padding:'6px 8px' }}>{v.empresa}</td>
                        <td style={{ color:'#64748b', padding:'6px 8px' }}>{v.sede}</td>
                        <td style={{ color:'#f59e0b', padding:'6px 8px' }}>{getNombreById(v.seguridad)}</td>
                        <td style={{ color:'#a78bfa', padding:'6px 8px' }}>{getNombreById(v.hostigamiento)}</td>
                        <td style={{ color:'#334155', padding:'6px 8px', whiteSpace:'nowrap' }}>
                          {new Date(v.fecha).toLocaleString('es-PE')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// APP PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [paso, setPaso]       = useState(0);
  const [nombre, setNombre]   = useState('');
  const [dni, setDni]         = useState('');
  const [empresa, setEmpresa] = useState('');
  const [sede, setSede]       = useState('');
  const [votoSeg, setVotoSeg] = useState(null);
  const [votoHos, setVotoHos] = useState(null);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const [showAdmin, setShowAdmin]           = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminInput, setAdminInput]         = useState('');

  const sedes = empresa ? EMPRESAS[empresa] || [] : [];
  const claveSede = empresa && sede ? `${empresa}|${sede}` : null;
  const candidatosSede = claveSede ? CANDIDATOS_POR_SEDE[claveSede] : null;

  const inp = {
    width:'100%', background:'rgba(255,255,255,0.05)',
    border:'1px solid rgba(255,255,255,0.11)', borderRadius:12,
    padding:'13px 16px', color:'#f8fafc', fontSize:15,
    fontFamily:"'DM Sans',sans-serif", transition:'all 0.2s',
  };

  async function handleContinuar() {
    const nom = nombre.trim(), dniT = dni.trim();
    if (!nom || !dniT || !empresa || !sede) { setError('Por favor completa todos los campos.'); return; }
    if (!/^\d{8}$/.test(dniT))              { setError('El DNI debe tener exactamente 8 dígitos.'); return; }
    if (nom.length < 4)                     { setError('Ingresa tu nombre completo.'); return; }

    setLoading(true);
    // Verificar DNI en Supabase
    const { data, error: err } = await supabase
      .from('votantes')
      .select('dni, fecha')
      .eq('dni', dniT)
      .maybeSingle();

    if (err) { setError('Error de conexión. Intenta nuevamente.'); setLoading(false); return; }
    if (data) {
      const fechaVoto = new Date(data.fecha).toLocaleString('es-PE');
      setError(`El DNI ${dniT} ya emitió su voto el ${fechaVoto}. Solo se permite un voto por trabajador.`);
      setLoading(false); return;
    }
    setError(''); setLoading(false); setPaso(1);
  }

  async function handleConfirmar() {
    if (!votoSeg || !votoHos) { setError('Debes seleccionar un candidato en cada comité.'); return; }
    setLoading(true);

    const { error: err } = await supabase.from('votantes').insert([{
      dni:          dni.trim(),
      nombre:       nombre.trim(),
      empresa,
      sede,
      seguridad:    votoSeg,
      hostigamiento: votoHos,
    }]);

    if (err) {
      if (err.code === '23505') {
        setError('Este DNI ya fue registrado. No es posible votar dos veces.');
      } else {
        setError('Error al guardar: ' + err.message);
      }
      setLoading(false); return;
    }
    setLoading(false); setPaso(2);
  }

  function handleAdminLogin() {
    if (adminInput === 'admin2024') { setShowAdmin(true); setShowAdminLogin(false); setAdminInput(''); setError(''); }
    else { setError('Contraseña incorrecta.'); }
  }

  function reset() { setPaso(0); setNombre(''); setDni(''); setEmpresa(''); setSede(''); setVotoSeg(null); setVotoHos(null); setError(''); }

  return (
    <div style={{ minHeight:'100vh', background:'#060b18', fontFamily:"'DM Sans',sans-serif", color:'#f8fafc', position:'relative' }}>
      <style>{css}</style>

      {/* Fondos decorativos */}
      <div style={{ position:'fixed', top:-240, right:-240, width:620, height:620, borderRadius:'50%', background:'radial-gradient(circle,#1e3a8a18,transparent 70%)', pointerEvents:'none' }}/>
      <div style={{ position:'fixed', bottom:-280, left:-240, width:720, height:720, borderRadius:'50%', background:'radial-gradient(circle,#3730a318,transparent 70%)', pointerEvents:'none' }}/>

      {/* Header */}
      <header style={{
        borderBottom:'1px solid rgba(255,255,255,0.07)', padding:'13px 22px',
        display:'flex', justifyContent:'space-between', alignItems:'center',
        background:'rgba(6,11,24,0.85)', backdropFilter:'blur(14px)',
        position:'sticky', top:0, zIndex:200,
      }}>
        <div>
          <h1 style={{
            margin:0, fontSize:17, fontFamily:"'Playfair Display',serif",
            background:'linear-gradient(135deg,#60a5fa,#a78bfa)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
          }}>🗳️ Sistema Electoral</h1>
          <p style={{ margin:0, fontSize:10, color:'#1e293b' }}>Comités de Seguridad y Hostigamiento</p>
        </div>
        <button onClick={() => { setShowAdminLogin(true); setError(''); setAdminInput(''); }} style={{
          background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)',
          color:'#475569', borderRadius:8, padding:'6px 13px', cursor:'pointer', fontSize:11.5,
          fontFamily:"'DM Sans',sans-serif",
        }}>⚙ Admin</button>
      </header>

      <main style={{ maxWidth:680, margin:'0 auto', padding:'44px 16px 70px' }}>

        {/* ── PASO 0: Identificación ── */}
        {paso === 0 && (
          <div className="fade-up">
            <div style={{ textAlign:'center', marginBottom:34 }}>
              <div style={{
                display:'inline-flex', alignItems:'center', justifyContent:'center',
                width:78, height:78, borderRadius:'50%',
                background:'linear-gradient(135deg,#1e3a8a,#312e81)',
                fontSize:34, marginBottom:14, boxShadow:'0 10px 42px #1e3a8a50',
              }}>🗳️</div>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:25, marginBottom:8 }}>
                Elecciones de Comités
              </h2>
              <p style={{ color:'#475569', fontSize:14 }}>
                Completa tus datos para acceder a la votación
              </p>
            </div>

            <div style={{
              background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.07)',
              borderRadius:24, padding:30, display:'flex', flexDirection:'column', gap:17,
            }}>
              <div>
                <label style={{ fontSize:11.5, color:'#475569', display:'block', marginBottom:7, fontWeight:700, letterSpacing:0.4 }}>
                  NOMBRE COMPLETO
                </label>
                <input style={inp} placeholder="Ej: Juan Carlos Pérez Quispe"
                  value={nombre} onChange={e=>setNombre(e.target.value)} autoComplete="off"/>
              </div>
              <div>
                <label style={{ fontSize:11.5, color:'#475569', display:'block', marginBottom:7, fontWeight:700, letterSpacing:0.4 }}>
                  DNI
                </label>
                <input style={inp} placeholder="8 dígitos" inputMode="numeric"
                  value={dni} onChange={e=>setDni(e.target.value.replace(/\D/g,'').slice(0,8))}/>
              </div>
              <div>
                <label style={{ fontSize:11.5, color:'#475569', display:'block', marginBottom:7, fontWeight:700, letterSpacing:0.4 }}>
                  EMPRESA
                </label>
                <select style={{ ...inp, cursor:'pointer' }} value={empresa}
                  onChange={e=>{ setEmpresa(e.target.value); setSede(''); }}>
                  <option value="">Selecciona tu empresa</option>
                  {Object.keys(EMPRESAS).map(e=><option key={e} value={e}>{e}</option>)}
                </select>
              </div>
              {empresa && (
                <div className="fade-up">
                  <label style={{ fontSize:11.5, color:'#475569', display:'block', marginBottom:7, fontWeight:700, letterSpacing:0.4 }}>
                    SEDE
                  </label>
                  <select style={{ ...inp, cursor:'pointer' }} value={sede} onChange={e=>setSede(e.target.value)}>
                    <option value="">Selecciona tu sede</option>
                    {sedes.map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              )}

              {error && (
                <div style={{ background:'#ef444413', border:'1px solid #ef444432', borderRadius:10, padding:'10px 14px', color:'#fca5a5', fontSize:13 }}>
                  ⚠️ {error}
                </div>
              )}

              <button onClick={handleContinuar} disabled={loading} style={{
                background:'linear-gradient(135deg,#1e3a8a,#312e81)', border:'none', borderRadius:13,
                color:'#fff', padding:'14px 0', fontSize:15, fontWeight:700,
                cursor:loading?'wait':'pointer', opacity:loading?0.7:1, transition:'all 0.2s',
                fontFamily:"'DM Sans',sans-serif", boxShadow:'0 6px 26px #1e3a8a40',
              }}>{loading ? '⏳ Verificando...' : 'Continuar →'}</button>
            </div>
          </div>
        )}

        {/* ── PASO 1: Votación ── */}
        {paso === 1 && candidatosSede && (
          <div className="fade-up">
            <div style={{
              background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.07)',
              borderRadius:14, padding:'13px 18px', marginBottom:22,
              display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8,
            }}>
              <div>
                <p style={{ margin:0, fontSize:11, color:'#334155' }}>Votante identificado</p>
                <p style={{ margin:'3px 0 0', fontWeight:700, color:'#94a3b8', fontSize:14 }}>
                  {nombre.trim()} — DNI {dni}
                </p>
                <p style={{ margin:'2px 0 0', fontSize:12, color:'#334155' }}>{empresa} · {sede}</p>
              </div>
              <div style={{ background:'#22c55e18', color:'#22c55e', padding:'5px 14px', borderRadius:20, fontSize:11.5, fontWeight:700 }}>
                ✓ Verificado
              </div>
            </div>

            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, marginBottom:20, color:'#e2e8f0' }}>
              Emite tu voto
            </h2>

            <BloqueComite titulo="Comité de Seguridad"     icono="🛡️" color="#f59e0b"
              candidatos={candidatosSede.seguridad}     votoActual={votoSeg} onVotar={setVotoSeg} bloqueado={false}/>
            <BloqueComite titulo="Comité de Hostigamiento" icono="⚖️" color="#a78bfa"
              candidatos={candidatosSede.hostigamiento} votoActual={votoHos} onVotar={setVotoHos} bloqueado={false}/>

            {error && (
              <div style={{ background:'#ef444413', border:'1px solid #ef444432', borderRadius:10, padding:'10px 14px', color:'#fca5a5', fontSize:13, marginBottom:14 }}>
                ⚠️ {error}
              </div>
            )}

            <button onClick={handleConfirmar} disabled={loading || !votoSeg || !votoHos} style={{
              width:'100%',
              background: votoSeg && votoHos ? 'linear-gradient(135deg,#14532d,#166534)' : 'rgba(255,255,255,0.04)',
              border:'none', borderRadius:13,
              color: votoSeg && votoHos ? '#fff' : '#1e293b',
              padding:'15px 0', fontSize:16, fontWeight:700,
              cursor: !loading && votoSeg && votoHos ? 'pointer' : 'not-allowed',
              transition:'all 0.3s', fontFamily:"'DM Sans',sans-serif",
              boxShadow: votoSeg && votoHos ? '0 6px 26px #16653440' : 'none',
            }}>{loading ? '⏳ Guardando en base de datos...' : '✅ Confirmar mis votos'}</button>
          </div>
        )}

        {/* ── PASO 2: Confirmación ── */}
        {paso === 2 && (
          <div className="pop-in" style={{ textAlign:'center', padding:'52px 20px' }}>
            <div style={{
              width:112, height:112, borderRadius:'50%',
              background:'linear-gradient(135deg,#14532d,#166534)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:50, margin:'0 auto 22px', boxShadow:'0 12px 52px #16653460',
            }}>✅</div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, marginBottom:10 }}>
              ¡Voto registrado!
            </h2>
            <p style={{ color:'#64748b', fontSize:15, marginBottom:6 }}>
              Tu participación ha sido guardada en la base de datos.
            </p>
            <p style={{ color:'#475569', fontSize:14, marginBottom:6 }}>
              <strong style={{ color:'#94a3b8' }}>{nombre.trim()}</strong> · DNI {dni}
            </p>
            <p style={{ color:'#334155', fontSize:12, marginBottom:42 }}>{empresa} — {sede}</p>
            <button onClick={reset} style={{
              background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.09)',
              color:'#475569', borderRadius:12, padding:'11px 26px',
              cursor:'pointer', fontSize:13, fontFamily:"'DM Sans',sans-serif",
            }}>← Nueva votación</button>
          </div>
        )}
      </main>

      {/* Admin login modal */}
      {showAdminLogin && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', zIndex:500, display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}>
          <div className="pop-in" style={{
            background:'#0c1423', border:'1px solid rgba(255,255,255,0.08)',
            borderRadius:20, padding:30, width:'100%', maxWidth:330,
          }}>
            <h3 style={{ margin:'0 0 18px', fontFamily:"'Playfair Display',serif", color:'#f8fafc' }}>
              🔐 Acceso Administrativo
            </h3>
            <input type="password" style={{ ...inp, marginBottom:11 }}
              placeholder="Contraseña" value={adminInput}
              onChange={e=>setAdminInput(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&handleAdminLogin()} autoFocus/>
            {error && <p style={{ color:'#fca5a5', fontSize:12, margin:'0 0 11px' }}>⚠️ {error}</p>}
            <div style={{ display:'flex', gap:9 }}>
              <button onClick={()=>{ setShowAdminLogin(false); setError(''); setAdminInput(''); }} style={{
                flex:1, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)',
                color:'#475569', borderRadius:10, padding:'10px 0', cursor:'pointer', fontSize:13,
                fontFamily:"'DM Sans',sans-serif",
              }}>Cancelar</button>
              <button onClick={handleAdminLogin} style={{
                flex:1, background:'linear-gradient(135deg,#1e3a8a,#312e81)',
                border:'none', color:'#fff', borderRadius:10, padding:'10px 0',
                cursor:'pointer', fontSize:13, fontWeight:700, fontFamily:"'DM Sans',sans-serif",
              }}>Ingresar</button>
            </div>
            <p style={{ margin:'11px 0 0', fontSize:10.5, color:'#1e293b', textAlign:'center' }}>
              Clave: admin2024
            </p>
          </div>
        </div>
      )}

      {showAdmin && <AdminPanel onClose={()=>setShowAdmin(false)} />}
    </div>
  );
}
