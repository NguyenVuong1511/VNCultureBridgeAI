import { toKey, normalizeTopic } from "./topics";

// This file implements a small localStorage-backed article store that
// stores articles using the new schema fields (article_id, title_en, summary_en, ...)
// but keeps legacy-friendly fields (id, title, desc, img, author, date, content)
// for compatibility with existing UI components. It will auto-migrate older
// items when read.

function readRaw(key) {
	const raw = localStorage.getItem(key);
	try {
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}

function writeRaw(key, list) {
	localStorage.setItem(key, JSON.stringify(list || []));
}

function slugify(text = "") {
	return String(text)
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

function normalizeArticleShape(a, topicName) {
	// Return an object that contains both the canonical schema and legacy fields
	const article = { ...(a || {}) };

	// Ensure integer article_id exists
	if (!article.article_id) {
		// if legacy id is numeric-like, try to use it
		const possible = parseInt(article.id, 10);
		if (!Number.isNaN(possible)) article.article_id = possible;
	}

	// legacy title/desc/content -> new schema
	if (!article.title_en && article.title) article.title_en = article.title;
	if (!article.summary_en && article.desc) article.summary_en = article.desc;
	if (!article.content_en && article.content) article.content_en = article.content;

	// timestamps
	if (!article.created_at && article.date) {
		// if legacy date is YYYY-MM-DD use as created_at
		article.created_at = article.date.length === 10 ? `${article.date}T00:00:00` : article.date;
	}
	if (!article.updated_at) article.updated_at = article.created_at || new Date().toISOString();

	// author mapping
	if (!article.author_id && article.author) {
		// keep author name as author_id when text (simple compatibility)
		article.author_name = article.author;
	}

	// keep an image field if present
	if (!article.img && article.image) article.img = article.image;

	// keep a legacy slug id for routes
	if (!article.id) {
		if (article.slug) article.id = article.slug;
		else if (article.title_en) article.id = slugify(article.title_en);
		else if (article.article_id) article.id = String(article.article_id);
	}

	// ensure boolean
	if (typeof article.is_published === "undefined") article.is_published = !!article.is_published;

	// ensure topic name is present
	if (!article.topic && topicName) article.topic = topicName;

	return article;
}

export function getTopicArticles(topic) {
	const key = toKey(normalizeTopic(topic));
	const raw = readRaw(key);
	// Migrate each entry to normalized shape
	const migrated = raw.map((r) => normalizeArticleShape(r, topic));
	return migrated;
}

export function setTopicArticles(topic, articles) {
	const key = toKey(normalizeTopic(topic));
	// store as-is (articles already normalized by callers)
	writeRaw(key, articles || []);
}

export function upsertArticle(topic, article) {
	const key = toKey(normalizeTopic(topic));
	const list = readRaw(key).map((r) => normalizeArticleShape(r, topic));

	// ensure article is normalized
	const a = normalizeArticleShape(article, topic);

	// assign article_id if missing
	if (!a.article_id) {
		const maxId = list.reduce((m, it) => Math.max(m, Number(it.article_id || 0)), 0);
		a.article_id = maxId + 1;
	}

	// set timestamps
	const now = new Date().toISOString();
	if (!a.created_at) a.created_at = now;
	a.updated_at = now;

	// ensure legacy fields to keep compatibility
	a.title = a.title_en || a.title;
	a.desc = a.summary_en || a.desc;
	a.content = a.content_en || a.content;
	a.date = (a.created_at || now).slice(0, 10);
	if (a.author_name) a.author = a.author_name;

	const idx = list.findIndex((it) => Number(it.article_id) === Number(a.article_id) || it.id === a.id);
	if (idx >= 0) {
		list[idx] = { ...list[idx], ...a };
	} else {
		// add to top
		list.unshift(a);
	}

	writeRaw(key, list);
	return list.map((r) => normalizeArticleShape(r, topic));
}

export function deleteArticle(topic, idOrArticleId) {
	const key = toKey(normalizeTopic(topic));
	const list = readRaw(key).map((r) => normalizeArticleShape(r, topic));
	const next = list.filter((a) => String(a.id) !== String(idOrArticleId) && String(a.article_id) !== String(idOrArticleId));
	writeRaw(key, next);
	return next;
}

