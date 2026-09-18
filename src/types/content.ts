export type NavigationItem = {
  href: string;
  label: string;
};

export type LinkDestination = {
  id: string;
  title: string;
  description?: string;
  href: string;
  kind: "internal" | "external";
  category?: string;
  status?: "draft" | "published";
};

export type LabExperiment = {
  id: string;
  title: string;
  description?: string;
  slug: string;
  category?: string;
  status?: "draft" | "published";
};

export type ProfileContent = {
  displayName?: string;
  bio?: string;
};
