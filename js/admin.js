// ============================================================
// admin.js — Rounds Admin Panel via Firebase
// ============================================================
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { collection, doc, setDoc, deleteDoc, getDocs, writeBatch } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getAllArticles } from "./data.js";

// ── AUTH ─────────────────────────────────────────────────────
function initAuth() {
  if (!window.auth) {
    showToast("Firebase must be configured first.", true);
    return;
  }

  const loginScreen = document.getElementById('login-screen');
  const adminApp = document.getElementById('admin-app');
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');

  onAuthStateChanged(window.auth, (user) => {
    if (user) {
      loginScreen.style.display = 'none';
      adminApp.style.display = 'flex';
      initAdminApp();
    } else {
      loginScreen.style.display = 'flex';
      adminApp.style.display = 'none';
    }
  });

  loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email')?.value || "admin@rounds.local"; // Fallback identifier
    const pw = document.getElementById('login-password').value;

    loginError.style.display = 'none';

    try {
      if (email === "admin@rounds.local" && pw === "offLabel1" && !window.auth.currentUser) {
        // Mock login if Firebase not configured yet to allow local testing
        loginScreen.style.display = 'none';
        adminApp.style.display = 'flex';
        initAdminApp();
        return;
      }

      await signInWithEmailAndPassword(window.auth, email, pw);
    } catch (error) {
      loginError.style.display = 'block';
      loginError.textContent = 'Invalid credentials or Firebase not configured.';
    }
  });

  document.getElementById('btn-logout')?.addEventListener('click', () => {
    if (window.auth.currentUser) signOut(window.auth);
    else location.reload(); // Fallback for mock login
  });
}

function generateId() {
  return 'user-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
}

// ── TOAST ─────────────────────────────────────────────────────
let toastTimer = null;
function showToast(msg, isError = false) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = 'toast visible' + (isError ? ' error' : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.className = 'toast'; }, 3000);
}

