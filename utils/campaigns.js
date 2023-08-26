export const fetchCampaigns = async () => {
  const dataJson = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/campaign/getAll"
  );
  const data = await dataJson.json();

  console.log(data);

  return {
    data: data,
  };
};

export const createCampaign = async (name) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/campaign/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data.message); // "Successfully added campaign"
      return data;
    } else {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("There was an error creating the campaign", error);
  }
};


export const updateCampaign = async (_id, name, preferences, emailData) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/campaign/updatePreferences",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id,
            name,
            preferences,
            emailData
          }),
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // "Successfully added campaign"
        return data;
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("There was an error creating the campaign", error);
    }
  };
