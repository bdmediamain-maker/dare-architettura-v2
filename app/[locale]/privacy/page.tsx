export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  await params;

  return (
    <div className="min-h-screen">
      <h1
        style={{
          fontSize: '48px',
          fontWeight: 400,
          letterSpacing: '-0.01em',
          color: '#000',
          marginBottom: '48px',
        }}
      >
        Privacy Policy
      </h1>
      <div style={{ maxWidth: '720px', color: '#000', fontSize: '15px', lineHeight: 1.7 }}>
        <p style={{ marginBottom: '24px', fontWeight: 500 }}>
          Titolare del trattamento: dare-architettura di Rudy Davi, Via Saraceno 74, 44121 Ferrara (FE) — P.IVA 01725130387
        </p>
        <p style={{ marginBottom: '24px', color: '#000' }}>
          I dati personali raccolti tramite il modulo di contatto (nome, email, telefono, messaggio) vengono utilizzati esclusivamente per rispondere alle richieste degli utenti e non vengono ceduti a terzi.
        </p>
        <p style={{ marginBottom: '24px', color: '#000' }}>
          I dati vengono conservati per il tempo strettamente necessario alle finalità per cui sono stati raccolti, nel rispetto del Regolamento UE 2016/679 (GDPR).
        </p>
        <p style={{ color: '#000' }}>
          L&apos;utente ha il diritto di accedere, rettificare, cancellare i propri dati, opporsi al trattamento e richiedere la portabilità, contattando: studio@dare-architettura.net
        </p>
      </div>
    </div>
  );
}
