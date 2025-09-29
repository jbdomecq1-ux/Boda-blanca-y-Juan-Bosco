// Web de boda — Juan Bosco & Blanca
const WEDDING_TITLE = "Boda de Juan Bosco & Blanca";
const NOVIOS = "Juan Bosco & Blanca";
const FECHA_LARGA = "7 de noviembre de 2025";
const CIUDAD = "Madrid";
const LUGAR_CEREMONIA = "Real Iglesia de San Jerónimo el Real (Los Jerónimos), Madrid";
const LUGAR_BANQUETE = "Finca La Gaivota · C. Ardales, 18, 28023 Aravaca, Madrid";
const BUS_DETALLES = "Al finalizar la misa en Los Jerónimos, saldrán autobuses hacia Finca La Gaivota (C. Ardales 18, Aravaca). Regresos desde la finca: 01:30, 03:00 y 05:00 a Plaza del Marqués de Salamanca. A las 05:00 habrá además un minibús a Torrelodones.";
const FECHA_LIMITE_RSVP = "15 de octubre de 2025";

// Envío: por defecto localStorage. Cambia a "endpoint" y añade tu URL de Apps Script si quieres Google Sheets.
const SEND_MODE = "local"; // "local" | "endpoint"
const ENDPOINT_URL = "";   // p. ej. https://script.google.com/macros/s/XXXXX/exec

const IBAN = "ES78 2100 9222 3122 0016 1489";

