export default function EmailData(campaignId, emailText, favorite = false, history=[]) {
  return {
    campaignId,
    emailText,
    favorite,
    dateCreated: new Date().toUTCString("en-US"),
    history,
  };
}
