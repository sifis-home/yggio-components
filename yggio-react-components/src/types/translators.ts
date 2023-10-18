interface Translator {
  _id: string;
  name: string;
  description: string;
  userId: string;
  version: string;
  apiVersion: string;
}

type Translators = Translator[];
type IdKeyedTranslators = {[_id: string]: Translator};

export type {
  Translator,
  Translators,
  IdKeyedTranslators,
};
