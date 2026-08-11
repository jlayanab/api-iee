export const customCss = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap');

body {
  margin: 0;
  background-color: #0b0f19 !important;
  color: #e2e8f0 !important;
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
}

.swagger-ui {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  color: #e2e8f0 !important;
}

/* Topbar */
.swagger-ui .topbar {
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%) !important;
  padding: 14px 0 !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4) !important;
}

.swagger-ui .topbar a {
  max-width: none !important;
  font-weight: 700 !important;
  font-size: 1.25rem !important;
  color: #ffffff !important;
}

.swagger-ui .topbar-wrapper img {
  display: none !important;
}

.swagger-ui .topbar-wrapper::before {
  content: '⚡ API IEE — Documentación de la Plataforma';
  font-weight: 700;
  font-size: 1.15rem;
  color: #818cf8;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
}

.swagger-ui .topbar-wrapper form {
  display: flex;
  align-items: center;
}

.swagger-ui .topbar .download-url-wrapper input[type=text] {
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  background: rgba(15, 23, 42, 0.8) !important;
  color: #f8fafc !important;
  border-radius: 8px !important;
  padding: 6px 12px !important;
}

.swagger-ui .topbar .download-url-wrapper .download-url-button {
  background: #4f46e5 !important;
  border-radius: 8px !important;
  font-weight: 600 !important;
}

/* Info Section */
.swagger-ui .info {
  margin: 30px 0 !important;
  background: rgba(30, 41, 59, 0.5) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 16px !important;
  padding: 24px !important;
  backdrop-filter: blur(10px) !important;
}

.swagger-ui .info .title {
  color: #f8fafc !important;
  font-size: 2rem !important;
  font-weight: 800 !important;
  letter-spacing: -0.03em !important;
}

.swagger-ui .info p, .swagger-ui .info li, .swagger-ui .info table {
  color: #94a3b8 !important;
  font-size: 0.95rem !important;
  line-height: 1.6 !important;
}

.swagger-ui .info a {
  color: #818cf8 !important;
  text-decoration: none !important;
  font-weight: 500 !important;
}
.swagger-ui .info a:hover {
  text-decoration: underline !important;
}

.swagger-ui .info .version {
  background: linear-gradient(135deg, #312e81 0%, #4338ca 100%) !important;
  color: #e0e7ff !important;
  padding: 4px 12px !important;
  border-radius: 20px !important;
  font-size: 0.8rem !important;
  font-weight: 700 !important;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.2) !important;
}

/* Authorize Button */
.swagger-ui .btn.authorize {
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%) !important;
  color: #ffffff !important;
  border-color: transparent !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35) !important;
  font-weight: 600 !important;
  padding: 8px 18px !important;
  transition: all 0.2s ease !important;
}

.swagger-ui .btn.authorize:hover {
  transform: translateY(-1px) !important;
  box-shadow: 0 6px 20px rgba(79, 70, 229, 0.5) !important;
}

.swagger-ui .btn.authorize svg {
  fill: #ffffff !important;
}

/* Filter / Search Bar */
.swagger-ui .filter input {
  background: #1e293b !important;
  border: 1px solid #334155 !important;
  color: #f8fafc !important;
  border-radius: 8px !important;
  padding: 10px 14px !important;
  font-size: 0.9rem !important;
  box-shadow: none !important;
}

.swagger-ui .filter input:focus {
  border-color: #6366f1 !important;
  outline: none !important;
}

/* Schemes / Tags Containers */
.swagger-ui .opblock-tag {
  color: #f1f5f9 !important;
  font-size: 1.25rem !important;
  font-weight: 700 !important;
  border-bottom: 1px solid #334155 !important;
  padding: 14px 0 10px 0 !important;
  margin: 30px 0 15px 0 !important;
}

.swagger-ui .opblock-tag small {
  color: #64748b !important;
  font-weight: 400 !important;
}

/* Operation Blocks */
.swagger-ui .opblock {
  border-radius: 12px !important;
  border: 1px solid #334155 !important;
  background: #1e293b !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
  margin-bottom: 14px !important;
  overflow: hidden !important;
  transition: all 0.2s ease !important;
}

.swagger-ui .opblock:hover {
  border-color: #475569 !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3) !important;
}

.swagger-ui .opblock .opblock-summary {
  padding: 10px 16px !important;
  align-items: center !important;
}

.swagger-ui .opblock .opblock-summary-method {
  border-radius: 6px !important;
  font-weight: 700 !important;
  font-size: 0.75rem !important;
  padding: 6px 12px !important;
  min-width: 75px !important;
  text-align: center !important;
  letter-spacing: 0.05em !important;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1) !important;
}

/* HTTP Method Badge Colors */
.swagger-ui .opblock-get {
  background: rgba(59, 130, 246, 0.06) !important;
  border-color: rgba(59, 130, 246, 0.25) !important;
}
.swagger-ui .opblock-get .opblock-summary-method {
  background: #2563eb !important;
  color: #ffffff !important;
}
.swagger-ui .opblock-get .opblock-summary-path {
  color: #93c5fd !important;
}

