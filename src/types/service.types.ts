type ServiceItemType = {
  title: string;
  icon: string;
  description: string[];
};

export type ServiceType = {
  slug: string;
  category: string;
  description: string;
  image?: string;
  data: ServiceItemType[];
};

export type ServiceSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};
