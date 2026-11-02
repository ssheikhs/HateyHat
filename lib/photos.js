// Photos of community work in Bangladesh from Wikimedia Commons.
// Each one is free to use under the licence listed; credits appear on the home page.
const commons = (path, file, width = 1280) =>
  `https://thumb.wikimedia.org/wikipedia/commons/thumb/${path}/${file}/${width}px-${file}`;

export const photos = {
  waterRickshaw: {
    src: commons("6/65", "Water_distribution_by_Volunteer_for_Bangladesh_01.jpg"),
    alt: "Volunteers in yellow T-shirts handing drinking water to a rickshaw puller in Dhaka",
    caption: "Water for rickshaw pullers on a hot Dhaka day",
    credit: "Iqbal Hossain",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Water_distribution_by_Volunteer_for_Bangladesh_01.jpg",
  },
  waterTeam: {
    src: commons("f/f6", "Water_distribution_by_Volunteer_for_Bangladesh_05.jpg"),
    alt: "A team of volunteers walking along a busy Dhaka street",
    caption: "Volunteer team on the way to the next stop",
    credit: "Iqbal Hossain",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Water_distribution_by_Volunteer_for_Bangladesh_05.jpg",
  },
  floodReliefNeedy: {
    src: commons("0/04", "Emergency_Relief_Distribution_among_Flood_Affected_Families_by_Needy_Foundation.jpg"),
    alt: "Volunteers handing relief packs to flood-affected families in Bangladesh",
    caption: "Relief packs for flood-hit families",
    credit: "Needy Foundation",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Emergency_Relief_Distribution_among_Flood_Affected_Families_by_Needy_Foundation.jpg",
  },
  treeRally: {
    src: commons("f/f9", "Syed_Nazrul_College_Tree_Plantation_Rally.JPG"),
    alt: "College students on a tree plantation rally in Bangladesh",
    caption: "Tree plantation rally, Shaheed Syed Nazrul Islam College",
    credit: "Anup Sadi",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Syed_Nazrul_College_Tree_Plantation_Rally.JPG",
  },
  waterDistribution: {
    src: commons("a/a1", "Water_distribution_by_Volunteer_for_Bangladesh_03.jpg"),
    alt: "Volunteers handing out drinking water in Bangladesh",
    caption: "Drinking water for people on the street",
    credit: "Iqbal Hossain",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Water_distribution_by_Volunteer_for_Bangladesh_03.jpg",
  },
  duReliefPacking: {
    src: commons("d/d4", "Relief_collection_for_flood_affected_people_at_TSC%2CDU_04.jpg"),
    alt: "Students sorting relief goods at Dhaka University",
    caption: "Sorting relief goods, Dhaka University",
    credit: "Wasiul Bahar",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Relief_collection_for_flood_affected_people_at_TSC,DU_04.jpg",
  },
  winterClothes: {
    src: commons("f/fb", "Winter_Clothes_Distribution_in_Bangladesh.jpg"),
    alt: "Winter clothes being distributed in Bangladesh",
    caption: "Winter clothes for the cold north",
    credit: "Midad",
    license: "Attribution",
    page: "https://commons.wikimedia.org/wiki/File:Winter_Clothes_Distribution_in_Bangladesh.jpg",
  },
  fireRelief: {
    src: commons("0/04", "Emergency_Relief_Distribution_among_Fire_Affected_Families_by_Needy_Foundation_01.jpg"),
    alt: "Relief distribution for fire-affected families in Anwara, Chattogram",
    caption: "Help for fire-hit families, Anwara, Chattogram",
    credit: "Needy Foundation",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Emergency_Relief_Distribution_among_Fire_Affected_Families_by_Needy_Foundation_01.jpg",
  },
  beachCleanup: {
    src: commons("3/3d", "Saint_Martin%27s_Island_Cleanup_Campaign_2025-02-12_%28PID-0003543%29.jpg"),
    alt: "Cleanup campaign on Saint Martin's Island",
    caption: "Beach cleanup, Saint Martin's Island",
    credit: "Press Information Department",
    license: "Public domain",
    page: "https://commons.wikimedia.org/wiki/File:Saint_Martin%27s_Island_Cleanup_Campaign_2025-02-12_(PID-0003543).jpg",
  },
  redCrescent: {
    src: "https://upload.wikimedia.org/wikipedia/commons/7/78/Fardeen_Bin_Abdullah_volunteering_for_Bangladesh_Red_Crescent_Society.jpg",
    alt: "A Bangladesh Red Crescent volunteer in Paikgacha, Khulna",
    caption: "Red Crescent volunteer, Paikgacha, Khulna",
    credit: "Randomotakuguy",
    license: "CC0",
    page: "https://commons.wikimedia.org/wiki/File:Fardeen_Bin_Abdullah_volunteering_for_Bangladesh_Red_Crescent_Society.jpg",
  },
  winterOrphans: {
    src: commons("e/ef", "Winter_Clothes_Distribution_Among_Orphans_of_Yatimkhana_of_Bangladesh_by_Needy_Foundation._01.jpg"),
    alt: "Warm clothes handed out to madrasa students",
    caption: "Warm clothes for madrasa students",
    credit: "Needy Foundation",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Winter_Clothes_Distribution_Among_Orphans_of_Yatimkhana_of_Bangladesh_by_Needy_Foundation._01.jpg",
  },
  duReliefLine: {
    src: commons("1/11", "Relief_collecting_for_flood_affected_people_at_TSC%2CDU_72.jpg"),
    alt: "Volunteers packing relief at Dhaka University",
    caption: "Packing relief at TSC",
    credit: "Wasiul Bahar",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Relief_collecting_for_flood_affected_people_at_TSC,DU_72.jpg",
  },
  fireRelief2: {
    src: commons("2/21", "Emergency_Relief_Distribution_among_Fire_Affected_Families_by_Needy_Foundation_02.jpg", 1280),
    alt: "Volunteers giving relief to families in Chattogram",
    caption: "Relief day in Anwara, Chattogram",
    credit: "Needy Foundation",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Emergency_Relief_Distribution_among_Fire_Affected_Families_by_Needy_Foundation_02.jpg",
  },
  mustardField: {
    src: commons("4/46", "Mustard_plantation%2C_pond_with_tree_2.jpg"),
    alt: "Mustard field and pond in rural Bangladesh",
    caption: "Mustard field, rural Bangladesh",
    credit: "Belayet2014",
    license: "CC BY-SA 3.0",
    page: "https://commons.wikimedia.org/wiki/File:Mustard_plantation,_pond_with_tree_2.jpg",
  },
};

export const galleryPhotos = [
  photos.waterDistribution,
  photos.duReliefPacking,
  photos.winterClothes,
  photos.fireRelief,
  photos.beachCleanup,
  photos.redCrescent,
  photos.winterOrphans,
  photos.duReliefLine,
];

export const FALLBACK_IMAGE = photos.mustardField.src;
