// ============================================================
// local-firestore.js — localStorage stand-in for the Firestore
// calls admin.js/data.js make, used only on localhost/127.0.0.1
// so local admin work never needs Firebase auth or a real project.
// ============================================================
// ponytail: single localStorage-backed store, no rules/transactions/queries —
// swap for the Firebase Local Emulator if local testing ever needs those.

const PREFIX = 'rounds-local-db:';

function readCollection(name) {
  try {
    return JSON.parse(localStorage.getItem(PREFIX + name) || '{}');
  } catch {
    return {};
  }
}

function writeCollection(name, data) {
  localStorage.setItem(PREFIX + name, JSON.stringify(data));
}

export function collection(_db, name) {
  return { _name: name };
}

export function doc(_db, name, id) {
  return { _name: name, _id: id };
}

export async function getDocs(colRef) {
  const data = readCollection(colRef._name);
  return { docs: Object.entries(data).map(([id, value]) => ({ id, data: () => value })) };
}

export async function setDoc(docRef, value, opts = {}) {
  const data = readCollection(docRef._name);
  data[docRef._id] = opts.merge ? { ...(data[docRef._id] || {}), ...value } : value;
  writeCollection(docRef._name, data);
}

export async function deleteDoc(docRef) {
  const data = readCollection(docRef._name);
  delete data[docRef._id];
  writeCollection(docRef._name, data);
}

export function writeBatch(_db) {
  const ops = [];
  return {
    update(docRef, value) { ops.push(() => setDoc(docRef, value, { merge: true })); },
    delete(docRef) { ops.push(() => deleteDoc(docRef)); },
    async commit() { for (const op of ops) await op(); },
  };
}
