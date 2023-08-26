export const generateEmailData = async (campaignId, data) => {
  for (let item of data) {
    const bodyData = {
      campaignId,
      emailText: item.body,
    };

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/emailData/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Result From Email Creation: " + JSON.stringify(result));
      } else {
        console.error(
          `Error while posting data for item: ${item.body}. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error(
        `Error while posting data for item: ${item.body}. Error: ${error}`
      );
    }
  }
};

export const fetchEmailsByCampaignId = async (_id) => {
  const dataJson = await fetch(
    process.env.NEXT_PUBLIC_API_URL +
      `/api/emailData/getByCampaignId?campaignId=${_id}`
  );
  const data = await dataJson.json();

  console.log(data);

  return {
    data,
  };
};

export const updateEmailHandler = async (
  type,
  _id,
  emailText = null,
  favorite = null
) => {
  if (type == "PUT") {
    if (_id === null || (emailText === null && favorite === null)) {
      console.error(
        "ID cant be null, Both emailText and favorite cannot be null."
      );
      return;
    }

    const requestBody = {
      _id,
    };

    if (emailText !== null) {
      requestBody.emailText = emailText;
    }

    if (favorite !== null) {
      requestBody.favorite = favorite;
    }

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/emailData/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Result From Email Creation: " + JSON.stringify(result));
      } else {
        console.error(
          `Error while updating data for email ID: ${_id}. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error(
        `Error while updating data for email ID: ${_id}. Status: ${error}`
      );
    }
  } else if (type === "DELETE") {
    if (_id === null) {
      console.error("ID cant be null");
      return;
    }
    const requestBody = {
      _id,
    };

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/emailData/deleteById",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const result = await response.json();
        return response;
      } else {
        console.error(
          `Error while deleting data for email ID: ${_id}. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error(
        `Error while deleting data for email ID: ${_id}. Status: ${response.status}`
      );
    }
  }
};
