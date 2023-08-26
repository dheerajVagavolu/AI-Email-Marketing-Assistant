export default function Campaign(name, preferences = {}, emailData = []) {
  return {
    name,
    dateCreated: new Date().toUTCString("en-US"),
    emailData,
    preferences,
  };
}