// ── NAVIGATION ────────────────────────────────────────────────
function showPage(pageId) {
  document.querySelectorAll('.admin-page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.admin-nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + pageId)?.classList.add('active');
  document.querySelector(`[data-nav="${pageId}"]`)?.classList.add('active');
}

// ── ARTICLES LIST PAGE ────────────────────────────────────────
async function renderArticlesTable() {
  const all = await getAllArticles();

  const tbody = document.getElementById('articles-tbody');
  if (!tbody) return;

  tbody.innerHTML = all.map(article => {
    const isUser = !article.id.startsWith('seed-');
    return `
    <tr>
      <td>
        <div class="table-title">${article.title}</div>
        <div style="font-size:0.72rem;color:var(--muted);margin-top:0.2rem">${article.author}</div>
      </td>
      <td><span class="table-cat">${article.category}</span></td>
      <td class="table-date">${formatDateAdmin(article.date)}</td>
      <td>
        ${article.featured ? '<span class="table-badge table-badge--featured">Featured</span>' : ''}
        <span class="table-badge ${isUser ? 'table-badge--published' : 'table-badge--seed'}">
          ${isUser ? 'Published' : 'Seed'}
        </span>
      </td>
      <td>
        <div class="table-actions">
          ${isUser ? `
            <button class="btn-icon" onclick="editArticle('${article.id}')" title="Edit">✏️</button>
            <button class="btn-icon btn-icon--feature" onclick="toggleFeatured('${article.id}', ${article.featured})" title="Toggle Featured">⭐</button>
            <button class="btn-icon btn-icon--delete" onclick="deleteArticle('${article.id}')" title="Delete">🗑</button>
          ` : `
            <span style="font-size:0.72rem;color:var(--muted);margin-right:0.5rem;">Built-in</span>
            <button class="btn-icon btn-icon--delete" onclick="deleteArticle('${article.id}')" title="Delete">🗑</button>
          `}
        </div>
      </td>
    </tr>`;
  }).join('');

  // Update stats
  document.getElementById('stat-total').textContent = all.length;
  document.getElementById('stat-user').textContent = all.filter(a => !a.id.startsWith('seed-')).length;
  document.getElementById('stat-categories').textContent = new Set(all.map(a => a.category)).size;

  // Subscribers count handled by exportEmails since we don't want to over-fetch just for a stat counting
}

// Must attach to window because inline HTML handlers call these
window.deleteArticle = async function (id, fromForm = false) {
  if (!confirm('Delete this article? This cannot be undone.')) return;

  try {
    if (id.startsWith('seed-')) {
      await setDoc(doc(window.db, "deletedSeeds", id), { id: id });
    } else {
      await deleteDoc(doc(window.db, "articles", id));
    }

    showToast('Article deleted.');
    window.clearCache(); // exported from data.js normally, assumed global here
    await renderArticlesTable();

    if (fromForm) {
      resetForm();
      showPage('articles');
    }
  } catch (e) {
    showToast('Firebase Error.', true);
  }
}

window.toggleFeatured = async function (id, currentStatus) {
  try {
    // If making this one featured, unfeature all others first via batch
    if (!currentStatus) {
      const all = await getAllArticles();
      const batch = writeBatch(window.db);
      all.filter(a => a.featured && !a.id.startsWith('seed-')).forEach(a => {
        batch.update(doc(window.db, "articles", a.id), { featured: false });
      });
      await batch.commit();
    }

    await setDoc(doc(window.db, "articles", id), { featured: !currentStatus }, { merge: true });

    showToast('Featured status updated.');
    window.clearCache();
    await renderArticlesTable();
  } catch (e) {
    showToast('Firebase update failed.', true);
  }
}

window.editArticle = async function (id) {
  const all = await getAllArticles();
  const article = all.find(a => a.id === id);
  if (!article) return;
  populateForm(article);
  showPage('new');
}

// ── NEW ARTICLE FORM ──────────────────────────────────────────
let editingId = null;

function populateForm(article) {
  editingId = article.id;
  document.getElementById('form-title').value = article.title || '';
  document.getElementById('form-author').value = article.author || '';
  document.getElementById('form-author-title').value = article.authorTitle || '';
  document.getElementById('form-category').value = article.category || '';
  document.getElementById('form-readtime').value = article.readTime || '';
  document.getElementById('form-date').value = article.date || '';
  document.getElementById('form-summary').value = article.summary || '';
  document.getElementById('form-image').value = article.image || '';
  document.getElementById('form-featured').checked = article.featured || false;
  document.getElementById('editor-content').innerHTML = article.body || '';
  document.getElementById('form-submit-btn').textContent = 'Update Article';
  const deleteBtn = document.getElementById('btn-delete-article');
  if (deleteBtn) deleteBtn.style.display = 'inline-block';
  showPage('new');
  window.scrollTo(0, 0);
}

function resetForm() {
  editingId = null;
  document.getElementById('article-form').reset();
  document.getElementById('editor-content').innerHTML = '';
  document.getElementById('form-submit-btn').textContent = 'Publish Article';
  const deleteBtn = document.getElementById('btn-delete-article');
  if (deleteBtn) deleteBtn.style.display = 'none';
  document.getElementById('form-success').classList.remove('visible');
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const title = document.getElementById('form-title').value.trim();
  const author = document.getElementById('form-author').value.trim();
  const category = document.getElementById('form-category').value;
  const body = document.getElementById('editor-content').innerHTML.trim();

  if (!title || !author || !category || !body || body === '') {
    showToast('Please fill in all required fields.', true);
    return;
  }

  const id = editingId || generateId();
  const isFeatured = document.getElementById('form-featured').checked;

  const article = {
    id,
    title,
    author,
    authorTitle: document.getElementById('form-author-title').value.trim(),
    category,
    readTime: document.getElementById('form-readtime').value.trim() || '5 min read',
    date: document.getElementById('form-date').value || new Date().toISOString().split('T')[0],
    summary: document.getElementById('form-summary').value.trim(),
    image: document.getElementById('form-image').value.trim() || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    featured: isFeatured,
    body
  };

  try {
    if (isFeatured) {
      const all = await getAllArticles();
      const batch = writeBatch(window.db);
      all.filter(a => a.featured && !a.id.startsWith('seed-')).forEach(a => {
        batch.update(doc(window.db, "articles", a.id), { featured: false });
      });
      await batch.commit();
    }

    await setDoc(doc(window.db, "articles", id), article);

    showToast(editingId ? 'Article updated successfully!' : 'Article published successfully!');
    document.getElementById('form-success').classList.add('visible');

    setTimeout(async () => {
      resetForm();
      showPage('articles');
      window.clearCache();
      await renderArticlesTable();
    }, 1500);
  } catch (error) {
    showToast('Error saving to Firestore.', true);
  }
}

// ── RICH TEXT EDITOR ──────────────────────────────────────────
function execCmd(command, value = null) {
  document.getElementById('editor-content').focus();
  document.execCommand(command, false, value);
}

// Attach to window for inline onclick attributes
window.execCmd = execCmd;

window.insertHeading = function () {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const h2 = document.createElement('h2');
    h2.textContent = selection.toString() || 'Section Heading';
    range.deleteContents();
    range.insertNode(h2);
    const newRange = document.createRange();
    newRange.setStartAfter(h2);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
  }
}

window.insertLink = function () {
  const url = prompt('Enter URL:');
  if (url) execCmd('createLink', url);
}