.swagger-ui .opblock-post {
  background: rgba(16, 185, 129, 0.06) !important;
  border-color: rgba(16, 185, 129, 0.25) !important;
}
.swagger-ui .opblock-post .opblock-summary-method {
  background: #059669 !important;
  color: #ffffff !important;
}
.swagger-ui .opblock-post .opblock-summary-path {
  color: #6ee7b7 !important;
}

.swagger-ui .opblock-put {
  background: rgba(245, 158, 11, 0.06) !important;
  border-color: rgba(245, 158, 11, 0.25) !important;
}
.swagger-ui .opblock-put .opblock-summary-method {
  background: #d97706 !important;
  color: #ffffff !important;
}
.swagger-ui .opblock-put .opblock-summary-path {
  color: #fcd34d !important;
}

.swagger-ui .opblock-delete {
  background: rgba(239, 68, 68, 0.06) !important;
  border-color: rgba(239, 68, 68, 0.25) !important;
}
.swagger-ui .opblock-delete .opblock-summary-method {
  background: #dc2626 !important;
  color: #ffffff !important;
}
.swagger-ui .opblock-delete .opblock-summary-path {
  color: #fca5a5 !important;
}

.swagger-ui .opblock .opblock-summary-path {
  font-family: 'Fira Code', monospace !important;
  font-size: 0.9rem !important;
  font-weight: 500 !important;
}

.swagger-ui .opblock .opblock-summary-description {
  color: #94a3b8 !important;
  font-size: 0.85rem !important;
}

/* Operation Body & Tables */
.swagger-ui .opblock-body {
  background: #0f172a !important;
  padding: 20px !important;
}

.swagger-ui .opblock-section-header {
  background: #1e293b !important;
  border-radius: 8px !important;
  padding: 8px 14px !important;
}

.swagger-ui .opblock-section-header h4 {
  color: #cbd5e1 !important;
  font-size: 0.85rem !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
}

.swagger-ui table thead tr th, .swagger-ui table thead tr td {
  color: #94a3b8 !important;
  border-bottom: 1px solid #334155 !important;
  font-size: 0.8rem !important;
  text-transform: uppercase !important;
}

.swagger-ui table tbody tr td {
  color: #e2e8f0 !important;
  border-bottom: 1px solid rgba(51, 65, 85, 0.5) !important;
}

.swagger-ui .parameter__name {
  color: #f8fafc !important;
  font-weight: 600 !important;
  font-family: 'Fira Code', monospace !important;
}

.swagger-ui .parameter__type {
  color: #818cf8 !important;
  font-family: 'Fira Code', monospace !important;
}

.swagger-ui input[type=text], .swagger-ui textarea, .swagger-ui select {
  background: #1e293b !important;
  border: 1px solid #334155 !important;
  color: #f8fafc !important;
  border-radius: 6px !important;
  padding: 6px 10px !important;
  font-family: 'Fira Code', monospace !important;
}

.swagger-ui input[type=text]:focus, .swagger-ui textarea:focus, .swagger-ui select:focus {
  border-color: #6366f1 !important;
}

.swagger-ui .btn.execute {
  background: #10b981 !important;
  color: #ffffff !important;
  border-radius: 8px !important;
  font-weight: 600 !important;
  border: none !important;
  box-shadow: 0 2px 10px rgba(16, 185, 129, 0.3) !important;
}

.swagger-ui .btn.btn-clear {
  background: #475569 !important;
  color: #ffffff !important;
  border-radius: 8px !important;
  border: none !important;
}

.swagger-ui highlight-code pre, .swagger-ui .microlight {
  background: #090d16 !important;
  border: 1px solid #1e293b !important;
  border-radius: 8px !important;
  color: #e2e8f0 !important;
  font-family: 'Fira Code', monospace !important;
  padding: 12px !important;
}

/* Response Status Code Badges */
.swagger-ui .response-col_status {
  font-family: 'Fira Code', monospace !important;
  font-weight: 700 !important;
  color: #38bdf8 !important;
}

/* Schemas Section */
.swagger-ui section.models {
  border-radius: 12px !important;
  border: 1px solid #334155 !important;
  background: #1e293b !important;
  padding: 20px !important;
  margin-top: 30px !important;
}

.swagger-ui section.models h4 {
  color: #f8fafc !important;
  font-size: 1.2rem !important;
  font-weight: 700 !important;
  border-bottom: 1px solid #334155 !important;
  padding-bottom: 10px !important;
}

.swagger-ui .model-box {
  background: #0f172a !important;
  border-radius: 8px !important;
  padding: 12px !important;
  border: 1px solid #1e293b !important;
}

.swagger-ui .model-title {
  color: #818cf8 !important;
  font-weight: 600 !important;
}

.swagger-ui .model {
  color: #cbd5e1 !important;
  font-family: 'Fira Code', monospace !important;
}

/* Modals */
.swagger-ui .dialog-ux .modal-ux {
  background: #0f172a !important;
  border: 1px solid #334155 !important;
  border-radius: 16px !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6) !important;
}

.swagger-ui .dialog-ux .modal-ux-header {
  border-bottom: 1px solid #1e293b !important;
  padding: 16px 20px !important;
}

.swagger-ui .dialog-ux .modal-ux-header h3 {
  color: #f8fafc !important;
}

.swagger-ui .dialog-ux .modal-ux-content {
  padding: 20px !important;
}

/* Scrollbars */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #0b0f19;
}
::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #475569;
}
`;
