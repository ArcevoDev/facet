// Generator: builds the complete first-level administrative divisions
// (states/regions/provinces) for every country in DEFAULT_REGIONS.
// Run: node scripts/gen-regions.mjs > scratch
// Source: official admin-division lists per country.

const REGIONS = {
  US: [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
    "New Hampshire", "New Jersey", "New Mexico", "New York",
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
    "West Virginia", "Wisconsin", "Wyoming", "District of Columbia",
  ],
  GB: ["England", "Scotland", "Wales", "Northern Ireland"],
  GH: [
    "Greater Accra", "Ashanti", "Western", "Central", "Eastern", "Volta",
    "Northern", "Upper East", "Upper West", "Bono", "Bono East", "Ahafo",
    "Savannah", "North East", "Oti", "Western North",
  ],
  KE: [
    "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Uasin Gishu", "Kiambu",
    "Machakos", "Kajiado", "Garissa", "Wajir", "Mandera", "Marsabit",
    "Turkana", "West Pokot", "Samburu", "Trans Nzoia", "Bungoma", "Kakamega",
    "Vihiga", "Busia", "Siaya", "Homa Bay", "Migori", "Kisii", "Nyamira",
    "Kericho", "Bomet", "Narok", "Laikipia", "Meru", "Tharaka-Nithi",
    "Embu", "Kitui", "Makueni", "Nyeri", "Kirinyaga", "Murang'a",
    "Nyandarua", "Baringo", "Elgeyo-Marakwet", "Nandi", "Taita-Taveta",
    "Tana River", "Lamu", "Kilifi", "Kwale", "Isiolo",
  ],
  ZA: [
    "Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape",
    "Limpopo", "Mpumalanga", "North West", "Northern Cape", "Free State",
  ],
  EG: [
    "Cairo", "Alexandria", "Giza", "Port Said", "Suez", "Luxor", "Aswan",
    "Asyut", "Beheira", "Beni Suef", "Dakahlia", "Damietta", "Faiyum",
    "Gharbia", "Ismailia", "Kafr El Sheikh", "Matrouh", "Minya",
    "Monufia", "New Valley", "Qena", "Red Sea", "Sharqia", "Sohag",
    "South Sinai", "North Sinai", "Helwan",
  ],
  ET: [
    "Addis Ababa", "Afar", "Amhara", "Benishangul-Gumuz", "Dire Dawa",
    "Gambela", "Harari", "Oromia", "Sidama", "Somali", "South West",
    "Tigray",
  ],
  TZ: [
    "Dar es Salaam", "Dodoma", "Arusha", "Mwanza", "Mbeya", "Morogoro",
    "Tanga", "Kilimanjaro", "Tabora", "Kigoma", "Shinyanga", "Kagera",
    "Manyara", "Rukwa", "Ruvuma", "Iringa", "Singida", "Pwani", "Lindi",
    "Mtwara", "Mara", "Geita", "Simiyu", "Songwe", "Njombe", "Katavi",
    "Zanzibar North", "Zanzibar South", "Zanzibar West", "Pemba North",
    "Pemba South",
  ],
  UG: [
    "Central Region", "Eastern Region", "Northern Region", "Western Region",
  ],
  RW: [
    "Kigali", "Eastern Province", "Western Province", "Northern Province",
    "Southern Province",
  ],
  IN: [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
    "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi",
    "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
  ],
  CN: [
    "Beijing", "Shanghai", "Guangdong", "Sichuan", "Shandong", "Henan",
    "Hubei", "Hunan", "Jiangsu", "Zhejiang", "Fujian", "Anhui", "Jiangxi",
    "Hebei", "Shanxi", "Shaanxi", "Gansu", "Qinghai", "Guizhou", "Yunnan",
    "Hainan", "Liaoning", "Jilin", "Heilongjiang", "Inner Mongolia",
    "Guangxi", "Ningxia", "Xinjiang", "Tibet", "Chongqing", "Tianjin",
    "Hong Kong", "Macau", "Taiwan",
  ],
  BR: [
    "São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia", "Paraná",
    "Rio Grande do Sul", "Pernambuco", "Ceará", "Pará", "Amazonas",
    "Maranhão", "Goiás", "Santa Catarina", "Paraíba", "Espírito Santo",
    "Rio Grande do Norte", "Alagoas", "Mato Grosso", "Mato Grosso do Sul",
    "Piauí", "Distrito Federal", "Sergipe", "Rondônia", "Tocantins",
    "Acre", "Amapá", "Roraima",
  ],
  SA: [
    "Riyadh", "Jeddah", "Mecca", "Medina", "Eastern Province", "Asir",
    "Tabuk", "Hail", "Northern Borders", "Jazan", "Najran", "Al-Bahah",
    "Al-Jawf",
  ],
  AE: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"],
};

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

for (const [code, names] of Object.entries(REGIONS)) {
  console.log(`  ${code}: [`); // eslint-disable-line no-console
  for (const name of names) {
    console.log(`    { id: ${JSON.stringify(kebab(name))}, name: ${JSON.stringify(name)} },`);
  }
  console.log("  ],");
}