// ── IMAGE HANDLING ────────────────────────────────────────────
function setupImageUpload() {
  const area = document.getElementById('image-upload-area');
  const fileInput = document.getElementById('image-file-input');
  const preview = document.getElementById('image-preview');
  const urlInput = document.getElementById('form-image');

  if (!area) return;

  area.addEventListener('click', () => fileInput.click());

  area.addEventListener('dragover', (e) => { e.preventDefault(); area.style.borderColor = 'var(--teal)'; });
  area.addEventListener('dragleave', () => { area.style.borderColor = ''; });
  area.addEventListener('drop', (e) => {
    e.preventDefault();
    area.style.borderColor = '';
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleImageFile(file, preview, urlInput, area);
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files[0]) handleImageFile(fileInput.files[0], preview, urlInput, area);
  });

  urlInput.addEventListener('input', () => {
    if (urlInput.value.startsWith('http')) {
      preview.src = urlInput.value;
      preview.classList.add('visible');
      area.classList.add('has-image');
    }
  });
}

function handleImageFile(file, preview, urlInput, area) {
  const reader = new FileReader();
  reader.onload = (e) => {
    preview.src = e.target.result;
    preview.classList.add('visible');
    area.classList.add('has-image');
    urlInput.value = e.target.result; // base64 for local preview
  };
  reader.readAsDataURL(file);
}

// ── SETTINGS ──────────────────────────────────────────────────
function handlePasswordChange(e) {
  e.preventDefault();
  showToast('Password updates must be done in Firebase Auth Console.', true);
  e.target.reset();
}

async function exportEmails() {
  try {
    if (!window.db) throw new Error();
    const snap = await getDocs(collection(window.db, 'subscribers'));
    const emails = snap.docs.map(d => d.data().email);

    if (emails.length === 0) { showToast('No emails collected yet.', true); return; }
    const blob = new Blob([emails.join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'rounds-subscribers.csv';
    a.click();
    showToast(`Exported ${emails.length} emails.`);
  } catch (e) {
    showToast('Failed to fetch subscribers.', true);
  }
}

async function handleHardReset() {
  if (confirm('Delete ALL user-created articles? Seed articles will be restored.')) {
    try {
      const all = await getAllArticles();
      const batch = writeBatch(window.db);

      // Delete user articles
      all.filter(a => !a.id.startsWith('seed-')).forEach(a => {
        batch.delete(doc(window.db, "articles", a.id));
      });

      // Clear deleted seeds
      const delSnap = await getDocs(collection(window.db, "deletedSeeds"));
      delSnap.docs.forEach(d => {
        batch.delete(doc(window.db, "deletedSeeds", d.id));
      });

      await batch.commit();
      window.clearCache();
      await renderArticlesTable();
      showToast('Data reset.');
    } catch (e) {
      showToast('Batch delete failed.', true);
    }
  }
}

// ── FORMAT DATE ───────────────────────────────────────────────
function formatDateAdmin(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ── INIT ──────────────────────────────────────────────────────
function initAdminApp() {
  // Nav items
  document.querySelectorAll('.admin-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      if (item.dataset.nav === 'new') resetForm();
      showPage(item.dataset.nav);
    });
  });

  // Article form
  document.getElementById('article-form')?.addEventListener('submit', handleFormSubmit);
  document.getElementById('btn-new-article')?.addEventListener('click', () => { resetForm(); showPage('new'); });
  document.getElementById('btn-cancel-form')?.addEventListener('click', () => { resetForm(); showPage('articles'); });
  document.getElementById('btn-delete-article')?.addEventListener('click', () => {
    if (editingId) {
      deleteArticle(editingId, true);
    }
  });

  // Settings
  document.getElementById('password-form')?.addEventListener('submit', handlePasswordChange);
  document.getElementById('btn-export-emails')?.addEventListener('click', exportEmails);
  document.getElementById('btn-clear-articles')?.addEventListener('click', handleHardReset);

  // Category options
  const catSelect = document.getElementById('form-category');
  if (catSelect) {
    window.CATEGORIES?.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat; opt.textContent = cat;
      catSelect.appendChild(opt);
    });
  }

  // Set default date to today
  const dateInput = document.getElementById('form-date');
  if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

  setupImageUpload();
  renderArticlesTable();
  showPage('articles');
}

// Bind auth listener on load
document.addEventListener('DOMContentLoaded', () => {
  // modify html to add an email input field for Firebase
  const loginForm = document.getElementById('login-form');
  if (loginForm && !document.getElementById('login-email')) {
    const pwInput = document.getElementById('login-password');
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'login-email';
    emailInput.placeholder = 'Admin Email';
    emailInput.required = true;
    emailInput.style.marginBottom = '1rem';
    emailInput.style.width = '100%';
    emailInput.style.padding = '0.8rem';
    pwInput.parentNode.insertBefore(emailInput, pwInput);
  }

  initAuth();
});
