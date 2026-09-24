import { css } from '@emotion/react'

const buttoncss = `

/*! CSS Used from: https://getbootstrap.com/docs/5.0/dist/css/bootstrap.min.css */
button {
    border-radius: 0;
    cursor: pointer;
}
button:focus:not(:focus-visible) {
    outline: 0;
}
button {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
}
button {
    text-transform: none;
}
[type='button'],
button {
    -webkit-appearance: button;
}
::-moz-focus-inner {
    padding: 0;
    border-style: none;
}
.btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
        box-shadow 0.15s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
    .btn {
        transition: none;
    }
}
.btn:hover {
    color: #212529;
}
.btn:focus {
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
.btn:disabled {
    pointer-events: none;
    opacity: 0.65;
}
.btn-outline-primary {
    color: #0d6efd;
    border-color: #0d6efd;
}
.btn-outline-primary:hover {
    color: #fff;
    background-color: #0d6efd;
    border-color: #0d6efd;
}
.btn-outline-primary:focus {
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.5);
}
.btn-outline-primary:active {
    color: #fff;
    background-color: #0d6efd;
    border-color: #0d6efd;
}
.btn-outline-primary:active:focus {
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.5);
}
.btn-outline-primary:disabled {
    color: #0d6efd;
    background-color: transparent;
}
.btn-outline-secondary {
    color: #6c757d;
    border-color: #6c757d;
}
.btn-outline-secondary:hover {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
}
.btn-outline-secondary:focus {
    box-shadow: 0 0 0 0.25rem rgba(108, 117, 125, 0.5);
}
.btn-outline-secondary:active {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
}
.btn-outline-secondary:active:focus {
    box-shadow: 0 0 0 0.25rem rgba(108, 117, 125, 0.5);
}
.btn-outline-secondary:disabled {
    color: #6c757d;
    background-color: transparent;
}
.btn-outline-success {
    color: #198754;
    border-color: #198754;
}
.btn-outline-success:hover {
    color: #fff;
    background-color: #198754;
    border-color: #198754;
}
.btn-outline-success:focus {
    box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.5);
}
.btn-outline-success:active {
    color: #fff;
    background-color: #198754;
    border-color: #198754;
}
.btn-outline-success:active:focus {
    box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.5);
}
.btn-outline-success:disabled {
    color: #198754;
    background-color: transparent;
}
.btn-outline-info {
    color: #0dcaf0;
    border-color: #0dcaf0;
}
.btn-outline-info:hover {
    color: #000;
    background-color: #0dcaf0;
    border-color: #0dcaf0;
}
.btn-outline-info:focus {
    box-shadow: 0 0 0 0.25rem rgba(13, 202, 240, 0.5);
}
.btn-outline-info:active {
    color: #000;
    background-color: #0dcaf0;
    border-color: #0dcaf0;
}
.btn-outline-info:active:focus {
    box-shadow: 0 0 0 0.25rem rgba(13, 202, 240, 0.5);
}
.btn-outline-info:disabled {
    color: #0dcaf0;
    background-color: transparent;
}
.btn-outline-warning {
    color: #ffc107;
    border-color: #ffc107;
}
.btn-outline-warning:hover {
    color: #000;
    background-color: #ffc107;
    border-color: #ffc107;
}

.btn-outline-warning:focus {
    box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.5);
}
.btn-outline-warning:active {
    color: #000;
    background-color: #ffc107;
    border-color: #ffc107;
}
.btn-outline-warning:active:focus {
    box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.5);
}
.btn-outline-warning:disabled {
    color: #ffc107;
    background-color: transparent;
}
.btn-outline-danger {
    color: #dc3545;
    border-color: #dc3545;
}
.btn-outline-danger:hover {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
}
.btn-outline-danger:focus {
    box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.5);
}
.btn-outline-danger:active {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
}
.btn-outline-danger:active:focus {
    box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.5);
}
.btn-outline-danger:disabled {
    color: #dc3545;
    background-color: transparent;
}
.btn-outline-light {
    color: #f8f9fa;
    border-color: #f8f9fa;
}
.btn-outline-light:hover {
    color: #000;
    background-color: #f8f9fa;
    border-color: #f8f9fa;
}
.btn-outline-light:focus {
    box-shadow: 0 0 0 0.25rem rgba(248, 249, 250, 0.5);
}
.btn-outline-light:active {
    color: #000;
    background-color: #f8f9fa;
    border-color: #f8f9fa;
}
.btn-outline-light:active:focus {
    box-shadow: 0 0 0 0.25rem rgba(248, 249, 250, 0.5);
}
.btn-outline-light:disabled {
    color: #f8f9fa;
    background-color: transparent;
}
.btn-outline-dark {
    color: #212529;
    border-color: #212529;
}
.btn-outline-dark:hover {
    color: #fff;
    background-color: #212529;
    border-color: #212529;
}
.btn-outline-dark:focus {
    box-shadow: 0 0 0 0.25rem rgba(33, 37, 41, 0.5);
}
.btn-outline-dark:active {
    color: #fff;
    background-color: #212529;
    border-color: #212529;
}
.btn-outline-dark:active:focus {
    box-shadow: 0 0 0 0.25rem rgba(33, 37, 41, 0.5);
}
.btn-outline-dark:disabled {
    color: #212529;
    background-color: transparent;
}

.btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    border-radius: 0.2rem;
}

/*No box shadow*/
.btn {
    box-shadow: none !important;
}

`
export const globalStyles = css`
  #__next,
  .euiDataGrid__content {
    background: inherit;
  }

  html {
    background-color: unset;
    font-size: 16px;
  }

  body {
    background: #f4f7fb;
    color: #162033;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
  }

  .container-padding-only {
    margin: 0 auto;
    padding: 0 12px;
  }

  .video-responsive {
    overflow: hidden;
    padding-bottom: 56.25%;
    position: relative;
    height: 0;
  }

  .video-responsive iframe {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  .page-card-wrapper {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }

  .page-card-wrapper-large {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  .page-content {
    min-height: calc(100vh);
  }

  .page-inner-content {
    min-height: calc(100vh - 48px);
  }

  .content {
    height: calc(100vh - 48px);
  }

  .euiHeader + * {
    padding-top: 48px;
  }

  .euiHeader + .home-container {
    padding-top: 68px;
  }

  .sidebar-height {
    height: calc(100vh - 48px - 2rem);
  }

  .table-height {
    height: calc(100vh - 48px - 2rem - 32px);
  }

  ::-webkit-scrollbar {
    width: 4px;
  }
  
  .scrollable-lt {
    max-height: 512px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  nav.euiCollapsibleNav,
  .euiOverlayMask {
    top: 48px;
  }
  .child-iframe-m-auto iframe {
    margin: auto !important;
  }
  .euiForm__errors {
    text-align: left;
    margin-bottom: 24px;
  }

  .primary-link {
    font-weight: 500;
    text-align: left;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
    color: #006bb8;
    padding: 0;
    line-height: inherit;
    font-size: 12px;
  }

  .euiHeaderSectionItem {
    min-width: 0px;
  }

  .child-h-full > * {
    height: 100%;
  }
  .euiCollapsibleNavGroup__children {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .bg-cta {
    background-color: #0065f2 !important;
  }

  .cta-button {
    padding: 40px 16px;
    font-size: 20px;
    font-weight: 600;
  }

  .cta-button .euiButton__text {
    font-size: 20px;
    font-weight: 600;
  }
  .force-eui-primary,
  .landing .hide-section a,
  .landing .hide-section .euiLink {
    color: #006bb8 !important;
  }
  .text-m {
    color: inherit;
    clear: both;
    font-size: 1.1429rem;
    line-height: 1.7143rem;
  }

  .translucent {
    background-color: rgba(0, 0, 0, 0.8);
  }

  .modal-dialog {
    width: 600px;
    overflow: hidden;
    border-radius: 0.375rem;
    --tw-bg-opacity: 1;
    background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
  }

  .modal-dialog__header {
    border-bottom-width: 1px;
    --tw-border-opacity: 1;
    border-color: rgba(234, 236, 242, var(--tw-border-opacity));
    padding: 1rem;
    text-align: center;
    font-weight: 700;
    --tw-text-opacity: 1;
    color: rgba(220, 53, 69, var(--tw-text-opacity));
  }

  .modal-dialog__body {
    border-bottom-width: 1px;
    --tw-border-opacity: 1;
    border-color: rgba(234, 236, 242, var(--tw-border-opacity));
    padding: 1rem;
  }

  .modal-dialog__footer {
    padding: 1rem;
  }
  .modal-dialog__footer {
    display: flex;
    justify-content: flex-end;
  }
  .modal-dialog__body > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(1rem * var(--tw-space-y-reverse));
  }

  .modal-dialog__footer > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  ${buttoncss}

  .menu-item {
    display: block;
    width: 100%;
  }
  .menu-item {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    text-align: left;
    font-size: 0.875rem;
    line-height: 1.25rem;
    --tw-text-opacity: 1;
    color: rgba(55, 65, 81, var(--tw-text-opacity));
  }

  .menu-item:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
  }

  .center-flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pointer {
    cursor: pointer;
  }

  .euiCheckbox .euiCheckbox__input {
    left: 0;
  }

  .remove-tabs-bottom-border .euiTabs--bottomBorder {
    box-shadow: none;
  }
  .euiAccordion legend:hover {
    text-decoration: none;
  }

  .filter-prompt > div {
    width: 768px;
  }

  img {
    border: none;
  }

  .row-label-auto .euiFormRow__labelWrapper  {
    width: auto;
  }

  .OutputContainerWithBottomPadding   .euiDataGrid.euiDataGrid--bordersAll  {
      min-height: 50vh;
  }
  .logo {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .title-lh {
    line-height: 1.75; 
  }    
  

  /* KontaktFinder */
  body {
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .euiHeader {
    background: #0f172a !important;
    border-bottom: 1px solid rgba(255,255,255,.08);
    box-shadow: 0 8px 28px rgba(15, 23, 42, .12);
  }

  .euiHeader .euiHeaderLink {
    color: #cbd5e1 !important;
    font-weight: 600;
  }

  .euiHeader .euiHeaderLink:hover {
    color: #ffffff !important;
  }

  .brand-link {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: #fff;
  }

  .brand-mark {
    width: 32px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background: linear-gradient(135deg, #3b82f6, #6366f1);
    color: #fff;
    font-weight: 900;
    font-size: 19px;
    box-shadow: 0 6px 16px rgba(59, 130, 246, .28);
  }

  .euiHeader + .home-container {
    padding-top: 86px;
  }

  .hero-panel {
    position: relative;
    overflow: hidden;
    padding: 44px;
    border-radius: 24px;
    color: #fff;
    background:
      radial-gradient(circle at 88% 16%, rgba(96,165,250,.28), transparent 34%),
      linear-gradient(135deg, #0f172a 0%, #172554 58%, #1e3a8a 100%);
    box-shadow: 0 22px 60px rgba(15, 23, 42, .18);
  }

  .hero-panel h1 {
    max-width: 720px;
    margin: 12px 0 14px;
    color: #fff;
    font-size: clamp(32px, 5vw, 48px);
    line-height: 1.08;
    letter-spacing: -1.4px;
  }

  .hero-panel p {
    max-width: 760px;
    margin: 0;
    color: #dbeafe;
    font-size: 17px;
    line-height: 1.7;
  }

  .hero-badge {
    display: inline-flex;
    padding: 7px 11px;
    border: 1px solid rgba(255,255,255,.18);
    border-radius: 999px;
    background: rgba(255,255,255,.08);
    color: #bfdbfe;
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: .08em;
  }

  .hero-features {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 26px;
  }

  .hero-features span {
    padding: 8px 12px;
    border-radius: 10px;
    background: rgba(255,255,255,.10);
    color: #f8fafc;
    font-size: 13px;
    font-weight: 600;
  }

  .workspace-card {
    margin-top: 24px;
    overflow: hidden;
    border: 1px solid #e5eaf1;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0 14px 40px rgba(15, 23, 42, .07);
  }

  .workspace-card .app-tabs {
    margin: 0;
    padding: 0 26px;
    border-bottom: 1px solid #edf0f5;
    background: #fbfcfe;
  }

  .workspace-body {
    margin: 0;
    padding: 28px;
  }

  .section-heading {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 26px;
  }

  .section-heading h2 {
    margin: 4px 0 0;
    color: #0f172a;
    font-size: 24px;
    line-height: 1.25;
  }

  .eyebrow {
    color: #2563eb;
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: .08em;
  }

  .privacy-note {
    padding: 7px 10px;
    border-radius: 999px;
    background: #ecfdf5;
    color: #047857;
    font-size: 12px;
    font-weight: 700;
    white-space: nowrap;
  }

  .contact-form .euiFormRow {
    margin-bottom: 20px;
  }

  .contact-form .euiFormRow__label {
    margin-bottom: 8px;
    color: #334155;
    font-size: 13px;
    font-weight: 700;
  }

  .contact-form .euiFieldText,
  .contact-form .euiTextArea,
  .contact-form .euiSelect {
    min-height: 44px;
    border-radius: 10px;
    border-color: #dbe2ea;
    box-shadow: none;
  }

  .contact-form .euiFieldText:focus,
  .contact-form .euiTextArea:focus,
  .contact-form .euiSelect:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, .12);
  }

  .form-actions {
    align-items: center;
    gap: 16px !important;
  }

  .form-actions .euiButton {
    min-height: 44px;
    border-radius: 10px;
    font-weight: 700;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    margin-top: 18px;
  }

  .info-card {
    display: flex;
    flex-direction: column;
    gap: 7px;
    padding: 18px;
    border: 1px solid #e7ebf1;
    border-radius: 14px;
    background: #fff;
  }

  .info-card strong {
    color: #0f172a;
    font-size: 14px;
  }

  .info-card span {
    color: #64748b;
    font-size: 13px;
    line-height: 1.55;
  }

  .euiDataGrid,
  .euiPanel {
    border-radius: 14px;
  }

  @media (max-width: 768px) {
    .hero-panel {
      padding: 30px 24px;
      border-radius: 18px;
    }

    .workspace-body {
      padding: 20px;
    }

    .section-heading {
      flex-direction: column;
    }

    .info-grid {
      grid-template-columns: 1fr;
    }

    .euiHeader .euiHeaderLink {
      display: none;
    }
  }


  /* --- MK / mateuszkosiorek.pl direction --- */
  :root {
    --mk-bg: #f5f0dd;
    --mk-paper: #faf7eb;
    --mk-ink: #20211d;
    --mk-muted: #74776f;
    --mk-line: #d9d3bd;
    --mk-accent: #d64b27;
    --mk-accent-dark: #b93a1d;
  }

  html, body, #__next {
    background: var(--mk-bg) !important;
  }

  body {
    color: var(--mk-ink);
  }

  .mk-header {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 1000;
    height: 86px;
    background: rgba(245, 240, 221, .96);
    border-bottom: 1px solid var(--mk-line);
    backdrop-filter: blur(12px);
  }

  .mk-header-inner {
    width: 100%;
    height: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 28px;
  }

  .mk-logo {
    display: inline-flex;
    align-items: baseline;
    gap: 10px;
    color: var(--mk-ink) !important;
    text-decoration: none !important;
    white-space: nowrap;
  }

  .mk-logo strong,
  .mk-brand strong {
    font-size: 29px;
    line-height: 1;
    letter-spacing: -1.8px;
    font-style: normal;
  }

  .mk-logo strong span,
  .mk-brand strong span {
    color: var(--mk-accent);
    font-size: 14px;
    vertical-align: 7px;
    margin-left: 2px;
  }

  .mk-logo em,
  .mk-brand em {
    color: #8b8e88;
    font-size: 25px;
    font-weight: 400;
    font-style: normal;
    letter-spacing: -1.3px;
  }

  .mk-nav {
    display: flex;
    align-items: center;
    gap: 30px;
  }

  .mk-nav a,
  .mk-nav button {
    appearance: none;
    border: 0;
    background: transparent;
    padding: 8px 0;
    color: var(--mk-ink) !important;
    font-size: 13px;
    font-weight: 700;
    text-decoration: none !important;
    cursor: pointer;
  }

  .mk-nav a:hover,
  .mk-nav button:hover {
    color: var(--mk-accent) !important;
  }

  .home-container {
    padding-top: 136px !important;
  }

  .mk-hero {
    min-height: 420px;
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(320px, .85fr);
    align-items: center;
    gap: 40px;
    padding: 48px 0 56px;
    border-bottom: 1px solid var(--mk-line);
  }

  .auth-kicker {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 28px;
    color: #454741;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .08em;
  }

  .auth-kicker i {
    width: 7px;
    height: 7px;
    flex: 0 0 7px;
    border-radius: 50%;
    background: var(--mk-accent);
  }

  .mk-hero h1,
  .page-intro h1,
  .auth-brand h1 {
    margin: 0;
    color: var(--mk-ink);
    font-size: clamp(42px, 5vw, 67px);
    line-height: 1.04;
    letter-spacing: -3.5px;
    font-weight: 760;
  }

  .mk-hero h1 span,
  .auth-brand h1 span {
    color: var(--mk-accent);
  }

  .mk-hero p,
  .page-intro p,
  .auth-brand > p {
    max-width: 650px;
    margin: 28px 0 0;
    color: var(--mk-muted);
    font-size: 16px;
    line-height: 1.8;
  }

  .mk-hero-visual {
    position: relative;
    min-height: 330px;
    background-image:
      linear-gradient(rgba(214,75,39,.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(214,75,39,.07) 1px, transparent 1px);
    background-size: 24px 24px;
    border-radius: 4px;
  }

  .orbit {
    position: absolute;
    display: grid;
    place-items: center;
    width: 124px;
    height: 124px;
    border: 12px solid var(--mk-accent);
    border-radius: 50%;
    background: var(--mk-bg);
    color: var(--mk-accent);
    font-size: 13px;
    font-weight: 800;
    box-shadow: 0 0 0 2px var(--mk-bg), 0 0 0 3px rgba(214,75,39,.35);
  }

  .orbit::before,
  .orbit::after {
    content: "";
    position: absolute;
    inset: -22px;
    border: 2px dashed rgba(214,75,39,.38);
    border-radius: 50%;
  }

  .orbit::after {
    inset: -10px;
    border-color: rgba(32,33,29,.18);
  }

  .orbit-a { width: 154px; height: 154px; left: 38px; top: 112px; font-size: 22px; }
  .orbit-b { right: 26px; top: 132px; }
  .orbit-c { right: 112px; top: 22px; width: 98px; height: 98px; border-width: 9px; font-size: 10px; }
  .orbit-d { right: 150px; bottom: 5px; width: 80px; height: 80px; border-width: 8px; font-size: 10px; }

  .scan-panel,
  .editorial-card {
    margin-top: 38px;
    padding: 32px;
    border: 1px solid var(--mk-line);
    border-radius: 2px;
    background: rgba(250, 247, 235, .68);
  }

  .scan-panel-heading,
  .card-heading {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
    padding-bottom: 24px;
    margin-bottom: 26px;
    border-bottom: 1px solid var(--mk-line);
  }

  .scan-panel h2,
  .editorial-card h2 {
    margin: 5px 0 0;
    color: var(--mk-ink);
    font-size: 28px;
    line-height: 1.2;
    letter-spacing: -1.1px;
  }

  .eyebrow {
    color: var(--mk-accent) !important;
    font-size: 11px !important;
    letter-spacing: .1em;
    font-weight: 800;
  }

  .contact-form .euiFormRow__label {
    color: var(--mk-ink) !important;
  }

  .contact-form .euiFieldText,
  .contact-form .euiTextArea,
  .contact-form .euiSelect,
  .editorial-card input,
  .database-search input,
  .auth-card input {
    width: 100%;
    min-height: 48px;
    border: 1px solid #cfc8ae !important;
    border-radius: 0 !important;
    background: #fffdf5 !important;
    box-shadow: none !important;
    color: var(--mk-ink);
    padding: 0 14px;
  }

  .contact-form .euiFieldText:focus,
  .contact-form .euiTextArea:focus,
  .contact-form .euiSelect:focus,
  .editorial-card input:focus,
  .database-search input:focus,
  .auth-card input:focus {
    border-color: var(--mk-accent) !important;
    box-shadow: 0 0 0 1px var(--mk-accent) !important;
  }

  .contact-form .euiButton--fill,
  .mk-button {
    min-height: 48px;
    border: 1px solid var(--mk-accent) !important;
    border-radius: 0 !important;
    background: var(--mk-accent) !important;
    color: #fff !important;
    font-weight: 750;
    padding: 0 18px;
    cursor: pointer;
  }

  .contact-form .euiButton--fill:hover,
  .mk-button:hover {
    background: var(--mk-accent-dark) !important;
  }

  .text-action {
    color: var(--mk-ink) !important;
    background: transparent;
    border: 0;
    padding: 0;
    font-size: 13px;
    font-weight: 700;
    text-decoration: none !important;
    cursor: pointer;
  }

  .text-action:hover {
    color: var(--mk-accent) !important;
  }

  /* Login */
  .auth-page {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1.2fr .8fr;
    align-items: center;
    gap: 7vw;
    max-width: 1240px;
    margin: 0 auto;
    padding: 56px 32px;
    background-image:
      linear-gradient(rgba(214,75,39,.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(214,75,39,.045) 1px, transparent 1px);
    background-size: 28px 28px;
  }

  .mk-brand {
    margin-bottom: 90px;
    display: flex;
    align-items: baseline;
    gap: 10px;
  }

  .auth-brand h1 {
    font-size: clamp(48px, 6vw, 78px);
  }

  .auth-card {
    padding: 34px;
    border: 1px solid var(--mk-line);
    background: rgba(250,247,235,.92);
  }

  .auth-card-top {
    display: flex;
    justify-content: space-between;
    padding-bottom: 22px;
    margin-bottom: 26px;
    border-bottom: 1px solid var(--mk-line);
  }

  .auth-card-top span {
    color: var(--mk-accent);
    font-size: 12px;
    font-weight: 800;
    letter-spacing: .1em;
  }

  .auth-card-top small {
    color: var(--mk-muted);
  }

  .auth-card label,
  .editorial-card label {
    display: block;
    margin: 18px 0 8px;
    color: #454741;
    font-size: 12px;
    font-weight: 700;
  }

  .auth-card .mk-button,
  .editorial-card .mk-button {
    width: 100%;
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .auth-hint {
    margin: 18px 0 0;
    color: var(--mk-muted);
    font-size: 12px;
    line-height: 1.6;
  }

  .form-error {
    margin-top: 14px;
    color: #a52e19;
    font-size: 13px;
    font-weight: 650;
  }

  .auth-loading {
    min-height: 100vh;
    display: grid;
    place-items: center;
    color: var(--mk-muted);
    background: var(--mk-bg);
  }

  /* Settings */
  .page-intro {
    padding: 48px 0 36px;
    border-bottom: 1px solid var(--mk-line);
  }

  .page-intro h1 {
    font-size: clamp(42px, 5vw, 64px);
  }

  .settings-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px;
  }

  .success-message {
    margin-top: 28px;
    padding: 14px 16px;
    border-left: 4px solid #698859;
    background: rgba(105,136,89,.09);
    color: #415837;
    font-size: 13px;
    font-weight: 700;
  }

  .users-card {
    margin-bottom: 40px;
  }

  .card-heading > span {
    color: var(--mk-muted);
    font-size: 12px;
  }

  .users-table {
    display: grid;
  }

  .user-row {
    min-height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    border-bottom: 1px solid var(--mk-line);
  }

  .user-row:last-child { border-bottom: 0; }
  .user-row > div { display: flex; flex-direction: column; gap: 4px; }
  .user-row span { color: var(--mk-muted); font-size: 12px; }

  /* Database */
  .database-intro {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 30px;
  }

  .database-count {
    display: flex;
    align-items: baseline;
    gap: 8px;
    padding-bottom: 6px;
  }

  .database-count b {
    color: var(--mk-accent);
    font-size: 52px;
    line-height: 1;
    letter-spacing: -2px;
  }

  .database-count span {
    color: var(--mk-muted);
    font-size: 13px;
  }

  .database-search {
    margin: 28px 0 16px;
  }

  .contacts-list {
    border-top: 1px solid var(--mk-line);
    margin-bottom: 50px;
  }

  .contact-row {
    display: grid;
    grid-template-columns: 1.25fr 1.2fr .9fr 1.2fr;
    gap: 24px;
    align-items: start;
    padding: 24px 0;
    border-bottom: 1px solid var(--mk-line);
  }

  .contact-domain {
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }

  .domain-dot {
    width: 7px;
    height: 7px;
    margin-top: 7px;
    border-radius: 50%;
    background: var(--mk-accent);
    flex: 0 0 7px;
  }

  .contact-domain > div,
  .contact-column {
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 0;
  }

  .contact-domain b {
    font-size: 15px;
    overflow-wrap: anywhere;
  }

  .contact-domain small,
  .contact-column p {
    color: var(--mk-muted);
    font-size: 12px;
    line-height: 1.5;
  }

  .contact-column > span {
    margin-bottom: 3px;
    color: var(--mk-accent);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: .1em;
  }

  .contact-column a,
  .contact-column b {
    color: var(--mk-ink);
    font-size: 12px;
    overflow-wrap: anywhere;
  }

  .empty-editorial {
    padding: 50px 0;
    color: var(--mk-muted);
    font-size: 14px;
  }

  @media (max-width: 900px) {
    .mk-nav {
      gap: 14px;
      overflow-x: auto;
    }

    .mk-nav a:nth-child(2),
    .mk-nav a:nth-child(4) {
      display: none;
    }

    .mk-hero,
    .auth-page {
      grid-template-columns: 1fr;
    }

    .mk-hero-visual {
      min-height: 270px;
    }

    .settings-grid {
      grid-template-columns: 1fr;
    }

    .contact-row {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 620px) {
    .mk-header { height: 72px; }
    .mk-header-inner { padding: 0 16px; }
    .mk-logo em { display: none; }
    .mk-nav a { display: none !important; }
    .mk-nav button { font-size: 12px; }
    .home-container { padding-top: 104px !important; }
    .mk-hero { padding-top: 24px; }
    .mk-hero h1, .auth-brand h1 { letter-spacing: -2px; }
    .mk-hero-visual { display: none; }
    .scan-panel, .editorial-card { padding: 22px; }
    .scan-panel-heading, .database-intro { flex-direction: column; align-items: flex-start; }
    .auth-page { padding: 28px 20px; }
    .mk-brand { margin-bottom: 50px; }
    .contact-row { grid-template-columns: 1fr; gap: 16px; }
  }
`

