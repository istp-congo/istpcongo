/* ═══════════════════════════════════════════════════════════
   ISTP — main.js  (partagé par toutes les pages)
   ═══════════════════════════════════════════════════════════ */

/* ── 1. Header : effet au scroll ─────────────────────────── */
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (header) header.classList.toggle('scrolled', window.scrollY > 40);

  const scrollBtn = document.getElementById('scrollTop');
  if (scrollBtn) scrollBtn.classList.toggle('show', window.scrollY > 300);
});

/* ── 2. Menu hamburger ───────────────────────────────────── */
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('open');
}

/* ── 3. Animations fade-up au scroll ─────────────────────── */
function observeFadeUps() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}
document.addEventListener('DOMContentLoaded', observeFadeUps);

/* ── 4. Scroll to top ────────────────────────────────────── */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── 5. Soumission formulaire (feedback visuel) ──────────── */
function submitForm(btnEl) {
  const original = btnEl.innerHTML;
  btnEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message envoyé !';
  btnEl.style.background = '#16A34A';
  btnEl.disabled = true;
  setTimeout(() => {
    btnEl.innerHTML = original;
    btnEl.style.background = '';
    btnEl.disabled = false;
  }, 3000);
}

/* ── 6. Filières dynamiques (admissions.html) ────────────── */
const FILIERES = {
  seg: [
    'BMA — Banque, Microfinance & Assurances',
    'AM — Assistant Manager',
    'TL — Transport & Logistique',
    'CIT — Commerce International & Transit',
    'GRH — Gestion des Ressources Humaines',
    'GCF — Gestion Comptable & Financière',
    'GCM — Gestion Commerciale & Marketing',
    'Master MRH — Management des Ressources Humaines',
    'Master CF — Comptabilité & Finance',
  ],
  st: [
    'BTP — Bâtiment & Travaux Publics',
    'EEI — Électrotechnique & Électricité Industrielle',
    'MI — Maintenance Industrielle',
    'RT — Réseaux & Télécommunications',
    'SIGL — Systèmes Informatiques & Génie Logiciel',
    'Master MI — Maintenance Industrielle',
    'Master SRT — Systèmes, Réseaux & Télécommunications',
  ],
};

function updateFilieres() {
  const dept = document.getElementById('deptSelect');
  const sel  = document.getElementById('filiereSelect');
  if (!dept || !sel) return;

  sel.innerHTML = '<option value="">-- Choisir une filière --</option>';
  const list = FILIERES[dept.value];
  if (list) {
    list.forEach(f => {
      const o = document.createElement('option');
      o.value = f; o.textContent = f;
      sel.appendChild(o);
    });
  }
}

/* ── 7. Switch département (formations.html) ─────────────── */
function switchDept(d) {
  ['seg', 'st'].forEach(x => {
    const panel = document.getElementById('panel-' + x);
    const btn   = document.getElementById('btn' + x.toUpperCase());
    if (panel) panel.classList.toggle('active', x === d);
    if (btn)   btn.classList.toggle('active',   x === d);
  });
}

/* ── 8. Switch cycle Licence / Master (formations.html) ───── */
function switchCycle(dept, cycle) {
  ['l', 'm'].forEach(c => {
    const panel = document.getElementById(dept + '-' + c);
    const btn   = document.getElementById(dept + '-' + c + '-btn');
    if (panel) panel.style.display = c === cycle ? 'grid' : 'none';
    if (btn)   btn.classList.toggle('active', c === cycle);
  });
}

/* ── 9. Filtres actualités ───────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
});
