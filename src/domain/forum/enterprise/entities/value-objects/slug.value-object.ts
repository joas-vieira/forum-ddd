export class Slug {
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  static create(value: string): Slug {
    const slug = value
      .normalize("NFKD")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/_/g, "-")
      .replace(/--+/g, "-")
      .replace(/-$/g, "");

    return new Slug(slug);
  }
}