function App() {
  return (
    <div>
      <Nav />
      <Hero />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Datos />
        <Horario />
        <Ubicacion />
        <Regalo />
        <RSVP />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

function Nav() {
  const items = [
    { href: "#datos", label: "Datos" },
    { href: "#horario", label: "Horario" },
    { href: "#ubicacion", label: "Ubicación" },
    { href: "#lista", label: "Regalo" },
    { href: "#rsvp", label: "Confirmar asistencia" },
    { href: "#faq", label: "FAQ" },
  ];
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="font-serif text-lg tracking-wide">{WEDDING_TITLE}</a>
        <nav className="hidden md:flex gap-6 text-sm">
          {items.map((it) => (
            <a key={it.href} href={it.href} className="hover:text-slate-900 text-slate-600">
              {it.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-32 h-96 w-96 rounded-full blur-3xl opacity-20"
             style={{ background: "radial-gradient(circle at 30% 30%, #a7f3d0, transparent 60%)" }} />
        <div className="absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-25"
             style={{ background: "radial-gradient(circle at 70% 70%, #93c5fd, transparent 60%)" }} />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="uppercase tracking-[0.3em] text-xs text-slate-500">Save the date</p>
        <h1 className="mt-3 font-serif text-5xl md:text-6xl text-slate-900">{NOVIOS}</h1>
        <p className="mt-4 text-lg text-slate-600">{FECHA_LARGA} · {CIUDAD}</p>
        <a href="#rsvp" className="inline-block mt-8 rounded-2xl border border-slate-300 px-6 py-3 shadow-sm hover:shadow transition text-slate-800 bg-white">
          Confirmar asistencia
        </a>
      </div>
    </section>
  );
}

function SectionTitle({ id, kicker, title, subtitle }) {
  return (
    <div id={id} className="scroll-mt-24">
      <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{kicker}</p>
      <h2 className="mt-2 font-serif text-3xl text-slate-900">{title}</h2>
      {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
    </div>
  );
}

function Datos() {
  return (
    <section className="py-14" id="datos">
      <SectionTitle kicker="Información" title="Datos principales" />
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Card label="Ceremonia" text={LUGAR_CEREMONIA + ' · 17:30 (7/11/2025)'} />
        <Card label="Banquete/Fiesta" text={LUGAR_BANQUETE} />
        <Card label="Código de vestimenta" text="Elegante (toque de color opcional)" />
      </div>
      <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">
          <strong>Autobuses:</strong> {BUS_DETALLES}
        </p>
      </div>
    </section>
  );
}

function Card({ label, text }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
      <p className="text-xs uppercase tracking-widest text-slate-500">{label}</p>
      <p className="mt-2 font-medium text-slate-800">{text}</p>
    </div>
  );
}

function Horario() {
  const items = [
    { time: "17:30", title: "Misa (ceremonia)", place: LUGAR_CEREMONIA },
    { time: "Al finalizar", title: "Traslado en autobús a la finca", place: LUGAR_BANQUETE },
    { time: "01:30", title: "Autobús de vuelta a Madrid (Plaza del Marqués de Salamanca)", place: "Salida: Finca La Gaivota" },
    { time: "03:00", title: "Autobús de vuelta a Madrid (Plaza del Marqués de Salamanca)", place: "Salida: Finca La Gaivota" },
    { time: "05:00", title: "Autobús de vuelta a Madrid (Plaza del Marqués de Salamanca) + Minibús a Torrelodones", place: "Salida: Finca La Gaivota" },
  ];
  return (
    <section className="py-14" id="horario">
      <SectionTitle kicker="Plan del día" title="Horario" subtitle={"Sujeto a pequeños cambios"} />
      <ol className="mt-8 relative border-slate-200">
        {items.map((it, i) => (
          <li key={i} className="grid md:grid-cols-[160px_1fr] items-start gap-4 py-4">
            <div className="text-sm text-slate-500">{it.time}</div>
            <div className="relative rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
              <div className="font-medium text-slate-900">{it.title}</div>
              <div className="text-slate-600 text-sm">{it.place}</div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Ubicacion() {
  return (
    <section className="py-14" id="ubicacion">
      <SectionTitle kicker="Cómo llegar" title="Ubicación" subtitle={"Te dejamos mapas para que no te pierdas"} />
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-white">
          <div className="p-4">
            <p className="font-medium">Ceremonia</p>
            <p className="text-sm text-slate-600">{LUGAR_CEREMONIA}</p>
          </div>
          <iframe
            title="Mapa ceremonia"
            className="w-full h-64"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=40.4145358,-3.6909801&z=16&output=embed"
          />
        </div>
        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-white">
          <div className="p-4">
            <p className="font-medium">Finca La Gaivota</p>
            <p className="text-sm text-slate-600">{LUGAR_BANQUETE}</p>
          </div>
          <iframe
            title="Mapa banquete"
            className="w-full h-64"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=40.4619832,-3.7827754&z=16&output=embed"
          />
        </div>
      </div>
    </section>
  );
}

function Regalo() {
  return (
    <section className="py-14" id="lista">
      <SectionTitle kicker="Regalo" title="Cuenta corriente" subtitle={"No tenemos lista de bodas. Si queréis tener un detalle, podéis usar esta cuenta."} />
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 flex flex-col">
          <div className="font-medium text-slate-900">Cuenta corriente</div>
          <div className="text-sm text-slate-600 mt-1 flex-1">Gracias por vuestro cariño ❤️</div>
          <div className="mt-3 text-sm text-slate-700 break-all">
            <span className="font-medium">IBAN: </span>{IBAN}
            <button onClick={() => navigator.clipboard.writeText(IBAN.replace(/\s+/g,''))} className="ml-2 inline-flex items-center rounded-lg border border-slate-300 px-2 py-1 text-xs bg-white hover:shadow">Copiar IBAN</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function RSVP() {
  return (
    <section className="py-14" id="rsvp">
      <SectionTitle kicker="¡Nos hará ilusión verte!" title="Confirmar asistencia" subtitle={`Por favor, responde antes del ${FECHA_LIMITE_RSVP}.`} />
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <FormCard />
        <ResponsesCard />
      </div>
    </section>
  );
}

function Field({ label, children, required }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-slate-700">{label}{required && <span className="text-rose-600"> *</span>}</span>
      {children}
    </label>
  );
}

function validate(f) {
  if (!f.nombre.trim()) throw new Error("Por favor, indica tu nombre.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) throw new Error("Email no válido.");
  if (f.telefono.replace(/\D/g, "").length < 6) throw new Error("Indica un teléfono válido.");
  if (f.acompanante === "si" && !f.nombreAcompanante.trim()) throw new Error("Indica el nombre del acompañante.");
}

function FormCard() {
  const [submitting, setSubmitting] = React.useState(false);
  const [ok, setOk] = React.useState(false);
  const [error, setError] = React.useState("");
  const [form, setForm] = React.useState({
    nombre: "",
    email: "",
    telefono: "",
    asistencia: "si", // si | no
    acompanante: "no", // si | no
    nombreAcompanante: "",
    alergias: "",
    autobus: "no", // no | ida | vuelta | ida_y_vuelta
    notas: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setOk(false);
    try {
      validate(form);
      if (SEND_MODE === "endpoint" && ENDPOINT_URL) {
        const res = await fetch(ENDPOINT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, timestamp: new Date().toISOString() }),
        });
        if (!res.ok) throw new Error("No se pudo enviar el formulario");
      } else {
        const key = "rsvp_responses";
        const prev = JSON.parse(localStorage.getItem(key) || "[]");
        prev.push({ ...form, timestamp: new Date().toISOString() });
        localStorage.setItem(key, JSON.stringify(prev));
      }
      setOk(true);
      setForm({
        nombre: "",
        email: "",
        telefono: "",
        asistencia: "si",
        acompanante: "no",
        nombreAcompanante: "",
        alergias: "",
        autobus: "no",
        notas: "",
      });
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <Field label="Nombre y apellidos" required>
          <input name="nombre" value={form.nombre} onChange={handleChange} className="Input" placeholder="Tu nombre" />
        </Field>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Email" required>
            <input name="email" type="email" value={form.email} onChange={handleChange} className="Input" placeholder="tucorreo@email.com" />
          </Field>
          <Field label="Teléfono" required>
            <input name="telefono" value={form.telefono} onChange={handleChange} className="Input" placeholder="600 000 000" />
          </Field>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="¿Asistirás?" required>
            <select name="asistencia" value={form.asistencia} onChange={handleChange} className="Input">
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
          </Field>
          <Field label="¿Vendrás con acompañante?" required>
            <select name="acompanante" value={form.acompanante} onChange={handleChange} className="Input">
              <option value="no">No</option>
              <option value="si">Sí</option>
            </select>
          </Field>
        </div>

        {form.acompanante === "si" && (
          <Field label="Nombre del acompañante" required>
            <input name="nombreAcompanante" value={form.nombreAcompanante} onChange={handleChange} className="Input" placeholder="Nombre del acompañante" />
          </Field>
        )}

        <Field label="¿Usarás autobús?" required>
          <select name="autobus" value={form.autobus} onChange={handleChange} className="Input">
            <option value="no">No</option>
            <option value="ida">Solo ida</option>
            <option value="vuelta">Solo vuelta</option>
            <option value="ida_y_vuelta">Ida y vuelta</option>
          </select>
        </Field>

        <Field label="Alergias o intolerancias">
          <textarea name="alergias" value={form.alergias} onChange={handleChange} className="Input" placeholder="Indica si tienes alergias, intolerancias o preferencias alimentarias" />
        </Field>

        <Field label="Notas (opcional)">
          <textarea name="notas" value={form.notas} onChange={handleChange} className="Input" placeholder="Cualquier detalle que quieras contarnos" />
        </Field>

        {error && <p className="text-sm text-rose-600">{error}</p>}
        {ok && (
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-800">
            ¡Gracias! Hemos recibido tu respuesta.
          </div>
        )}

        <button disabled={submitting} className="inline-flex items-center justify-center rounded-2xl bg-slate-900 text-white px-5 py-3 hover:opacity-90 disabled:opacity-50">
          {submitting ? "Enviando…" : "Enviar"}
        </button>
      </form>
    </div>
  );
}

function summarize(rows) {
  const s = { si: 0, no: 0, acompanante_si: 0, autobus_ida: 0, autobus_vuelta: 0, autobus_iyv: 0, autobus_no: 0 };
  for (const r of rows) {
    if (r.asistencia === "si") s.si++; else s.no++;
    if (r.acompanante === "si") s.acompanante_si++;
    if (r.autobus === "ida") s.autobus_ida++;
    if (r.autobus === "vuelta") s.autobus_vuelta++;
    if (r.autobus === "ida_y_vuelta") s.autobus_iyv++;
    if (r.autobus === "no") s.autobus_no++;
  }
  return s;
}

function ResponsesCard() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const key = "rsvp_responses";
    const prev = JSON.parse(localStorage.getItem(key) || "[]");
    setRows(prev);
    const onStorage = () => {
      const p = JSON.parse(localStorage.getItem(key) || "[]");
      setRows(p);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const counts = React.useMemo(() => summarize(rows), [rows]);

  const downloadCSV = () => {
    const headers = [
      "timestamp","nombre","email","telefono","asistencia","acompanante","nombreAcompanante","autobus","alergias","notas",
    ];
    const esc = (v) => '"' + String(v ?? "").replaceAll('"', '""') + '"';
    const csv = [headers.join(",")]
      .concat(rows.map(r => headers.map(h => esc(r[h])).join(",")))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rsvp_respuestas.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
      <p className="font-medium text-slate-900">Resumen (local)</p>
      <ul className="mt-3 text-sm text-slate-700 space-y-1">
        <li><strong>Total respuestas:</strong> {rows.length}</li>
        <li><strong>Asisten:</strong> {counts.si} · <strong>No asisten:</strong> {counts.no}</li>
        <li><strong>Con acompañante:</strong> {counts.acompanante_si}</li>
        <li><strong>Autobús</strong> — Ida: {counts.autobus_ida} · Vuelta: {counts.autobus_vuelta} · Ida y vuelta: {counts.autobus_iyv} · No: {counts.autobus_no}</li>
      </ul>
      <button onClick={downloadCSV} className="mt-4 inline-flex items-center rounded-xl border border-slate-300 px-4 py-2 text-sm hover:shadow bg-white">Descargar CSV</button>
      <p className="mt-2 text-xs text-slate-500">*Este panel muestra solo lo guardado en <em>tu navegador</em>. Para centralizar respuestas, usa un endpoint (Google Sheets / App Script) y puedes ocultar este panel si lo prefieres.</p>
    </div>
  );
}

function FAQ() {
  const items = [
    { q: "¿Niños?", a: "¡Claro! Indicad cuántos en las notas del formulario." },
    { q: "Dietas especiales", a: "Indicad alergias, intolerancias o si preferís menú vegetariano/vegano." },
    { q: "Regalo", a: "Lo más importante es compartir el día. No tenemos lista de bodas; si queréis tener un detalle, podéis usar la cuenta corriente indicada." },
  ];
  return (
    <section className="py-14" id="faq">
      <SectionTitle kicker="Dudas" title="Preguntas frecuentes" />
      <div className="mt-6 grid gap-4">
        {items.map((it, i) => (
          <details key={i} className="group rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <summary className="cursor-pointer font-medium text-slate-900 list-none flex items-center justify-between">
              <span>{it.q}</span>
              <span className="text-slate-400 group-open:rotate-180 transition">⌄</span>
            </summary>
            <p className="mt-2 text-slate-600 text-sm">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-20 py-10 text-center text-sm text-slate-500">
      <p>© {new Date().getFullYear()} {NOVIOS}. Con cariño y acuarela ✨</p>
      <p className="mt-1">Si tienes dudas, escríbenos a <a className="underline" href="mailto:jbdomecq1@gmail.com">jbdomecq1@gmail.com</a></p>
    </footer>
  );
}

// montar la app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
