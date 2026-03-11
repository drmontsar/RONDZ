// ============================================================
// data.js — Rounds: Article & Author Data via Firestore
// ============================================================
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const CATEGORIES = [
  "AI & Diagnostics",
  "EHR & Software",
  "Surgical Technology",
  "Wearables & Remote Care"
];

// Fallback seed articles in case Firebase isn't configured yet
const SEED_ARTICLES = [
  {
    id: "seed-1",
    title: "The AI Diagnostic That Caught What I Missed at 2am",
    category: "AI & Diagnostics",
    author: "Dr. Sarah Chen",
    authorTitle: "Emergency Medicine, Stanford",
    date: "2024-03-08",
    readTime: "7 min read",
    summary: "A third-year resident, a chest X-ray, and an algorithm that flagged a subtle aortic dissection.",
    body: `<p>It was a quiet Tuesday night in the ED when the case came in...</p>`,
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    featured: true
  }
];

let _articlesCache = null;

export async function getAllArticles() {
  if (_articlesCache) return _articlesCache;

  // Return fallback data if firebase isn't configured (no db object)
  if (!window.db) {
    console.warn("Firebase not configured. Serving local fallback data.");
    return SEED_ARTICLES;
  }

  try {
    const articlesCol = collection(window.db, 'articles');
    const articleSnapshot = await getDocs(articlesCol);

    // Check deleted seeds to filter them out
    const deletedSeedsCol = collection(window.db, 'deletedSeeds');
    const deletedSnapshot = await getDocs(deletedSeedsCol);
    const deletedIds = deletedSnapshot.docs.map(doc => doc.id);

    const firebaseArticles = articleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Merge active seeds + firebase articles
    const activeSeeds = SEED_ARTICLES.filter(a => !deletedIds.includes(a.id));
    _articlesCache = [...firebaseArticles, ...activeSeeds];

    return _articlesCache;
  } catch (e) {
    console.error("Error fetching articles from Firestore:", e);
    return SEED_ARTICLES;
  }
}

export function clearCache() {
  _articlesCache = null;
}

export async function getFeaturedArticle() {
  const articles = await getAllArticles();
  return articles.find(a => a.featured) || articles[0];
}

export async function getArticlesByCategory(category) {
  const articles = await getAllArticles();
  return articles.filter(a => a.category === category);
}

export async function getArticleById(id) {
  const articles = await getAllArticles();
  return articles.find(a => a.id === id) || null;
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

// Ensure globally accessible for modules that haven't been refactored yet
window.getAllArticles = getAllArticles;
window.getFeaturedArticle = getFeaturedArticle;
window.getArticlesByCategory = getArticlesByCategory;
window.getArticleById = getArticleById;
window.CATEGORIES = CATEGORIES;
