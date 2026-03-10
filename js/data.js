// ============================================================
// data.js — Rounds: Article & Author Seed Data
// To add articles permanently (without admin), add them here.
// The admin panel writes to localStorage and takes priority.
// ============================================================

const SEED_ARTICLES = [
  {
    id: "seed-1",
    title: "The AI Diagnostic That Caught What I Missed at 2am",
    category: "AI & Diagnostics",
    author: "Dr. Sarah Chen",
    authorTitle: "Emergency Medicine, Stanford",
    date: "2024-03-08",
    readTime: "7 min read",
    summary: "A third-year resident, a chest X-ray, and an algorithm that flagged a subtle aortic dissection. This is not a story about replacing doctors — it's about what happens when the machine is a second set of eyes at 2am.",
    body: `<p>It was a quiet Tuesday night in the ED when the case came in. A 58-year-old male, presenting with what the triage nurse described as "chest tightness." Nothing alarming on the surface — we see dozens of these every shift.</p>

<p>I ordered the standard workup. EKG unremarkable. Troponins pending. And then the chest X-ray came back, flagged by our AI diagnostic assistant with a confidence score of 0.84 for "mediastinal widening — consider aortic pathology."</p>

<h2>What I Almost Missed</h2>

<p>I looked at that film three times. Honestly? I wasn't sure I agreed. The widening was subtle — maybe 1.5cm outside normal range. At 2am, with seven other patients on my board, I might have filed it under "borderline, will monitor."</p>

<p>But the flag made me pause. I pulled a CT angio. Type A dissection. The patient was in the OR within 90 minutes.</p>

<h2>The Honest Conversation We're Not Having</h2>

<p>What I find fascinating — and worth discussing openly — is not that the AI was smarter than me. It wasn't. The algorithm doesn't know this patient, doesn't know the clinical context, can't feel the room. What it did was remove the cognitive load of uncertainty at the moment I was most fatigued.</p>

<p>That's the off-label use case nobody puts in the brochure: AI as a fatigue buffer. Not a replacement for clinical judgment, but a check on the moments when clinical judgment is most likely to fail.</p>

<h2>What the Literature Actually Says</h2>

<p>A 2023 meta-analysis in Radiology found that AI-assisted chest X-ray interpretation reduced miss rates for critical findings by 34% in overnight reads. But — and this is the part that gets less press — the same study found a 12% increase in false positives, leading to unnecessary downstream testing.</p>

<p>That tradeoff is real and worth sitting with. Every unnecessary CT we order has a cost: radiation, time, resources, patient anxiety. We can't talk about AI diagnostic tools without talking about calibration and threshold-setting — decisions that are ultimately clinical, not algorithmic.</p>

<h2>What I've Changed in My Practice</h2>

<p>I now treat AI flags the way I treat a good nurse's intuition: I don't override it without a reason. If the algorithm is concerned and I'm not, I ask myself one more time whether I've looked hard enough. Sometimes the answer is still "no, this is overcalling." But sometimes — like that Tuesday night — it's the pause that changes everything.</p>`,
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    featured: true
  },
  {
    id: "seed-2",
    title: "Epic vs. Oracle Health: An Honest Comparison From Someone Who's Used Both",
    category: "EHR & Software",
    author: "Dr. James Okafor",
    authorTitle: "Hospitalist, Mayo Clinic",
    date: "2024-03-05",
    readTime: "11 min read",
    summary: "After working across three health systems in five years, I've logged serious hours in both platforms. Here's what the vendor reps won't tell you.",
    body: `<p>I've been a hospitalist for eight years. In that time I've worked at a community hospital running Oracle Health (formerly Cerner), a large academic center on Epic, and briefly consulted for a system mid-migration. I have opinions.</p>

<p>Fair warning: this is not a feature matrix comparison. There are plenty of those online. This is a clinical perspective on what it actually feels like to practice medicine inside these systems every day.</p>

<h2>The Honest Truth About Epic</h2>

<p>Epic is dominant for a reason. The interoperability via Care Everywhere is genuinely good — when a patient shows up from another Epic system, I usually have a real picture of their history within 30 seconds. In a hospitalist role, this matters enormously.</p>

<p>The downside nobody mentions at sales demos: the cognitive overhead of Epic's customizability is real. When every department has built its own SmartPhrases, its own order sets, its own workflow — and then you rotate services — you spend a non-trivial amount of mental energy just navigating the system's internal inconsistencies.</p>

<h2>Oracle Health's Underrated Strengths</h2>

<p>Oracle Health gets a bad reputation, some of it deserved and some of it legacy bias from the Cerner era. The PowerChart interface has improved substantially in the last three years. What it does well: medication reconciliation workflows are cleaner, and the surgical documentation tools are genuinely superior for procedure-heavy services.</p>

<p>The problem is mobile. The Oracle Health mobile experience in 2024 is still frustrating in ways that feel inexcusable. Reviewing imaging on a phone should not feel like debugging a 2009 application.</p>

<h2>What Actually Matters for Physician Wellbeing</h2>

<p>The research on EHR-related burnout points to documentation time as the primary driver, not interface aesthetics. By that metric, both systems have work to do. The average hospitalist spends 2-3 hours per shift on documentation that does not directly benefit the patient.</p>

<p>AI-assisted note generation (both platforms now have versions of this) is the most promising development I've seen in the EHR space in a decade. It's imperfect. But shaving 40 minutes off my documentation burden per shift is not a small thing — that's 40 minutes I'm thinking about patients instead of typing.</p>`,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    featured: false
  },
  {
    id: "seed-3",
    title: "Robotic Surgery in 2024: Where the Hype Ends and the Evidence Begins",
    category: "Surgical Technology",
    author: "Dr. Priya Mehta",
    authorTitle: "Colorectal Surgery, Johns Hopkins",
    date: "2024-03-01",
    readTime: "9 min read",
    summary: "The da Vinci is in every OR brochure and most hospital billboards. But what does the comparative effectiveness data actually say about outcomes?",
    body: `<p>Every hospital in America with a robotic surgery program has the same billboard: a surgeon in scrubs, hands on a console, looking confident. The implicit promise is better outcomes. The honest question is: better than what, and for whom?</p>

<h2>Where Robotic Surgery Genuinely Wins</h2>

<p>I'll start with the good news because it's real. For certain procedures — radical prostatectomy, partial nephrectomy, some colorectal resections — the robotic approach has demonstrated meaningful clinical advantages. Specifically: reduced blood loss, shorter hospital stays, and lower conversion rates to open surgery in experienced hands.</p>

<p>The "experienced hands" caveat is not trivial. The learning curve for robotic surgery is real and steep. The outcome data looks very different at centers doing 200+ cases annually versus those doing 40.</p>

<h2>The Evidence We're Not Talking About</h2>

<p>A landmark JAMA Surgery review published in 2023 analyzed outcomes across 127,000 robotic versus laparoscopic procedures. The headline finding: no statistically significant difference in 30-day complications for the majority of general surgery procedures. The robotic approach was associated with longer operative times and substantially higher costs.</p>

<p>This is not an argument against robotic surgery. It's an argument for honest patient counseling. When a patient asks me whether they should request robotic surgery, my answer is: it depends on what we're doing, who's doing it, and how many times they've done it.</p>

<h2>The Next Frontier: Haptic Feedback and Autonomous Assistance</h2>

<p>What genuinely excites me about the next generation of surgical robotics is not the current platform refinements — it's the integration of real-time tissue sensing and AI-assisted anatomical identification. Several systems in late-stage trials can now flag proximity to critical structures with sub-millimeter accuracy. For a dissection in a hostile pelvis, that's not a novelty — that's a patient safety tool.</p>`,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&q=80",
    featured: false
  },
  {
    id: "seed-4",
    title: "My Patients Are Wearing CGMs. Here's What That's Done to My Practice.",
    category: "Wearables & Remote Care",
    author: "Dr. Marcus Webb",
    authorTitle: "Internal Medicine & Endocrinology, UCSF",
    date: "2024-02-26",
    readTime: "6 min read",
    summary: "Continuous glucose monitors started as a tool for Type 1 diabetics. Now my non-diabetic patients are wearing them too. The data is fascinating. The consults are multiplying.",
    body: `<p>Three years ago, maybe one in twenty of my patients with Type 2 diabetes wore a CGM. Today, that number is closer to one in four — and I'm now regularly fielding questions from patients with no diabetes diagnosis at all who bought a Libre or a Stelo over the counter and are confused by their glucose curves.</p>

<p>This is what technological democratization actually looks like in medicine. Not a clean rollout with education and protocols — a flood of data arriving in your inbox from patients who have more questions than you have appointment slots.</p>

<h2>What the Data Is Actually Showing</h2>

<p>The CGM data from my non-diabetic patients has genuinely surprised me. A subset of people with completely normal HbA1c show significant postprandial glucose spikes — sometimes into the 160-180 mg/dL range after certain meals. The clinical significance of this is honestly unclear. The research on "continuous glucose variability" in metabolically healthy individuals is still early.</p>

<p>But here's the practical reality: my patients are seeing this data, they're concerned, and they're coming to me for answers. I have an obligation to engage with that, even when the evidence base for intervention is thin.</p>

<h2>How I've Adapted My Practice</h2>

<p>I now proactively send CGM-curious patients a one-page guide before they buy a device — what the metrics mean, what normal variability looks like, and when to call versus when to just observe. It has reduced my anxiety-driven consults by roughly 40%.</p>

<p>For my diabetic patients, the impact has been clearer and more positive. Time-in-range has become my primary management metric, and I can have much more nuanced conversations about patterns — dawn phenomenon, exercise response, meal composition — than I ever could with quarterly HbA1c checks.</p>`,
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80",
    featured: false
  },
  {
    id: "seed-5",
    title: "What GPT-4 Gets Wrong About Differential Diagnoses (And When It Gets It Right)",
    category: "AI & Diagnostics",
    author: "Dr. Aisha Thornton",
    authorTitle: "Internal Medicine, Cleveland Clinic",
    date: "2024-02-20",
    readTime: "8 min read",
    summary: "I spent three months systematically testing large language models against real clinical cases from my practice. The results were more nuanced than the headlines.",
    body: `<p>I want to be precise about what I tested, because the devil is entirely in the methodology with these studies. I took 50 de-identified cases from my own practice — cases where I had the benefit of full clinical context, labs, imaging, and eventual confirmed diagnosis — and presented them to GPT-4 using a standardized prompting structure.</p>

<p>The goal was not to see if AI could replace my clinical reasoning. It was to understand where LLM-generated differentials add value and where they introduce noise.</p>

<h2>Where It Surprised Me (Positively)</h2>

<p>For cases with classic presentations and complete information, GPT-4's differentials were remarkably good — often matching or exceeding what I'd expect from a strong third-year resident. More usefully, it consistently surfaced zebra diagnoses that I might have deprioritized given base rate thinking. In two cases, it listed a diagnosis in its top five that turned out to be the correct answer and that I had ranked lower.</p>

<h2>Where It Failed Consistently</h2>

<p>The failures were systematic and informative. The model struggled significantly with cases requiring integration of non-verbal clinical data: the way a patient looked, their affect, subtle exam findings that require physical presence. It also over-weighted rare diagnoses in ambiguous presentations — a known failure mode of LLMs trained on medical literature, which over-represents rare conditions relative to their actual prevalence.</p>

<p>Most concerning: it was confidently wrong in a way that could mislead a less experienced clinician. The model doesn't hedge appropriately on cases where a human physician would flag significant uncertainty.</p>

<h2>My Practical Takeaway</h2>

<p>I now use LLMs the way I use UpToDate — as a reference to check my thinking, not replace it. The specific use case where I find genuine value: after I've formulated my own differential, I'll ask the model what I might be missing. It's a systematic way to stress-test my reasoning without adding significant time to my workflow.</p>`,
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    featured: false
  },
  {
    id: "seed-6",
    title: "The Apple Watch ECG Feature: Two Years of Data From My Cardiology Practice",
    category: "Wearables & Remote Care",
    author: "Dr. David Kim",
    authorTitle: "Cardiology, Northwestern Medicine",
    date: "2024-02-14",
    readTime: "10 min read",
    summary: "My patients have generated over 2,000 Watch ECGs in the last two years. Here's a frank assessment of the clinical utility, the false positives, and the workflow it's created.",
    body: `<p>When Apple launched the ECG feature on the Series 4, I was skeptical in the way most cardiologists were skeptical: a single-lead rhythm strip generated by a consumer device, interpreted by an algorithm, sent to me via a patient's screenshot. The clinical utility seemed marginal at best.</p>

<p>Two years and roughly 2,200 patient-generated ECGs later, I have a more complicated opinion.</p>

<h2>The AFib Detection Story</h2>

<p>The headline use case — atrial fibrillation detection — has held up reasonably well in my practice. I've had 23 cases where a patient presented with a Watch ECG showing AFib that was their first documented episode. In 19 of those cases, subsequent 12-lead and Holter monitoring confirmed the diagnosis. That's an 83% positive predictive value in a real-world, unselected outpatient population — not far from the published trial data.</p>

<p>What the trial data undersells: the clinical impact of early detection. Three of those 23 patients had no symptoms. They would not have sought care. Two had CHADS-VASc scores that warranted anticoagulation. The Watch found something that mattered.</p>

<h2>The False Positive Problem Is Real</h2>

<p>For every meaningful AFib catch, I'm managing roughly four "inconclusive" readings that sent a patient into significant anxiety. Motion artifact, poor skin contact, and the algorithm's tendency to flag borderline rhythms as inconclusive — rather than normal — has generated a meaningful volume of unnecessary consults.</p>

<p>I've had to build a patient education piece into my practice specifically for Watch ECG interpretation. The 10-second strip does not diagnose. It prompts a conversation.</p>`,
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&q=80",
    featured: false
  }
];

