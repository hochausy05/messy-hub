export type NavigationItem = {
  href: string;
  label: string;
};

export type HubDestination = {
  id: string;
  title: string;
  slug: string;
  href: string;
  description: string;
  actionLabel: string;
  index: string;
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

export type LabExperimentCategory = "ui" | "motion" | "three" | "shader";

export type LabExperimentStatus = "active" | "prototype" | "archived" | "planned";

export type LabExperiment = {
  id: string;
  title: string;
  description?: string;
  slug: string;
  category: LabExperimentCategory;
  status: LabExperimentStatus;
  href?: string;
};


export type ProfileContent = {
  displayName?: string;
  bio?: string;
};
