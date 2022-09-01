import { RiMacbookLine } from "react-icons/ri";

export default {
  name: "product",
  title: "Product",
  type: "document",
  icon: RiMacbookLine,
  fields: [
    {
      name: "title",
      title: "Tytuł",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "image",
      title: "Zdjęcie",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true,
      },
    },
    {
      name: "category",
      title: "Kategoria",
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      name: "price",
      title: "Cena",
      type: "number",
    },
    {
      name: "description",
      title: "Opis",
      type: "blockContent",
    },
  ],
};