// Native-speaker reviewers of each translated docs locale. Each one is credited
// by name at the foot of every docs page in that language: the reviewer threads
// in the core's Discussions (career-ops-hq/career-ops #5314 to #5319) promise
// "thanked by name in this thread and on the site".
//
// An entry goes in only with the reviewer's explicit permission, given in their
// language's thread, and once their first batch of corrections is merged. A
// name and a link to the GitHub profile; no counts, no "verified".
export type NativeReviewer = { name: string; github: string };

export const NATIVE_REVIEWERS: Partial<Record<'es' | 'fr' | 'de' | 'pt' | 'it' | 'zh' | 'vi', NativeReviewer[]>> = {};