const CATEGORIES = [
  "AI & Diagnostics",
  "EHR & Software",
  "Surgical Technology",
  "Wearables & Remote Care"
];

// Merge seed articles with any user-created articles from localStorage
function getAllArticles() {
  let userArticles = [];
  try {
    const stored = localStorage.getItem('rounds_articles');
    if (stored) userArticles = JSON.parse(stored);
  } catch (e) { }

  let deletedSeeds = [];
  try {
    const storedDeleted = localStorage.getItem('rounds_deleted_seeds');
    if (storedDeleted) deletedSeeds = JSON.parse(storedDeleted);
  } catch (e) { }

  const activeSeeds = SEED_ARTICLES.filter(a => !deletedSeeds.includes(a.id));
  return [...userArticles, ...activeSeeds];
}

function saveArticles(articles) {
  // Only saves user-created articles (not seeds)
  const userArticles = articles.filter(a => !a.id.startsWith('seed-'));
  localStorage.setItem('rounds_articles', JSON.stringify(userArticles));
}

function getFeaturedArticle() {
  return getAllArticles().find(a => a.featured) || getAllArticles()[0];
}

function getArticlesByCategory(category) {
  return getAllArticles().filter(a => a.category === category);
}

function getArticleById(id) {
  return getAllArticles().find(a => a.id === id);
}
