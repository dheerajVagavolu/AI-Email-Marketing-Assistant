export default async function updateHandler(_id, campaign) {
    try {
      //
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/campaign/updatePreferences",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id,
            name: campaign.name,
            preferences: campaign.preferences,
            lastUsed: new Date().toDateString().toLocaleLowerCase("en-us"),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating campaign:", error);
      throw error;
    } finally {
      //
    }
  }