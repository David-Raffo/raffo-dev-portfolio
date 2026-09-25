import type { Props as ImageTextProps } from "./components/ImageText.vue";
import type { Props as TextProps } from "./components/Text.vue";
import type { Props as ListProps } from "./components/List.vue";
import type { Props as MediaProps } from "./components/Media.vue";
import type { Props as HeadingProps } from "./components/Heading.vue";
import type { Props as StatsProps } from "./components/Stats.vue";
import type { Props as FeaturesProps } from "./components/Features.vue";

export interface ProjectComponents {
  imageText: ImageTextProps;
  text: TextProps;
  list: ListProps;
  media: Omit<MediaProps, "index">;
  heading: HeadingProps;
  stats: StatsProps;
  features: FeaturesProps;
}

export type ProjectComponent = {
  [K in keyof ProjectComponents]: {
    type: K;
    props: ProjectComponents[K];
  };
}[keyof ProjectComponents];

type ProjectComponentMap<K extends keyof ProjectComponents> = {
  type: K;
  props: ProjectComponents[K];
};

export type ProjectComponentProps = ProjectComponentMap<keyof ProjectComponents>;
