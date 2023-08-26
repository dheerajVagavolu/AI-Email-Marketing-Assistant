export default function Preferences(
  goal = null,
  brandTone = null,
  industry = null,
  description = null,
  useWebsite = false,
  website = null,
  websiteData = null
) {
  return {
    goal,
    brandTone,
    industry,
    description,
    useWebsite,
    website,
    websiteData,
  };
}
