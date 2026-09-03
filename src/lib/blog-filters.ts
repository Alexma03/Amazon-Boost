export const normalizeSearch = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es').trim();

export function matchesBlogArticle(text: string, category: string, query: string, selectedCategory: string) {
  const haystack = normalizeSearch(text + ' ' + category);
  const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
  return (!selectedCategory || category === selectedCategory) && terms.every((term) => haystack.includes(term));
}

export function mountBlogFilters(root: HTMLElement) {
  const search = root.querySelector<HTMLInputElement>('[data-blog-search]');
  const category = root.querySelector<HTMLSelectElement>('[data-blog-category]');
  const reset = root.querySelector<HTMLButtonElement>('[data-blog-reset]');
  const form = root.querySelector<HTMLFormElement>('[data-blog-form]');
  const count = root.querySelector<HTMLElement>('[data-blog-count]');
  const empty = root.querySelector<HTMLElement>('[data-blog-empty]');
  const cards = [...root.querySelectorAll<HTMLElement>('[data-blog-card]')];
  if (!search || !category) return;

  const update = () => {
    let visible = 0;
    for (const card of cards) {
      const matches = matchesBlogArticle(card.dataset.searchText ?? '', card.dataset.category ?? '', search.value, category.value);
      card.hidden = !matches;
      if (matches) visible++;
    }
    if (count) count.textContent = visible + (visible === 1 ? ' artículo' : ' artículos');
    if (empty) empty.hidden = visible !== 0;
    if (reset) reset.disabled = !search.value && !category.value;
  };
  const clear = () => { search.value = ''; category.value = ''; update(); search.focus(); };
  const preventSubmit = (event: Event) => event.preventDefault();
  search.addEventListener('input', update);
  category.addEventListener('change', update);
  reset?.addEventListener('click', clear);
  form?.addEventListener('submit', preventSubmit);
  update();
  return () => {
    search.removeEventListener('input', update);
    category.removeEventListener('change', update);
    reset?.removeEventListener('click', clear);
    form?.removeEventListener('submit', preventSubmit);
  };
}
